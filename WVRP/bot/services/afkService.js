import db from '../database/index.js';
import { EmbedBuilder } from 'discord.js';

export class AfkService {
  constructor() {
    this.cooldowns = new Map(); // Prevent rapid spam pings
  }

  isEnabled() {
    return process.env.AFK_ENABLED !== 'false';
  }

  getConfig() {
    return {
      enabled: this.isEnabled(),
      prefix: process.env.AFK_NICKNAME_PREFIX !== undefined ? process.env.AFK_NICKNAME_PREFIX : 'AFK | ',
      suffix: process.env.AFK_NICKNAME_SUFFIX || '',
      notifyPingers: process.env.AFK_NOTIFY_PINGERS !== 'false',
      logChannelId: process.env.AFK_LOG_CHANNEL_ID || null
    };
  }

  formatDuration(ms) {
    const totalSec = Math.floor(ms / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }

  isAfk(userId) {
    const record = db.prepare('SELECT * FROM afk_status WHERE user_id = ? AND is_afk = 1').get(userId);
    return Boolean(record);
  }

  getAfkRecord(userId) {
    return db.prepare('SELECT * FROM afk_status WHERE user_id = ? AND is_afk = 1').get(userId);
  }

  computeAfkNickname(originalNickname) {
    const config = this.getConfig();
    const prefix = config.prefix;
    const suffix = config.suffix;
    let targetNickname = originalNickname || 'Member';

    if (!targetNickname.startsWith(prefix.trim())) {
      targetNickname = `${prefix}${originalNickname}${suffix}`;
    }

    if (targetNickname.length > 32) {
      const allowedOriginal = 32 - prefix.length - suffix.length;
      targetNickname = `${prefix}${originalNickname.slice(0, Math.max(1, allowedOriginal))}${suffix}`;
    }
    return targetNickname;
  }

  logPing(afkUserId, pingerId, pingerTag, messageContent, channelId = 'chat', channelName = 'general') {
    const now = Date.now();
    db.prepare(`
      INSERT INTO afk_pings (afk_user_id, pinger_id, pinger_tag, channel_id, channel_name, message_id, message_content, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      afkUserId,
      pingerId,
      pingerTag,
      channelId,
      channelName,
      `msg_${now}`,
      (messageContent || '').slice(0, 300),
      now
    );
    return true;
  }

  getMissedPings(userId) {
    return db.prepare('SELECT * FROM afk_pings WHERE afk_user_id = ? ORDER BY created_at ASC').all(userId);
  }

  /**
   * Activate AFK for a member.
   * Handles nickname renaming, database persistence, and embed creation.
   */
  async setAfk(member, user, reason = 'AFK', guild = null) {
    const config = this.getConfig();
    const userId = user?.id || (typeof member === 'string' ? member : member?.id);
    const guildId = guild?.id || member?.guild?.id || 'wvrp_guild';
    const userTag = user?.tag || user?.username || member?.userTag || member?.username || 'Member';
    const now = Date.now();

    // 1. Determine original nickname
    const originalNickname = member?.nickname || member?.displayName || user?.displayName || user?.username || member?.originalNickname || 'Member';

    // 2. Prepare new AFK nickname (avoiding double prefix and truncating safely at 32 chars)
    const targetNickname = this.computeAfkNickname(originalNickname);

    // 3. Attempt Discord member nickname edit
    let nicknameChanged = false;
    let nicknameError = null;

    if (member && typeof member.setNickname === 'function') {
      try {
        await member.setNickname(targetNickname, `AFK: ${reason}`);
        nicknameChanged = true;
      } catch (err) {
        nicknameError = err.message;
        console.warn(`Could not set nickname for ${userTag} (${userId}):`, err.message);
      }
    }

    // 4. Save to SQLite database
    db.prepare(`
      INSERT INTO afk_status (user_id, guild_id, user_tag, reason, original_nickname, nickname_changed, is_afk, timestamp, mentions_json)
      VALUES (?, ?, ?, ?, ?, ?, 1, ?, '[]')
      ON CONFLICT(user_id) DO UPDATE SET
        guild_id = excluded.guild_id,
        user_tag = excluded.user_tag,
        reason = excluded.reason,
        original_nickname = excluded.original_nickname,
        nickname_changed = excluded.nickname_changed,
        is_afk = 1,
        timestamp = excluded.timestamp,
        mentions_json = '[]'
    `).run(
      userId,
      guildId,
      userTag,
      reason || 'AFK',
      originalNickname,
      nicknameChanged ? 1 : 0,
      now
    );

    // Clear previous pings for this fresh AFK session
    db.prepare('DELETE FROM afk_pings WHERE afk_user_id = ?').run(userId);

    // 5. Build announcement embed
    const embed = new EmbedBuilder()
      .setColor(0x00a8ff)
      .setTitle(`🕒 AFK | ${originalNickname} is now AFK`)
      .setDescription(
        `📌 **Reason:** ${reason || 'AFK'}\n\n` +
        `Anyone who pings you will be told. Send a message when you're back and I'll show who pinged you.` +
        (nicknameError ? `\n\n*(Note: Nickname could not be updated due to Discord hierarchy permissions)*` : '')
      )
      .setFooter({ text: 'West Virginia Roleplay · AFK Management System' })
      .setTimestamp(new Date());

    return {
      success: true,
      originalNickname,
      newNickname: targetNickname,
      nicknameChanged,
      nicknameError,
      reason,
      activatedAt: now,
      embed
    };
  }

  /**
   * Monitor messages for pings directed at AFK users.
   */
  async handleMentions(message) {
    if (!this.isEnabled()) return [];
    if (!message || !message.mentions || message.author.bot) return [];

    const mentionedUsers = message.mentions.users;
    if (!mentionedUsers || mentionedUsers.size === 0) return [];

    const config = this.getConfig();
    const responses = [];
    const now = Date.now();

    for (const [targetId, targetUser] of mentionedUsers) {
      if (targetId === message.author.id) continue; // Skip self mentions

      const afkRecord = db.prepare('SELECT * FROM afk_status WHERE user_id = ? AND is_afk = 1').get(targetId);
      if (!afkRecord) continue;

      // Rate limit check for duplicate alert in rapid succession (5 seconds per pinger->target pair)
      const cooldownKey = `${message.author.id}:${targetId}`;
      const lastPing = this.cooldowns.get(cooldownKey) || 0;
      if (now - lastPing < 5000) {
        continue;
      }
      this.cooldowns.set(cooldownKey, now);

      // Record ping in database
      db.prepare(`
        INSERT INTO afk_pings (afk_user_id, pinger_id, pinger_tag, channel_id, channel_name, message_id, message_content, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        targetId,
        message.author.id,
        message.author.tag || message.author.username,
        message.channel?.id || 'unknown',
        message.channel?.name || 'chat',
        message.id || 'msg_unknown',
        (message.content || '').slice(0, 300),
        now
      );

      // Build notification
      const timeAgo = this.formatDuration(now - afkRecord.timestamp);
      const targetName = afkRecord.original_nickname || targetUser.displayName || targetUser.username;

      if (config.notifyPingers && message.channel?.send) {
        try {
          const sent = await message.channel.send({
            content: `💤 <@${message.author.id}>, **${targetName}** is currently AFK: **${afkRecord.reason}** (${timeAgo} ago).`
          });
          responses.push({ targetId, sent });
        } catch (err) {
          console.warn('Failed to send AFK ping notification:', err.message);
        }
      }
    }

    return responses;
  }

  /**
   * Check if a message sender is currently AFK and process their return.
   */
  async handleReturn(message) {
    if (!this.isEnabled()) return null;
    if (!message || !message.author || message.author.bot) return null;

    const userId = message.author.id;
    const afkRecord = db.prepare('SELECT * FROM afk_status WHERE user_id = ? AND is_afk = 1').get(userId);
    if (!afkRecord) return null;

    const now = Date.now();
    const durationMs = now - (afkRecord.timestamp || now);
    const durationText = this.formatDuration(durationMs);

    // 1. Mark as no longer AFK in database
    db.prepare('UPDATE afk_status SET is_afk = 0 WHERE user_id = ?').run(userId);

    // 2. Restore exact original server nickname
    let nicknameRestored = false;
    let restoreError = null;

    if (message.member && typeof message.member.setNickname === 'function' && afkRecord.original_nickname) {
      try {
        await message.member.setNickname(afkRecord.original_nickname, 'Returned from AFK');
        nicknameRestored = true;
      } catch (err) {
        restoreError = err.message;
        console.warn(`Could not restore nickname for ${userId}:`, err.message);
      }
    }

    // 3. Fetch all pings received while away
    const pings = db.prepare('SELECT * FROM afk_pings WHERE afk_user_id = ? ORDER BY created_at ASC').all(userId);

    // Clear recorded pings now that user has returned
    db.prepare('DELETE FROM afk_pings WHERE afk_user_id = ?').run(userId);

    // 4. Construct Welcome Back announcement
    let pingsDescription = 'Nobody pinged you while you were AFK.';

    if (pings.length > 0) {
      pingsDescription = `📬 **Pings received while away (${pings.length}):**\n` +
        pings
          .slice(0, 8)
          .map(p => {
            const timeAgo = this.formatDuration(now - p.created_at);
            const contentSnippet = p.message_content ? ` "${p.message_content.slice(0, 60)}..."` : '';
            return `• <@${p.pinger_id}> in <#${p.channel_id}> (${timeAgo} ago)${contentSnippet}`;
          })
          .join('\n');

      if (pings.length > 8) {
        pingsDescription += `\n*...and ${pings.length - 8} more.*`;
      }
    }

    const embed = new EmbedBuilder()
      .setColor(0x23a55a)
      .setTitle(`👋 Welcome back, ${afkRecord.original_nickname || message.author.username}!`)
      .setDescription(
        `You were AFK for **${durationText}**.\n\n${pingsDescription}`
      )
      .setFooter({ text: 'West Virginia Roleplay · AFK Management System' })
      .setTimestamp(new Date());

    if (message.channel?.send) {
      try {
        await message.channel.send({
          content: `<@${userId}>`,
          embeds: [embed]
        });
      } catch (err) {
        console.warn('Failed to send AFK return announcement:', err.message);
      }
    }

    return {
      userId,
      originalNickname: afkRecord.original_nickname,
      durationMs,
      durationText,
      pingsCount: pings.length,
      pings,
      nicknameRestored,
      restoreError,
      embed
    };
  }

  // List all currently AFK members
  getActiveAfkUsers() {
    return db.prepare('SELECT * FROM afk_status WHERE is_afk = 1 ORDER BY timestamp DESC').all();
  }
}

export const afkService = new AfkService();
export default afkService;
