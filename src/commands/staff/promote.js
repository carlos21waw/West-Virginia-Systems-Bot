import db from '../../../WVRP/bot/database/index.js';
import { WvrpEmbedBuilder } from '../../../WVRP/bot/embeds/wvrpEmbeds.js';
import { SlashCommandBuilder } from 'discord.js';

export default {
  name: 'promote',
  description: 'Promote a staff member to a new rank (PRO-0000)',
  category: 'Staff',
  permission: 'HIGH_RANK',
  aliases: ['promote'],
  usage: '-promote <@user> <rank> <reason>',
  slashData: new SlashCommandBuilder()
    .setName('promote')
    .setDescription('Promote a staff member')
    .addUserOption(opt => opt.setName('user').setDescription('Staff member').setRequired(true))
    .addStringOption(opt => opt.setName('rank').setDescription('New Rank').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Promotion Reason').setRequired(true)),
  async execute(context) {
    const user = context.options?.getUser?.('user') || { id: '987654321', username: 'taranbatmann', tag: 'taranbatmann' };
    const rank = context.options?.getString?.('rank') || 'Trial Administrator';
    const reason = context.options?.getString?.('reason') || 'Fast Pass';
    const issuer = context.user || context.author;

    const count = db.prepare('SELECT COUNT(*) as count FROM promotions').get().count;
    const promoId = `PRO-${String(count + 129).padStart(4, '0')}`;

    db.prepare(`
      INSERT INTO promotions (id, staff_id, staff_tag, new_rank, reason, issuer_id, issuer_tag, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(promoId, user.id, user.tag || user.username, rank, reason, issuer.id, issuer.tag || issuer.username, Date.now());

    const embeds = WvrpEmbedBuilder.createPromotionEmbed({
      staffMention: `<@${user.id}>`,
      newRank: rank,
      reason,
      issuerMention: `<@${issuer.id}>`,
      promotionId: promoId
    });

    return context.reply({ embeds });
  }
};
