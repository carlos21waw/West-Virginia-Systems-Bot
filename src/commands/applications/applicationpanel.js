import { WvrpEmbedBuilder } from '../../../WVRP/bot/embeds/wvrpEmbeds.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  PermissionFlagsBits
} from 'discord.js';

export default {
  name: 'applicationpanel',
  description: 'Post the West Virginia Application Hub panel',
  category: 'Applications',
  permission: 'ADMIN',
  aliases: ['applicationpanel'],
  usage: '-applicationpanel or /applicationpanel',
  slashData: new SlashCommandBuilder()
    .setName('applicationpanel')
    .setDescription('Post the West Virginia Application Hub panel')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(context) {
    const embeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'application',
      title: 'Welcome to the WVRP Application Hub',
      description: `In this channel you can find all of our applications to apply to work for WVRP! Before applying ensure to read the rules and requirements. Good luck to all applicants!\n\n⏱ **Rules & Requirements**\n• Must be over 13 years old. (WVRP will not require you to provide your age)\n• Must answer in full detail and full sentences.\n• The use of Artificial Intelligence or external help is **not** allowed.\n• Must answer with good SPaG (Spelling and Grammar)\n• Applicants should not ask for applications to be read.\n• Must not have a bad history within WVRP or any PRC server.`
    });

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('app_apply_staff').setLabel('>> Staff Application').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('app_apply_media').setLabel('>> Media Application').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('app_apply_cet').setLabel('>> CET Application').setStyle(ButtonStyle.Secondary)
    );

    return context.reply({ embeds, components: [buttons] });
  }
};
