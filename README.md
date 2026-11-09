# West Virginia Roleplay (WVRP) Discord Bot

Official, production-ready Discord.js v14 management bot built exclusively for **West Virginia Roleplay (WVRP)**, an Emergency Response: Liberty County (ER:LC) roleplay community.

## 🚀 Key Features

1. **Exact Reference Recreations**:
   - Pixel-perfect recreation of Discord dark mode embeds with neon cyan/blue WVRP branding (`#00A8FF`).
   - Top banner & bottom banner system across all official panels.
   - Exact layout for Sessions, Tickets, Infractions (`INF-0000`), Promotions (`PRO-0000`), Staff Dashboard, Training Logs, Applications, and Marketplace.

2. **Official ER:LC API v2 Integration**:
   - Real-time connection to `https://api.erlc.gg/v2`.
   - Commands: `-erlc info`, `/erlc info`, `/erlc players`, `/erlc staff`, `/erlc logs`, `/erlc run`.
   - Livery Whitelist & Communications Checker (`/comms whitelist`, `/comms unwhitelist`, etc.).
   - Live in-game chat shift commands: `;shift start`, `;shift 50/50`, `;shift break`, `;shift end`.

3. **Complete Shift Management**:
   - Live Active Shifts embed (`🟢 1 on shift · 1 on break`).
   - Shift Management panel with `Start Shift`, `Start 50/50`, and `End Shift` (danger).
   - On-Duty and On-Break role assignment & automated quota calculation.
   - 10-person paginated leaderboard with Quota Met, Below Quota, and Exempt categories.

4. **15-Question Applications & Sapling Analysis**:
   - 15 questions asked sequentially.
   - Real Sapling API AI-writing analysis (advisory confidence score).
   - Staff review embed with `[Approve]`, `[Deny]`, `[Claim]`, sending acceptance/denial DMs with top/bottom banners.

5. **Groq AI Ticket Assistant & Cookie Transcripts**:
   - Dedicated Support AI inside tickets trained on WVRP community regulations.
   - Automatic handoff to human staff when needed.
   - Automatic human staff takeover detection.
   - Cookie API / offline HTML transcript generator on ticket close.

6. **Marketplace & 10-Point Terms of Service**:
   - Interactive packages, paid advertisements, and donations.
   - Verified 10-section Terms of Service popup.

7. **Economy Suite**:
   - Balance, daily streak, work shifts, deposit/withdraw, games (coinflip, slots, blackjack, roulette, dice, higherlower, crash), and crypto market.

## 🛠️ Setup & Deployment

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Configure credentials in .env
cp .env.example .env

# 3. Register slash commands
node deploy-commands.js

# 4. Start bot
node index.js
\`\`\`
