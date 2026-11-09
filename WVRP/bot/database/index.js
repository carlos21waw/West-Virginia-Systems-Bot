import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DATABASE_PATH || './database/wvrp.sqlite';
const resolvedDir = path.dirname(path.resolve(dbPath));
if (!fs.existsSync(resolvedDir)) {
  fs.mkdirSync(resolvedDir, { recursive: true });
}

export const db = new Database(path.resolve(dbPath));

// Enable WAL mode for high concurrency
db.pragma('journal_mode = WAL');

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    channel_id TEXT,
    user_id TEXT,
    user_tag TEXT,
    roblox_username TEXT,
    roblox_id TEXT,
    category TEXT,
    inquiry TEXT,
    claimed_by TEXT,
    status TEXT DEFAULT 'OPEN',
    created_at INTEGER,
    closed_at INTEGER,
    closed_by TEXT,
    transcript_url TEXT,
    ai_status TEXT DEFAULT 'ENABLED',
    ai_summary TEXT
  );

  CREATE TABLE IF NOT EXISTS ticket_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT,
    author_id TEXT,
    author_name TEXT,
    content TEXT,
    attachments TEXT,
    timestamp INTEGER
  );

  CREATE TABLE IF NOT EXISTS infractions (
    id TEXT PRIMARY KEY,
    staff_id TEXT,
    staff_tag TEXT,
    punishment TEXT,
    reason TEXT,
    issuer_id TEXT,
    issuer_tag TEXT,
    appealable INTEGER DEFAULT 1,
    status TEXT DEFAULT 'ACTIVE',
    evidence_thread_id TEXT,
    revoked_by TEXT,
    revoke_reason TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS infraction_appeals (
    id TEXT PRIMARY KEY,
    infraction_id TEXT,
    appellant_id TEXT,
    answers_json TEXT,
    status TEXT DEFAULT 'PENDING',
    reviewer_id TEXT,
    review_reason TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS promotions (
    id TEXT PRIMARY KEY,
    staff_id TEXT,
    staff_tag TEXT,
    new_rank TEXT,
    old_rank TEXT,
    reason TEXT,
    issuer_id TEXT,
    issuer_tag TEXT,
    status TEXT DEFAULT 'ACTIVE',
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS staff_feedback (
    id TEXT PRIMARY KEY,
    staff_id TEXT,
    staff_tag TEXT,
    reviewer_id TEXT,
    reviewer_tag TEXT,
    rating INTEGER,
    comment TEXT,
    is_anonymous INTEGER DEFAULT 0,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS staff_shifts (
    id TEXT PRIMARY KEY,
    staff_id TEXT,
    staff_tag TEXT,
    roblox_id TEXT,
    shift_type TEXT DEFAULT 'NORMAL',
    started_at INTEGER,
    ended_at INTEGER,
    total_duration_seconds INTEGER DEFAULT 0,
    break_duration_seconds INTEGER DEFAULT 0,
    break_count INTEGER DEFAULT 0,
    moderation_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'ACTIVE'
  );

  CREATE TABLE IF NOT EXISTS staff_active_status (
    staff_id TEXT PRIMARY KEY,
    staff_tag TEXT,
    current_shift_id TEXT,
    status TEXT DEFAULT 'ON_SHIFT',
    shift_type TEXT DEFAULT 'NORMAL',
    break_started_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS staff_quotas (
    staff_id TEXT PRIMARY KEY,
    exempt INTEGER DEFAULT 0,
    on_leave INTEGER DEFAULT 0,
    no_quota INTEGER DEFAULT 0,
    custom_quota_seconds INTEGER DEFAULT 12000
  );

  CREATE TABLE IF NOT EXISTS training_sessions (
    id TEXT PRIMARY KEY,
    trainer_id TEXT,
    trainer_tag TEXT,
    starts_in TEXT,
    notes TEXT,
    status TEXT DEFAULT 'SCHEDULED',
    started_at INTEGER,
    ended_at INTEGER,
    attending_json TEXT DEFAULT '[]',
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS training_logs (
    id TEXT PRIMARY KEY,
    trainee_id TEXT,
    trainee_tag TEXT,
    trainer_id TEXT,
    trainer_tag TEXT,
    result TEXT,
    notes TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS applications (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    user_tag TEXT,
    roblox_username TEXT,
    status TEXT DEFAULT 'PENDING',
    sapling_score REAL DEFAULT 0,
    sapling_ai_detected INTEGER DEFAULT 0,
    answers_json TEXT,
    reviewer_id TEXT,
    reviewer_tag TEXT,
    review_notes TEXT,
    created_at INTEGER,
    reviewed_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS application_questions (
    id INTEGER PRIMARY KEY,
    question_number INTEGER,
    prompt TEXT,
    placeholder TEXT,
    required INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    status TEXT DEFAULT 'OFFLINE',
    server_name TEXT,
    join_code TEXT,
    owner_name TEXT,
    player_count INTEGER DEFAULT 0,
    queue_count INTEGER DEFAULT 0,
    staff_count INTEGER DEFAULT 0,
    votes_json TEXT DEFAULT '[]',
    host_id TEXT,
    updated_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS marketplace_listings (
    id TEXT PRIMARY KEY,
    category TEXT,
    title TEXT,
    description TEXT,
    price_robux INTEGER,
    perks_json TEXT,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS marketplace_orders (
    id TEXT PRIMARY KEY,
    customer_id TEXT,
    customer_tag TEXT,
    listing_id TEXT,
    item_title TEXT,
    status TEXT DEFAULT 'PENDING',
    details TEXT,
    assigned_staff TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS economy (
    user_id TEXT PRIMARY KEY,
    wallet INTEGER DEFAULT 1000,
    bank INTEGER DEFAULT 5000,
    daily_streak INTEGER DEFAULT 0,
    last_daily INTEGER DEFAULT 0,
    last_work INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS crypto_portfolio (
    user_id TEXT,
    symbol TEXT,
    amount REAL DEFAULT 0,
    average_cost REAL DEFAULT 0,
    PRIMARY KEY (user_id, symbol)
  );

  CREATE TABLE IF NOT EXISTS blacklists (
    user_id TEXT,
    type TEXT,
    reason TEXT,
    issuer_id TEXT,
    created_at INTEGER,
    PRIMARY KEY (user_id, type)
  );

  CREATE TABLE IF NOT EXISTS economy_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    type TEXT,
    amount INTEGER,
    details TEXT,
    timestamp INTEGER
  );

  CREATE TABLE IF NOT EXISTS user_inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    item_id TEXT,
    item_name TEXT,
    quantity INTEGER DEFAULT 1,
    purchased_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS application_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_by TEXT,
    updated_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS comms_whitelist (
    user_id TEXT PRIMARY KEY,
    user_tag TEXT,
    added_by TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS livery_whitelist (
    user_id TEXT PRIMARY KEY,
    user_tag TEXT,
    added_by TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS afk_status (
    user_id TEXT PRIMARY KEY,
    guild_id TEXT,
    user_tag TEXT,
    reason TEXT,
    original_nickname TEXT,
    nickname_changed INTEGER DEFAULT 0,
    is_afk INTEGER DEFAULT 1,
    timestamp INTEGER,
    mentions_json TEXT DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS afk_pings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    afk_user_id TEXT,
    pinger_id TEXT,
    pinger_tag TEXT,
    channel_id TEXT,
    channel_name TEXT,
    message_id TEXT,
    message_content TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS anti_ping_strikes (
    user_id TEXT PRIMARY KEY,
    guild_id TEXT,
    user_tag TEXT,
    strike_count INTEGER DEFAULT 0,
    tier INTEGER DEFAULT 1,
    last_strike_at INTEGER,
    last_punishment TEXT,
    updated_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS anti_ping_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    user_tag TEXT,
    target_role_id TEXT,
    target_team_name TEXT,
    strike_number INTEGER,
    tier INTEGER,
    punishment TEXT,
    duration_minutes INTEGER DEFAULT 0,
    channel_id TEXT,
    message_id TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS giveaways (
    id TEXT PRIMARY KEY,
    channel_id TEXT,
    prize TEXT,
    winners_count INTEGER DEFAULT 1,
    ends_at INTEGER,
    ended INTEGER DEFAULT 0,
    entries_json TEXT DEFAULT '[]',
    winners_json TEXT DEFAULT '[]',
    created_by TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS erlc_logs_cache (
    id TEXT PRIMARY KEY,
    type TEXT,
    data_json TEXT,
    timestamp INTEGER
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT,
    executor_id TEXT,
    target_id TEXT,
    details TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS welcome_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    user_tag TEXT,
    member_count INTEGER,
    channel_id TEXT,
    message_id TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS boost_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    user_tag TEXT,
    boost_level INTEGER,
    total_boosts INTEGER,
    channel_id TEXT,
    message_id TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS server_tag_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    user_tag TEXT,
    tag_detected TEXT,
    channel_id TEXT,
    message_id TEXT,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS verifications (
    discord_id TEXT PRIMARY KEY,
    discord_tag TEXT,
    roblox_id TEXT,
    roblox_username TEXT,
    roblox_display_name TEXT,
    roblox_avatar_url TEXT,
    bloxlink_status TEXT DEFAULT 'UNVERIFIED',
    verified INTEGER DEFAULT 0,
    staff_reviewer_id TEXT,
    staff_reviewer_tag TEXT,
    verified_at INTEGER,
    updated_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS ticket_automation_workflows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT,
    channel_id TEXT,
    user_id TEXT,
    workflow_type TEXT,
    trigger_source TEXT,
    matched_phrase TEXT,
    status TEXT DEFAULT 'ACTIVE',
    data_json TEXT DEFAULT '{}',
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS ticket_auto_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT,
    workflow_type TEXT,
    message_id TEXT,
    trigger_phrase TEXT,
    created_at INTEGER
  );
`);

// Safe column migrations for existing SQLite database instances
try {
  const afkCols = db.prepare("PRAGMA table_info(afk_status)").all().map(c => c.name);
  if (!afkCols.includes('original_nickname')) db.exec("ALTER TABLE afk_status ADD COLUMN original_nickname TEXT");
  if (!afkCols.includes('guild_id')) db.exec("ALTER TABLE afk_status ADD COLUMN guild_id TEXT");
  if (!afkCols.includes('user_tag')) db.exec("ALTER TABLE afk_status ADD COLUMN user_tag TEXT");
  if (!afkCols.includes('nickname_changed')) db.exec("ALTER TABLE afk_status ADD COLUMN nickname_changed INTEGER DEFAULT 0");
  if (!afkCols.includes('is_afk')) db.exec("ALTER TABLE afk_status ADD COLUMN is_afk INTEGER DEFAULT 1");
} catch (e) {
  // Ignore migration errors if already existing
}

// Seed default 15 application questions if empty
const countQuestions = db.prepare('SELECT COUNT(*) as count FROM application_questions').get().count;
if (countQuestions === 0) {
  const defaultQuestions = [
    { q: 1, p: 'What is your full Roblox username?', ph: 'e.g. carlos473' },
    { q: 2, p: 'What device do you play on?', ph: 'PC / Mobile / Console' },
    { q: 3, p: 'What is your time zone?', ph: 'e.g. EST / CST / PST / GMT' },
    { q: 4, p: 'How many hours can you moderate per week?', ph: 'e.g. 10-15 hours' },
    { q: 5, p: 'Do you have any prior staff or moderation experience? If so, where?', ph: 'Write in detail and full sentences' },
    { q: 6, p: 'Why do you want to join the WVRP staff team?', ph: 'Write in detail and full sentences' },
    { q: 7, p: 'What is RDM, and how would you handle it if someone broke this rule?', ph: 'Random Deathmatch explanation & protocol' },
    { q: 8, p: 'What is VDM, and how would you handle it if someone broke this rule?', ph: 'Vehicle Deathmatch explanation & protocol' },
    { q: 9, p: 'What is LTAP, and how would you handle it if someone broke this rule?', ph: 'Leaving To Avoid Punishment explanation & protocol' },
    { q: 10, p: 'What is FRP, and how would you handle it if someone broke this rule?', ph: 'Fear Roleplay explanation & protocol' },
    { q: 11, p: 'What is NLR, and how would you handle it if someone broke this rule?', ph: 'New Life Rule explanation & protocol' },
    { q: 12, p: 'What is the punishment if someone rejoins right after being kicked?', ph: 'Server protocol regarding rejoin evasion' },
    { q: 13, p: 'A player is spamming the in-game chat with inappropriate language after multiple warnings. Walk through exactly what you would do, step by step.', ph: 'Step-by-step moderation response' },
    { q: 14, p: 'Do you understand that you must remain professional at all times, both in-game and in Discord? Also confirm you understand asking staff to read your application results in denial.', ph: 'Yes / No with acknowledgment' },
    { q: 15, p: 'Is there anything else you would like the application team to know? (If not, put N/A)', ph: 'Additional notes or N/A' }
  ];

  const insertQ = db.prepare('INSERT INTO application_questions (question_number, prompt, placeholder, required) VALUES (?, ?, ?, 1)');
  for (const q of defaultQuestions) {
    insertQ.run(q.q, q.p, q.ph);
  }
}

// Seed default marketplace items if empty
const countMarketplace = db.prepare('SELECT COUNT(*) as count FROM marketplace_listings').get().count;
if (countMarketplace === 0) {
  const defaultListings = [
    { id: 'ad-everyone', cat: 'Paid Advertisements', title: '@Everyone Ping Paid Advertisement', desc: 'Send your ad in #paid-ads with an @everyone ping which reaches the entire server, offering maximum visibility.', price: 1500, perks: '["@everyone ping in #paid-ads", "Maximum reach", "Link allowed"]' },
    { id: 'ad-here', cat: 'Paid Advertisements', title: '@Here Ping Paid Advertisement', desc: 'Send your ad in #paid-ads with an @here ping which reaches all active online members.', price: 1000, perks: '["@here ping in #paid-ads", "Active online engagement"]' },
    { id: 'ad-reg', cat: 'Paid Advertisements', title: 'Regular Paid Advertisement', desc: 'Send your ad in #paid-ads with no ping, great value for engagement.', price: 500, perks: '["No-ping listing in #paid-ads"]' },
    { id: 'giveaway-everyone', cat: 'Sponsored Giveaways', title: '@Everyone Ping Sponsored Giveaway', desc: 'Host a giveaway in #giveaways with minimum 500 Robux prize. Participants must join your server.', price: 1200, perks: '["@everyone ping", "Mandatory server join requirement", "Min 500 Robux prize"]' },
    { id: 'giveaway-here', cat: 'Sponsored Giveaways', title: '@Here Ping Sponsored Giveaway', desc: 'Host a giveaway in #giveaways with @here ping and min 500 Robux prize.', price: 800, perks: '["@here ping", "Server join requirement"]' },
    { id: 'pkg-office-vc', cat: 'Packages', title: 'Custom Discord Office (Voice Channel)', desc: 'Receive a custom voice channel with your chosen name and emoji. Toggle who can join.', price: 750, perks: '["Custom VC name & emoji", "Manage permissions", "Permanent VC"]' },
    { id: 'pkg-vip', cat: 'Packages', title: 'VIP Package', desc: 'Receive the exclusive @VIP role, VIP channels, sneak peeks of early updates, and enter VIP giveaways.', price: 1000, perks: '["@VIP role", "VIP channels", "Sneak peeks", "VIP giveaways"]' },
    { id: 'pkg-wvrp-plus', cat: 'Packages', title: 'West Virginia+ Membership', desc: 'Exclusive @WVRP+ role, category access, early updates, and community prestige.', price: 1200, perks: '["@WVRP+ role", "Exclusive category", "Early updates"]' },
    { id: 'don-500', cat: 'Donations', title: '500 Robux Donation', desc: 'Support WVRP growth and receive the @Donator I role and donator lounge access.', price: 500, perks: '["@Donator I role", "Donator lounge", "Special recognition"]' },
    { id: 'don-1000', cat: 'Donations', title: '1,000 Robux Donation', desc: 'Receive the exclusive @Donator II role and early server updates.', price: 1000, perks: '["@Donator II role", "Early updates access"]' },
    { id: 'don-1500', cat: 'Donations', title: '1,500 Robux Donation', desc: 'Receive the prestigious @Donator III role and top supporter recognition.', price: 1500, perks: '["@Donator III role", "VIP benefits", "Top recognition"]' }
  ];

  const insertListing = db.prepare('INSERT INTO marketplace_listings (id, category, title, description, price_robux, perks_json, active) VALUES (?, ?, ?, ?, ?, ?, 1)');
  for (const item of defaultListings) {
    insertListing.run(item.id, item.cat, item.title, item.desc, item.price, item.perks);
  }
}

// Seed default session if empty
const countSession = db.prepare('SELECT COUNT(*) as count FROM sessions').get().count;
if (countSession === 0) {
  db.prepare(`
    INSERT INTO sessions (id, status, server_name, join_code, owner_name, player_count, queue_count, staff_count, updated_at)
    VALUES ('main', 'ONLINE', 'West Virginia Roleplay | Strict | Realistic', 'wvrp', 'WVRP Management', 18, 2, 4, ?)
  `).run(Date.now());
}

export default db;
