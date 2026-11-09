import db from '../database/index.js';
import robloxService from './robloxService.js';
import cookieTranscriptService from './cookieTranscriptService.js';
import { WvrpEmbedBuilder, BANNERS } from '../embeds/wvrpEmbeds.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits
} from 'discord.js';

export class TicketService {
  /**
   * Check if a member is blacklisted from opening tickets
   */
  isBlacklisted(userId) {
    const bl = db.prepare("SELECT * FROM blacklists WHERE user_id = ? AND type = 'TICKET'").get(userId);
    return bl || null;
  }

  /**
   * Check if member already has an open ticket
   */
  hasOpenTicket(userId) {
    const ticket = db.prepare("SELECT * FROM tickets WHERE user_id = ? AND status = 'OPEN'").get(userId);
    return ticket || null;
  }

  /**
   * Create an actual private Discord ticket channel
   */
  async createTicketChannel(guild, user, categoryName = 'General Support', initialInquiry = 'General member inquiry') {
    // 1. Blacklist check
    const bl = this.isBlacklisted(user.id);
    if (bl) {
      return {
        success: false,
        error: `🚫 You are blacklisted from opening support tickets.\n> **Reason:** ${bl.reason}\n> **Blacklisted By:** <@${bl.issuer_id}>`
      };
    }

    // 2. Duplicate check
    const existingTicket = this.hasOpenTicket(user.id);
    if (existingTicket) {
      return {
        success: false,
        error: `⚠️ You already have an open ticket (<#${existingTicket.channel_id || existingTicket.id}>). Please use your existing ticket or close it before opening a new one.`
      };
    }

    const count = db.prepare('SELECT COUNT(*) as count FROM tickets').get().count;
    const ticketId = String(count + 1).padStart(4, '0');
    const channelName = `ticket-${ticketId}`;

    let channel = null;

    // 3. Create private Discord text channel with strict overwrites
    if (guild && guild.channels?.create) {
      try {
        const ticketCategory = guild.channels.cache.find(
          c => c.type === ChannelType.GuildCategory && (c.name.toLowerCase().includes('ticket') || c.name.toLowerCase().includes('support'))
        );

        const permissionOverwrites = [
          {
            id: guild.roles.everyone.id,
            deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
          },
          {
            id: user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.AttachFiles,
              PermissionFlagsBits.EmbedLinks
            ]
          }
        ];

        // Add staff roles permissions
        const staffRoles = guild.roles.cache.filter(r =>
          r.name.toLowerCase().includes('staff') ||
          r.name.toLowerCase().includes('support') ||
          r.name.toLowerCase().includes('mod') ||
          r.name.toLowerCase().includes('admin')
        );
        for (const [_, role] of staffRoles) {
          permissionOverwrites.push({
            id: role.id,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages, PermissionFlagsBits.EmbedLinks]
          });
        }

        // Add bot self permission
        if (guild.client?.user?.id) {
          permissionOverwrites.push({
            id: guild.client.user.id,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageMessages]
          });
        }

        channel = await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: ticketCategory ? ticketCategory.id : null,
          permissionOverwrites,
          reason: `Support Ticket opened by ${user.tag || user.username} (${categoryName})`
        });
      } catch (err) {
        console.warn(`Discord channel creation fallback (Simulation Mode):`, err.message);
      }
    }

    const channelId = channel ? channel.id : `ticket_chan_${ticketId}`;
    const now = Date.now();

    // 4. Resolve Roblox profile via Bloxlink
    const robloxUser = await robloxService.getRobloxUserFromDiscord(user.id);

    // 5. Save to database
    db.prepare(`
      INSERT INTO tickets (id, channel_id, user_id, user_tag, roblox_username, roblox_id, category, inquiry, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'OPEN', ?)
    `).run(
      ticketId,
      channelId,
      user.id,
      user.tag || user.username,
      robloxUser.username,
      robloxUser.id,
      categoryName,
      initialInquiry,
      now
    );

    // 6. Build official dual banner greeting embed matching provided design
    const embeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'ticket',
      title: `WEST VIRGINIA STATE ROLEPLAY · SUPPORT TICKET`,
      description: `Welcome, <@${user.id}>!\n\nYour support ticket has been created successfully. A member of our support team will assist you shortly.\n\n🎫 **Ticket Information:**\n• **Ticket Number:** \`#${ticketId}\`\n• **Category:** **${categoryName}**\n• **Ticket Creator:** <@${user.id}> (\`${user.tag || user.username}\`)\n• **Created At:** <t:${Math.floor(now / 1000)}:F>\n• **Assigned Staff:** \`Unassigned\`\n• **Ticket Status:** \`OPEN\`\n\n🎮 **Roblox Profile:** [${robloxUser.username}](${robloxUser.profileUrl}) (\`${robloxUser.id}\`)\n💬 **Initial Inquiry:**\n> ${initialInquiry}`
    });

    // 7. Exactly 6 functional buttons across two action rows
    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`ticket_claim_${ticketId}`).setLabel('Claim').setStyle(ButtonStyle.Success).setEmoji('🎫'),
      new ButtonBuilder().setCustomId(`ticket_unclaim_${ticketId}`).setLabel('Unclaim').setStyle(ButtonStyle.Secondary).setEmoji('↩️'),
      new ButtonBuilder().setCustomId(`ticket_close_${ticketId}`).setLabel('Close').setStyle(ButtonStyle.Danger).setEmoji('🔒')
    );

    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`ticket_add_member_${ticketId}`).setLabel('Add Member').setStyle(ButtonStyle.Primary).setEmoji('➕'),
      new ButtonBuilder().setCustomId(`ticket_remove_member_${ticketId}`).setLabel('Remove Member').setStyle(ButtonStyle.Secondary).setEmoji('➖'),
      new ButtonBuilder().setCustomId(`ticket_rename_${ticketId}`).setLabel('Rename').setStyle(ButtonStyle.Secondary).setEmoji('✏️')
    );

    if (channel && channel.send) {
      await channel.send({ content: `<@${user.id}> @here`, embeds, components: [row1, row2] });
    }

    return {
      success: true,
      ticketId,
      channelId,
      channel,
      category: categoryName
    };
  }

  /**
   * Claim an active ticket
   */
  claimTicket(ticketIdOrChannelId, staffUser) {
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ? OR channel_id = ?').get(ticketIdOrChannelId, ticketIdOrChannelId);
    if (!ticket) return { success: false, error: 'Ticket not found' };

    if (ticket.claimed_by && ticket.claimed_by !== (staffUser.tag || staffUser.username)) {
      return { success: false, error: `This ticket is already claimed by @${ticket.claimed_by}.` };
    }

    db.prepare('UPDATE tickets SET claimed_by = ? WHERE id = ?').run(staffUser.tag || staffUser.username, ticket.id);
    return { success: true, claimedBy: staffUser.tag || staffUser.username, ticketId: ticket.id };
  }

  /**
   * Unclaim an active ticket
   */
  unclaimTicket(ticketIdOrChannelId) {
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ? OR channel_id = ?').get(ticketIdOrChannelId, ticketIdOrChannelId);
    if (!ticket) return { success: false, error: 'Ticket not found' };

    db.prepare('UPDATE tickets SET claimed_by = NULL WHERE id = ?').run(ticket.id);
    return { success: true, ticketId: ticket.id };
  }

  /**
   * Add a member to the ticket channel
   */
  async addMemberToTicket(ticketIdOrChannelId, channel, targetUserId, executor) {
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ? OR channel_id = ?').get(ticketIdOrChannelId, ticketIdOrChannelId);
    if (!ticket) return { success: false, error: 'Ticket not found' };

    if (channel && channel.permissionOverwrites?.edit) {
      try {
        await channel.permissionOverwrites.edit(targetUserId, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true,
          AttachFiles: true,
          EmbedLinks: true
        });
      } catch (err) {
        console.warn(`Channel permission overwrite edit fallback:`, err.message);
      }
    }

    return { success: true, ticketId: ticket.id, targetUserId };
  }

  /**
   * Remove a member from the ticket channel
   */
  async removeMemberFromTicket(ticketIdOrChannelId, channel, targetUserId, executor) {
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ? OR channel_id = ?').get(ticketIdOrChannelId, ticketIdOrChannelId);
    if (!ticket) return { success: false, error: 'Ticket not found' };

    if (channel && channel.permissionOverwrites?.delete) {
      try {
        await channel.permissionOverwrites.delete(targetUserId);
      } catch (err) {
        console.warn(`Channel permission delete fallback:`, err.message);
      }
    }

    return { success: true, ticketId: ticket.id, targetUserId };
  }

  /**
   * Rename the ticket channel
   */
  async renameTicket(ticketIdOrChannelId, channel, rawName, executor) {
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ? OR channel_id = ?').get(ticketIdOrChannelId, ticketIdOrChannelId);
    if (!ticket) return { success: false, error: 'Ticket not found' };

    const sanitized = (rawName || 'ticket').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 30);
    const finalName = sanitized.startsWith('ticket-') ? sanitized : `ticket-${sanitized}`;

    if (channel && channel.setName) {
      try {
        await channel.setName(finalName, `Ticket renamed by ${executor.tag || executor.username}`);
      } catch (err) {
        console.warn(`Channel setName fallback:`, err.message);
      }
    }

    return { success: true, ticketId: ticket.id, newName: finalName };
  }

  /**
   * Close ticket and generate transcript
   */
  async closeTicket(ticketIdOrChannelId, closerUser) {
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ? OR channel_id = ?').get(ticketIdOrChannelId, ticketIdOrChannelId);
    const now = Date.now();

    const transcriptRes = await cookieTranscriptService.generateTranscript(ticket?.id || '0001', closerUser);

    if (ticket) {
      db.prepare(`
        UPDATE tickets
        SET status = 'CLOSED', closed_at = ?, closed_by = ?, transcript_url = ?
        WHERE id = ?
      `).run(now, closerUser.tag || closerUser.username, transcriptRes.url, ticket.id);
    }

    const durationMins = ticket ? Math.max(1, Math.round((now - ticket.created_at) / 60000)) : 15;

    const embeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'ticket_closed',
      title: `Ticket #${ticket?.id || '0001'} — ${ticket?.category || 'General Support'}`,
      description: `Support ticket in **West Virginia Roleplay** has been officially closed.\n\n↳ **Handled By:** ${ticket?.claimed_by ? `@${ticket.claimed_by}` : `@${closerUser.tag || closerUser.username}`}\n↳ **Closed By:** @${closerUser.tag || closerUser.username}\n⏰ **Opened:** <t:${Math.floor((ticket?.created_at || now - 3600000) / 1000)}:R>\n⏰ **Closed:** <t:${Math.floor(now / 1000)}:R>\n⏳ **Duration:** ${durationMins}m\n🎫 **Messages Logged:** ${transcriptRes.messageCount} messages`
    });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel('Online Transcript').setStyle(ButtonStyle.Link).setURL(`https://wvrp-transcripts.local${transcriptRes.url}`).setEmoji('📑')
    );

    return {
      success: true,
      ticketId: ticket?.id || '0001',
      durationMins,
      transcriptUrl: transcriptRes.url,
      embeds,
      components: [row]
    };
  }

  /**
   * Reopen a closed ticket
   */
  reopenTicket(ticketIdOrChannelId, staffUser) {
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ? OR channel_id = ?').get(ticketIdOrChannelId, ticketIdOrChannelId);
    if (!ticket) return { success: false, error: 'Ticket not found' };

    db.prepare("UPDATE tickets SET status = 'OPEN', closed_at = NULL, closed_by = NULL WHERE id = ?").run(ticket.id);
    return { success: true, ticketId: ticket.id };
  }
}

export const ticketService = new TicketService();
export default ticketService;
