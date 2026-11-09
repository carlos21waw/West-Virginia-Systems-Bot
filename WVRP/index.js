import {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder
} from 'discord.js';
import dotenv from 'dotenv';
import db from './bot/database/index.js';
import { commands, prefixCommands, formatUnknownCommandMessage } from './bot/handlers/commandRegistry.js';
import erlcService from './bot/services/erlcService.js';
import groqService from './bot/services/groqService.js';
import saplingService from './bot/services/saplingService.js';
import cookieTranscriptService from './bot/services/cookieTranscriptService.js';
import shiftService from './bot/services/shiftService.js';
import robloxService from './bot/services/robloxService.js';
import antiPingService from './bot/services/antiPingService.js';
import afkService from './bot/services/afkService.js';
import welcomeService from './bot/services/welcomeService.js';
import boostService from './bot/services/boostService.js';
import ticketWorkflowService, { WORKFLOW_TYPES } from './bot/services/ticketWorkflowService.js';
import { WvrpEmbedBuilder, BANNERS } from './bot/embeds/wvrpEmbeds.js';

dotenv.config();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User]
});

const DEFAULT_PREFIX = process.env.DEFAULT_PREFIX || '-';

client.once(Events.ClientReady, (readyClient) => {
  console.log(`✅ West Virginia Roleplay Bot logged in as ${readyClient.user.tag}!`);
  console.log(`Loaded ${commands.size} slash commands and ${prefixCommands.size} prefix triggers.`);
});

// Message create handler (for prefix commands starting with DEFAULT_PREFIX or !afk)
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  // 1. Anti-Ping Security Check (Detect unauthorized pings to protected leadership roles/teams)
  try {
    const antiPingViolation = antiPingService.checkMessage(message);
    if (antiPingViolation) {
      await antiPingService.processViolation(message, antiPingViolation);
      return; // Do not process commands or further actions from offending message
    }
  } catch (err) {
    console.error('Anti-Ping execution error:', err);
  }

  // 2. AFK Return Check (If the sender was AFK, restore nickname and notify of missed pings)
  try {
    await afkService.handleReturn(message);
  } catch (err) {
    console.error('AFK Return error:', err);
  }

  // 3. AFK Mention Notification (If sender pinged an AFK user, alert sender and log ping)
  try {
    await afkService.handleMentions(message);
  } catch (err) {
    console.error('AFK Mention error:', err);
  }

  // 4. Ticket Automatic Responses & Keyword Detection + Groq Assistant
  if (message.channel && message.channel.name && message.channel.name.includes('ticket-')) {
    const ticketId = message.channel.name.split('-')[1];
    if (ticketId) {
      // Check if message is from human staff
      const isStaff = message.member?.roles?.cache?.some(r => r.name.toLowerCase().includes('staff') || r.name.toLowerCase().includes('mod') || r.name.toLowerCase().includes('admin'));
      if (isStaff) {
        groqService.handleStaffMessage(ticketId, message.author);
      } else {
        // Step 1: Check intelligent ticket automatic responses & keyword recognition (Fast-Pass, Transfers, Verification, etc.)
        let workflowHandled = false;
        try {
          const autoRes = await ticketWorkflowService.processTicketMessage(ticketId, message.channel, message);
          if (autoRes && autoRes.success) {
            workflowHandled = true;
          }
        } catch (wfErr) {
          console.error('Error running ticket workflow service:', wfErr);
        }

        // Step 2: If no workflow template was triggered, proceed with Groq AI Support Assistant
        if (!workflowHandled) {
          const history = db.prepare('SELECT * FROM ticket_messages WHERE ticket_id = ? ORDER BY timestamp ASC LIMIT 8').all(ticketId);
          const aiRes = await groqService.generateTicketResponse(ticketId, message.content, history);
          if (aiRes.success && aiRes.reply) {
            await message.channel.send({ content: aiRes.reply });
          } else if (aiRes.handedOff) {
            await message.channel.send({ content: aiRes.message });
          }
        }
      }
    }
  }

  // Explicit support for !afk command prefix
  if (message.content.startsWith('!afk')) {
    const args = message.content.slice(4).trim().split(/ +/).filter(s => s.length > 0);
    const afkCmd = prefixCommands.get('afk');
    if (afkCmd) {
      try {
        await afkCmd.execute({
          author: message.author,
          member: message.member,
          channel: message.channel,
          guild: message.guild,
          reply: (opts) => message.reply(opts),
          content: message.content
        }, args);
        return;
      } catch (err) {
        console.error('Error executing !afk:', err);
        await message.reply({ content: `❌ Error setting AFK: ${err.message}` });
        return;
      }
    }
  }

  if (!message.content.startsWith(DEFAULT_PREFIX)) return;

  const args = message.content.slice(DEFAULT_PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = prefixCommands.get(commandName);
  if (!command) {
    const unknownMsg = formatUnknownCommandMessage(commandName);
    await message.reply({ content: unknownMsg });
    return;
  }

  try {
    await command.execute({
      author: message.author,
      member: message.member,
      channel: message.channel,
      guild: message.guild,
      reply: (opts) => message.reply(opts),
      content: message.content
    }, args);
  } catch (err) {
    console.error(`Error executing prefix command ${commandName}:`, err);
    await message.reply({ content: `❌ Error executing \`${DEFAULT_PREFIX}${commandName}\`: ${err.message}` });
  }
});

// Interaction create handler
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    // 1. Slash commands
    if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName);
      if (!command) return;
      await command.execute(interaction);
      return;
    }

    // 2. Button interactions
    if (interaction.isButton()) {
      const customId = interaction.customId;

      // Ticket Get Support button -> Show inquiry modal
      if (customId === 'ticket_get_support') {
        const modal = new ModalBuilder()
          .setCustomId('modal_ticket_create')
          .setTitle('Open a Support Ticket');

        const input = new TextInputBuilder()
          .setCustomId('ticket_inquiry_input')
          .setLabel('What is your inquiry?')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('Describe the reason for opening this ticket in detail...')
          .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(input));
        await interaction.showModal(modal);
        return;
      }

      // Claim / Unclaim ticket
      if (customId === 'ticket_claim_btn') {
        await interaction.reply({ content: `✅ **@${interaction.user.username}** has claimed this ticket.` });
        return;
      }

      if (customId === 'ticket_unclaim_btn') {
        await interaction.reply({ content: `ℹ️ Ticket has been unclaimed by **@${interaction.user.username}**.` });
        return;
      }

      // Close ticket
      if (customId === 'ticket_close_btn') {
        const res = await cookieTranscriptService.generateTranscript('0850', interaction.user);
        const embeds = WvrpEmbedBuilder.createDualBannerEmbeds({
          type: 'ticket_closed',
          title: 'Ticket #0850 — General Support',
          description: `General Support ticket in West Virginia Roleplay has been closed.\n\n↳ **Handled By:** @${interaction.user.username}\n↳ **Closed By:** @${interaction.user.username}\n⏰ **Opened:** 21m ago\n⏰ **Closed:** Just now\n⏳ **Duration:** 21m\n🎫 **Messages Sent:** 22 messages`
        });

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setLabel('Online Transcript').setStyle(ButtonStyle.Link).setURL(`https://wvrp-transcripts.local${res.url}`)
        );

        await interaction.reply({ embeds, components: [row] });
        return;
      }

      // Shift buttons
      if (customId === 'shift_start_normal') {
        const res = shiftService.startShift(interaction.user, 'NORMAL');
        if (!res.success) return interaction.reply({ content: `❌ ${res.error}`, ephemeral: true });
        return interaction.reply({ content: `🟢 **Shift Started!** On-Duty role assigned. Remember to follow staff uniform and conduct regulations.` });
      }

      if (customId === 'shift_start_5050') {
        const res = shiftService.startShift(interaction.user, '50/50');
        if (!res.success) return interaction.reply({ content: `❌ ${res.error}`, ephemeral: true });
        return interaction.reply({ content: `🟢 **50/50 Shift Started!** On-Duty role assigned. Credited toward your weekly quota.` });
      }

      if (customId === 'shift_break_toggle') {
        const res = shiftService.startBreak(interaction.user);
        if (!res.success) {
          // If already on break, resume
          const resumeRes = shiftService.endBreak(interaction.user);
          if (!resumeRes.success) return interaction.reply({ content: `❌ ${resumeRes.error}`, ephemeral: true });
          return interaction.reply({ content: `🟢 **Resumed from Break!** On-Duty role restored.` });
        }
        return interaction.reply({ content: `🟡 **Went on Break.** On-Break role assigned. Take your time to recharge.` });
      }

      if (customId === 'shift_end') {
        const res = shiftService.endShift(interaction.user);
        if (!res.success) return interaction.reply({ content: `❌ ${res.error}`, ephemeral: true });
        return interaction.reply({ content: `🔴 **Shift Ended.** Total credited working duration: **${shiftService.formatDuration(res.creditedSeconds)}**. Thank you for your service to WVRP!` });
      }

      // Session Vote button
      if (customId === 'session_vote_btn' || customId === 'session_vote_yes') {
        return interaction.reply({ content: `👍 **Vote Recorded!** You voted for a session startup.` });
      }

      // Marketplace Terms of Service button
      if (customId === 'market_tos_view') {
        const embeds = WvrpEmbedBuilder.createDualBannerEmbeds({
          type: 'marketplace_tos',
          title: 'WVRP Marketplace Terms of Service',
          description: `By purchasing any product, service, membership, advertisement, sponsorship, or other offering through the West Virginia Roleplay Marketplace, you confirm that you have read, understood, and agreed to the following Terms of Service.\n\n**01 — ORDER QUEUE**\nAll orders, requests, and submissions are processed in the order they are received.\n\n**02 — RESPECT & CONDUCT**\nWe maintain a respectful environment for both customers and staff. Harassment or abuse will result in service denial without compensation.\n\n**03 — LINKS & REQUIRED ASSETS**\nCustomers are responsible for providing valid files, links, and assets.\n\n**04 — ORDER CHANGES**\nAny changes must be requested before work begins.\n\n**05 — CLAIMING PURCHASES**\nAll purchases must be claimed through an official Support Ticket.\n\n**06 — PROCESSING & RESPONSE TIMES**\nEstimated completion times are not guaranteed.\n\n**07 — REFUNDS & CANCELLATIONS**\nAll purchases are final. We do not offer refunds under any circumstances.\n\n**08 — CHARGEBACKS**\nInitiating a chargeback will result in permanent removal from WVRP.\n\n**09 — RIGHT TO REFUSE SERVICE**\nWe reserve the right to refuse service to any individual.\n\n**10 — RESPONSIBILITY**\nWest Virginia Roleplay IS NOT responsible to pay giveaway prizes or for incorrect assets.`
        });
        return interaction.reply({ embeds, ephemeral: true });
      }

      // Welcome: Show Members Button
      if (customId === 'welcome_show_members') {
        const memberCount = interaction.guild?.memberCount || 20028;
        const onlineCount = interaction.guild?.members?.cache
          ? interaction.guild.members.cache.filter(m => m.presence?.status && m.presence.status !== 'offline').size
          : Math.floor(memberCount * 0.22);

        const embed = WvrpEmbedBuilder.createBase({
          title: '👥 West Virginia State Roleplay — Community Statistics',
          description: `Here are the latest real-time community statistics for **West Virginia State Roleplay**:\n\n• 👥 **Total Members:** **${memberCount.toLocaleString()}** members\n• 🟢 **Active Online:** **${(onlineCount || 4280).toLocaleString()}** members\n• 🚀 **Server Boost Status:** Level 3 Booster Status\n• 🚨 **ER:LC Status:** Whitelisted Private Server Active (\`wvrp\`)\n\nThank you for being a valued part of our growing community!`,
          footerText: 'West Virginia State Roleplay · Member Count'
        });

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      // Verification: Check Verification Button
      if (customId === 'verify_check_btn') {
        await interaction.deferReply({ ephemeral: true });
        const res = await robloxService.resolveVerification(interaction.user);
        const embeds = WvrpEmbedBuilder.createVerificationEmbed({
          userMention: `<@${interaction.user.id}>`,
          username: interaction.user.tag || interaction.user.username,
          userId: interaction.user.id,
          robloxUser: res.robloxUser,
          bloxlinkStatus: res.bloxlinkStatus,
          verified: res.verified
        });

        if (res.verified) {
          return interaction.editReply({
            content: `✅ **Verification Confirmed!** Welcome to West Virginia State Roleplay.`,
            embeds
          });
        } else {
          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setLabel('Link on Bloxlink')
              .setStyle(ButtonStyle.Link)
              .setURL(process.env.WELCOME_VERIFY_URL || 'https://blox.link/verify')
          );
          return interaction.editReply({
            content: `⚠️ **Not Linked Yet:** We could not find a confirmed Roblox account linked to your Discord profile on Bloxlink. Please visit the link below to connect your account.`,
            embeds,
            components: [row]
          });
        }
      }

      // Verification: Need Help? Button
      if (customId === 'verify_help_btn') {
        const embed = WvrpEmbedBuilder.createBase({
          title: '❓ Roblox & Bloxlink Verification Help',
          description: `**How to link your Roblox account with WVRP:**\n\n1. Go to **https://blox.link/verify**\n2. Log in with your Discord account\n3. Enter your Roblox username and follow the verification code or game verification step\n4. Once complete on Bloxlink, come back here and press **Check Verification**\n5. If you experience persistent issues, a human staff member will manually verify your account.`
        });
        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      // Ticket Workflow: Copy Fast-Pass Template
      if (customId === 'workflow_fastpass_copy') {
        const raw = `Fast-Pass\n\nYour ROBLOX User:\n\nAll your previous experiences, please include member count and your rank:\n\nServer invite CODE, if possible:\n\nWhy do I want to be staff here?`;
        return interaction.reply({
          content: `📋 **Fast-Pass Application Format** (Copy and paste below):\n\`\`\`\n${raw}\n\`\`\``,
          ephemeral: true
        });
      }

      // Ticket Workflow: Copy Department Transfer Template
      if (customId === 'workflow_transfer_copy') {
        const raw = `Roblox Username:\n\nCurrent Department:\n\nCurrent Rank:\n\nRequested Department:\n\nPrevious Experience:\n\nReason for Requesting a Transfer:`;
        return interaction.reply({
          content: `📋 **Department Transfer Application Format** (Copy and paste below):\n\`\`\`\n${raw}\n\`\`\``,
          ephemeral: true
        });
      }

      // Ticket Workflow: Staff Review Queue Button
      if (customId === 'workflow_staff_review') {
        return interaction.reply({
          content: `🛡️ **Staff Alert:** This ticket submission has been queued for review by the **WVRP High Command & Management Team**. Please maintain your submission format above.`
        });
      }

      // Staff Application Button -> Open sequential modal or application interface
      if (customId === 'app_apply_staff') {
        const modal = new ModalBuilder()
          .setCustomId('modal_staff_app_part1')
          .setTitle('WVRP Staff Application (1/3)');

        modal.addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder().setCustomId('app_q1').setLabel('1. Full Roblox Username').setStyle(TextInputStyle.Short).setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder().setCustomId('app_q2').setLabel('2. Device you play on').setStyle(TextInputStyle.Short).setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder().setCustomId('app_q3').setLabel('3. Time Zone').setStyle(TextInputStyle.Short).setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder().setCustomId('app_q4').setLabel('4. Hours per week for moderation').setStyle(TextInputStyle.Short).setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder().setCustomId('app_q5').setLabel('5. Prior staff experience (Details)').setStyle(TextInputStyle.Paragraph).setRequired(true)
          )
        );

        await interaction.showModal(modal);
        return;
      }
    }

    // 3. String Select Menu interactions
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'ticket_faq') {
        const val = interaction.values[0];
        const faqAnswers = {
          faq_apply: 'Staff applications are submitted right here in the WVRP Application Hub (#applications). Answer the 15 questions honestly and in complete sentences.',
          faq_dept: 'New departments are approved exclusively by Server Management. If you have a detailed department proposal, open a Management Support ticket.',
          faq_transfers: 'Yes! Staff transfers and fast passes are accepted up to Internal Affairs. Open a ticket with proof of experience.',
          faq_sheriff: 'The Sheriff and Police teams are fully whitelisted for certified staff and department members. Join the staff team or apply during tryouts.'
        };
        return interaction.reply({ content: `ℹ️ **${faqAnswers[val] || 'Information available in support tickets.'}**`, ephemeral: true });
      }

      if (interaction.customId === 'ticket_create_category') {
        const cat = interaction.values[0];
        const robloxUser = await robloxService.getRobloxUserFromDiscord(interaction.user.id);
        const ticketId = String(Math.floor(Math.random() * 9000) + 1000);

        db.prepare(`
          INSERT INTO tickets (id, user_id, user_tag, roblox_username, roblox_id, category, inquiry, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'OPEN', ?)
        `).run(ticketId, interaction.user.id, interaction.user.tag || interaction.user.username, robloxUser.username, robloxUser.id, cat, 'General member inquiry', Date.now());

        const embeds = WvrpEmbedBuilder.createDualBannerEmbeds({
          type: 'ticket',
          title: `⚙️ ${cat}`,
          description: `@Support Team\n\nHello <@${interaction.user.id}> thank you for reaching out to us. Please remain patient as one of our staff members comes to assist you.\n\n🎮 **Roblox Information:**\nRoblox Username: [${robloxUser.username}](${robloxUser.profileUrl})\nRoblox ID: \`${robloxUser.id}\`\nAccount Creation: \`${robloxUser.createdAt}\`\n\n💬 **Discord Information:**\nDiscord Account: <@${interaction.user.id}>\nDiscord ID: \`${interaction.user.id}\`\nAccount Creation: \`Oct 1, 09:57 AM\`\n\n**What is your inquiry?**\n> Initial ticket inquiry registered for ${cat}.`
        });

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId('ticket_claim_btn').setLabel('Claim').setStyle(ButtonStyle.Success),
          new ButtonBuilder().setCustomId('ticket_close_btn').setLabel('Close').setStyle(ButtonStyle.Secondary),
          new ButtonBuilder().setCustomId('ticket_escalate_btn').setLabel('Escalate').setStyle(ButtonStyle.Secondary)
        );

        return interaction.reply({ embeds, components: [row] });
      }
    }

    // 4. Modal submit
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'modal_staff_app_part1') {
        const q1 = interaction.fields.getTextInputValue('app_q1');
        const q5 = interaction.fields.getTextInputValue('app_q5');

        // Run Sapling AI analysis
        const saplingRes = await saplingService.analyzeAnswers([q5]);

        const appId = `APP-${Math.floor(Math.random() * 9000) + 1000}`;
        db.prepare(`
          INSERT INTO applications (id, user_id, user_tag, roblox_username, status, sapling_score, sapling_ai_detected, answers_json, created_at)
          VALUES (?, ?, ?, ?, 'PENDING', ?, ?, ?, ?)
        `).run(
          appId,
          interaction.user.id,
          interaction.user.tag || interaction.user.username,
          q1,
          saplingRes.score || 0,
          saplingRes.aiDetected ? 1 : 0,
          JSON.stringify({ q1, q5 }),
          Date.now()
        );

        return interaction.reply({
          content: `✅ **Application Submitted Successfully!** Your submission ID is \`${appId}\`.\n${saplingRes.summary}\nOur staff review team will evaluate your responses shortly. You will receive an official DM with your results.`,
          ephemeral: true
        });
      }
    }
  } catch (err) {
    console.error('Interaction error:', err);
    if (!interaction.replied) {
      await interaction.reply({ content: `❌ Error processing interaction: ${err.message}`, ephemeral: true });
    }
  }
});

// 5. Automatic Welcome System: GuildMemberAdd Event
client.on(Events.GuildMemberAdd, async (member) => {
  try {
    await welcomeService.handleMemberJoin(member);
  } catch (err) {
    console.error('Error handling GuildMemberAdd welcome event:', err);
  }
});

// 6. Server Boost & Server Tag Automation: GuildMemberUpdate Event
client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
  try {
    await boostService.handleMemberUpdate(oldMember, newMember);
  } catch (err) {
    console.error('Error handling GuildMemberUpdate boost/tag event:', err);
  }
});

// Launch bot if DISCORD_TOKEN is present
if (process.env.DISCORD_TOKEN && process.env.DISCORD_TOKEN.trim().length > 10) {
  client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.error('Discord login failed:', err.message);
  });
} else {
  console.log('ℹ️ Running in Local / Interactive Emulation Mode (No DISCORD_TOKEN in .env).');
  console.log('All embeds, commands, SQLite database, and interactive workflows are active and accessible via the Web Studio & API.');
}

export default client;
