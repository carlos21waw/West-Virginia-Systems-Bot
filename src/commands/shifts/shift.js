import shiftService from '../../../WVRP/bot/services/shiftService.js';
import { WvrpEmbedBuilder } from '../../../WVRP/bot/embeds/wvrpEmbeds.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder
} from 'discord.js';

export default {
  name: 'shift',
  description: 'View active staff shifts and leaderboards',
  category: 'Shifts',
  permission: 'STAFF',
  aliases: ['shift', 'shifts'],
  usage: '-shift <active|online>',
  subcommands: ['active', 'online'],
  slashData: new SlashCommandBuilder()
    .setName('shift')
    .setDescription('Staff shift tracking')
    .addSubcommand(sub => sub.setName('active').setDescription('Display the active-shifts panel'))
    .addSubcommand(sub => sub.setName('online').setDescription('Display staff currently on shift')),
  async execute(context) {
    const data = shiftService.getActiveShifts();
    const stats = shiftService.getStaffWeeklyStats((context.user || context.author).id);

    let desc = `${data.onShiftCount} on shift · ${data.onBreakCount} on break\n\n`;
    if (data.list.length === 0) {
      desc += '*No staff members are currently on shift.*';
    } else {
      desc += data.list.map(s => {
        const icon = s.status === 'ON_SHIFT' ? '🟢' : '🟡';
        return `${icon} **@${s.staffTag}** · **${s.status === 'ON_SHIFT' ? 'On Shift' : 'On Break'}**${s.shiftType === '50/50' ? ' · 50/50' : ''}\n> ⏱ **${s.elapsedFormatted}** on shift · started ${s.startedAgo} · ${s.breakCount} breaks · ${s.moderationCount} moderations`;
      }).join('\n\n');
    }

    const embeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'staff_activity',
      title: 'Active Shifts',
      description: desc
    });

    const shiftMgmtEmbed = WvrpEmbedBuilder.createBase({
      title: 'Shift Management',
      description: `🪪 **Staff Member:** <@${(context.user || context.author).id}>\n📌 **Status:** Off Duty\n📅 **This Week:** ${stats.totalFormatted} of ${stats.quotaFormatted} (${stats.percent}%) · ${stats.shiftCount} shifts\n📈 **Week Resets:** in 17 hours`
    });

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('shift_start_normal').setLabel('Start Shift').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('shift_start_5050').setLabel('Start 50/50').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('shift_break_toggle').setLabel('Break').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('shift_end').setLabel('End Shift').setStyle(ButtonStyle.Danger)
    );

    return context.reply({ embeds: [...embeds, shiftMgmtEmbed], components: [buttons] });
  }
};
