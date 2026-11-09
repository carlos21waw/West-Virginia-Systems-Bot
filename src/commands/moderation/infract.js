import db from '../../../WVRP/bot/database/index.js';
import { WvrpEmbedBuilder } from '../../../WVRP/bot/embeds/wvrpEmbeds.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder
} from 'discord.js';

export default {
  name: 'infract',
  description: 'Issue an official staff infraction (INF-0000)',
  category: 'Moderation',
  permission: 'HIGH_RANK',
  aliases: ['infract'],
  usage: '-infract <@user> <punishment> <reason> [appealable]',
  slashData: new SlashCommandBuilder()
    .setName('infract')
    .setDescription('Issue an official staff infraction')
    .addUserOption(opt => opt.setName('user').setDescription('Staff member to infract').setRequired(true))
    .addStringOption(opt => opt.setName('punishment').setDescription('Punishment type').setRequired(true).addChoices(
      { name: 'Verbal Warning', value: 'Verbal Warning' },
      { name: 'Official Warning', value: 'Official Warning' },
      { name: 'Strike 1', value: 'Strike 1' },
      { name: 'Strike 2', value: 'Strike 2' },
      { name: 'Suspension', value: 'Suspension' },
      { name: 'Termination', value: 'Termination' }
    ))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for infraction').setRequired(true))
    .addBooleanOption(opt => opt.setName('appealable').setDescription('Whether this infraction is appealable')),
  async execute(context) {
    const user = context.options?.getUser?.('user') || { id: '1025813762684502168', username: 'Dm0ney_4u', tag: 'Dm0ney_4u' };
    const punishment = context.options?.getString?.('punishment') || 'Verbal Warning';
    const reason = context.options?.getString?.('reason') || 'Please dont dump staff cars in the river, that is considered trolling and such and is unprofessional.';
    const appealable = context.options?.getBoolean?.('appealable') ?? true;
    const issuer = context.user || context.author;

    const count = db.prepare('SELECT COUNT(*) as count FROM infractions').get().count;
    const infId = `INF-${String(count + 314).padStart(4, '0')}`;

    db.prepare(`
      INSERT INTO infractions (id, staff_id, staff_tag, punishment, reason, issuer_id, issuer_tag, appealable, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?)
    `).run(infId, user.id, user.tag || user.username, punishment, reason, issuer.id, issuer.tag || issuer.username, appealable ? 1 : 0, Date.now());

    const embeds = WvrpEmbedBuilder.createInfractionEmbed({
      staffMention: `<@${user.id}>`,
      punishment,
      reason,
      issuerMention: `<@${issuer.id}>`,
      infractionId: infId,
      appealable
    });

    const appealButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`infraction_appeal_${infId}`)
        .setLabel('Appeal Infraction')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(!appealable)
    );

    return context.reply({ embeds, components: [appealButton] });
  }
};
