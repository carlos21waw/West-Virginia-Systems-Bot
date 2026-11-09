import { EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const EMBED_COLOR = process.env.EMBED_COLOR || '#00A8FF';
const BASE_HOST = process.env.PUBLIC_URL || 'https://wvrp-assets.local';

/**
 * Transforms relative paths or handles full URLs safely so Discord.js EmbedBuilder never throws validation errors.
 */
export const safeUrl = (p) => {
  if (!p || typeof p !== 'string' || p.trim().length === 0) return null;
  const trimmed = p.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('attachment://')) {
    return trimmed;
  }
  return `${BASE_HOST}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
};

/**
 * Default fallback SVGs generated locally in /public/banners/
 */
export const DEFAULT_LOCAL_BANNERS = {
  TOP: safeUrl('/banners/wvrp-banner-top.svg'),
  BOTTOM: safeUrl('/banners/wvrp-banner-bottom.svg'),
  ASSISTANCE: safeUrl('/banners/banner-assistance.svg'),
  APPLICATIONS: safeUrl('/banners/banner-applications.svg'),
  MARKETPLACE: safeUrl('/banners/banner-marketplace.svg'),
  REGULATIONS: safeUrl('/banners/banner-regulations.svg'),
  SESSIONS: safeUrl('/banners/banner-sessions.svg'),
  INFRACTIONS: safeUrl('/banners/banner-infractions.svg'),
  PROMOTIONS: safeUrl('/banners/banner-promotions.svg'),
  DEPARTMENTS: safeUrl('/banners/banner-departments.svg'),
  TRAINING: safeUrl('/banners/banner-training.svg'),
  FEEDBACK: safeUrl('/banners/banner-feedback.svg'),
  DASHBOARD: safeUrl('/banners/banner-dashboard.svg'),
  WELCOME: safeUrl('/banners/banner-welcome.svg'),
  BOOST: safeUrl('/banners/banner-boost.svg'),
  VERIFICATION: safeUrl('/banners/banner-verification.svg'),
  FASTPASS: safeUrl('/banners/banner-fastpass.svg')
};

export const BANNERS = DEFAULT_LOCAL_BANNERS;

/**
 * Banner Hierarchy Mapping
 * Each type maps to:
 * - specificTopEnv: Env var for this exact message type
 * - systemTopEnv: Env var for the overall system
 * - specificBottomEnv: Env var for this exact message type
 * - systemBottomEnv: Env var for the overall system
 * - defaultTop: Local default SVG fallback
 * - defaultBottom: Local default SVG fallback
 */
export const BANNER_MAPPINGS = {
  // MARKETPLACE
  marketplace: {
    systemTopEnv: 'MARKETPLACE_TOP_BANNER_URL',
    systemBottomEnv: 'MARKETPLACE_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.MARKETPLACE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  marketplace_tos: {
    specificTopEnv: 'MARKETPLACE_TOS_TOP_BANNER_URL',
    specificBottomEnv: 'MARKETPLACE_TOS_BOTTOM_BANNER_URL',
    systemTopEnv: 'MARKETPLACE_TOP_BANNER_URL',
    systemBottomEnv: 'MARKETPLACE_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.MARKETPLACE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  marketplace_order: {
    specificTopEnv: 'MARKETPLACE_ORDER_TOP_BANNER_URL',
    specificBottomEnv: 'MARKETPLACE_ORDER_BOTTOM_BANNER_URL',
    systemTopEnv: 'MARKETPLACE_TOP_BANNER_URL',
    systemBottomEnv: 'MARKETPLACE_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.MARKETPLACE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  marketplace_result: {
    specificTopEnv: 'MARKETPLACE_RESULT_TOP_BANNER_URL',
    specificBottomEnv: 'MARKETPLACE_RESULT_BOTTOM_BANNER_URL',
    systemTopEnv: 'MARKETPLACE_TOP_BANNER_URL',
    systemBottomEnv: 'MARKETPLACE_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.MARKETPLACE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // STAFF DASHBOARD / INFORMATION
  staff_dashboard: {
    specificTopEnv: 'STAFF_DASHBOARD_TOP_BANNER_URL',
    specificBottomEnv: 'STAFF_DASHBOARD_BOTTOM_BANNER_URL',
    systemTopEnv: 'STAFF_INFORMATION_TOP_BANNER_URL',
    systemBottomEnv: 'STAFF_INFORMATION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.DASHBOARD,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  staff_information: {
    systemTopEnv: 'STAFF_INFORMATION_TOP_BANNER_URL',
    systemBottomEnv: 'STAFF_INFORMATION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.DASHBOARD,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  staff_feedback: {
    specificTopEnv: 'STAFF_FEEDBACK_TOP_BANNER_URL',
    specificBottomEnv: 'STAFF_FEEDBACK_BOTTOM_BANNER_URL',
    systemTopEnv: 'STAFF_INFORMATION_TOP_BANNER_URL',
    systemBottomEnv: 'STAFF_INFORMATION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.FEEDBACK,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  staff_activity: {
    specificTopEnv: 'STAFF_ACTIVITY_TOP_BANNER_URL',
    specificBottomEnv: 'STAFF_ACTIVITY_BOTTOM_BANNER_URL',
    systemTopEnv: 'STAFF_INFORMATION_TOP_BANNER_URL',
    systemBottomEnv: 'STAFF_INFORMATION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.DASHBOARD,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // STAFF INFRACTIONS
  infraction: {
    systemTopEnv: 'INFRACTION_TOP_BANNER_URL',
    systemBottomEnv: 'INFRACTION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.INFRACTIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  infraction_dm: {
    specificTopEnv: 'INFRACTION_DM_TOP_BANNER_URL',
    specificBottomEnv: 'INFRACTION_DM_BOTTOM_BANNER_URL',
    systemTopEnv: 'INFRACTION_TOP_BANNER_URL',
    systemBottomEnv: 'INFRACTION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.INFRACTIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  infraction_appeal: {
    specificTopEnv: 'INFRACTION_APPEAL_TOP_BANNER_URL',
    specificBottomEnv: 'INFRACTION_APPEAL_BOTTOM_BANNER_URL',
    systemTopEnv: 'INFRACTION_TOP_BANNER_URL',
    systemBottomEnv: 'INFRACTION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.INFRACTIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  infraction_revoked: {
    specificTopEnv: 'INFRACTION_REVOKED_TOP_BANNER_URL',
    specificBottomEnv: 'INFRACTION_REVOKED_BOTTOM_BANNER_URL',
    systemTopEnv: 'INFRACTION_TOP_BANNER_URL',
    systemBottomEnv: 'INFRACTION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.INFRACTIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  infraction_evidence: {
    specificTopEnv: 'INFRACTION_EVIDENCE_TOP_BANNER_URL',
    specificBottomEnv: 'INFRACTION_EVIDENCE_BOTTOM_BANNER_URL',
    systemTopEnv: 'INFRACTION_TOP_BANNER_URL',
    systemBottomEnv: 'INFRACTION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.INFRACTIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // STAFF PROMOTIONS
  promotion: {
    systemTopEnv: 'PROMOTION_TOP_BANNER_URL',
    systemBottomEnv: 'PROMOTION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.PROMOTIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  promotion_dm: {
    specificTopEnv: 'PROMOTION_DM_TOP_BANNER_URL',
    specificBottomEnv: 'PROMOTION_DM_BOTTOM_BANNER_URL',
    systemTopEnv: 'PROMOTION_TOP_BANNER_URL',
    systemBottomEnv: 'PROMOTION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.PROMOTIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  promotion_revoked: {
    specificTopEnv: 'PROMOTION_REVOKED_TOP_BANNER_URL',
    specificBottomEnv: 'PROMOTION_REVOKED_BOTTOM_BANNER_URL',
    systemTopEnv: 'PROMOTION_TOP_BANNER_URL',
    systemBottomEnv: 'PROMOTION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.PROMOTIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // APPLICATIONS
  application: {
    systemTopEnv: 'APPLICATION_TOP_BANNER_URL',
    systemBottomEnv: 'APPLICATION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.APPLICATIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  application_review: {
    specificTopEnv: 'APPLICATION_REVIEW_TOP_BANNER_URL',
    specificBottomEnv: 'APPLICATION_REVIEW_BOTTOM_BANNER_URL',
    systemTopEnv: 'APPLICATION_TOP_BANNER_URL',
    systemBottomEnv: 'APPLICATION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.APPLICATIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  application_dm: {
    specificTopEnv: 'APPLICATION_DM_TOP_BANNER_URL',
    specificBottomEnv: 'APPLICATION_DM_BOTTOM_BANNER_URL',
    systemTopEnv: 'APPLICATION_TOP_BANNER_URL',
    systemBottomEnv: 'APPLICATION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.APPLICATIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  application_accepted: {
    specificTopEnv: 'APPLICATION_ACCEPTED_TOP_BANNER_URL',
    specificBottomEnv: 'APPLICATION_ACCEPTED_BOTTOM_BANNER_URL',
    systemTopEnv: 'APPLICATION_RESULTS_TOP_BANNER_URL',
    systemBottomEnv: 'APPLICATION_RESULTS_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.APPLICATIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  application_denied: {
    specificTopEnv: 'APPLICATION_DENIED_TOP_BANNER_URL',
    specificBottomEnv: 'APPLICATION_DENIED_BOTTOM_BANNER_URL',
    systemTopEnv: 'APPLICATION_RESULTS_TOP_BANNER_URL',
    systemBottomEnv: 'APPLICATION_RESULTS_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.APPLICATIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  application_results: {
    specificTopEnv: 'APPLICATION_RESULTS_TOP_BANNER_URL',
    specificBottomEnv: 'APPLICATION_RESULTS_BOTTOM_BANNER_URL',
    systemTopEnv: 'APPLICATION_TOP_BANNER_URL',
    systemBottomEnv: 'APPLICATION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.APPLICATIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // TRAINING
  training: {
    systemTopEnv: 'TRAINING_TOP_BANNER_URL',
    systemBottomEnv: 'TRAINING_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.TRAINING,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  training_start: {
    specificTopEnv: 'TRAINING_START_TOP_BANNER_URL',
    specificBottomEnv: 'TRAINING_START_BOTTOM_BANNER_URL',
    systemTopEnv: 'TRAINING_TOP_BANNER_URL',
    systemBottomEnv: 'TRAINING_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.TRAINING,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  // CRITICAL EXCEPTION: Training Results uses ONLY bottom banner!
  training_results: {
    noTopBanner: true,
    specificBottomEnv: 'TRAINING_RESULTS_BOTTOM_BANNER_URL',
    systemBottomEnv: 'RESULTS_BOTTOM_BANNER_URL',
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  training_dm: {
    specificTopEnv: 'TRAINING_DM_TOP_BANNER_URL',
    specificBottomEnv: 'TRAINING_DM_BOTTOM_BANNER_URL',
    systemTopEnv: 'TRAINING_TOP_BANNER_URL',
    systemBottomEnv: 'TRAINING_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.TRAINING,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // DEPARTMENTS
  departments: {
    systemTopEnv: 'DEPARTMENTS_TOP_BANNER_URL',
    systemBottomEnv: 'DEPARTMENTS_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.DEPARTMENTS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  department_results: {
    specificTopEnv: 'DEPARTMENT_RESULTS_TOP_BANNER_URL',
    specificBottomEnv: 'DEPARTMENT_RESULTS_BOTTOM_BANNER_URL',
    systemTopEnv: 'DEPARTMENTS_TOP_BANNER_URL',
    systemBottomEnv: 'DEPARTMENTS_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.DEPARTMENTS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // SESSIONS
  session: {
    systemTopEnv: 'SESSION_TOP_BANNER_URL',
    systemBottomEnv: 'SESSION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  session_vote: {
    specificTopEnv: 'SESSION_VOTE_TOP_BANNER_URL',
    specificBottomEnv: 'SESSION_VOTE_BOTTOM_BANNER_URL',
    systemTopEnv: 'SESSION_TOP_BANNER_URL',
    systemBottomEnv: 'SESSION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  session_startup: {
    specificTopEnv: 'SESSION_STARTUP_TOP_BANNER_URL',
    specificBottomEnv: 'SESSION_STARTUP_BOTTOM_BANNER_URL',
    systemTopEnv: 'SESSION_TOP_BANNER_URL',
    systemBottomEnv: 'SESSION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  session_low_population: {
    specificTopEnv: 'SESSION_LOW_POPULATION_TOP_BANNER_URL',
    specificBottomEnv: 'SESSION_LOW_POPULATION_BOTTOM_BANNER_URL',
    systemTopEnv: 'SESSION_TOP_BANNER_URL',
    systemBottomEnv: 'SESSION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  session_full: {
    specificTopEnv: 'SESSION_FULL_TOP_BANNER_URL',
    specificBottomEnv: 'SESSION_FULL_BOTTOM_BANNER_URL',
    systemTopEnv: 'SESSION_TOP_BANNER_URL',
    systemBottomEnv: 'SESSION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  session_shutdown: {
    specificTopEnv: 'SESSION_SHUTDOWN_TOP_BANNER_URL',
    specificBottomEnv: 'SESSION_SHUTDOWN_BOTTOM_BANNER_URL',
    systemTopEnv: 'SESSION_TOP_BANNER_URL',
    systemBottomEnv: 'SESSION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  session_results: {
    specificTopEnv: 'SESSION_RESULTS_TOP_BANNER_URL',
    specificBottomEnv: 'SESSION_RESULTS_BOTTOM_BANNER_URL',
    systemTopEnv: 'SESSION_TOP_BANNER_URL',
    systemBottomEnv: 'SESSION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // TICKETS AND SUPPORT
  ticket: {
    systemTopEnv: 'TICKET_TOP_BANNER_URL',
    systemBottomEnv: 'TICKET_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.ASSISTANCE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  ticket_panel: {
    specificTopEnv: 'TICKET_PANEL_TOP_BANNER_URL',
    specificBottomEnv: 'TICKET_PANEL_BOTTOM_BANNER_URL',
    systemTopEnv: 'TICKET_TOP_BANNER_URL',
    systemBottomEnv: 'TICKET_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.ASSISTANCE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  ticket_transcript: {
    specificTopEnv: 'TICKET_TRANSCRIPT_TOP_BANNER_URL',
    specificBottomEnv: 'TICKET_TRANSCRIPT_BOTTOM_BANNER_URL',
    systemTopEnv: 'TICKET_TOP_BANNER_URL',
    systemBottomEnv: 'TICKET_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.ASSISTANCE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  ticket_closed: {
    specificTopEnv: 'TICKET_CLOSED_TOP_BANNER_URL',
    specificBottomEnv: 'TICKET_CLOSED_BOTTOM_BANNER_URL',
    systemTopEnv: 'TICKET_TOP_BANNER_URL',
    systemBottomEnv: 'TICKET_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.ASSISTANCE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // AI SUPPORT ASSISTANT
  assistant: {
    systemTopEnv: 'ASSISTANT_TOP_BANNER_URL',
    systemBottomEnv: 'ASSISTANT_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.ASSISTANCE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  assistant_welcome: {
    specificTopEnv: 'ASSISTANT_WELCOME_TOP_BANNER_URL',
    specificBottomEnv: 'ASSISTANT_WELCOME_BOTTOM_BANNER_URL',
    systemTopEnv: 'ASSISTANT_TOP_BANNER_URL',
    systemBottomEnv: 'ASSISTANT_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.ASSISTANCE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  assistant_response: {
    specificTopEnv: 'ASSISTANT_RESPONSE_TOP_BANNER_URL',
    specificBottomEnv: 'ASSISTANT_RESPONSE_BOTTOM_BANNER_URL',
    systemTopEnv: 'ASSISTANT_TOP_BANNER_URL',
    systemBottomEnv: 'ASSISTANT_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.ASSISTANCE,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // ER:LC
  erlc: {
    systemTopEnv: 'ERLC_TOP_BANNER_URL',
    systemBottomEnv: 'ERLC_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  erlc_server_info: {
    specificTopEnv: 'ERLC_SERVER_INFO_TOP_BANNER_URL',
    specificBottomEnv: 'ERLC_SERVER_INFO_BOTTOM_BANNER_URL',
    systemTopEnv: 'ERLC_TOP_BANNER_URL',
    systemBottomEnv: 'ERLC_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  erlc_players: {
    specificTopEnv: 'ERLC_PLAYERS_TOP_BANNER_URL',
    specificBottomEnv: 'ERLC_PLAYERS_BOTTOM_BANNER_URL',
    systemTopEnv: 'ERLC_TOP_BANNER_URL',
    systemBottomEnv: 'ERLC_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  erlc_staff: {
    specificTopEnv: 'ERLC_STAFF_TOP_BANNER_URL',
    specificBottomEnv: 'ERLC_STAFF_BOTTOM_BANNER_URL',
    systemTopEnv: 'ERLC_TOP_BANNER_URL',
    systemBottomEnv: 'ERLC_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  erlc_logs: {
    specificTopEnv: 'ERLC_LOGS_TOP_BANNER_URL',
    specificBottomEnv: 'ERLC_LOGS_BOTTOM_BANNER_URL',
    systemTopEnv: 'ERLC_TOP_BANNER_URL',
    systemBottomEnv: 'ERLC_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.SESSIONS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // COMMUNITY / GENERAL
  community: {
    systemTopEnv: 'COMMUNITY_TOP_BANNER_URL',
    systemBottomEnv: 'COMMUNITY_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.TOP,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  results: {
    systemTopEnv: 'RESULTS_TOP_BANNER_URL',
    systemBottomEnv: 'RESULTS_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.TOP,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  giveaway: {
    specificTopEnv: 'GIVEAWAY_TOP_BANNER_URL',
    specificBottomEnv: 'GIVEAWAY_BOTTOM_BANNER_URL',
    systemTopEnv: 'COMMUNITY_TOP_BANNER_URL',
    systemBottomEnv: 'COMMUNITY_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.TOP,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },
  commands: {
    specificTopEnv: 'COMMANDS_TOP_BANNER_URL',
    specificBottomEnv: 'COMMANDS_BOTTOM_BANNER_URL',
    systemTopEnv: 'COMMUNITY_TOP_BANNER_URL',
    systemBottomEnv: 'COMMUNITY_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.DASHBOARD,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // WELCOME
  welcome: {
    specificTopEnv: 'WELCOME_TOP_BANNER_URL',
    specificBottomEnv: 'WELCOME_BOTTOM_BANNER_URL',
    systemTopEnv: 'COMMUNITY_TOP_BANNER_URL',
    systemBottomEnv: 'COMMUNITY_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.WELCOME,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // SERVER BOOST
  boost: {
    specificTopEnv: 'BOOST_TOP_BANNER_URL',
    specificBottomEnv: 'BOOST_BOTTOM_BANNER_URL',
    systemTopEnv: 'COMMUNITY_TOP_BANNER_URL',
    systemBottomEnv: 'COMMUNITY_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.BOOST,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // SERVER TAG
  server_tag: {
    specificTopEnv: 'TAG_TOP_BANNER_URL',
    specificBottomEnv: 'TAG_BOTTOM_BANNER_URL',
    systemTopEnv: 'COMMUNITY_TOP_BANNER_URL',
    systemBottomEnv: 'COMMUNITY_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.BOOST,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // VERIFICATION
  verification: {
    specificTopEnv: 'VERIFY_TOP_BANNER_URL',
    specificBottomEnv: 'VERIFY_BOTTOM_BANNER_URL',
    systemTopEnv: 'COMMUNITY_TOP_BANNER_URL',
    systemBottomEnv: 'COMMUNITY_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.VERIFICATION,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // FAST PASS
  fastpass: {
    specificTopEnv: 'FASTPASS_TOP_BANNER_URL',
    specificBottomEnv: 'FASTPASS_BOTTOM_BANNER_URL',
    systemTopEnv: 'APPLICATION_TOP_BANNER_URL',
    systemBottomEnv: 'APPLICATION_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.FASTPASS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  },

  // DEPARTMENT TRANSFERS
  dept_transfer: {
    specificTopEnv: 'DEPT_TRANSFER_TOP_BANNER_URL',
    specificBottomEnv: 'DEPT_TRANSFER_BOTTOM_BANNER_URL',
    systemTopEnv: 'DEPARTMENTS_TOP_BANNER_URL',
    systemBottomEnv: 'DEPARTMENTS_BOTTOM_BANNER_URL',
    defaultTop: DEFAULT_LOCAL_BANNERS.DEPARTMENTS,
    defaultBottom: DEFAULT_LOCAL_BANNERS.BOTTOM
  }
};

/**
 * Resolves top and bottom banner URLs with strict 4-level fallback priority:
 * 1. Specific message override / specific message env var
 * 2. Specific system env var
 * 3. Global fallback env var (TOP_BANNER_URL / BOTTOM_BANNER_URL)
 * 4. Local default SVG / null if completely unconfigured
 */
export function resolveBanners(type = 'community', overrideTop = null, overrideBottom = null) {
  const mapping = BANNER_MAPPINGS[type] || BANNER_MAPPINGS.community;

  // Training results exception: NO TOP BANNER
  let resolvedTop = null;
  if (!mapping.noTopBanner) {
    if (overrideTop && overrideTop.trim().length > 0) {
      resolvedTop = safeUrl(overrideTop);
    } else if (mapping.specificTopEnv && process.env[mapping.specificTopEnv] && process.env[mapping.specificTopEnv].trim().length > 0) {
      resolvedTop = safeUrl(process.env[mapping.specificTopEnv]);
    } else if (mapping.systemTopEnv && process.env[mapping.systemTopEnv] && process.env[mapping.systemTopEnv].trim().length > 0) {
      resolvedTop = safeUrl(process.env[mapping.systemTopEnv]);
    } else if (process.env.TOP_BANNER_URL && process.env.TOP_BANNER_URL.trim().length > 0) {
      resolvedTop = safeUrl(process.env.TOP_BANNER_URL);
    } else {
      resolvedTop = mapping.defaultTop || DEFAULT_LOCAL_BANNERS.TOP;
    }
  }

  let resolvedBottom = null;
  if (overrideBottom && overrideBottom.trim().length > 0) {
    resolvedBottom = safeUrl(overrideBottom);
  } else if (mapping.specificBottomEnv && process.env[mapping.specificBottomEnv] && process.env[mapping.specificBottomEnv].trim().length > 0) {
    resolvedBottom = safeUrl(process.env[mapping.specificBottomEnv]);
  } else if (mapping.systemBottomEnv && process.env[mapping.systemBottomEnv] && process.env[mapping.systemBottomEnv].trim().length > 0) {
    resolvedBottom = safeUrl(process.env[mapping.systemBottomEnv]);
  } else if (process.env.BOTTOM_BANNER_URL && process.env.BOTTOM_BANNER_URL.trim().length > 0) {
    resolvedBottom = safeUrl(process.env.BOTTOM_BANNER_URL);
  } else {
    resolvedBottom = mapping.defaultBottom || DEFAULT_LOCAL_BANNERS.BOTTOM;
  }

  return {
    topBanner: resolvedTop,
    bottomBanner: resolvedBottom
  };
}

/**
 * Centralized Reusable Embed Builder
 * Accepts type, automatically resolves banners, handles Discord image constraints
 * by producing coordinated embeds when top and bottom banners are both present.
 */
export function createWVRPEmbed({
  type = 'community',
  topBanner: customTop = null,
  bottomBanner: customBottom = null,
  title,
  description,
  fields = [],
  color = EMBED_COLOR,
  author,
  footerText = 'West Virginia Roleplay · Premium Discord Roleplay Management',
  footerIcon,
  thumbnail,
  timestamp = true
}) {
  const { topBanner, bottomBanner } = resolveBanners(type, customTop, customBottom);
  const embeds = [];

  // Top banner embed (only if topBanner exists)
  if (topBanner) {
    const topEmbed = new EmbedBuilder()
      .setColor(color)
      .setImage(topBanner);
    embeds.push(topEmbed);
  }

  // Main content embed
  const mainEmbed = new EmbedBuilder().setColor(color);
  if (timestamp) mainEmbed.setTimestamp();
  if (title) mainEmbed.setTitle(title);
  if (description) mainEmbed.setDescription(description);
  if (fields && fields.length > 0) mainEmbed.addFields(fields);
  if (author) mainEmbed.setAuthor(author);
  if (thumbnail) mainEmbed.setThumbnail(thumbnail);
  if (footerText) mainEmbed.setFooter({ text: footerText, iconURL: footerIcon });

  // Bottom banner is attached to mainEmbed image
  if (bottomBanner) {
    mainEmbed.setImage(bottomBanner);
  }

  embeds.push(mainEmbed);
  return embeds;
}

export class WvrpEmbedBuilder {
  static createWVRPEmbed(options) {
    return createWVRPEmbed(options);
  }

  static createBase(options = {}) {
    const embed = new EmbedBuilder()
      .setColor(options.color || EMBED_COLOR)
      .setTimestamp(options.timestamp !== false ? new Date() : null);

    if (options.title) embed.setTitle(options.title);
    if (options.description) embed.setDescription(options.description);

    if (options.author) {
      embed.setAuthor({
        name: options.author.name || 'West Virginia Roleplay',
        iconURL: options.author.iconURL || options.thumbnail,
        url: options.author.url
      });
    }

    embed.setFooter({
      text: options.footerText || 'West Virginia Roleplay · discord.gg/wvrp',
      iconURL: options.footerIcon
    });

    if (options.thumbnail) embed.setThumbnail(options.thumbnail);
    return embed;
  }

  static createDualBannerEmbeds(options) {
    return createWVRPEmbed(options);
  }

  // Exact Infraction Layout: INF-0000
  static createInfractionEmbed({ staffMention, punishment, reason, issuerMention, infractionId, appealable = true, isDm = false }) {
    return createWVRPEmbed({
      type: isDm ? 'infraction_dm' : 'infraction',
      title: 'Infraction Notice',
      description: `🪪 **Staff Member:** ${staffMention}\n🛡️ **Punishment:** ${punishment}\n📎 **Appealable:** ${appealable ? 'Yes' : 'No'}\n\n📌 **Reason:** ${reason}\n\n👤 ${issuerMention} — **${infractionId}**`,
      footerText: `WVRP Disciplinary Record · ${infractionId}`
    });
  }

  // Exact Promotion Layout: PRO-0000
  static createPromotionEmbed({ staffMention, newRank, reason, issuerMention, promotionId, isDm = false }) {
    return createWVRPEmbed({
      type: isDm ? 'promotion_dm' : 'promotion',
      title: 'Staff Promotion',
      description: `🪪 **Staff Member:** ${staffMention}\n🎖️ **Promotion:** ${newRank}\n\n📌 **Reason:** ${reason}\n\n👤 ${issuerMention} — **${promotionId}**`,
      footerText: `WVRP Promotion Registry · ${promotionId}`
    });
  }

  // Exact Staff Feedback Layout
  static createFeedbackEmbed({ staffMention, ratedByMention, rating, comment }) {
    return createWVRPEmbed({
      type: 'staff_feedback',
      title: 'Staff Feedback',
      description: `🪪 **Staff Member:** ${staffMention}\n👤 **Rated By:** ${ratedByMention}\n⭐ **Rating:** ${rating}/5\n📌 **Comment:** ${comment}`,
      footerText: 'WVRP Staff Quality & Feedback Assessment'
    });
  }

  // Exact Training Log Layout (Bottom banner only — uses training_results)
  static createTrainingLogEmbed({ traineeMention, traineeUsername, trainerMention, trainerUsername, result = 'Passed', notes = 'Did overall good.' }) {
    return createWVRPEmbed({
      type: 'training_results',
      color: result === 'Passed' ? 0x22c55e : 0xef4444,
      title: '📁 Training Log',
      description: `👤 **Trainee:** ${traineeMention} (${traineeUsername})\n🛡️ **Trainer:** ${trainerMention} (${trainerUsername})\n✅ **Result:** ${result}\n📅 **Date:** ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n\n📌 **Notes**\n> ${notes}`,
      footerText: 'WVRP Staff Academy Record'
    });
  }

  // Exact Training Announcement Layout (Top & Bottom Banners)
  static createTrainingAnnouncementEmbed({ trainerMention, status = 'Ended', startedAgo = '3 hours ago (7:10 PM)', endedDuration = 'after 8 minutes', attendingList = 'Nobody yet' }) {
    return createWVRPEmbed({
      type: 'training_start',
      title: 'Staff Training',
      description: `This training session has ended. Thank you to everyone who attended.\n\n> You must complete a training within **7 days** of becoming a Trainee, otherwise it will result in an immediate termination.\n\n**How to attend**\n1. Press **Join Game** below to load into the server\n2. Go to the **Police Team briefing room** and wait for your trainer\n3. Make sure you are wearing the **staff uniform**\n\n🛡️ **Trainer:** ${trainerMention}\n⏰ **Started:** ${startedAgo}\n📌 **Status:** ${status}\n📅 **Ended:** ${status === 'Ended' ? `${startedAgo} ${endedDuration}` : 'Ongoing'}\n👥 **Attending (0):** ${attendingList}`,
      footerText: 'West Virginia Roleplay Staff Academy'
    });
  }

  // Exact Ticket Closed DM Layout
  static createTicketClosedDm({ ticketId, category, handledByMention, closedByMention, openedDate, duration, messageCount }) {
    return createWVRPEmbed({
      type: 'ticket_closed',
      title: `Ticket #${ticketId} — ${category}`,
      description: `Your ${category} ticket has been closed.\n\n↳ **Handled By:** ${handledByMention}\n↳ **Closed By:** ${closedByMention}\n⏰ **Opened:** ${openedDate}\n⏰ **Closed:** Just now\n⏳ **Duration:** ${duration}\n🎫 **Messages Sent:** ${messageCount} messages\n\nClick **Online Transcript** below to view the archived conversation.`,
      footerText: 'West Virginia Support Center Transcript System'
    });
  }

  // Exact Welcome Layout: Reference Replacement for WVRP
  static createWelcomeEmbed({ memberMention, username, avatarUrl, memberCount = 20028, accountCreated, joinedAt }) {
    const ordinal = getOrdinalSuffix(memberCount);
    return createWVRPEmbed({
      type: 'welcome',
      title: '👋 Welcome to West Virginia State Roleplay!',
      description: `• Welcome **${memberMention}** to **West Virginia State Roleplay!**\n• You are our **${ordinal}** member.\n• We hope you enjoy your stay!\n• Ensure you verify to access the appropriate community features and participate in ER:LC.`,
      thumbnail: avatarUrl || undefined,
      fields: [
        { name: '👤 Username', value: `\`${username}\``, inline: true },
        { name: '👥 Member Count', value: `\`${memberCount.toLocaleString()} members\``, inline: true },
        ...(accountCreated ? [{ name: '🗓️ Account Created', value: `\`${accountCreated}\``, inline: true }] : []),
        ...(joinedAt ? [{ name: '🚪 Joined Server', value: `\`${joinedAt}\``, inline: true }] : [])
      ],
      footerText: 'West Virginia State Roleplay · Welcome Center'
    });
  }

  // Exact Server Boost Embed
  static createBoostEmbed({ memberMention, username, avatarUrl, boostLevel = 3, boostCount = 14 }) {
    return createWVRPEmbed({
      type: 'boost',
      title: 'Thank You for Repping Us!',
      description: `> Thank you **${memberMention}** for boosting our **WVRP** server! Showing your support helps our community grow and makes West Virginia State Roleplay even better.`,
      thumbnail: avatarUrl || undefined,
      fields: [
        { name: '💎 Boosting Member', value: `${memberMention} (\`${username}\`)`, inline: true },
        { name: '🚀 Server Boost Level', value: `**Level ${boostLevel}**`, inline: true },
        { name: '✨ Total Boosts', value: `\`${boostCount} Boosts\``, inline: true }
      ],
      footerText: 'West Virginia State Roleplay · Server Boost Perks'
    });
  }

  // Exact Server Tag Notification Embed
  static createServerTagEmbed({ memberMention, username, avatarUrl, tag = 'WVRP' }) {
    return createWVRPEmbed({
      type: 'server_tag',
      title: 'Thank You for Repping Us!',
      description: `> Thank you **${memberMention}** for equipping our **${tag}** server tag! Showing it off helps more people discover **West Virginia State Roleplay**.`,
      thumbnail: avatarUrl || undefined,
      fields: [
        { name: '🏷️ Equipped Tag', value: `\`${tag}\``, inline: true },
        { name: '👤 Supporter', value: `${memberMention}`, inline: true }
      ],
      footerText: 'West Virginia State Roleplay · Community Representatives'
    });
  }

  // Exact Roblox & Bloxlink Verification Embed
  static createVerificationEmbed({ userMention, username, userId, robloxUser, bloxlinkStatus = 'VERIFIED', verified = true, isStaffReview = false }) {
    const statusEmoji = verified ? '✅' : '⚠️';
    const statusText = verified ? 'Verified Member' : 'Pending Verification';

    const fields = [
      { name: '💬 Discord Account', value: `${userMention}\n\`${userId}\``, inline: true },
      { name: '🎮 Roblox Username', value: robloxUser?.username ? `[${robloxUser.username}](${robloxUser.profileUrl || `https://www.roblox.com/users/${robloxUser.id}/profile`})` : '`Not Linked`', inline: true },
      { name: '🪪 Roblox User ID', value: `\`${robloxUser?.id || 'N/A'}\``, inline: true },
      { name: '🏷️ Display Name', value: `\`${robloxUser?.displayName || robloxUser?.username || 'N/A'}\``, inline: true },
      { name: '🔗 Bloxlink Status', value: `\`${bloxlinkStatus}\``, inline: true },
      { name: `${statusEmoji} Verification State`, value: `**${statusText}**`, inline: true }
    ];

    if (robloxUser?.groupRank) {
      fields.push({ name: '🏛️ WVRP Group Rank', value: `\`${robloxUser.groupRank}\``, inline: true });
    }

    if (robloxUser?.createdAt) {
      fields.push({ name: '🗓️ Roblox Created', value: `\`${robloxUser.createdAt}\``, inline: true });
    }

    return createWVRPEmbed({
      type: 'verification',
      title: `${statusEmoji} Roblox & Bloxlink Verification`,
      description: verified
        ? `Account verification confirmed for **${userMention}**! Your Discord identity is linked with your official Roblox account.`
        : `Verification check in progress for **${userMention}**. Please link your account or click **Check Verification** once completed on Bloxlink.`,
      fields,
      thumbnail: robloxUser?.avatarHeadshot || robloxUser?.thumbnail || undefined,
      footerText: isStaffReview ? 'WVRP Verification Registry · Staff Review Protocol' : 'West Virginia State Roleplay · Verification Service'
    });
  }

  // Fast-Pass Embed Layout
  static createFastPassEmbed({ userMention, fastPassEmoji = '⚡' }) {
    const greeting = userMention ? `Hello ${userMention},\n\n` : '';
    return createWVRPEmbed({
      type: 'fastpass',
      title: `${fastPassEmoji} Fast-Pass Staff Application`,
      description: `${greeting}**Fast-Pass**\n\n**Your ROBLOX User:**\n\n**All your previous experiences, please include member count and your rank.**\n\n**Server invite CODE, if possible:**\n\n**Why do I want to be staff here?**\n\n*Copy this, fill in every line and send it here. The team will review it.*`,
      footerText: 'West Virginia State Roleplay · Fast-Pass Staff Recruitment'
    });
  }

  // Department Transfer Layout
  static createDeptTransferEmbed({ userMention }) {
    const greeting = userMention ? `Hello ${userMention},\n\n` : '';
    return createWVRPEmbed({
      type: 'dept_transfer',
      title: '🚓 Department Transfer Application',
      description: `${greeting}**Department Transfer Request**\n\n**Roblox Username:**\n\n**Current Department:**\n\n**Current Rank:**\n\n**Requested Department:**\n\n**Previous Experience:**\n\n**Reason for Requesting a Transfer:**\n\n*Copy this, fill in every line and send it here. Department High Command will evaluate your qualifications.*`,
      footerText: 'West Virginia State Roleplay · Department Oversight'
    });
  }
}

export function getOrdinalSuffix(i) {
  const num = Math.abs(parseInt(String(i), 10) || 1);
  const j = num % 10,
        k = num % 100;
  if (j === 1 && k !== 11) return `${num.toLocaleString()}st`;
  if (j === 2 && k !== 12) return `${num.toLocaleString()}nd`;
  if (j === 3 && k !== 13) return `${num.toLocaleString()}rd`;
  return `${num.toLocaleString()}th`;
}

export default WvrpEmbedBuilder;
