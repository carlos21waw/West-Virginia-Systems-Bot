import db from '../../../WVRP/bot/database/index.js';
import { WvrpEmbedBuilder, BANNERS } from '../../../WVRP/bot/embeds/wvrpEmbeds.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js';

export default {
  name: 'modpanel',
  description: 'Open the West Virginia Staff & Moderator Operations Dashboard',
  category: 'Staff',
  permission: 'STAFF',
  aliases: ['modpanel', 'mod-panel', 'staffpanel'],
  usage: '-modpanel or /modpanel',
  slashData: new SlashCommandBuilder()
    .setName('modpanel')
    .setDescription('Open the WVRP Staff Moderator Operations Panel'),
  async execute(context) {
    const activeShiftsCount = db.prepare("SELECT COUNT(*) as count FROM staff_active_status WHERE status = 'ON_SHIFT'").get().count;
    const openTicketsCount = db.prepare("SELECT COUNT(*) as count FROM tickets WHERE status = 'OPEN'").get().count;
    const pendingAppsCount = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'PENDING'").get().count;
    const totalInfractions = db.prepare("SELECT COUNT(*) as count FROM infractions WHERE status = 'ACTIVE'").get().count;

    const embeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'staff_activity',
      title: '🛡️ WVRP Moderator Operations Control Panel',
      description: `Welcome to the staff command console. Use the interactive controls below to monitor live operations, manage staff duties, review pending queues, and take moderation action.\n\n📊 **Live Staff Status:**\n• **Active Staff on Duty:** \`${activeShiftsCount} Staff Members\`\n• **Open Support Tickets:** \`${openTicketsCount} Tickets\`\n• **Pending Trainee Applications:** \`${pendingAppsCount} Applications\`\n• **Active Infractions:** \`${totalInfractions} Infractions\`\n\n📌 **Quick Actions:** Use the dedicated buttons below to inspect queues or navigate to specialized management hubs.`
    });

    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('mod_active_shifts').setLabel('Active Shifts').setStyle(ButtonStyle.Success).setEmoji('🟢'),
      new ButtonBuilder().setCustomId('mod_open_tickets').setLabel('Open Tickets').setStyle(ButtonStyle.Primary).setEmoji('🎫'),
      new ButtonBuilder().setCustomId('mod_app_hub').setLabel('Review Applications').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
      new ButtonBuilder().setCustomId('mod_infraction_btn').setLabel('Infractions Queue').setStyle(ButtonStyle.Danger).setEmoji('⚖️')
    );

    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('mod_antiping_logs').setLabel('Anti-Ping Logs').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
      new ButtonBuilder().setCustomId('mod_quota_audit').setLabel('Quota Audit').setStyle(ButtonStyle.Secondary).setEmoji('📊'),
      new ButtonBuilder().setLabel('Web Dashboard').setStyle(ButtonStyle.Link).setURL('https://wvrp-dashboard.local').setEmoji('🌐')
    );

    return context.reply({ embeds, components: [row1, row2] });
  }
};
