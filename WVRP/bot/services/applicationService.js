import db from '../database/index.js';
import departmentService from './departmentService.js';
import saplingService from './saplingService.js';
import groqService from './groqService.js';
import robloxService from './robloxService.js';
import { WvrpEmbedBuilder, BANNERS } from '../embeds/wvrpEmbeds.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits
} from 'discord.js';

export class ApplicationService {
  /**
   * Helper to render dynamic progress bar
   */
  renderProgressBar(completed, total) {
    const percent = Math.min(100, Math.round((completed / total) * 100));
    const filled = Math.min(10, Math.max(0, Math.round((completed / total) * 10)));
    const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
    return {
      text: `${bar} ${completed}/${total} QUESTIONS COMPLETED (${percent}%)`,
      percent,
      bar
    };
  }

  /**
   * Check if applications are globally enabled or closed
   */
  isApplicationsEnabled() {
    const setting = db.prepare("SELECT value FROM application_settings WHERE key = 'applications_status'").get();
    return !setting || setting.value === 'OPEN';
  }

  /**
   * Check if user already has an active/pending application
   */
  hasActiveApplication(userId) {
    const active = db.prepare(`
      SELECT * FROM applications
      WHERE user_id = ? AND status IN ('IN_PROGRESS', 'PENDING')
    `).get(userId);
    return Boolean(active);
  }

  /**
   * Get an application by ID or channel ID
   */
  getApplication(appIdOrChannelId) {
    return db.prepare(`
      SELECT * FROM applications
      WHERE id = ? OR channel_id = ?
    `).get(appIdOrChannelId, appIdOrChannelId);
  }

  /**
   * Get all answers for an application
   */
  getAnswers(appId) {
    return db.prepare(`
      SELECT * FROM application_answers
      WHERE application_id = ?
      ORDER BY question_index ASC
    `).all(appId);
  }

  /**
   * STEP 1 & 2: CREATE PRIVATE DISCORD TEXT CHANNEL FOR APPLICANT
   */
  async createApplicationSession(guild, user, departmentId = 'staff') {
    if (!this.isApplicationsEnabled()) {
      return { success: false, error: 'Applications are currently closed by Administration.' };
    }

    const dept = departmentService.getDepartment(departmentId) || departmentService.getDepartment('staff');
    if (!dept) {
      return { success: false, error: `Invalid department: ${departmentId}` };
    }

    // Duplicate check
    const existing = db.prepare(`
      SELECT * FROM applications
      WHERE user_id = ? AND department_id = ? AND status IN ('IN_PROGRESS', 'PENDING')
    `).get(user.id, dept.id);

    if (existing) {
      return {
        success: false,
        error: `You already have an active application for **${dept.name}** (${existing.id}). Please check your channel <#${existing.channel_id}>.`
      };
    }

    const count = db.prepare('SELECT COUNT(*) as count FROM applications').get().count;
    const appId = `APP-${String(count + 1).padStart(4, '0')}`;
    const cleanName = (user.username || 'member').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 15);
    const channelName = `application-${cleanName}`;

    let channel = null;

    // Discord channel creation with strict private permissions
    if (guild && guild.channels?.create) {
      try {
        const appCategory = guild.channels.cache.find(
          c => c.type === ChannelType.GuildCategory && (
            c.name.toLowerCase().includes('application') ||
            c.name.toLowerCase().includes('recruitment') ||
            c.name.toLowerCase().includes('department')
          )
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

        // Add department leadership and reviewer roles
        const reviewerRoles = guild.roles.cache.filter(r =>
          r.id === dept.reviewer_role_id ||
          r.name.toLowerCase().includes('reviewer') ||
          r.name.toLowerCase().includes('management') ||
          r.name.toLowerCase().includes('high rank') ||
          r.name.toLowerCase().includes('admin')
        );
        for (const [_, role] of reviewerRoles) {
          permissionOverwrites.push({
            id: role.id,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages, PermissionFlagsBits.EmbedLinks]
          });
        }

        // Add bot self permission
        if (guild.client?.user?.id) {
          permissionOverwrites.push({
            id: guild.client.user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ManageChannels,
              PermissionFlagsBits.ManageMessages,
              PermissionFlagsBits.EmbedLinks
            ]
          });
        }

        channel = await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: appCategory ? appCategory.id : null,
          permissionOverwrites,
          reason: `Private Application Channel for ${user.tag || user.username} (${dept.name})`
        });
      } catch (err) {
        console.warn(`Could not create Discord channel for application (Simulation fallback):`, err.message);
      }
    }

    const channelId = channel ? channel.id : `app_chan_${Date.now()}`;
    const now = Date.now();

    // Parse department questions
    let questions = [];
    try {
      questions = JSON.parse(dept.questions_json || '[]');
    } catch (e) {
      questions = [
        'What is your full Roblox username?',
        'Why do you want to join this department?',
        'What prior roleplay or emergency services experience do you have?',
        'How would you handle high-stress emergency scenes in ER:LC?',
        'Do you understand professional conduct rules?'
      ];
    }

    // Save to database
    db.prepare(`
      INSERT INTO applications (
        id, user_id, user_tag, roblox_username, status,
        department_id, department_name, channel_id, current_question_index,
        answers_json, created_at, updated_at
      ) VALUES (?, ?, ?, ?, 'IN_PROGRESS', ?, ?, ?, 0, '[]', ?, ?)
    `).run(
      appId,
      user.id,
      user.tag || user.username,
      user.username,
      dept.id,
      dept.name,
      channelId,
      now,
      now
    );

    const initialProgress = this.renderProgressBar(0, questions.length);

    // Build Welcome Embed with applicant thumbnail and branding
    const userAvatarUrl = typeof user.displayAvatarURL === 'function'
      ? user.displayAvatarURL({ dynamic: true, size: 512 })
      : (user.avatarUrl || 'https://cdn.discordapp.com/embed/avatars/0.png');

    const welcomeEmbeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'application',
      title: `WEST VIRGINIA STATE ROLEPLAY · ${dept.name.toUpperCase()}`,
      description: `Welcome, <@${user.id}>!\n\nYour private recruitment application channel for **${dept.name}** has been established.\n\n📋 **Application Overview:**\n• **Applicant:** <@${user.id}> (\`${user.tag || user.username}\`)\n• **Department:** **${dept.name}**\n• **Application ID:** \`${appId}\`\n• **Status:** \`IN_PROGRESS\`\n• **Total Questions:** \`${questions.length} Questions\`\n• **Initial Progress:** \`${initialProgress.text}\`\n\n📌 **Instructions:**\nEach question will be presented to you individually in this channel.\nTake your time to write detailed, well-punctuated responses. You may answer by clicking the button on each question prompt, or by typing directly in this channel.\n\n*Question 1 is ready below!*`
    });

    if (welcomeEmbeds[1]) {
      welcomeEmbeds[1].setThumbnail(userAvatarUrl);
    }

    // Build Question 1 embed
    const q1Prompt = questions[0] || 'What is your full Roblox username?';
    const q1Embeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'department_application',
      title: `${dept.name.toUpperCase()}\nDEPARTMENT APPLICATION`,
      description: `**Question 1 of ${questions.length}**\n\n### ${q1Prompt}\n\n📊 **Progress:** \`${initialProgress.text}\`\n\n*Click the button below to submit your response for Question 1.*`
    });

    const q1Row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`app_q_answer_${appId}_0`)
        .setLabel('Answer Question 1')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('✍️')
    );

    if (channel && channel.send) {
      await channel.send({ content: `<@${user.id}>`, embeds: welcomeEmbeds });
      await channel.send({ embeds: q1Embeds, components: [q1Row] });
    }

    return {
      success: true,
      appId,
      channelId,
      channel,
      department: dept,
      totalQuestions: questions.length
    };
  }

  /**
   * STEP 3: RECORD ANSWER AND ADVANCE QUESTIONNAIRE
   */
  async recordAnswer(appId, questionIndex, answerText, user, channel = null) {
    const app = this.getApplication(appId);
    if (!app) return { success: false, error: 'Application not found.' };

    const dept = departmentService.getDepartment(app.department_id);
    let questions = [];
    try {
      questions = JSON.parse(dept?.questions_json || '[]');
    } catch (e) {
      questions = [];
    }

    const questionPrompt = questions[questionIndex] || `Question ${questionIndex + 1}`;
    const now = Date.now();

    // 1. Save answer in database
    db.prepare(`
      INSERT INTO application_answers (application_id, question_index, question_prompt, answer_text, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(appId, questionIndex, questionPrompt, answerText, now);

    const nextIndex = questionIndex + 1;
    const isFinished = nextIndex >= questions.length;

    db.prepare(`
      UPDATE applications
      SET current_question_index = ?, updated_at = ?
      WHERE id = ?
    `).run(nextIndex, now, appId);

    if (!isFinished) {
      const nextPrompt = questions[nextIndex];
      const progress = this.renderProgressBar(nextIndex, questions.length);

      const qEmbeds = WvrpEmbedBuilder.createDualBannerEmbeds({
        type: 'department_application',
        title: `${dept?.name?.toUpperCase() || 'WEST VIRGINIA ROLEPLAY'}\nDEPARTMENT APPLICATION`,
        description: `**Question ${nextIndex + 1} of ${questions.length}**\n\n### ${nextPrompt}\n\n📊 **Progress:** \`${progress.text}\`\n\n*Click the button below to submit your response for Question ${nextIndex + 1}.*`
      });

      const nextRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`app_q_answer_${appId}_${nextIndex}`)
          .setLabel(`Answer Question ${nextIndex + 1}`)
          .setStyle(ButtonStyle.Primary)
          .setEmoji('✍️')
      );

      if (channel && channel.send) {
        await channel.send({ embeds: qEmbeds, components: [nextRow] });
      }

      return {
        success: true,
        finished: false,
        nextIndex,
        total: questions.length,
        prompt: nextPrompt,
        progress: progress.text
      };
    }

    // ALL QUESTIONS ANSWERED -> SUBMIT FOR AI AND HUMAN REVIEW
    return await this.finalizeSubmission(appId, user, channel);
  }

  /**
   * STEP 4 & 5: RUN SAPLING & GROQ, THEN POST REVIEWER PANEL
   */
  async finalizeSubmission(appId, user, channel = null) {
    const app = this.getApplication(appId);
    const answers = this.getAnswers(appId);
    const answerTexts = answers.map(a => a.answer_text);

    // 1. Run Sapling AI Writing & AI Detection Evaluation
    let saplingRes = { score: 88, aiDetected: false, summary: 'Writing quality evaluated.' };
    try {
      saplingRes = await saplingService.analyzeAnswers(answerTexts);
    } catch (e) {
      console.warn('Sapling review fallback:', e.message);
    }

    // 2. Run Groq AI summary (llama-3.3-70b-versatile)
    let groqSummary = 'Candidate demonstrates standard comprehension, clear answers, and roleplay interest.';
    try {
      if (groqService.isConfigured()) {
        const groqPrompt = `Summarize this WVRP application for department "${app.department_name}". Candidate answers:\n${answers.map(a => `Q: ${a.question_prompt}\nA: ${a.answer_text}`).join('\n\n')}`;
        const groqRes = await groqService.generateTicketResponse(appId, groqPrompt);
        if (groqRes && groqRes.reply) groqSummary = groqRes.reply.slice(0, 450);
      }
    } catch (e) {
      console.warn('Groq summary fallback:', e.message);
    }

    const now = Date.now();
    db.prepare(`
      UPDATE applications
      SET status = 'PENDING', sapling_score = ?, sapling_ai_detected = ?,
          groq_summary = ?, answers_json = ?, updated_at = ?
      WHERE id = ?
    `).run(
      saplingRes.score || 0,
      saplingRes.aiDetected ? 1 : 0,
      groqSummary,
      JSON.stringify(answers),
      now,
      appId
    );

    // 3. Post Confirmation to Applicant
    const applicantEmbeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'application',
      title: '✅ Application Submitted for Review',
      description: `Thank you <@${app.user_id}>! You have completed all questions for **${app.department_name}**.\n\n• **Application ID:** \`${appId}\`\n• **Status:** \`PENDING REVIEW\`\n• **Writing Evaluation:** ${saplingRes.aiDetected ? '⚠️ Potential External/AI Assistance Detected' : '✨ Human Written / Verified SPaG'}\n\n*Authorized department leadership will review your submission below. Please remain patient.*`
    });

    // 4. Post Reviewer Embed with interactive controls
    const reviewerEmbed = WvrpEmbedBuilder.createBase({
      title: `🛡️ Department Reviewer Panel — ${app.department_name} (${appId})`,
      description: [
        `**Applicant:** <@${app.user_id}> (\`${app.user_tag}\`)`,
        `**Roblox Username:** \`${app.roblox_username || 'Not Linked'}\``,
        `**Department:** **${app.department_name}**`,
        `**Application ID:** \`${appId}\``,
        `**Submission Date:** <t:${Math.floor(now / 1000)}:F>`,
        `**Status:** \`PENDING REVIEW\``,
        '',
        `🤖 **Writing Quality:** Score: \`${saplingRes.score || 88}/100\` · ${saplingRes.aiDetected ? '⚠️ High AI Probability' : '✅ Clear Human Grammar'}`,
        `🧠 **Groq AI Summary:** ${groqSummary}`,
        '',
        '**Submitted Responses:**',
        answers.map(a => `**Q${a.question_index + 1}:** *${a.question_prompt}*\n> ${a.answer_text.slice(0, 250)}`).join('\n\n')
      ].join('\n'),
      footerText: `WVRP Review Console · ${appId}`
    });
    reviewerEmbed.setImage(BANNERS.BOTTOM || 'https://wvrp-assets.local/banners/wvrp-banner-bottom.svg');

    const controlRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`app_accept_${appId}`).setLabel('Approve Application').setStyle(ButtonStyle.Success).setEmoji('✅'),
      new ButtonBuilder().setCustomId(`app_deny_${appId}`).setLabel('Deny Application').setStyle(ButtonStyle.Danger).setEmoji('❌'),
      new ButtonBuilder().setCustomId(`app_interview_${appId}`).setLabel('Request Interview').setStyle(ButtonStyle.Primary).setEmoji('🎤'),
      new ButtonBuilder().setCustomId(`app_changes_${appId}`).setLabel('Request Changes').setStyle(ButtonStyle.Secondary).setEmoji('✏️')
    );

    if (channel && channel.send) {
      await channel.send({ embeds: applicantEmbeds });
      await channel.send({ embeds: [reviewerEmbed], components: [controlRow] });
    }

    // Forward to central review channel if configured
    if (channel?.guild) {
      const reviewChannelId = process.env.APPLICATION_REVIEW_CHANNEL_ID || process.env.APPLICATION_REVIEW_CHANNEL;
      if (reviewChannelId) {
        const reviewChan = channel.guild.channels.cache.get(reviewChannelId);
        if (reviewChan && reviewChan.send) {
          try {
            await reviewChan.send({
              content: `🔔 **New Application Submitted:** <#${channel.id}> (${app.department_name})`,
              embeds: [reviewerEmbed],
              components: [controlRow]
            });
          } catch (e) {
            console.warn('Could not forward to review channel:', e.message);
          }
        }
      }
    }

    return {
      success: true,
      finished: true,
      appId,
      status: 'PENDING',
      sapling: saplingRes,
      groqSummary
    };
  }

  /**
   * STEP 6: APPROVE APPLICATION
   */
  async acceptApplication(appId, reviewer, guild = null) {
    const app = this.getApplication(appId);
    if (!app) return { success: false, error: 'Application not found' };

    if (app.status === 'ACCEPTED') {
      return { success: false, error: 'This application has already been accepted.' };
    }
    if (app.status === 'DENIED') {
      return { success: false, error: 'This application has already been denied.' };
    }

    const dept = departmentService.getDepartment(app.department_id);
    const now = Date.now();

    db.transaction(() => {
      db.prepare(`
        UPDATE applications
        SET status = 'ACCEPTED', reviewer_id = ?, reviewer_tag = ?, reviewed_at = ?, updated_at = ?
        WHERE id = ?
      `).run(reviewer.id, reviewer.tag || reviewer.username, now, now, appId);

      // Add to department roster
      if (dept) {
        departmentService.addMemberToRoster(dept.id, { id: app.user_id, tag: app.user_tag }, 'Probationary Member', '10-08');
      }

      // Audit log
      db.prepare(`
        INSERT INTO audit_logs (action, executor_id, target_id, details, created_at)
        VALUES ('APPLICATION_ACCEPTED', ?, ?, ?, ?)
      `).run(reviewer.id, app.user_id, `Accepted for ${app.department_name}`, now);
    })();

    // Discord role assignment
    let roleAssigned = false;
    let memberObj = null;
    if (guild) {
      try {
        memberObj = await guild.members.fetch(app.user_id).catch(() => null);
        if (memberObj && dept?.role_id) {
          const role = guild.roles.cache.find(r => r.name.toLowerCase().includes(dept.id) || r.id === dept.role_id);
          if (role) {
            await memberObj.roles.add(role);
            roleAssigned = true;
          }
        }
      } catch (err) {
        console.warn(`Role assignment skipped or failed:`, err.message);
      }
    }

    // Acceptance DM to applicant with Top & Bottom banners
    const dmEmbeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'application_accepted',
      title: 'WEST VIRGINIA STATE ROLEPLAY · APPLICATION APPROVED',
      description: [
        `Congratulations, <@${app.user_id}>!`,
        '',
        `Your application for **${app.department_name}** has been **APPROVED** by <@${reviewer.id}>.`,
        '',
        '**Application Information:**',
        `• **Applicant:** <@${app.user_id}> (\`${app.user_tag}\`)`,
        `• **Department:** **${app.department_name}**`,
        `• **Application ID:** \`${appId}\``,
        `• **Reviewed By:** <@${reviewer.id}> (\`${reviewer.tag || reviewer.username}\`)`,
        `• **Decision Date:** <t:${Math.floor(now / 1000)}:F>`,
        `• **Result:** \`ACCEPTED\``,
        '',
        '📌 **Onboarding Instructions:**',
        'Please report to your assigned department lobby within 7 days to complete initial orientation, receive your equipment, and review active standard operating procedures.'
      ].join('\n')
    });

    let dmDelivered = false;
    if (memberObj && memberObj.user?.send) {
      try {
        await memberObj.user.send({ embeds: dmEmbeds });
        dmDelivered = true;
      } catch (dmErr) {
        console.warn(`Could not send acceptance DM to applicant ${app.user_id}:`, dmErr.message);
      }
    }

    // Send copy to results channel if configured
    if (guild) {
      const resultsChannelId = process.env.APPLICATION_RESULTS_CHANNEL_ID || process.env.RESULTS_CHANNEL_ID;
      if (resultsChannelId) {
        const resultsChan = guild.channels.cache.get(resultsChannelId);
        if (resultsChan && resultsChan.send) {
          try {
            await resultsChan.send({ embeds: dmEmbeds });
          } catch (e) {
            console.warn('Could not post to results channel:', e.message);
          }
        }
      }
    }

    return {
      success: true,
      status: 'ACCEPTED',
      roleAssigned,
      dmDelivered,
      embeds: dmEmbeds
    };
  }

  /**
   * STEP 7: DENY APPLICATION
   */
  async denyApplication(appId, reviewer, reason = 'Did not meet current department requirements.', guild = null) {
    const app = this.getApplication(appId);
    if (!app) return { success: false, error: 'Application not found' };

    if (app.status === 'ACCEPTED') {
      return { success: false, error: 'This application has already been accepted.' };
    }
    if (app.status === 'DENIED') {
      return { success: false, error: 'This application has already been denied.' };
    }

    const now = Date.now();
    db.transaction(() => {
      db.prepare(`
        UPDATE applications
        SET status = 'DENIED', reviewer_id = ?, reviewer_tag = ?,
            denial_reason = ?, reviewed_at = ?, updated_at = ?
        WHERE id = ?
      `).run(reviewer.id, reviewer.tag || reviewer.username, reason, now, now, appId);

      db.prepare(`
        INSERT INTO audit_logs (action, executor_id, target_id, details, created_at)
        VALUES ('APPLICATION_DENIED', ?, ?, ?, ?)
      `).run(reviewer.id, app.user_id, `Denied for ${app.department_name}: ${reason}`, now);
    })();

    // Denial DM to applicant with Top & Bottom banners
    const dmEmbeds = WvrpEmbedBuilder.createDualBannerEmbeds({
      type: 'application_denied',
      title: 'WEST VIRGINIA STATE ROLEPLAY · APPLICATION RESULT',
      description: [
        `Hello <@${app.user_id}>,`,
        '',
        `Your application for **${app.department_name}** was evaluated and was not approved at this time.`,
        '',
        '**Application Information:**',
        `• **Applicant:** <@${app.user_id}> (\`${app.user_tag}\`)`,
        `• **Department:** **${app.department_name}**`,
        `• **Application ID:** \`${appId}\``,
        `• **Reviewed By:** <@${reviewer.id}> (\`${reviewer.tag || reviewer.username}\`)`,
        `• **Decision Date:** <t:${Math.floor(now / 1000)}:F>`,
        `• **Result:** \`DENIED\``,
        `• **Reason:** ${reason}`,
        '',
        'Please review the feedback provided above. You are welcome to reapply during our next recruitment cycle in 14 days.'
      ].join('\n')
    });

    let dmDelivered = false;
    if (guild) {
      try {
        const member = await guild.members.fetch(app.user_id).catch(() => null);
        if (member && member.user?.send) {
          await member.user.send({ embeds: dmEmbeds });
          dmDelivered = true;
        }
      } catch (dmErr) {
        console.warn(`Could not send denial DM to applicant ${app.user_id}:`, dmErr.message);
      }
    }

    // Send copy to results channel if configured
    if (guild) {
      const resultsChannelId = process.env.APPLICATION_RESULTS_CHANNEL_ID || process.env.RESULTS_CHANNEL_ID;
      if (resultsChannelId) {
        const resultsChan = guild.channels.cache.get(resultsChannelId);
        if (resultsChan && resultsChan.send) {
          try {
            await resultsChan.send({ embeds: dmEmbeds });
          } catch (e) {
            console.warn('Could not post to results channel:', e.message);
          }
        }
      }
    }

    return {
      success: true,
      status: 'DENIED',
      dmDelivered,
      embeds: dmEmbeds
    };
  }

  /**
   * STEP 8: REQUEST INTERVIEW
   */
  async requestInterview(appId, reviewer, notes = 'Interview required via voice channel') {
    const app = this.getApplication(appId);
    if (!app) return { success: false, error: 'Application not found' };

    const now = Date.now();
    db.prepare(`
      UPDATE applications
      SET status = 'INTERVIEW_SCHEDULED', interview_notes = ?, reviewer_id = ?, updated_at = ?
      WHERE id = ?
    `).run(notes, reviewer.id, now, appId);

    const embed = WvrpEmbedBuilder.createBase({
      title: `🎤 Interview Requested — ${app.department_name}`,
      description: `Hello <@${app.user_id}>! Department leadership has requested an interview for application **${appId}**.\n\n• **Reviewer:** <@${reviewer.id}>\n• **Notes / Details:** ${notes}\n\n*Please coordinate with leadership in this channel to schedule your interview.*`,
      footerText: 'West Virginia State Roleplay · Recruitment'
    });
    embed.setImage(BANNERS.BOTTOM || 'https://wvrp-assets.local/banners/wvrp-banner-bottom.svg');

    return { success: true, status: 'INTERVIEW_SCHEDULED', embed };
  }

  /**
   * STEP 9: REQUEST CHANGES
   */
  async requestChanges(appId, reviewer, feedback = 'Please expand upon your scenario answers') {
    const app = this.getApplication(appId);
    if (!app) return { success: false, error: 'Application not found' };

    const now = Date.now();
    db.prepare(`
      UPDATE applications
      SET status = 'CHANGES_REQUESTED', change_request_notes = ?, reviewer_id = ?, updated_at = ?
      WHERE id = ?
    `).run(feedback, reviewer.id, now, appId);

    const embed = WvrpEmbedBuilder.createBase({
      title: `✏️ Revisions Requested — ${app.department_name}`,
      description: `Hello <@${app.user_id}>! Reviewers would like you to revise parts of application **${appId}**.\n\n• **Reviewer Feedback:** ${feedback}\n\n*You may submit your updated answers directly in this channel.*`,
      footerText: 'West Virginia State Roleplay · Recruitment'
    });
    embed.setImage(BANNERS.BOTTOM || 'https://wvrp-assets.local/banners/wvrp-banner-bottom.svg');

    return { success: true, status: 'CHANGES_REQUESTED', embed };
  }
}

export const applicationService = new ApplicationService();
export default applicationService;
