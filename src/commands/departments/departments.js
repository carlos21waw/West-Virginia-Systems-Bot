import { WvrpEmbedBuilder } from '../../../WVRP/bot/embeds/wvrpEmbeds.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder
} from 'discord.js';

export default {
  name: 'departments',
  description: 'Post the West Virginia Whitelisted Departments panel',
  category: 'Departments',
  permission: 'ADMIN',
  aliases: ['departments'],
  usage: '-departments or /departments',
  slashData: new SlashCommandBuilder().setName('departments').setDescription('Post the West Virginia Whitelisted Departments panel'),
  async execute(context) {
    const embeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'departments',
      title: 'West Virginia Departments',
      description: `Explore the various Departments within West Virginia Roleplay, each offering a unique role and experience within our community. Our departments provide opportunities to get involved, serve the community, and create immersive roleplay experiences. Find your place, build your career, and become part of something bigger.\n\n• One primary department at a time — Auxiliary departments are unlimited.\n• Senior High Rank (SHR) — limited to one of Primary or auxiliary.\n\n⭐ **West Virginia State Police (WVSP)** — Primary Law Enforcement\n⭐ **Kanawha County Sheriff\'s Office (KCSO)** — County Patrol & Investigations\n🌲 **WV Division of Forestry** — Conservation & Rural Operations\n🚑 **Kanawha Valley Fire & EMS** — Emergency Medical & Fire Rescue\n💼 **Manfredi Family** — Certified Whitelisted Roleplay Organization`
    });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('dept_wvsp').setLabel('WV State Police').setStyle(ButtonStyle.Secondary).setEmoji('⭐'),
      new ButtonBuilder().setCustomId('dept_kcso').setLabel('Kanawha County SO').setStyle(ButtonStyle.Secondary).setEmoji('⭐'),
      new ButtonBuilder().setCustomId('dept_fire').setLabel('Fire & EMS').setStyle(ButtonStyle.Secondary).setEmoji('🚑'),
      new ButtonBuilder().setCustomId('dept_manfredi').setLabel('Manfredi Family').setStyle(ButtonStyle.Secondary).setEmoji('💼')
    );

    return context.reply({ embeds, components: [row] });
  }
};
