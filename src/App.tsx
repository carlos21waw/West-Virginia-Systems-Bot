import React, { useState, useEffect } from 'react';
import {
  Shield,
  Ticket,
  Users,
  Briefcase,
  FileText,
  ShoppingBag,
  Award,
  AlertTriangle,
  Folder,
  BookOpen,
  DollarSign,
  Terminal,
  Activity,
  Server,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  Send,
  MessageSquare,
  Lock,
  Search,
  Bell,
  Play,
  Pause,
  Coffee,
  Check,
  Layers,
  Sliders,
  Image as ImageIcon,
  Copy,
  ShieldAlert,
  Moon,
  UserX,
  UserPlus,
  Zap,
  Link2,
  Radio,
  Heart
} from 'lucide-react';

interface ActiveShift {
  staffId: string;
  staffTag: string;
  status: 'ON_SHIFT' | 'ON_BREAK';
  shiftType: string;
  elapsedFormatted: string;
  startedAgo: string;
  breakCount: number;
  moderationCount: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'sessions' | 'tickets' | 'shifts' | 'applications' | 'marketplace' | 'infractions' | 'training' | 'departments' | 'dashboard' | 'feedback' | 'terminal' | 'database' | 'banners' | 'antiping' | 'afk' | 'welcome' | 'boost' | 'verification' | 'workflows'>('sessions');

  // Welcome System State
  const [welcomeConfig, setWelcomeConfig] = useState<any>(null);
  const [welcomeRecords, setWelcomeRecords] = useState<any[]>([]);
  const [simWelcomeUser, setSimWelcomeUser] = useState({ id: '2056966914', username: 'CarlosWVRP' });
  const [simWelcomeCount, setSimWelcomeCount] = useState(20028);
  const [simWelcomeResult, setSimWelcomeResult] = useState<any>(null);

  // Boost & Tag System State
  const [boostConfig, setBoostConfig] = useState<any>(null);
  const [boostRecords, setBoostRecords] = useState<any[]>([]);
  const [tagRecords, setTagRecords] = useState<any[]>([]);
  const [simBoostUser, setSimBoostUser] = useState({ id: '2056966914', username: 'CarlosWVRP' });
  const [simBoostLevel, setSimBoostLevel] = useState(3);
  const [simBoostCount, setSimBoostCount] = useState(14);
  const [simBoostResult, setSimBoostResult] = useState<any>(null);
  const [simTagUser, setSimTagUser] = useState({ id: '2056966914', username: 'CarlosWVRP' });
  const [simTagString, setSimTagString] = useState('WVRP');
  const [simTagResult, setSimTagResult] = useState<any>(null);

  // Roblox & Bloxlink Verification State
  const [verificationList, setVerificationList] = useState<any[]>([]);
  const [verifySearchQuery, setVerifySearchQuery] = useState('2056966914');
  const [verifySearchType, setVerifySearchType] = useState<'discord_id' | 'roblox_username'>('discord_id');
  const [verifySearchResult, setVerifySearchResult] = useState<any>(null);
  const [verifySearchLoading, setVerifySearchLoading] = useState(false);
  const [manualDiscordId, setManualDiscordId] = useState('1122334455');
  const [manualRobloxUser, setManualRobloxUser] = useState('Carlos473');
  const [manualVerifySuccess, setManualVerifySuccess] = useState<string | null>(null);

  // Ticket Automation Workflows State
  const [workflowDefinitions, setWorkflowDefinitions] = useState<any[]>([]);
  const [workflowHistory, setWorkflowHistory] = useState<any>({ activeWorkflows: [], recentResponses: [] });
  const [simWorkflowMsg, setSimWorkflowMsg] = useState('Can I get a fast pass for my experience?');
  const [simWorkflowTicketId, setSimWorkflowTicketId] = useState('0850');
  const [simWorkflowResult, setSimWorkflowResult] = useState<any>(null);
  const [manualWorkflowType, setManualWorkflowType] = useState('fast_pass');
  const [manualWorkflowSuccess, setManualWorkflowSuccess] = useState<string | null>(null);

  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [activeShifts, setActiveShifts] = useState<ActiveShift[]>([]);
  const [leaderboard, setLeaderboard] = useState<any>(null);
  const [lbPage, setLbPage] = useState(1);

  // Banner Explorer state
  const [bannerData, setBannerData] = useState<any>(null);
  const [selectedBannerType, setSelectedBannerType] = useState('session_shutdown');
  const [bannerCategoryFilter, setBannerCategoryFilter] = useState('ALL');
  const [testTopOverride, setTestTopOverride] = useState('');
  const [testBottomOverride, setTestBottomOverride] = useState('');
  const [testResolveResult, setTestResolveResult] = useState<any>(null);
  const [copiedEnvKey, setCopiedEnvKey] = useState<string | null>(null);

  // Anti-Ping State
  const [antiPingConfig, setAntiPingConfig] = useState<any>(null);
  const [antiPingRecords, setAntiPingRecords] = useState<any>({ strikes: [], logs: [] });
  const [simPingUser, setSimPingUser] = useState({ id: '1122334455', username: 'CuriousUser' });
  const [simPingTeam, setSimPingTeam] = useState('Foundership Team');
  const [simPingResult, setSimPingResult] = useState<any>(null);

  // AFK State
  const [afkData, setAfkData] = useState<any>({ activeAfk: [], recentPings: [], config: {} });
  const [myAfkReason, setMyAfkReason] = useState('Taking a dinner break');
  const [myAfkActive, setMyAfkActive] = useState(false);
  const [myOriginalNickname, setMyOriginalNickname] = useState('Carlos473');
  const [myCurrentNickname, setMyCurrentNickname] = useState('Carlos473');
  const [simPingerUsername, setSimPingerUsername] = useState('OfficerDave');
  const [simPingContent, setSimPingContent] = useState('Hey @Carlos473 need backup on Main St!');
  const [afkSimResponse, setAfkSimResponse] = useState<any>(null);
  const [afkReturnResponse, setAfkReturnResponse] = useState<any>(null);

  // Tickets state
  const [ticketFaq, setTicketFaq] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [isTicketClaimed, setIsTicketClaimed] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [ticketInquiry, setTicketInquiry] = useState('Idk if this even true what joseph mention.');
  const [ticketClosed, setTicketClosed] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiChatLog, setAiChatLog] = useState<{ sender: string; text: string; isStaff?: boolean }[]>([
    { sender: 'Opener', text: 'Hello, could you help clarify if staff transfers are currently open for Internal Affairs?' }
  ]);
  const [aiControlStatus, setAiControlStatus] = useState<'ENABLED' | 'PAUSED' | 'HUMAN_TAKEOVER'>('ENABLED');

  // Applications state
  const [showAppModal, setShowAppModal] = useState(false);
  const [appStep, setAppStep] = useState(1);
  const [appAnswers, setAppAnswers] = useState<string[]>(Array(15).fill(''));
  const [submittedApp, setSubmittedApp] = useState<any>(null);
  const [appReviewDecision, setAppReviewDecision] = useState<string | null>(null);

  // Marketplace state
  const [showTosModal, setShowTosModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // Shifts state
  const [myShiftStatus, setMyShiftStatus] = useState<'OFF_DUTY' | 'ON_SHIFT' | 'ON_BREAK'>('OFF_DUTY');
  const [myShiftType, setMyShiftType] = useState('NORMAL');
  const [inGameCmdInput, setInGameCmdInput] = useState(';shift start');
  const [inGameLog, setInGameLog] = useState<string[]>([]);

  // Infractions & Appeals
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [appealStep, setAppealStep] = useState(1);
  const [appealAnswers, setAppealAnswers] = useState<string[]>(['', '', '', '', '']);
  const [appealSubmitted, setAppealSubmitted] = useState(false);
  const [infractionRevoked, setInfractionRevoked] = useState(false);

  // Training state
  const [trainingStatus, setTrainingStatus] = useState<'SCHEDULED' | 'IN_PROGRESS' | 'ENDED'>('SCHEDULED');
  const [traineeCount, setTraineeCount] = useState(0);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('-commands');
  const [terminalHistory, setTerminalHistory] = useState<any[]>([
    {
      type: 'input',
      cmd: '-commands'
    },
    {
      type: 'response',
      title: 'West Virginia Roleplay — Command Directory',
      desc: '100+ operations loaded across Tickets, Sessions, ER:LC, Staff, Applications, Marketplace, Economy, Utility, and Departments. Prefix: -'
    }
  ]);

  // Load backend status on mount
  useEffect(() => {
    fetchStatus();
    fetchShifts();
    fetchLeaderboard(1);
    fetchBanners();
    fetchAntiPing();
    fetchAfk();
    fetchWelcome();
    fetchBoost();
    fetchVerification();
    fetchWorkflows();
    const interval = setInterval(() => {
      fetchShifts();
      fetchAntiPing();
      fetchAfk();
      fetchWelcome();
      fetchBoost();
      fetchVerification();
      fetchWorkflows();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchWelcome = async () => {
    try {
      const [cfgRes, recRes] = await Promise.all([
        fetch('/api/welcome/config'),
        fetch('/api/welcome/records')
      ]);
      if (cfgRes.ok) setWelcomeConfig(await cfgRes.json());
      if (recRes.ok) setWelcomeRecords(await recRes.json());
    } catch (e) {
      console.warn('Failed to fetch welcome data:', e);
    }
  };

  const fetchBoost = async () => {
    try {
      const [cfgRes, recRes] = await Promise.all([
        fetch('/api/boost/config'),
        fetch('/api/boost/records')
      ]);
      if (cfgRes.ok) setBoostConfig(await cfgRes.json());
      if (recRes.ok) {
        const data = await recRes.json();
        setBoostRecords(data.boosts || []);
        setTagRecords(data.tags || []);
      }
    } catch (e) {
      console.warn('Failed to fetch boost data:', e);
    }
  };

  const fetchVerification = async () => {
    try {
      const res = await fetch('/api/verification/list');
      if (res.ok) setVerificationList(await res.json());
    } catch (e) {
      console.warn('Failed to fetch verification list:', e);
    }
  };

  const fetchWorkflows = async () => {
    try {
      const [defRes, histRes] = await Promise.all([
        fetch('/api/workflows/definitions'),
        fetch('/api/workflows/history')
      ]);
      if (defRes.ok) setWorkflowDefinitions(await defRes.json());
      if (histRes.ok) setWorkflowHistory(await histRes.json());
    } catch (e) {
      console.warn('Failed to fetch workflows:', e);
    }
  };

  const handleSimulateWelcome = async () => {
    try {
      const res = await fetch('/api/welcome/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: simWelcomeUser.id,
          username: simWelcomeUser.username,
          memberCount: simWelcomeCount
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSimWelcomeResult(data);
        fetchWelcome();
        fetchStatus();
      }
    } catch (e) {
      console.warn('Failed to simulate welcome:', e);
    }
  };

  const handleSimulateBoost = async () => {
    try {
      const res = await fetch('/api/boost/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: simBoostUser.id,
          username: simBoostUser.username,
          boostLevel: simBoostLevel,
          boostCount: simBoostCount
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSimBoostResult(data);
        fetchBoost();
        fetchStatus();
      }
    } catch (e) {
      console.warn('Failed to simulate boost:', e);
    }
  };

  const handleSimulateTag = async () => {
    try {
      const res = await fetch('/api/boost/simulate-tag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: simTagUser.id,
          username: simTagUser.username,
          tag: simTagString
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSimTagResult(data);
        fetchBoost();
        fetchStatus();
      }
    } catch (e) {
      console.warn('Failed to simulate server tag:', e);
    }
  };

  const handleVerifyLookup = async () => {
    if (!verifySearchQuery.trim()) return;
    setVerifySearchLoading(true);
    setVerifySearchResult(null);
    try {
      const res = await fetch('/api/verification/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: verifySearchQuery.trim(),
          type: verifySearchType
        })
      });
      if (res.ok) {
        setVerifySearchResult(await res.json());
      } else {
        const err = await res.json();
        setVerifySearchResult({ error: err.error || 'Lookup failed' });
      }
    } catch (e: any) {
      setVerifySearchResult({ error: e.message });
    } finally {
      setVerifySearchLoading(false);
    }
  };

  const handleManualVerify = async () => {
    if (!manualDiscordId.trim() || !manualRobloxUser.trim()) return;
    try {
      const res = await fetch('/api/verification/manual-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discordId: manualDiscordId.trim(),
          discordTag: `User_${manualDiscordId.trim().slice(-4)}`,
          robloxUsernameOrId: manualRobloxUser.trim(),
          staffMember: { id: '2056966914', username: 'Carlos473' }
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setManualVerifySuccess(`Verified ${manualDiscordId} as Roblox user ${data.robloxUser?.username}!`);
          fetchVerification();
          fetchStatus();
          setTimeout(() => setManualVerifySuccess(null), 4000);
        } else {
          alert(data.error || 'Manual verification failed');
        }
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleSimulateWorkflow = async () => {
    if (!simWorkflowMsg.trim()) return;
    try {
      const res = await fetch('/api/workflows/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageContent: simWorkflowMsg,
          ticketId: simWorkflowTicketId,
          user: { id: '2056966914', username: 'Carlos473' }
        })
      });
      if (res.ok) {
        setSimWorkflowResult(await res.json());
        fetchWorkflows();
        fetchStatus();
      }
    } catch (e) {
      console.warn('Failed to simulate workflow:', e);
    }
  };

  const handleManualTriggerWorkflow = async () => {
    try {
      const res = await fetch('/api/workflows/manual-trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowType: manualWorkflowType,
          ticketId: simWorkflowTicketId,
          staffMember: { id: '2056966914', username: 'Carlos473' }
        })
      });
      if (res.ok) {
        const data = await res.json();
        setManualWorkflowSuccess(`Posted ${manualWorkflowType} template to Ticket #${simWorkflowTicketId}!`);
        fetchWorkflows();
        fetchStatus();
        setTimeout(() => setManualWorkflowSuccess(null), 4000);
      }
    } catch (e) {
      console.warn('Failed to trigger workflow:', e);
    }
  };

  const fetchAntiPing = async () => {
    try {
      const [cfgRes, recRes] = await Promise.all([
        fetch('/api/antiping/config'),
        fetch('/api/antiping/records')
      ]);
      if (cfgRes.ok) setAntiPingConfig(await cfgRes.json());
      if (recRes.ok) setAntiPingRecords(await recRes.json());
    } catch (e) {
      console.warn('Failed to fetch anti-ping:', e);
    }
  };

  const fetchAfk = async () => {
    try {
      const res = await fetch('/api/afk/list');
      if (res.ok) setAfkData(await res.json());
    } catch (e) {
      console.warn('Failed to fetch AFK list:', e);
    }
  };

  const handleSimulateAntiPing = async () => {
    try {
      const res = await fetch('/api/antiping/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: simPingUser.id,
          username: simPingUser.username,
          team: simPingTeam,
          mockMessageContent: `Hey @${simPingTeam}, who is active for session?`
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSimPingResult(data);
        fetchAntiPing();
        fetchStatus();
      }
    } catch (e) {
      console.warn('Simulation failed:', e);
    }
  };

  const handleAntiPingAction = async (action: 'reset' | 'set', userId: string, count?: number) => {
    try {
      await fetch('/api/antiping/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId, count, staffTag: 'Carlos473' })
      });
      fetchAntiPing();
      fetchStatus();
    } catch (e) {
      console.warn('Action failed:', e);
    }
  };

  const handleToggleAfk = async () => {
    try {
      if (!myAfkActive) {
        const res = await fetch('/api/afk/set', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: '2056966914',
            username: myOriginalNickname,
            reason: myAfkReason
          })
        });
        if (res.ok) {
          const data = await res.json();
          setMyAfkActive(true);
          setMyCurrentNickname(data.newNickname || `AFK | ${myOriginalNickname}`);
          setAfkReturnResponse(null);
          fetchAfk();
          fetchStatus();
        }
      } else {
        const res = await fetch('/api/afk/simulate-return', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: '2056966914', username: myOriginalNickname })
        });
        if (res.ok) {
          const data = await res.json();
          setMyAfkActive(false);
          setMyCurrentNickname(myOriginalNickname);
          setAfkReturnResponse(data.result);
          fetchAfk();
          fetchStatus();
        }
      }
    } catch (e) {
      console.warn('AFK toggle failed:', e);
    }
  };

  const handleSimulatePingAfk = async () => {
    try {
      const res = await fetch('/api/afk/simulate-ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          afkUserId: '2056966914',
          pingerId: '9988776655',
          pingerUsername: simPingerUsername,
          content: simPingContent
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAfkSimResponse(data);
        fetchAfk();
        fetchStatus();
      }
    } catch (e) {
      console.warn('Ping simulation failed:', e);
    }
  };

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners');
      if (res.ok) {
        const data = await res.json();
        setBannerData(data);
      }
    } catch (e) {
      console.warn('Failed to fetch banners:', e);
    }
  };

  const handleTestResolve = async (type = selectedBannerType, top = testTopOverride, bottom = testBottomOverride) => {
    try {
      const res = await fetch('/api/banners/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, overrideTop: top, overrideBottom: bottom })
      });
      if (res.ok) {
        const data = await res.json();
        setTestResolveResult(data);
      }
    } catch (e) {
      console.warn('Failed to test resolve:', e);
    }
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setSystemStatus(data);
      }
    } catch (e) {
      console.warn('Failed to fetch status:', e);
    }
  };

  const fetchShifts = async () => {
    try {
      const res = await fetch('/api/shifts/active');
      if (res.ok) {
        const data = await res.json();
        setActiveShifts(data.list || []);
      }
    } catch (e) {
      console.warn('Failed to fetch active shifts:', e);
    }
  };

  const fetchLeaderboard = async (page = 1) => {
    try {
      const res = await fetch(`/api/shifts/leaderboard?page=${page}`);
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data);
        setLbPage(data.page);
      }
    } catch (e) {
      console.warn('Failed to fetch leaderboard:', e);
    }
  };

  const handleExecuteTerminal = async () => {
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim();
    setTerminalHistory(prev => [...prev, { type: 'input', cmd }]);
    setTerminalInput('');

    try {
      const parts = cmd.split(' ');
      const commandName = parts[0];
      const args = parts.slice(1);

      const res = await fetch('/api/command/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: commandName, args })
      });

      const data = await res.json();
      if (data.success && data.output) {
        setTerminalHistory(prev => [...prev, {
          type: 'response',
          content: data.output.content,
          embeds: data.output.embeds
        }]);
      } else {
        setTerminalHistory(prev => [...prev, {
          type: 'error',
          text: data.error || 'Command executed with no output.'
        }]);
      }
    } catch (err: any) {
      setTerminalHistory(prev => [...prev, {
        type: 'error',
        text: `Error executing command: ${err.message}`
      }]);
    }
  };

  const handleInGameCommand = async () => {
    if (!inGameCmdInput.trim()) return;
    const cmd = inGameCmdInput.trim();
    try {
      const res = await fetch('/api/erlc/ingame-shift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd, robloxId: '2056966914', username: 'carlos473' })
      });
      const data = await res.json();
      setInGameLog(prev => [`[${new Date().toLocaleTimeString()}] ${cmd} -> ${data.success ? 'Success' : data.error || 'Processed'}`, ...prev]);
      fetchShifts();
    } catch (err: any) {
      setInGameLog(prev => [`[Error] ${err.message}`, ...prev]);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#1e1f22] text-[#dbdee1] font-sans overflow-hidden">
      {/* Discord Left Navigation Sidebar */}
      <div className="w-18 bg-[#1e1f22] flex flex-col items-center py-3 gap-3 border-r border-[#111214] select-none z-20">
        <div className="w-12 h-12 rounded-2xl bg-[#00a8ff] flex items-center justify-center text-white font-extrabold shadow-lg shadow-[#00a8ff]/30 cursor-pointer hover:rounded-xl transition-all">
          WV
        </div>
        <div className="w-8 h-[2px] bg-[#35363c] rounded" />

        <button
          onClick={() => setActiveTab('sessions')}
          title="Sessions Panel"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'sessions' ? 'bg-[#00a8ff] text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-[#b5bac1] hover:bg-[#00a8ff]/80 hover:text-white hover:rounded-xl'
          }`}
        >
          <Server className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          title="Support Center & Tickets"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'tickets' ? 'bg-[#00a8ff] text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-[#b5bac1] hover:bg-[#00a8ff]/80 hover:text-white hover:rounded-xl'
          }`}
        >
          <Ticket className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('shifts')}
          title="Active Shifts & Quotas"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'shifts' ? 'bg-[#00a8ff] text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-[#b5bac1] hover:bg-[#00a8ff]/80 hover:text-white hover:rounded-xl'
          }`}
        >
          <Clock className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          title="15-Question Applications"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'applications' ? 'bg-[#00a8ff] text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-[#b5bac1] hover:bg-[#00a8ff]/80 hover:text-white hover:rounded-xl'
          }`}
        >
          <FileText className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          title="Marketplace & Terms of Service"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'marketplace' ? 'bg-[#00a8ff] text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-[#b5bac1] hover:bg-[#00a8ff]/80 hover:text-white hover:rounded-xl'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('infractions')}
          title="Infractions (INF) & Promotions (PRO)"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'infractions' ? 'bg-[#00a8ff] text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-[#b5bac1] hover:bg-[#00a8ff]/80 hover:text-white hover:rounded-xl'
          }`}
        >
          <Shield className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('training')}
          title="Staff Academy & Training Log"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'training' ? 'bg-[#00a8ff] text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-[#b5bac1] hover:bg-[#00a8ff]/80 hover:text-white hover:rounded-xl'
          }`}
        >
          <Folder className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('departments')}
          title="Departments Panel"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'departments' ? 'bg-[#00a8ff] text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-[#b5bac1] hover:bg-[#00a8ff]/80 hover:text-white hover:rounded-xl'
          }`}
        >
          <Award className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('antiping')}
          title="Anti-Ping Leadership Shield"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'antiping' ? 'bg-amber-500 text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-amber-400 hover:bg-amber-500 hover:text-white hover:rounded-xl'
          }`}
        >
          <ShieldAlert className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('afk')}
          title="AFK & Auto-Nickname System"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'afk' ? 'bg-indigo-500 text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-indigo-400 hover:bg-indigo-500 hover:text-white hover:rounded-xl'
          }`}
        >
          <Moon className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('welcome')}
          title="Automatic Welcome System"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'welcome' ? 'bg-emerald-500 text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-emerald-400 hover:bg-emerald-500 hover:text-white hover:rounded-xl'
          }`}
        >
          <UserPlus className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('boost')}
          title="Server Boost & Repping Notifications"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'boost' ? 'bg-pink-500 text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-pink-400 hover:bg-pink-500 hover:text-white hover:rounded-xl'
          }`}
        >
          <Sparkles className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          title="Roblox & Bloxlink Verification"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'verification' ? 'bg-[#00e5ff] text-[#021226] font-bold rounded-xl shadow-md' : 'bg-[#2b2d31] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#021226] hover:rounded-xl'
          }`}
        >
          <Link2 className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('workflows')}
          title="Ticket Workflows & Fast-Pass System"
          className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'workflows' ? 'bg-amber-400 text-black font-bold rounded-xl shadow-md' : 'bg-[#2b2d31] text-amber-400 hover:bg-amber-400 hover:text-black hover:rounded-xl'
          }`}
        >
          <Zap className="w-5 h-5" />
        </button>

        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('banners')}
            title="WVRP Banner Configuration & .env System"
            className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'banners' ? 'bg-[#00a8ff] text-white rounded-xl shadow-md' : 'bg-[#2b2d31] text-[#b5bac1] hover:bg-[#00a8ff]/80 hover:text-white hover:rounded-xl'
            }`}
          >
            <Layers className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            title="Interactive Command Terminal"
            className={`w-12 h-12 rounded-3xl flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'terminal' ? 'bg-[#5865f2] text-white rounded-xl' : 'bg-[#2b2d31] text-[#b5bac1] hover:bg-[#5865f2] hover:text-white hover:rounded-xl'
            }`}
          >
            <Terminal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Discord Channel List Sidebar */}
      <div className="w-60 bg-[#2b2d31] flex flex-col border-r border-[#1f2023] select-none">
        <div className="h-12 px-4 border-b border-[#1f2023] flex items-center justify-between font-bold text-white shadow-sm">
          <span className="truncate">West Virginia Roleplay</span>
          <ChevronDown className="w-4 h-4 text-[#949ba4]" />
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          <div>
            <div className="text-[11px] font-bold text-[#949ba4] px-2 uppercase tracking-wider mb-1">Community Channels</div>
            <div
              onClick={() => setActiveTab('sessions')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'sessions' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">📢</span>
              <span>sessions</span>
            </div>
            <div
              onClick={() => setActiveTab('tickets')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'tickets' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">🎫</span>
              <span>support-center</span>
            </div>
            <div
              onClick={() => setActiveTab('applications')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'applications' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">📝</span>
              <span>applications</span>
            </div>
            <div
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'marketplace' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">🛒</span>
              <span>marketplace</span>
            </div>
            <div
              onClick={() => setActiveTab('departments')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'departments' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">👮</span>
              <span>departments</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[#949ba4] px-2 uppercase tracking-wider mb-1">Staff Category</div>
            <div
              onClick={() => setActiveTab('shifts')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'shifts' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">⏱</span>
              <span>active-shifts</span>
            </div>
            <div
              onClick={() => setActiveTab('infractions')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'infractions' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">⚖️</span>
              <span>infractions-log</span>
            </div>
            <div
              onClick={() => setActiveTab('training')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'training' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">📁</span>
              <span>training-announcements</span>
            </div>
            <div
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">📋</span>
              <span>staff-dashboard</span>
            </div>
            <div
              onClick={() => setActiveTab('feedback')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'feedback' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">⭐</span>
              <span>staff-feedback</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[#949ba4] px-2 uppercase tracking-wider mb-1">Community Automation</div>
            <div
              onClick={() => setActiveTab('welcome')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'welcome' ? 'bg-[#35373c] text-emerald-400 font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">👋</span>
              <span>welcome-system</span>
            </div>
            <div
              onClick={() => setActiveTab('boost')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'boost' ? 'bg-[#35373c] text-pink-400 font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">🚀</span>
              <span>server-boost-repping</span>
            </div>
            <div
              onClick={() => setActiveTab('verification')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'verification' ? 'bg-[#35373c] text-[#00e5ff] font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">🔗</span>
              <span>roblox-bloxlink-verify</span>
            </div>
            <div
              onClick={() => setActiveTab('workflows')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'workflows' ? 'bg-[#35373c] text-amber-400 font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">⚡</span>
              <span>ticket-workflows-fastpass</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[#949ba4] px-2 uppercase tracking-wider mb-1">Automation &amp; Security</div>
            <div
              onClick={() => setActiveTab('antiping')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'antiping' ? 'bg-[#35373c] text-amber-400 font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">🛡️</span>
              <span>anti-ping</span>
            </div>
            <div
              onClick={() => setActiveTab('afk')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'afk' ? 'bg-[#35373c] text-indigo-400 font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">💤</span>
              <span>afk-system</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[#949ba4] px-2 uppercase tracking-wider mb-1">Configuration &amp; .env</div>
            <div
              onClick={() => setActiveTab('banners')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'banners' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">🖼️</span>
              <span>banner-system-env</span>
            </div>
            <div
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                activeTab === 'terminal' ? 'bg-[#35373c] text-white font-medium' : 'text-[#949ba4] hover:bg-[#35373c]/50 hover:text-[#dbdee1]'
              }`}
            >
              <span className="text-base">💻</span>
              <span>command-terminal</span>
            </div>
          </div>
        </div>

        {/* User Info Bar */}
        <div className="h-14 bg-[#232428] px-3 flex items-center justify-between border-t border-[#1f2023]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00a8ff] flex items-center justify-center text-xs font-bold text-white relative">
              C
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#23a55a] rounded-full border-2 border-[#232428]" />
            </div>
            <div className="flex flex-col text-xs leading-tight">
              <span className="font-semibold text-white">Carlos473</span>
              <span className="text-[#949ba4] text-[10px]">Senior High Rank</span>
            </div>
          </div>
          <Shield className="w-4 h-4 text-[#00a8ff]" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#313338] overflow-hidden">
        {/* Top Header Channel Bar */}
        <div className="h-12 border-b border-[#202225] px-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="text-[#949ba4] text-lg">#</span>
            <span className="capitalize">{activeTab.replace('-', ' ')}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#2b2d31] text-[#00a8ff] ml-2 font-mono">
              Prefix: -
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-[#23a55a]">
              <span className="w-2 h-2 rounded-full bg-[#23a55a] animate-pulse" />
              SQLite DB Online
            </span>
            <span className="px-2 py-1 rounded bg-[#2b2d31] text-[#949ba4]">
              {systemStatus?.commandsLoaded || '100+'} Commands
            </span>
          </div>
        </div>

        {/* Dynamic Panel Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: SESSIONS */}
          {activeTab === 'sessions' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Discord Message Container */}
              <div className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Automation</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 7:00 PM</span>
                  </div>

                  {/* Dual Banner Embed: New York Sessions exact reference adapted to WVRP */}
                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#00a8ff] max-w-xl">
                    {/* Top Banner */}
                    <img src="/banners/banner-sessions.svg" alt="Sessions Top Banner" className="w-full h-auto object-cover" />

                    <div className="p-4 space-y-4">
                      {/* Title with emblem */}
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🏙️</span>
                        <h2 className="text-lg font-bold text-white">West Virginia Sessions</h2>
                      </div>

                      {/* Description quote block */}
                      <div className="border-l-4 border-[#3f4147] pl-3 text-xs text-[#dbdee1] leading-relaxed">
                        Welcome to West Virginia Roleplay sessions. We run on a session-based operating system — sessions are managed by our Community Directive &amp; Management teams, but please don't demand a session management action be taken.
                      </div>

                      {/* In-Game Information Header */}
                      <div className="space-y-1.5 pt-2 border-t border-[#35373c]">
                        <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                          <span>📌</span>
                          <span>In-Game Information</span>
                        </div>
                        <div className="text-xs space-y-1 text-[#b5bac1]">
                          <div>Server Name: <span className="bg-[#1e1f22] text-white px-1.5 py-0.5 rounded font-mono text-[11px]">West Virginia Roleplay | Strict | Realistic</span></div>
                          <div>Server Join Code: <span className="bg-[#1e1f22] text-[#00a8ff] font-bold px-1.5 py-0.5 rounded font-mono text-[11px]">wvrp</span></div>
                          <div>Server Owner: <span className="bg-[#1e1f22] text-white px-1.5 py-0.5 rounded font-mono text-[11px]">WVRP_Management</span></div>
                        </div>
                      </div>

                      {/* Stats Badges */}
                      <div className="space-y-2 pt-2 border-t border-[#35373c]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-[#949ba4]" /> Player Count:
                          </span>
                          <span className="bg-[#1e1f22] text-white px-2 py-0.5 rounded text-xs font-medium">18 Players</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-[#949ba4]" /> In-Queue:
                          </span>
                          <span className="bg-[#1e1f22] text-white px-2 py-0.5 rounded text-xs font-medium">2 In Queue</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="bg-[#2b5282] text-white px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1.5">
                            🪪 Staff In-Game:
                          </span>
                          <span className="bg-[#1e1f22] text-white px-2 py-0.5 rounded text-xs font-medium">4 Staff</span>
                        </div>
                      </div>

                      {/* Action Buttons Row 1 */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button className="flex items-center gap-1.5 bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-semibold px-3 py-1.5 rounded transition-all cursor-pointer">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          Status: Online
                        </button>
                        <a
                          href="https://policeroleplay.community/join/wvrp"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-semibold px-3 py-1.5 rounded transition-all cursor-pointer"
                        >
                          Quick-Join <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => alert('Subscribed to Session Notifications role (@Sessions)!')}
                          className="flex items-center gap-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-semibold px-3 py-1.5 rounded transition-all cursor-pointer"
                        >
                          <Bell className="w-3 h-3" /> Session Notification
                        </button>
                      </div>

                      {/* Right Sub-buttons Row */}
                      <div className="flex flex-wrap gap-2 pt-1 border-t border-[#35373c]">
                        <button onClick={() => alert('Active Players in Server: 18 (Police: 8, Sheriff: 4, Civilians: 6)')} className="bg-[#383a40] hover:bg-[#474950] text-[#dbdee1] text-xs px-2.5 py-1 rounded cursor-pointer">
                          Players
                        </button>
                        <button onClick={() => alert('Queue: 2 players waiting')} className="bg-[#383a40] hover:bg-[#474950] text-[#dbdee1] text-xs px-2.5 py-1 rounded cursor-pointer">
                          Queue
                        </button>
                        <button onClick={() => alert('In-Game Staff: 4 moderators on duty')} className="bg-[#383a40] hover:bg-[#474950] text-[#dbdee1] text-xs px-2.5 py-1 rounded cursor-pointer">
                          Staff
                        </button>
                        <button
                          onClick={() => alert('Session vote recorded! Vote count: 13/10 required.')}
                          className="bg-[#00a8ff] hover:bg-[#0090db] text-white font-bold text-xs px-3 py-1 rounded cursor-pointer shadow"
                        >
                          Session Vote
                        </button>
                      </div>
                    </div>

                    {/* Bottom Banner */}
                    <img src="/banners/wvrp-banner-bottom.svg" alt="WVRP Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUPPORT TICKETS & GROQ AI ASSISTANT */}
          {activeTab === 'tickets' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Ticket Panel Recreation: Screenshot_2026-11-07_204603_4bfacbda.png */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Automation</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 7:04 PM</span>
                  </div>

                  {/* Dual Banner Ticket Center Embed */}
                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#00a8ff] max-w-xl">
                    <img src="/banners/banner-assistance.svg" alt="Ticket Top Banner" className="w-full h-auto object-cover" />

                    <div className="p-4 space-y-4">
                      <div className="text-xs text-[#dbdee1] leading-relaxed">
                        Welcome to the 🎫 <strong>West Virginia Support Center</strong>! Click <strong>Get Support</strong> and our system will direct your ticket to the right place!
                      </div>

                      {/* Support Options list */}
                      <div className="space-y-1.5 pt-1">
                        <div className="font-bold text-white text-sm">Support Options</div>
                        <ul className="text-xs space-y-1 text-[#b5bac1]">
                          <li>🔲 <strong>Discord Reports</strong> — For reporting a Discord member for breaking server rules.</li>
                          <li>🔲 <strong>General Support</strong> — For general questions and concerns not related to staff.</li>
                          <li>🔲 <strong>Internal Affairs / Reports</strong> — For reporting staff members or handling IA matters.</li>
                          <li>🔲 <strong>Management Tickets</strong> — For giveaways, partnerships, server proposals, or reporting IA+ members.</li>
                          <li>🔲 <strong>LT Support</strong> — For extensive issues such as reporting SHRs, major bugs, or server raids.</li>
                          <li>🔲 <strong>Department Coordination</strong> — For coordinating between in-game departments.</li>
                          <li>🔲 <strong>Purchase Redemption</strong> — For redeeming purchases made from the WVRP Marketplace.</li>
                        </ul>
                      </div>

                      {/* Guidelines list */}
                      <div className="space-y-1 pt-1 border-t border-[#35373c]">
                        <div className="font-bold text-white text-sm">Guidelines</div>
                        <ul className="text-xs space-y-0.5 text-[#b5bac1] list-disc list-inside">
                          <li>Please be respectful to the handler</li>
                          <li>Please do not constantly ping staff</li>
                          <li>Please give clear information upon opening</li>
                          <li>Please do not mis-use the ticket system</li>
                        </ul>
                      </div>

                      {/* Dropdown 1: FAQ */}
                      <div className="space-y-1 pt-2 border-t border-[#35373c]">
                        <label className="text-xs font-semibold text-[#b5bac1]">Frequently Asked Questions</label>
                        <select
                          value={ticketFaq}
                          onChange={(e) => setTicketFaq(e.target.value)}
                          className="w-full bg-[#1e1f22] text-[#dbdee1] text-xs px-3 py-2 rounded border border-[#3f4147] focus:outline-none focus:border-[#00a8ff]"
                        >
                          <option value="">Frequently Asked Questions</option>
                          <option value="apply">How do I apply for staff?</option>
                          <option value="dept">Can I open a new department?</option>
                          <option value="transfers">Are you accepting staff transfers/fast passes?</option>
                          <option value="sheriff">How do I join the sheriff team?</option>
                        </select>
                        {ticketFaq === 'apply' && (
                          <div className="p-2.5 rounded bg-[#1e1f22] text-xs text-[#00a8ff] border border-[#00a8ff]/30">
                            Staff applications are filled out directly in <strong>#applications</strong>. Answer the 15 questions and the result will be sent to you by DM.
                          </div>
                        )}
                        {ticketFaq === 'sheriff' && (
                          <div className="p-2.5 rounded bg-[#1e1f22] text-xs text-[#00a8ff] border border-[#00a8ff]/30">
                            The Sheriff Team is fully whitelisted for staff and certified department members. Joining staff is the primary path onto it.
                          </div>
                        )}
                      </div>

                      {/* Dropdown 2: Choose your category */}
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#b5bac1]">Choose your category</label>
                        <select
                          value={ticketCategory}
                          onChange={(e) => setTicketCategory(e.target.value)}
                          className="w-full bg-[#1e1f22] text-[#dbdee1] text-xs px-3 py-2 rounded border border-[#3f4147] focus:outline-none focus:border-[#00a8ff]"
                        >
                          <option value="">Choose your category</option>
                          <option value="General Support">⚙️ General Support</option>
                          <option value="High Rank Support">👤⚙️ High Rank Support</option>
                          <option value="Department Support">👮 Department Support</option>
                          <option value="Internal Affairs">🛡️ Internal Affairs / Reports</option>
                        </select>
                      </div>

                      {/* Button: Get Support */}
                      <button
                        onClick={() => setShowInquiryModal(true)}
                        className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold text-xs py-2.5 rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                      >
                        <Ticket className="w-4 h-4" /> Get Support
                      </button>
                    </div>

                    <img src="/banners/wvrp-banner-bottom.svg" alt="Ticket Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>

              {/* Opened Ticket Channel Simulator: Screenshot_2026-11-07_204950_b352ee92.png */}
              <div className="bg-[#2b2d31] border border-[#202225] rounded-lg p-5 space-y-4 max-w-xl">
                <div className="flex items-center justify-between border-b border-[#35373c] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm"># ticket-0850 (General Support)</span>
                    <span className="text-[10px] bg-[#00a8ff]/20 text-[#00a8ff] font-bold px-2 py-0.5 rounded">Active</span>
                  </div>
                  <div className="text-xs text-[#949ba4]">
                    AI Status: <strong className={aiControlStatus === 'HUMAN_TAKEOVER' ? 'text-[#f23f43]' : 'text-[#23a55a]'}>{aiControlStatus}</strong>
                  </div>
                </div>

                <div className="rounded border border-[#1f2023] bg-[#1e1f22] p-4 space-y-3">
                  <div className="text-xs font-bold text-[#5865f2]">@Support Team</div>
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <span>⚙️</span>
                    <span>General Support</span>
                  </div>
                  <div className="text-xs text-[#dbdee1]">
                    Hello <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Ronaldoiscat</span> thank you for reaching out to us. Please remain patient as one of our staff members comes to assist you.
                  </div>

                  <div className="text-xs space-y-1 text-[#b5bac1]">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>🎮</span> Roblox Information:
                    </div>
                    <div>Roblox Username: <a href="https://www.roblox.com/users/2056966914/profile" target="_blank" rel="noreferrer" className="text-[#00a8ff] hover:underline">[ronaldoiscat]</a></div>
                    <div>Roblox ID: <span className="font-mono">2056966914</span></div>
                    <div>Account Creation: Dec 3, 01:47 PM</div>
                  </div>

                  <div className="text-xs space-y-1 text-[#b5bac1]">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>💬</span> Discord Information:
                    </div>
                    <div>Discord Account: <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Ronaldoiscat</span></div>
                    <div>Discord ID: <span className="font-mono">1025813762684502168</span></div>
                    <div>Account Creation: Oct 1, 09:57 AM</div>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="font-bold text-white">What is your inquiry?</div>
                    <div className="bg-[#111214] p-2.5 rounded font-mono text-[11px] text-[#dbdee1]">
                      {ticketInquiry}
                    </div>
                  </div>

                  {/* Claim / Unclaim / Close / Escalate Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={() => setIsTicketClaimed(!isTicketClaimed)}
                      className={`text-xs font-bold px-3 py-1.5 rounded cursor-pointer transition-all ${
                        isTicketClaimed ? 'bg-[#da373c] hover:bg-[#ba2e33] text-white' : 'bg-[#248046] hover:bg-[#1a6334] text-white'
                      }`}
                    >
                      {isTicketClaimed ? 'Unclaim' : 'Claim'}
                    </button>
                    <button
                      onClick={() => setTicketClosed(true)}
                      className="bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-semibold px-3 py-1.5 rounded cursor-pointer"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => alert('Escalated to High Rank Support!')}
                      className="bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-semibold px-3 py-1.5 rounded cursor-pointer"
                    >
                      Escalate
                    </button>
                  </div>
                </div>

                {/* Groq AI Assistant Chat & Human Takeover Simulation */}
                <div className="space-y-2 pt-2 border-t border-[#35373c]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00a8ff]" /> Groq AI Support Assistant
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setAiControlStatus('PAUSED')}
                        className="text-[10px] bg-[#35373c] hover:bg-[#474950] px-2 py-0.5 rounded text-[#dbdee1] cursor-pointer"
                      >
                        Pause AI
                      </button>
                      <button
                        onClick={() => setAiControlStatus('HUMAN_TAKEOVER')}
                        className="text-[10px] bg-[#da373c]/30 hover:bg-[#da373c]/50 text-[#f23f43] px-2 py-0.5 rounded cursor-pointer font-bold"
                      >
                        Takeover
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto p-2 bg-[#1e1f22] rounded text-xs">
                    {aiChatLog.map((c, i) => (
                      <div key={i} className="space-y-0.5">
                        <span className="text-[10px] font-bold text-[#00a8ff]">{c.sender}:</span>
                        <div className="text-[#dbdee1] bg-[#2b2d31] p-2 rounded">{c.text}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask the ticket AI assistant..."
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && aiMessage.trim()) {
                          const msg = aiMessage.trim();
                          setAiChatLog(prev => [...prev, { sender: 'Carlos473', text: msg }]);
                          setAiMessage('');
                          // Mock / call real Groq assistant
                          fetch('/api/tickets/ai-reply', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ticketId: '0850', userMessage: msg })
                          })
                            .then(r => r.json())
                            .then(data => {
                              if (data.reply) {
                                setAiChatLog(prev => [...prev, { sender: 'WVRP Support AI', text: data.reply }]);
                              } else if (data.handedOff) {
                                setAiChatLog(prev => [...prev, { sender: 'WVRP Support AI', text: data.message }]);
                              }
                            });
                        }
                      }}
                      className="flex-1 bg-[#1e1f22] text-xs px-3 py-1.5 rounded border border-[#3f4147] focus:outline-none focus:border-[#00a8ff]"
                    />
                    <button
                      onClick={() => {
                        if (!aiMessage.trim()) return;
                        setAiChatLog(prev => [...prev, { sender: 'Staff @Carlos473', text: aiMessage, isStaff: true }]);
                        setAiControlStatus('HUMAN_TAKEOVER');
                        setAiMessage('');
                      }}
                      className="bg-[#248046] hover:bg-[#1a6334] text-white text-xs px-3 py-1.5 rounded cursor-pointer font-semibold"
                    >
                      Staff Reply
                    </button>
                  </div>
                </div>

                {/* Closed Ticket DM Result with Cookie API Transcript button */}
                {ticketClosed && (
                  <div className="p-4 rounded bg-[#1e1f22] border-l-4 border-l-[#00a8ff] space-y-2">
                    <div className="font-bold text-white text-sm">Ticket #0850 — General Support Closed</div>
                    <div className="text-xs text-[#b5bac1] leading-relaxed">
                      ↳ <strong>Handled By:</strong> @Carlos473<br />
                      ↳ <strong>Closed By:</strong> @Carlos473<br />
                      ⏰ <strong>Opened:</strong> 21m ago<br />
                      ⏰ <strong>Closed:</strong> Just now<br />
                      ⏳ <strong>Duration:</strong> 21m<br />
                      🎫 <strong>Messages Sent:</strong> {aiChatLog.length + 3} messages
                    </div>
                    <a
                      href="/transcripts/ticket-0850.html"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs px-3 py-1.5 rounded font-bold"
                    >
                      <ExternalLink className="w-3 h-3" /> Online Transcript
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SHIFT MANAGEMENT & QUOTAS */}
          {activeTab === 'shifts' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Active Shifts Layout */}
              <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#23a55a] max-w-xl">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#23a55a] animate-pulse" />
                    <h2 className="text-lg font-bold text-white">Active Shifts</h2>
                  </div>

                  <div className="text-xs text-[#949ba4] font-medium">
                    1 on shift · 1 on break
                  </div>

                  {/* List of active staff */}
                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#23a55a]" />
                        <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@unknown-user</span>
                        <span>·</span>
                        <span className="text-[#23a55a]">On Shift</span>
                      </div>
                      <div className="text-xs text-[#949ba4] pl-3 border-l-2 border-[#3f4147]">
                        ⏱ <strong>4d 6h 32m</strong> on shift · started 4 days ago · 0 breaks · 0 moderations
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#f0b232]" />
                        <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Evil Homer</span>
                        <span>·</span>
                        <span className="text-[#f0b232]">On Break</span>
                        <span className="bg-[#2b5282] text-white text-[10px] px-1 rounded">50/50</span>
                      </div>
                      <div className="text-xs text-[#949ba4] pl-3 border-l-2 border-[#3f4147]">
                        ⏱ <strong>2m</strong> on shift · started 3 days ago · 1 break · 0 moderations
                      </div>
                    </div>
                  </div>
                </div>

                <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-auto object-cover" />
              </div>

              {/* Shift Management Embed */}
              <div className="rounded-lg border border-[#202225] bg-[#2b2d31] p-5 space-y-4 max-w-xl">
                <div className="flex items-center justify-between border-b border-[#35373c] pb-2">
                  <div className="flex items-center gap-2">
                    <span>⏹</span>
                    <h3 className="font-bold text-white text-base">Shift Management</h3>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                    myShiftStatus === 'ON_SHIFT' ? 'bg-[#23a55a]/20 text-[#23a55a]' : myShiftStatus === 'ON_BREAK' ? 'bg-[#f0b232]/20 text-[#f0b232]' : 'bg-[#4e5058]/20 text-[#949ba4]'
                  }`}>
                    {myShiftStatus.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs space-y-2 text-[#b5bac1]">
                  <div>🪪 <strong>Staff Member:</strong> <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Carlos473</span></div>
                  <div>📌 <strong>Status:</strong> {myShiftStatus.replace('_', ' ')}</div>
                  <div>📅 <strong>This Week:</strong> 3h 0m of 3h 20m (90%) · 3 shifts</div>
                  <div>📈 <strong>Week Resets:</strong> in 17 hours</div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#35373c]">
                  <button
                    onClick={() => {
                      setMyShiftStatus('ON_SHIFT');
                      setMyShiftType('NORMAL');
                      alert('Normal shift started! Assigned On-Duty role.');
                    }}
                    className="bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer"
                  >
                    Start Shift
                  </button>
                  <button
                    onClick={() => {
                      setMyShiftStatus('ON_SHIFT');
                      setMyShiftType('50/50');
                      alert('50/50 shift started! Assigned On-Duty role.');
                    }}
                    className="bg-[#00a8ff] hover:bg-[#0090db] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer"
                  >
                    Start 50/50
                  </button>
                  <button
                    onClick={() => {
                      if (myShiftStatus === 'ON_SHIFT') {
                        setMyShiftStatus('ON_BREAK');
                        alert('On break! Assigned On-Break role.');
                      } else if (myShiftStatus === 'ON_BREAK') {
                        setMyShiftStatus('ON_SHIFT');
                        alert('Resumed shift! On-Duty role restored.');
                      }
                    }}
                    className="bg-[#f0b232] hover:bg-[#d69b26] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer"
                  >
                    {myShiftStatus === 'ON_BREAK' ? 'Resume Shift' : 'Break'}
                  </button>
                  <button
                    onClick={() => {
                      setMyShiftStatus('OFF_DUTY');
                      alert('Shift ended! Quota hours credited, roles removed.');
                    }}
                    className="bg-[#da373c] hover:bg-[#ba2e33] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer ml-auto"
                  >
                    End Shift
                  </button>
                </div>
              </div>

              {/* ER:LC In-Game Chat Shift Command Simulator */}
              <div className="rounded-lg border border-[#202225] bg-[#1e1f22] p-4 space-y-3 max-w-xl">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>🎮</span> ER:LC In-Game Chat Shift Commands Simulator
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inGameCmdInput}
                    onChange={(e) => setInGameCmdInput(e.target.value)}
                    placeholder=";shift start, ;shift 50/50, ;shift break, ;shift end"
                    className="flex-1 bg-[#2b2d31] text-xs px-3 py-1.5 rounded border border-[#3f4147] font-mono text-[#00a8ff]"
                  />
                  <button
                    onClick={handleInGameCommand}
                    className="bg-[#00a8ff] hover:bg-[#0090db] text-white text-xs px-3 py-1.5 rounded font-bold cursor-pointer"
                  >
                    Send In-Game
                  </button>
                </div>
                {inGameLog.length > 0 && (
                  <div className="p-2 bg-[#111214] rounded text-[11px] font-mono text-[#b5bac1] max-h-24 overflow-y-auto space-y-1">
                    {inGameLog.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Shift Leaderboard with Pagination */}
              <div className="rounded-lg border border-[#202225] bg-[#2b2d31] p-5 space-y-4 max-w-xl">
                <div className="flex items-center justify-between border-b border-[#35373c] pb-2">
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>🏆</span> Shift Leaderboard
                  </div>
                  <div className="text-xs text-[#949ba4]">Page {lbPage} of 5</div>
                </div>

                <div className="text-xs text-[#949ba4]">
                  This week · Nov 1 to Nov 8, 2026 · 3h 20m quota · resets in 17 hours
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#1e1f22] p-3 rounded text-[#b5bac1]">
                  <div>👥 <strong>Staff:</strong> 151</div>
                  <div>✅ <strong>Met Quota:</strong> 43</div>
                  <div>❌ <strong>Below Quota:</strong> 83</div>
                  <div>📅 <strong>Exempt, On Leave:</strong> 12</div>
                  <div className="col-span-2">⏱ <strong>Team Total:</strong> 14d 18h 5m</div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-[#23a55a] uppercase">Quota Met · 43</div>
                  <ol className="text-xs space-y-1.5 text-[#dbdee1] pl-4 list-decimal">
                    <li><span className="text-white font-medium">@Michaeljorden723</span> · 17h 16m · 110 mods</li>
                    <li><span className="text-white font-medium">@Lemonsourguy1</span> · 15h 8m · 14 mods</li>
                    <li><span className="text-white font-medium">@Mjlovesmilk24_Dev</span> · 13h 33m · 1 mod</li>
                    <li><span className="text-white font-medium">@Corpal01</span> · 11h 38m · 19 mods</li>
                    <li><span className="text-white font-medium">@Awesomeplaya541</span> · 11h 24m · 4 mods</li>
                  </ol>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#35373c]">
                  <button
                    disabled={lbPage <= 1}
                    onClick={() => fetchLeaderboard(lbPage - 1)}
                    className="bg-[#383a40] disabled:opacity-40 text-xs px-3 py-1 rounded cursor-pointer"
                  >
                    Previous Page
                  </button>
                  <button
                    disabled={lbPage >= 5}
                    onClick={() => fetchLeaderboard(lbPage + 1)}
                    className="bg-[#383a40] disabled:opacity-40 text-xs px-3 py-1 rounded cursor-pointer"
                  >
                    Next Page
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 15-QUESTION APPLICATIONS HUB */}
          {activeTab === 'applications' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Application Hub Recreation: Screenshot_2026-11-07_210452_927fd562.png */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Applications</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 7:08 AM</span>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#23a55a] max-w-xl">
                    <img src="/banners/banner-applications.svg" alt="Applications Top Banner" className="w-full h-auto object-cover" />

                    <div className="p-4 space-y-4">
                      <div className="text-xs text-[#dbdee1] leading-relaxed">
                        Welcome to the <strong>WVRP Application Hub</strong>. In this channel you can find all of our applications to apply to work for WVRP! Before applying ensure to read the rules and requirements. Good luck to all applicants!
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                          <span className="text-[#23a55a]">⏱</span>
                          <span>Rules &amp; Requirements</span>
                        </div>
                        <ul className="text-xs space-y-1 text-[#b5bac1]">
                          <li>🔲 Must be over 13 years old. (WVRP will not require you to provide your age)</li>
                          <li>🔲 Must answer in full detail and full sentences.</li>
                          <li>🔲 The use of Artificial Intelligence or external help is <strong>not</strong> allowed.</li>
                          <li>🔲 Must answer with good SPaG (Spelling and Grammar).</li>
                          <li>🔲 Applicants should not ask for applications to be read.</li>
                          <li>🔲 Must not have a bad history within WVRP or any PRC server.</li>
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-[#35373c]">
                        <button
                          onClick={() => {
                            setShowAppModal(true);
                            setAppStep(1);
                          }}
                          className="bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer transition-all"
                        >
                          &gt;&gt; Staff Application 🔗
                        </button>
                        <button
                          onClick={() => alert('Media applications opening soon!')}
                          className="bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer"
                        >
                          &gt;&gt; Media Application 🔗
                        </button>
                        <button
                          onClick={() => alert('Community Event Team (CET) applications opening soon!')}
                          className="bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer"
                        >
                          &gt;&gt; CET Application 🔗
                        </button>
                      </div>
                    </div>

                    <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>

              {/* Application Reviewer Channel Embed (when an application is submitted) */}
              {submittedApp && (
                <div className="bg-[#2b2d31] border border-[#202225] rounded-lg p-5 space-y-4 max-w-xl">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-2">
                    <div className="font-bold text-white text-sm">Reviewer Channel: Application #{submittedApp.appId}</div>
                    <span className="text-xs bg-[#5865f2] px-2 py-0.5 rounded text-white font-bold">Pending Review</span>
                  </div>

                  <div className="text-xs space-y-2 text-[#b5bac1]">
                    <div>👤 <strong>Applicant:</strong> <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Carlos473</span></div>
                    <div>🎮 <strong>Roblox Username:</strong> {submittedApp.answers[0] || 'carlos473'}</div>
                    <div className="p-2.5 rounded bg-[#1e1f22] border border-[#3f4147] text-white">
                      <strong>Sapling AI-Writing Score:</strong> {submittedApp.sapling?.score ?? 12}% AI Probability<br />
                      <span className="text-[#23a55a] text-[11px] font-medium">{submittedApp.sapling?.summary || 'Human writing indicators confirmed.'}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setAppReviewDecision('APPROVED')}
                      className="bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer"
                    >
                      Approve Application
                    </button>
                    <button
                      onClick={() => setAppReviewDecision('DENIED')}
                      className="bg-[#da373c] hover:bg-[#ba2e33] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer"
                    >
                      Deny Application
                    </button>
                  </div>

                  {appReviewDecision === 'APPROVED' && (
                    <div className="p-4 rounded bg-[#1e1f22] border-l-4 border-l-[#23a55a] space-y-2 text-xs">
                      <div className="font-bold text-white">Acceptance DM sent with Top &amp; Bottom Banners:</div>
                      <div className="text-[#b5bac1] italic">
                        "We would like to congratulate you on passing your application and becoming a Trainee within our server. Your dedication throughout your application has stood out to us, and has earned you a place in our community! Please be on the lookout in our training category for updates and training sessions from our training team, and feel free to ask any questions you may have. Once again, congratulations, and welcome to the team @Carlos473"
                      </div>
                    </div>
                  )}

                  {appReviewDecision === 'DENIED' && (
                    <div className="p-4 rounded bg-[#1e1f22] border-l-4 border-l-[#da373c] space-y-2 text-xs">
                      <div className="font-bold text-white">Denial DM sent with Top &amp; Bottom Banners:</div>
                      <div className="text-[#b5bac1] italic">
                        "Thank you for your interest in joining the West Virginia Roleplay Staff Team. After careful review, we regret to inform you that your application has been denied at this time. You may reapply in 14 days."
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: MARKETPLACE & 10 TERMS OF SERVICE */}
          {activeTab === 'marketplace' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Marketplace Recreation: Screenshot_2026-11-07_211552_5b9a1414.png */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Marketplace</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 7:01 AM</span>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#00a8ff] max-w-xl">
                    <img src="/banners/banner-marketplace.svg" alt="Marketplace Top Banner" className="w-full h-auto object-cover" />

                    <div className="p-4 space-y-4">
                      <div className="text-xs text-[#dbdee1] leading-relaxed">
                        The WVRP <strong>Marketplace</strong> is your one stop destination for supporting the community while getting your name, brand, or community noticed. Here, you can purchase <strong>paid advertisements</strong>, sponsor exciting <strong>giveaways</strong>, make <strong>donations</strong>, purchase exclusive <strong>memberships</strong>, and explore a variety of other ways to get involved.
                      </div>

                      {/* Marketplace Information Header with Terms of Service button */}
                      <div className="flex items-center justify-between p-3 rounded bg-[#1e1f22] border border-[#35373c]">
                        <div className="space-y-1 pr-2">
                          <div className="font-bold text-white text-xs flex items-center gap-1.5">
                            <span>🛒</span> Marketplace Information
                          </div>
                          <div className="text-[11px] text-[#949ba4] leading-tight">
                            Customers must comply with our TOS. Note: WVRP DOES NOT sell in-game ER:LC items.
                          </div>
                        </div>

                        {/* Exact Green Check Terms of Service button on right side */}
                        <button
                          onClick={() => setShowTosModal(true)}
                          className="bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-bold px-3 py-2 rounded flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Terms Of Service
                        </button>
                      </div>

                      {/* Offerings Menu Buttons */}
                      <div className="space-y-2 pt-1 border-t border-[#35373c]">
                        <button
                          onClick={() => alert('Viewing Paid Advertisements & Giveaways offerings')}
                          className="w-full text-left bg-[#383a40] hover:bg-[#474950] text-[#dbdee1] text-xs font-semibold px-3 py-2 rounded flex items-center justify-between cursor-pointer"
                        >
                          <span>&gt;&gt; Paid Advertisements &amp; Giveaways</span>
                          <span className="text-[10px] text-[#949ba4]">500-1500 R$</span>
                        </button>

                        <button
                          onClick={() => alert('Viewing Packages & Donations')}
                          className="w-full text-left bg-[#383a40] hover:bg-[#474950] text-[#dbdee1] text-xs font-semibold px-3 py-2 rounded flex items-center justify-between cursor-pointer"
                        >
                          <span>&gt;&gt; Packages &amp; Donations</span>
                          <span className="text-[10px] text-[#949ba4]">500-1500 R$</span>
                        </button>

                        <button
                          onClick={() => alert('Viewing Booster & Advanced Roleplayer Perks')}
                          className="w-full text-left bg-[#383a40] hover:bg-[#474950] text-[#dbdee1] text-xs font-semibold px-3 py-2 rounded flex items-center justify-between cursor-pointer"
                        >
                          <span>💎 Perks &amp; Rewards (100h In-Game &amp; Booster)</span>
                          <span className="text-[10px] text-[#949ba4]">Perks</span>
                        </button>

                        <a
                          href="https://wvrp-store.local"
                          target="_blank"
                          rel="noreferrer"
                          className="w-full text-left bg-[#383a40] hover:bg-[#474950] text-[#dbdee1] text-xs font-semibold px-3 py-2 rounded flex items-center justify-between cursor-pointer"
                        >
                          <span>🚀 Priority Postage</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: INFRACTIONS & PROMOTIONS */}
          {activeTab === 'infractions' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Infraction Embed Recreation: Screenshot_2026-11-07_212034_ff2409eb.png */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Automation</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 7:49 PM</span>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#da373c] max-w-xl">
                    <img src="/banners/banner-infractions.svg" alt="Infraction Top Banner" className="w-full h-auto object-cover" />

                    <div className="p-4 space-y-3">
                      <div className="space-y-1 text-xs">
                        <div>🪪 <strong>Staff Member:</strong> <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Dm0ney_4u</span></div>
                        <div>🛡️ <strong>Punishment:</strong> Verbal Warning</div>
                        <div>📎 <strong>Appealable:</strong> Yes</div>
                      </div>

                      <div className="pt-2 text-xs">
                        <div className="font-bold text-white">📌 Reason:</div>
                        <div className="text-[#dbdee1] pt-1">
                          Please dont dump staff cars in the river, that is considered trolling and such and is unprofessional.
                        </div>
                      </div>

                      <div className="pt-2 text-xs text-[#949ba4] flex items-center gap-2 border-t border-[#35373c]">
                        <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Blurryface_293</span>
                        <span>—</span>
                        <strong className="text-white">INF-0314</strong>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setShowAppealModal(true);
                            setAppealStep(1);
                          }}
                          className="bg-[#383a40] hover:bg-[#474950] text-[#dbdee1] font-semibold text-xs px-3 py-1.5 rounded cursor-pointer"
                        >
                          Appeal Infraction
                        </button>
                      </div>
                    </div>

                    <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>

              {/* Promotion Embed Recreation: Screenshot_2026-11-07_212407_a657a361.png */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Automation</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 5:13 PM</span>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#00a8ff] max-w-xl">
                    <img src="/banners/banner-promotions.svg" alt="Promotion Top Banner" className="w-full h-auto object-cover" />

                    <div className="p-4 space-y-3">
                      <div className="space-y-1 text-xs">
                        <div>🪪 <strong>Staff Member:</strong> <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@taranbatmann</span></div>
                        <div>🎖️ <strong>Promotion:</strong> <span className="text-[#e67e22] font-semibold">@Trial Administrator</span></div>
                      </div>

                      <div className="pt-2 text-xs">
                        <div className="font-bold text-white">📌 Reason:</div>
                        <div className="text-[#dbdee1] pt-1">Fast Pass</div>
                      </div>

                      <div className="pt-2 text-xs text-[#949ba4] flex items-center gap-2 border-t border-[#35373c]">
                        <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@literallyihn</span>
                        <span>—</span>
                        <strong className="text-white">PRO-0129</strong>
                      </div>
                    </div>

                    <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: TRAINING LOG & ANNOUNCEMENT */}
          {activeTab === 'training' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Training Announcement: Screenshot_2026-11-07_210922_1a6f8099.png */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Automation</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 7:10 PM</span>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#00a8ff] max-w-xl">
                    <img src="/banners/banner-training.svg" alt="Training Top Banner" className="w-full h-auto object-cover" />

                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2 font-bold text-white text-base">
                        <span>🎖️</span> Staff Training
                      </div>

                      <div className="text-xs text-[#dbdee1]">
                        {trainingStatus === 'ENDED' ? 'This training session has ended. Thank you to everyone who attended.' : 'A staff training session has been scheduled.'}
                      </div>

                      <div className="border-l-4 border-[#3f4147] pl-3 text-xs text-[#949ba4]">
                        You must complete a training within <strong>7 days</strong> of becoming a Trainee, otherwise it will result in an immediate termination.
                      </div>

                      <div className="space-y-1 text-xs pt-1">
                        <div className="font-bold text-white">How to attend</div>
                        <ol className="list-decimal list-inside text-[#b5bac1] space-y-0.5">
                          <li>Press <strong>Join Game</strong> below to load into the server</li>
                          <li>Go to the <strong>Police Team briefing room</strong> and wait for your trainer</li>
                          <li>Make sure you are wearing the <strong>staff uniform</strong></li>
                        </ol>
                      </div>

                      <div className="space-y-1 text-xs pt-2 border-t border-[#35373c] text-[#b5bac1]">
                        <div>🛡️ <strong>Trainer:</strong> <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Unk0wnS0ULLX</span></div>
                        <div>⏰ <strong>Started:</strong> 3 hours ago (7:10 PM)</div>
                        <div>📌 <strong>Status:</strong> {trainingStatus}</div>
                        <div>📅 <strong>Ended:</strong> 3 hours ago after 8 minutes</div>
                        <div>👥 <strong>Attending ({traineeCount}):</strong> {traineeCount === 0 ? 'Nobody yet' : '@Carlos473'}</div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-[#35373c]">
                        <button
                          disabled={trainingStatus === 'ENDED'}
                          onClick={() => setTraineeCount(c => c + 1)}
                          className="bg-[#248046] disabled:opacity-40 hover:bg-[#1a6334] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" /> Join Training
                        </button>
                        <button
                          onClick={() => setTrainingStatus(trainingStatus === 'SCHEDULED' ? 'IN_PROGRESS' : 'ENDED')}
                          className="bg-[#da373c] hover:bg-[#ba2e33] text-white text-xs font-bold px-3 py-1.5 rounded cursor-pointer"
                        >
                          {trainingStatus === 'SCHEDULED' ? 'Start Training' : 'End Training'}
                        </button>
                        <a
                          href="https://policeroleplay.community/join/wvrp"
                          target="_blank"
                          rel="noreferrer"
                          className="bg-[#383a40] hover:bg-[#474950] text-[#dbdee1] text-xs font-semibold px-3 py-1.5 rounded cursor-pointer flex items-center gap-1.5 ml-auto"
                        >
                          🎮 Join Game <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>

              {/* Training Log (Bottom Banner Only as specified): Screenshot_2026-11-07_212233_d18009e6.png */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Automation</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 3:25 PM</span>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#23a55a] max-w-xl">
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2 font-bold text-white text-base">
                        <span>📁</span> Training Log
                      </div>

                      <div className="space-y-1 text-xs text-[#b5bac1]">
                        <div>👤 <strong>Trainee:</strong> <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@MasRTC_v4</span> (honestly_mas)</div>
                        <div>🛡️ <strong>Trainer:</strong> <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Ronaldoiscat</span> (carlos473)</div>
                        <div>✅ <strong>Result:</strong> Passed</div>
                        <div>📅 <strong>Date:</strong> November 7, 2026 at 3:25 PM</div>
                      </div>

                      <div className="pt-2 text-xs border-t border-[#35373c]">
                        <div className="font-bold text-white">📌 Notes</div>
                        <div className="border-l-2 border-[#3f4147] pl-2 text-[#dbdee1] mt-1">Did overall good.</div>
                      </div>
                    </div>

                    {/* Bottom banner only as requested! */}
                    <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: DEPARTMENTS */}
          {activeTab === 'departments' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Departments Recreation: Screenshot_2026-11-07_211813_8f8c9b70.png */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Departments</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 2:29 PM</span>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#00a8ff] max-w-xl">
                    <img src="/banners/banner-departments.svg" alt="Departments Top Banner" className="w-full h-auto object-cover" />

                    <div className="p-4 space-y-4">
                      <div className="text-xs text-[#dbdee1] leading-relaxed">
                        Explore the various Departments within <strong>West Virginia Roleplay</strong>, each offering a unique role and experience within our community. Our departments provide opportunities to get involved, serve the community, and create immersive roleplay experiences. Find your place, build your career, and become part of something bigger.
                      </div>

                      <div className="border-l-4 border-[#3f4147] pl-3 text-xs text-[#949ba4] space-y-0.5">
                        <div>• One primary department at a time — Auxiliary departments are unlimited.</div>
                        <div>• Senior High Rank (SHR) — limited to one of Primary or auxiliary.</div>
                      </div>

                      {/* Department Cards */}
                      <div className="space-y-2 pt-2 border-t border-[#35373c]">
                        <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f22]">
                          <div>
                            <div className="text-xs font-bold text-white">⭐ West Virginia State Police</div>
                            <div className="text-[10px] text-[#949ba4]">Primary Department</div>
                          </div>
                          <button onClick={() => alert('WVSP tryout link')} className="bg-[#383a40] hover:bg-[#474950] text-xs px-3 py-1 rounded text-white flex items-center gap-1">
                            Join <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f22]">
                          <div>
                            <div className="text-xs font-bold text-white">⭐ Kanawha County Sheriff's Office</div>
                            <div className="text-[10px] text-[#949ba4]">Primary Department</div>
                          </div>
                          <button onClick={() => alert('KCSO tryout link')} className="bg-[#383a40] hover:bg-[#474950] text-xs px-3 py-1 rounded text-white flex items-center gap-1">
                            Join <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f22]">
                          <div>
                            <div className="text-xs font-bold text-white">🚑 Kanawha Fire &amp; EMS</div>
                            <div className="text-[10px] text-[#949ba4]">Primary / Auxiliary</div>
                          </div>
                          <button onClick={() => alert('EMS tryout link')} className="bg-[#383a40] hover:bg-[#474950] text-xs px-3 py-1 rounded text-white flex items-center gap-1">
                            Join <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded bg-[#1e1f22]">
                          <div>
                            <div className="text-xs font-bold text-white">💼 Manfredi Family</div>
                            <div className="text-[10px] text-[#949ba4]">Whitelisted Organization</div>
                          </div>
                          <button onClick={() => alert('Manfredi Family recruit link')} className="bg-[#383a40] hover:bg-[#474950] text-xs px-3 py-1 rounded text-white flex items-center gap-1">
                            Join <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: STAFF DASHBOARD & REGULATIONS */}
          {activeTab === 'dashboard' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Staff Dashboard Recreation */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Automation</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 10:00 AM</span>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#00a8ff] max-w-xl">
                    <img src="/banners/banner-dashboard.svg" alt="Dashboard Top Banner" className="w-full h-auto object-cover" />

                    <div className="p-4 space-y-4">
                      <div className="font-bold text-white text-base">Staff Dashboard</div>
                      <div className="text-xs text-[#dbdee1] leading-relaxed">
                        This dashboard serves as your central hub for staff resources, policies, procedures, and staff channels. Please review all materials carefully and stay informed of any updates to ensure the highest standards of professionalism.
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div className="font-bold text-white text-xs">Staff Resources</div>
                        <div className="flex flex-wrap gap-2">
                          <a href="https://melonly.xyz" target="_blank" rel="noreferrer" className="bg-[#383a40] hover:bg-[#474950] text-xs px-3 py-1.5 rounded text-white flex items-center gap-1.5">
                            Staff Panel (Melonly) <ExternalLink className="w-3 h-3" />
                          </a>
                          <a href="https://wvrp-guide.local" target="_blank" rel="noreferrer" className="bg-[#383a40] hover:bg-[#474950] text-xs px-3 py-1.5 rounded text-white flex items-center gap-1.5">
                            Staff Guide <ExternalLink className="w-3 h-3" />
                          </a>
                          <a href="https://www.roblox.com/groups/34567890" target="_blank" rel="noreferrer" className="bg-[#383a40] hover:bg-[#474950] text-xs px-3 py-1.5 rounded text-white flex items-center gap-1.5">
                            Roblox Group <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#949ba4] italic border-t border-[#35373c] pt-2">
                        By accepting a position on the West Virginia Roleplay Team, you agree to follow all staff policies, handbooks, and procedures. Staff members are expected to maintain professionalism, respect the chain of command, act with integrity, and represent the community positively at all times.
                      </div>
                    </div>

                    <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: STAFF FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Staff Feedback Recreation: Screenshot_2026-11-07_220650_2e8bd9d5.png */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00a8ff] flex items-center justify-center font-bold text-white shadow-md">
                  WV
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-[15px]">West Virginia Automation</span>
                    <span className="bg-[#5865f2] text-[10px] font-bold text-white px-1 py-0.2 rounded">BOT</span>
                    <span className="text-xs text-[#949ba4]">Today at 5:50 PM</span>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-[#202225] bg-[#2b2d31] shadow-xl border-l-4 border-l-[#00a8ff] max-w-xl">
                    <img src="/banners/banner-feedback.svg" alt="Feedback Top Banner" className="w-full h-auto object-cover" />

                    <div className="p-4 space-y-3">
                      <div className="font-bold text-white text-base">Staff Feedback</div>

                      <div className="space-y-1 text-xs text-[#b5bac1]">
                        <div>🪪 <strong>Staff Member:</strong> <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Lemonsourguy1</span></div>
                        <div>👤 <strong>Rated By:</strong> <span className="bg-[#3c4270] text-[#c9cdfb] px-1 rounded">@Merry Christmas</span></div>
                        <div>⭐ <strong>Rating:</strong> 5/5</div>
                      </div>

                      <div className="pt-2 text-xs border-t border-[#35373c]">
                        <div className="font-bold text-white">📌 Comment:</div>
                        <div className="text-[#dbdee1] pt-1">
                          helping me out with two difficult members highly recommend this server he should get a raise
                        </div>
                      </div>
                    </div>

                    <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: INTERACTIVE COMMAND TERMINAL */}
          {activeTab === 'terminal' && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-[#2b2d31] p-4 rounded-lg border border-[#202225] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#00a8ff]" />
                    Interactive Discord Bot Command Console
                  </div>
                  <div className="text-xs text-[#949ba4]">
                    Type any command: <code className="text-[#00a8ff]">-balance</code>, <code className="text-[#00a8ff]">-daily</code>, <code className="text-[#00a8ff]">/erlc info</code>, <code className="text-[#00a8ff]">/shift active</code>
                  </div>
                </div>

                {/* History Box */}
                <div className="bg-[#111214] p-4 rounded-lg font-mono text-xs max-h-96 overflow-y-auto space-y-3">
                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      {item.type === 'input' && (
                        <div className="text-[#00a8ff] flex items-center gap-2">
                          <span>&gt;</span>
                          <span className="font-bold">{item.cmd}</span>
                        </div>
                      )}
                      {item.type === 'response' && (
                        <div className="bg-[#1e1f22] p-3 rounded border-l-4 border-l-[#00a8ff] text-[#dbdee1] space-y-1">
                          {item.title && <div className="font-bold text-white">{item.title}</div>}
                          {item.desc && <div>{item.desc}</div>}
                          {item.content && <div>{item.content}</div>}
                          {item.embeds && item.embeds.map((e: any, ei: number) => (
                            <div key={ei} className="text-xs whitespace-pre-wrap">{e.description || e.title}</div>
                          ))}
                        </div>
                      )}
                      {item.type === 'error' && (
                        <div className="text-[#f23f43]">{item.text}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Command Input Bar */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleExecuteTerminal()}
                    placeholder="Enter bot command (e.g. -commands, -daily, -work, /erlc info, /shift active)"
                    className="flex-1 bg-[#1e1f22] text-xs px-3 py-2 rounded border border-[#3f4147] text-white focus:outline-none focus:border-[#00a8ff] font-mono"
                  />
                  <button
                    onClick={handleExecuteTerminal}
                    className="bg-[#00a8ff] hover:bg-[#0090db] text-white text-xs px-4 py-2 rounded font-bold cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Execute
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: WVRP BANNER CONFIGURATION & .ENV EXPLORER */}
          {activeTab === 'banners' && (
            <div className="max-w-5xl mx-auto space-y-6 pb-12">
              {/* Header Card */}
              <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#202225] space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#00a8ff]" />
                      WVRP Centralized Banner Configuration System
                    </h2>
                    <p className="text-xs text-[#949ba4] mt-0.5">
                      Individual top and bottom banner URL controls for every panel, announcement, ticket, shift, and DM.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-[#1e1f22] text-[#00a8ff] px-2.5 py-1 rounded font-mono border border-[#3f4147]">
                      65+ ENV VARS CONFIGURED
                    </span>
                    <button
                      onClick={() => fetchBanners()}
                      className="text-xs bg-[#35373c] hover:bg-[#404249] text-white px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Refresh
                    </button>
                  </div>
                </div>

                {/* Fallback Priority Visualizer */}
                <div className="bg-[#1e1f22] p-3.5 rounded-lg border border-[#383a40] space-y-2">
                  <div className="text-[11px] font-bold text-[#b5bac1] uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#00a8ff]" />
                    4-Level Banner Fallback Priority Engine
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-[#2b2d31] p-2.5 rounded border border-[#3f4147]">
                      <div className="text-[10px] text-[#23a55a] font-bold uppercase">Priority 1 (Highest)</div>
                      <div className="font-semibold text-white mt-0.5">Specific Message</div>
                      <div className="text-[11px] text-[#949ba4] truncate font-mono mt-0.5">*_[TYPE]_TOP_BANNER_URL</div>
                    </div>
                    <div className="bg-[#2b2d31] p-2.5 rounded border border-[#3f4147]">
                      <div className="text-[10px] text-[#00a8ff] font-bold uppercase">Priority 2</div>
                      <div className="font-semibold text-white mt-0.5">Specific System</div>
                      <div className="text-[11px] text-[#949ba4] truncate font-mono mt-0.5">*[SYSTEM]_TOP_BANNER_URL</div>
                    </div>
                    <div className="bg-[#2b2d31] p-2.5 rounded border border-[#3f4147]">
                      <div className="text-[10px] text-[#f0b232] font-bold uppercase">Priority 3</div>
                      <div className="font-semibold text-white mt-0.5">Global Fallback</div>
                      <div className="text-[11px] text-[#949ba4] truncate font-mono mt-0.5">TOP_BANNER_URL</div>
                    </div>
                    <div className="bg-[#2b2d31] p-2.5 rounded border border-[#3f4147]">
                      <div className="text-[10px] text-[#949ba4] font-bold uppercase">Priority 4 (Fallback)</div>
                      <div className="font-semibold text-white mt-0.5">Default Asset</div>
                      <div className="text-[11px] text-[#949ba4] truncate font-mono mt-0.5">/banners/*.svg local file</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Live Embed Previewer */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Embed Type Selector & Tester Controls */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#202225] space-y-3">
                    <div className="font-bold text-white text-sm flex items-center justify-between">
                      <span>Select Embed Type</span>
                      <span className="text-[11px] text-[#00a8ff] font-normal">
                        {bannerData?.resolvedList?.length || 51} Types
                      </span>
                    </div>

                    {/* Filter categories */}
                    <div className="flex flex-wrap gap-1 text-[11px]">
                      {['ALL', 'SESSIONS', 'TICKETS', 'TRAINING', 'APPLICATIONS', 'STAFF', 'MARKETPLACE', 'ERLC'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setBannerCategoryFilter(cat)}
                          className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                            bannerCategoryFilter === cat ? 'bg-[#00a8ff] text-white font-bold' : 'bg-[#1e1f22] text-[#949ba4] hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Type select */}
                    <select
                      value={selectedBannerType}
                      onChange={(e) => {
                        setSelectedBannerType(e.target.value);
                        handleTestResolve(e.target.value, testTopOverride, testBottomOverride);
                      }}
                      className="w-full bg-[#1e1f22] border border-[#3f4147] text-white text-xs p-2 rounded focus:outline-none focus:border-[#00a8ff]"
                    >
                      {(bannerData?.resolvedList || [])
                        .filter((item: any) => {
                          if (bannerCategoryFilter === 'ALL') return true;
                          return item.type.toUpperCase().includes(bannerCategoryFilter);
                        })
                        .map((item: any) => (
                          <option key={item.type} value={item.type}>
                            {item.type} {item.noTopBanner ? '(BOTTOM ONLY)' : ''}
                          </option>
                        ))}
                    </select>

                    {/* Active Variables for this Type */}
                    {(() => {
                      const activeItem = bannerData?.resolvedList?.find((i: any) => i.type === selectedBannerType);
                      return activeItem ? (
                        <div className="bg-[#1e1f22] p-3 rounded-lg border border-[#383a40] space-y-2 text-xs">
                          <div className="font-semibold text-white flex items-center justify-between">
                            <span>Variable Mapping Hierarchy</span>
                            {activeItem.noTopBanner && (
                              <span className="text-[10px] bg-[#f0b232]/20 text-[#f0b232] px-1.5 py-0.5 rounded font-bold">
                                Bottom Only Rule
                              </span>
                            )}
                          </div>

                          <div className="space-y-1.5 font-mono text-[11px]">
                            <div>
                              <div className="text-[10px] text-[#949ba4]">TOP BANNER HIERARCHY:</div>
                              {activeItem.noTopBanner ? (
                                <div className="text-[#f0b232] italic">Disabled by rule (TRAINING_RESULTS_BOTTOM_BANNER_URL only)</div>
                              ) : (
                                <div className="space-y-0.5 text-[#dbdee1]">
                                  <div>1. {activeItem.specificTopEnv || '(No specific top env)'}</div>
                                  <div>2. {activeItem.systemTopEnv || '(No system top env)'}</div>
                                  <div>3. TOP_BANNER_URL (Global)</div>
                                  <div>4. Local Default SVG</div>
                                </div>
                              )}
                            </div>

                            <div className="pt-1 border-t border-[#2b2d31]">
                              <div className="text-[10px] text-[#949ba4]">BOTTOM BANNER HIERARCHY:</div>
                              <div className="space-y-0.5 text-[#dbdee1]">
                                <div>1. {activeItem.specificBottomEnv || '(No specific bottom env)'}</div>
                                <div>2. {activeItem.systemBottomEnv || '(No system bottom env)'}</div>
                                <div>3. BOTTOM_BANNER_URL (Global)</div>
                                <div>4. Local Default SVG</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}

                    {/* Live Override Simulator */}
                    <div className="bg-[#1e1f22] p-3 rounded-lg border border-[#383a40] space-y-2.5">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#00a8ff]" />
                        Test Live Banner Override
                      </div>
                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="text-[10px] text-[#949ba4] block mb-1">Custom Top Banner URL (Level 1 Override):</label>
                          <input
                            type="text"
                            value={testTopOverride}
                            onChange={(e) => setTestTopOverride(e.target.value)}
                            placeholder="https://example.com/custom-top.png"
                            className="w-full bg-[#2b2d31] border border-[#3f4147] text-white p-1.5 rounded text-xs focus:outline-none focus:border-[#00a8ff] font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#949ba4] block mb-1">Custom Bottom Banner URL (Level 1 Override):</label>
                          <input
                            type="text"
                            value={testBottomOverride}
                            onChange={(e) => setTestBottomOverride(e.target.value)}
                            placeholder="https://example.com/custom-bottom.png"
                            className="w-full bg-[#2b2d31] border border-[#3f4147] text-white p-1.5 rounded text-xs focus:outline-none focus:border-[#00a8ff] font-mono"
                          />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => handleTestResolve(selectedBannerType, testTopOverride, testBottomOverride)}
                            className="flex-1 bg-[#00a8ff] hover:bg-[#0090db] text-white text-xs font-bold py-1.5 rounded transition-colors cursor-pointer"
                          >
                            Resolve & Verify
                          </button>
                          <button
                            onClick={() => {
                              setTestTopOverride('');
                              setTestBottomOverride('');
                              handleTestResolve(selectedBannerType, '', '');
                            }}
                            className="bg-[#35373c] hover:bg-[#404249] text-white text-xs px-3 py-1.5 rounded transition-colors cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>

                        {testResolveResult && (
                          <div className="bg-[#2b2d31] p-2 rounded text-[11px] space-y-1 font-mono border border-[#3f4147]">
                            <div className="text-[#23a55a] font-bold">Resolution Results:</div>
                            <div>Top Source: <span className="text-[#00a8ff]">{testResolveResult.topSource}</span></div>
                            <div>Bottom Source: <span className="text-[#00a8ff]">{testResolveResult.bottomSource}</span></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Live Discord Embed Preview */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#949ba4]">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#00a8ff]" />
                      Live Discord Coordinated Embed Preview
                    </span>
                    <span className="text-[11px]">Type: <code className="text-[#00a8ff] font-mono">{selectedBannerType}</code></span>
                  </div>

                  {(() => {
                    const activeItem = bannerData?.resolvedList?.find((i: any) => i.type === selectedBannerType);
                    const topBannerUrl = testTopOverride.trim().length > 0 ? testTopOverride : activeItem?.resolvedTop;
                    const bottomBannerUrl = testBottomOverride.trim().length > 0 ? testBottomOverride : activeItem?.resolvedBottom;
                    const isTrainingResult = activeItem?.noTopBanner;

                    return (
                      <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#202225] space-y-3">
                        {/* Discord Message Container */}
                        <div className="space-y-2">
                          {/* Top Banner Embed (If present) */}
                          {!isTrainingResult && topBannerUrl && (
                            <div className="bg-[#2b2d31] rounded-lg overflow-hidden border-l-4 border-l-[#00a8ff] shadow-sm">
                              <img
                                src={topBannerUrl}
                                alt="Top Banner"
                                className="w-full h-auto max-h-48 object-cover"
                                onError={(e: any) => {
                                  e.target.src = '/banners/wvrp-banner-top.svg';
                                }}
                              />
                            </div>
                          )}

                          {isTrainingResult && (
                            <div className="bg-[#f0b232]/10 border border-[#f0b232]/30 p-2.5 rounded-lg text-xs text-[#f0b232] flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                              <span>Training Results rule applied: Top banner is omitted as specified in configuration instructions.</span>
                            </div>
                          )}

                          {/* Content Embed with Bottom Banner Image */}
                          <div className="bg-[#2b2d31] rounded-lg overflow-hidden border-l-4 border-l-[#00a8ff] p-4 space-y-3 shadow-md">
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <div className="text-white font-bold text-sm">
                                  {selectedBannerType.replace(/_/g, ' ').toUpperCase()} — West Virginia Roleplay
                                </div>
                                <div className="text-xs text-[#dbdee1] leading-relaxed">
                                  This is a real-time preview of the <code className="text-[#00a8ff] font-mono">{selectedBannerType}</code> embed.
                                  Banners are automatically resolved through the centralized <code className="text-[#00a8ff] font-mono">resolveBanners()</code> helper using the strict 4-level fallback engine.
                                </div>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-[#1e1f22] border border-[#3f4147] flex items-center justify-center text-xs font-bold text-[#00a8ff]">
                                WVRP
                              </div>
                            </div>

                            {/* Sample fields */}
                            <div className="grid grid-cols-2 gap-2 text-xs bg-[#1e1f22]/60 p-2.5 rounded">
                              <div>
                                <span className="text-[#949ba4] block text-[10px]">CATEGORY</span>
                                <span className="font-semibold text-white uppercase">{selectedBannerType.split('_')[0]}</span>
                              </div>
                              <div>
                                <span className="text-[#949ba4] block text-[10px]">TIMESTAMP</span>
                                <span className="font-semibold text-white">Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </div>

                            {/* Bottom Banner Image */}
                            {bottomBannerUrl && (
                              <div className="rounded overflow-hidden pt-1">
                                <img
                                  src={bottomBannerUrl}
                                  alt="Bottom Banner"
                                  className="w-full h-auto max-h-36 object-cover rounded"
                                  onError={(e: any) => {
                                    e.target.src = '/banners/wvrp-banner-bottom.svg';
                                  }}
                                />
                              </div>
                            )}

                            {/* Footer */}
                            <div className="text-[11px] text-[#949ba4] pt-2 border-t border-[#383a40] flex items-center justify-between">
                              <span>West Virginia Roleplay · discord.gg/wvrp</span>
                              <span className="font-mono text-[10px]">ID: WVRP-SYS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Categorized Variable Reference Table */}
              <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#202225] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00a8ff]" />
                    Complete .env.example Variable Reference
                  </div>
                  <span className="text-xs text-[#949ba4]">
                    Click any key to copy
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {(bannerData?.resolvedList || []).map((item: any) => (
                    <div key={item.type} className="bg-[#1e1f22] p-2.5 rounded-lg border border-[#383a40] space-y-1.5 text-xs">
                      <div className="font-bold text-white flex items-center justify-between">
                        <span className="capitalize">{item.type.replace(/_/g, ' ')}</span>
                        {item.noTopBanner ? (
                          <span className="text-[9px] bg-[#f0b232]/20 text-[#f0b232] px-1 rounded">No Top</span>
                        ) : (
                          <span className="text-[9px] bg-[#23a55a]/20 text-[#23a55a] px-1 rounded">Dual Banner</span>
                        )}
                      </div>

                      <div className="space-y-1 font-mono text-[10px]">
                        {!item.noTopBanner && item.specificTopEnv && (
                          <div
                            onClick={() => {
                              navigator.clipboard?.writeText(item.specificTopEnv);
                              setCopiedEnvKey(item.specificTopEnv);
                              setTimeout(() => setCopiedEnvKey(null), 2000);
                            }}
                            className="flex items-center justify-between p-1 rounded bg-[#2b2d31] text-[#dbdee1] hover:text-[#00a8ff] cursor-pointer"
                          >
                            <span className="truncate">{item.specificTopEnv}</span>
                            {copiedEnvKey === item.specificTopEnv ? <Check className="w-3 h-3 text-[#23a55a]" /> : <Copy className="w-3 h-3 text-[#949ba4]" />}
                          </div>
                        )}
                        {item.specificBottomEnv && (
                          <div
                            onClick={() => {
                              navigator.clipboard?.writeText(item.specificBottomEnv);
                              setCopiedEnvKey(item.specificBottomEnv);
                              setTimeout(() => setCopiedEnvKey(null), 2000);
                            }}
                            className="flex items-center justify-between p-1 rounded bg-[#2b2d31] text-[#dbdee1] hover:text-[#00a8ff] cursor-pointer"
                          >
                            <span className="truncate">{item.specificBottomEnv}</span>
                            {copiedEnvKey === item.specificBottomEnv ? <Check className="w-3 h-3 text-[#23a55a]" /> : <Copy className="w-3 h-3 text-[#949ba4]" />}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANTI-PING LEADERSHIP SYSTEM */}
          {activeTab === 'antiping' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-[#2b2d31] p-6 rounded-xl border border-[#1f2023] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        Anti-Ping Leadership Protection System
                        <span className="text-xs bg-[#23a55a]/20 text-[#23a55a] border border-[#23a55a]/40 px-2 py-0.5 rounded-full font-mono font-semibold">
                          ACTIVE
                        </span>
                      </h2>
                      <p className="text-xs text-[#949ba4]">
                        Automated Discord.js v14 leadership mention detection, message auto-deletion, 3-strike tier escalation, and 24h reset cooldown.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchAntiPing}
                    className="px-3 py-1.5 rounded bg-[#35373c] hover:bg-[#3f4147] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh State
                  </button>
                  <button
                    onClick={() => handleAntiPingAction('reset', simPingUser.id)}
                    className="px-3 py-1.5 rounded bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/30 text-xs font-semibold transition cursor-pointer"
                  >
                    Reset Current User Strikes
                  </button>
                </div>
              </div>

              {/* 3-Tier Escalation Matrix & Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-2">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      Tier 1 Escalation
                    </span>
                    <span className="text-[11px] font-mono text-[#949ba4]">Strikes 1/3 - 3/3</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#b5bac1]">
                    <div className="flex justify-between">
                      <span className="text-[#949ba4]">Violations 1/3 - 2/3:</span>
                      <span className="font-semibold text-amber-400">Warning Embed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#949ba4]">Violation 3/3:</span>
                      <span className="font-bold text-red-400">10-Minute Timeout</span>
                    </div>
                    <div className="text-[11px] text-[#949ba4] pt-1 border-t border-[#35373c]/50">
                      Deletes offending ping message, issues warning embed with anti-ping instructional GIF.
                    </div>
                  </div>
                </div>

                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-2">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                      Tier 2 Escalation
                    </span>
                    <span className="text-[11px] font-mono text-[#949ba4]">Strikes 4/3 - 6/3</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#b5bac1]">
                    <div className="flex justify-between">
                      <span className="text-[#949ba4]">Violations 4/3 - 5/3:</span>
                      <span className="font-semibold text-orange-400">Warning Embed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#949ba4]">Violation 6/3:</span>
                      <span className="font-bold text-red-400">1-Hour Timeout</span>
                    </div>
                    <div className="text-[11px] text-[#949ba4] pt-1 border-t border-[#35373c]/50">
                      Escalates timeout duration to 60 minutes (`ANTI_PING_MUTE_TIER_2_MINUTES`).
                    </div>
                  </div>
                </div>

                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-2">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      Tier 3 &amp; Max Escalation
                    </span>
                    <span className="text-[11px] font-mono text-[#949ba4]">Strikes 7/3 - 9/3+</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#b5bac1]">
                    <div className="flex justify-between">
                      <span className="text-[#949ba4]">Violations 7/3 - 8/3:</span>
                      <span className="font-semibold text-red-400">Warning Embed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#949ba4]">Violation 9/3+:</span>
                      <span className="font-bold text-rose-500">24-Hour Timeout</span>
                    </div>
                    <div className="text-[11px] text-[#949ba4] pt-1 border-t border-[#35373c]/50">
                      Enforces maximum 24h Discord mute. Strikes automatically reset after 24 hours without infractions.
                    </div>
                  </div>
                </div>
              </div>

              {/* Protected Roles & .env.example Config Display */}
              <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#00a8ff]" />
                    Configured Leadership Role Targets (.env.example)
                  </span>
                  <span className="text-xs text-[#949ba4]">Configurable via comma-separated IDs or Role Names</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#1e1f22] rounded-lg border border-[#35373c] space-y-1">
                    <div className="text-amber-400 font-semibold">Foundership Team</div>
                    <div className="text-[11px] font-mono text-[#949ba4]">ANTI_PING_FOUNDERSHIP_ROLE_IDS</div>
                    <div className="text-white font-medium">Foundership, Server Owner, Co-Owner</div>
                  </div>
                  <div className="p-3 bg-[#1e1f22] rounded-lg border border-[#35373c] space-y-1">
                    <div className="text-cyan-400 font-semibold">Foundation Team</div>
                    <div className="text-[11px] font-mono text-[#949ba4]">ANTI_PING_FOUNDATION_TEAM_ROLE_IDS</div>
                    <div className="text-white font-medium">Foundation Team, High Rank Leadership</div>
                  </div>
                  <div className="p-3 bg-[#1e1f22] rounded-lg border border-[#35373c] space-y-1">
                    <div className="text-indigo-400 font-semibold">Directive Team</div>
                    <div className="text-[11px] font-mono text-[#949ba4]">ANTI_PING_DIRECTIVE_TEAM_ROLE_IDS</div>
                    <div className="text-white font-medium">Directive Team, Community Directive</div>
                  </div>
                </div>
              </div>

              {/* Interactive Simulation & Live Discord Embed Warning Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Simulator Controls */}
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-4">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Test &amp; Simulate Leadership Ping
                  </div>
                  <p className="text-xs text-[#949ba4]">
                    Simulate an unauthorized member mentioning a protected leadership role or replying to a leadership member.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-[#949ba4] block mb-1">Simulated Offending Member</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={simPingUser.username}
                          onChange={(e) => setSimPingUser({ ...simPingUser, username: e.target.value })}
                          className="flex-1 bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                          placeholder="Username"
                        />
                        <input
                          type="text"
                          value={simPingUser.id}
                          onChange={(e) => setSimPingUser({ ...simPingUser, id: e.target.value })}
                          className="w-32 bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white font-mono"
                          placeholder="User ID"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#949ba4] block mb-1">Target Leadership Role Pinged</label>
                      <select
                        value={simPingTeam}
                        onChange={(e) => setSimPingTeam(e.target.value)}
                        className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                      >
                        <option value="Foundership Team">Foundership Team</option>
                        <option value="Foundation Team">Foundation Team</option>
                        <option value="Directive Team">Directive Team</option>
                      </select>
                    </div>

                    <button
                      onClick={handleSimulateAntiPing}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      Simulate Pinging @{simPingTeam}
                    </button>
                  </div>

                  {simPingResult && (
                    <div className="p-3 bg-[#1e1f22] rounded-lg border border-[#35373c] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">Detection Result:</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          simPingResult.punishment.type === 'MUTE' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {simPingResult.punishment.type === 'MUTE' ? `MUTED (${simPingResult.punishment.durationMinutes}m)` : 'WARNING ISSUED'}
                        </span>
                      </div>
                      <div className="text-[#949ba4] flex justify-between">
                        <span>Current Strike Count:</span>
                        <span className="font-bold text-white">{simPingResult.strikeCount} strike(s) ({simPingResult.tierProgress} of 3 in current tier)</span>
                      </div>
                      <div className="text-[#949ba4] flex justify-between">
                        <span>Offending Message:</span>
                        <span className="text-rose-400 font-semibold">Deleted from channel</span>
                      </div>
                      <div className="text-[11px] text-[#949ba4] border-t border-[#35373c] pt-1">
                        {simPingResult.punishment.punishmentText}
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Discord Warning Embed */}
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                  <div className="font-bold text-white text-sm flex items-center justify-between">
                    <span>Live Discord Warning Embed Preview</span>
                    <span className="text-[11px] text-[#949ba4] font-normal">Rendered in Discord Channel</span>
                  </div>

                  {/* Discord Message Shell */}
                  <div className="bg-[#313338] p-4 rounded-lg border border-[#232428] space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#00a8ff] flex items-center justify-center text-xs font-bold text-white">
                        WV
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">WVRP Security</span>
                        <span className="bg-[#5865f2] text-[10px] text-white px-1 py-0.2 rounded font-bold">BOT</span>
                        <span className="text-[11px] text-[#949ba4]">Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    {/* Discord Embed with Amber/Red Left Border */}
                    <div className="border-l-4 border-amber-500 bg-[#2b2d31] p-4 rounded-r-lg space-y-3 shadow-inner">
                      <div className="text-base font-bold text-white flex items-center gap-2">
                        <span>⚠️ Please Don't Ping</span>
                      </div>
                      <div className="text-xs text-[#dbdee1] leading-relaxed">
                        Please do not ping members of the <strong className="text-white">{simPingTeam}</strong> directly.
                        Our leadership team receives heavy volumes of inquiries. If you have an urgent inquiry or require assistance, please open an official support ticket in <span className="text-[#00a8ff] cursor-pointer">#support-tickets</span>.
                      </div>

                      {/* Strike Counter Field */}
                      <div className="bg-[#1e1f22] p-2.5 rounded border border-[#3f4147] text-xs">
                        <div className="text-[11px] font-bold text-[#949ba4] uppercase tracking-wider mb-0.5">Strikes Today</div>
                        <div className="text-white font-medium">
                          {simPingResult ? (
                            <>
                              <span className="font-bold text-amber-400">{simPingResult.tierProgress}/3 today</span>. Reach 3 and you'll be muted for {simPingResult.strikeCount >= 6 ? '24 hours' : simPingResult.strikeCount >= 3 ? '1 hour' : '10 minutes'}.
                            </>
                          ) : (
                            <>
                              <span className="font-bold text-amber-400">1/3 today</span>. Reach 3 and you'll be muted for 10 minutes.
                            </>
                          )}
                        </div>
                      </div>

                      {/* Anti-Ping GIF Attachment Preview */}
                      <div className="rounded-lg overflow-hidden border border-[#3f4147] bg-[#1e1f22] p-2 text-center">
                        <div className="text-[11px] text-[#949ba4] mb-1 font-mono">Instructional Guidance Asset</div>
                        <img
                          src="https://media.discordapp.net/attachments/1554305957465690113/1568899307250126899/anti_ping.gif"
                          alt="Anti-Ping Guidance"
                          onError={(e: any) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                          className="max-h-36 mx-auto rounded shadow"
                        />
                        <div style={{ display: 'none' }} className="py-6 text-xs text-[#949ba4] italic">
                          [Instructional Anti-Ping GIF: Turn off reply ping toggle before replying to staff]
                        </div>
                      </div>

                      <div className="text-[10px] text-[#949ba4] flex items-center justify-between pt-1 border-t border-[#35373c]">
                        <span>West Virginia Roleplay • Leadership Anti-Ping Shield</span>
                        <span>24h Reset Window</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Strikes Database Table & Audit Logs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Strikes in Database */}
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Active Member Strikes (anti_ping_strikes)</span>
                    <span className="text-xs text-[#949ba4]">Persisted in SQLite</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-[#35373c] text-[#949ba4]">
                          <th className="py-2">User</th>
                          <th className="py-2">Strikes</th>
                          <th className="py-2">Tier</th>
                          <th className="py-2">Last Violation</th>
                          <th className="py-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#35373c]/50">
                        {antiPingRecords?.strikes?.length > 0 ? (
                          antiPingRecords.strikes.map((s: any) => (
                            <tr key={s.user_id} className="hover:bg-[#35373c]/30">
                              <td className="py-2 font-medium text-white">{s.user_tag || s.user_id}</td>
                              <td className="py-2">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  s.strikes >= 3 ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                                }`}>
                                  {s.strikes}
                                </span>
                              </td>
                              <td className="py-2 text-[#b5bac1]">Tier {s.tier || 1}</td>
                              <td className="py-2 text-[#949ba4] text-[11px]">{new Date(s.last_violation).toLocaleTimeString()}</td>
                              <td className="py-2 text-right">
                                <button
                                  onClick={() => handleAntiPingAction('reset', s.user_id)}
                                  className="px-2 py-1 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded text-[10px] font-bold cursor-pointer transition"
                                >
                                  Reset
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-4 text-center text-[#949ba4]">
                              No active strikes recorded. Leadership roles are protected!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Audit Logs */}
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Security Audit Logs (anti_ping_logs)</span>
                    <span className="text-xs text-[#949ba4]">#anti-ping-logs</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {antiPingRecords?.logs?.length > 0 ? (
                      antiPingRecords.logs.map((log: any) => (
                        <div key={log.id} className="p-2.5 rounded bg-[#1e1f22] border border-[#35373c] text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{log.user_tag || log.user_id}</span>
                            <span className="text-[10px] text-[#949ba4]">{new Date(log.created_at).toLocaleTimeString()}</span>
                          </div>
                          <div className="text-[#949ba4] text-[11px]">
                            Target: <span className="text-amber-400">{log.role_name || 'Leadership Role'}</span> • Strike: <span className="text-white font-bold">{log.strike_count}</span>
                          </div>
                          <div className="text-[11px] text-[#dbdee1]">
                            Punishment: <span className="font-semibold text-red-400">{log.punishment}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-[#949ba4]">
                        No anti-ping incidents logged yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: AFK SYSTEM & AUTO-NICKNAME */}
          {activeTab === 'afk' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-[#2b2d31] p-6 rounded-xl border border-[#1f2023] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      <Moon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        AFK &amp; Auto-Nickname System
                        <span className="text-xs bg-[#23a55a]/20 text-[#23a55a] border border-[#23a55a]/40 px-2 py-0.5 rounded-full font-mono font-semibold">
                          ONLINE
                        </span>
                      </h2>
                      <p className="text-xs text-[#949ba4]">
                        Automatic Discord server nickname prefixing (`AFK | `), 32-character boundary protection, mention notifications, and return summaries.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchAfk}
                    className="px-3 py-1.5 rounded bg-[#35373c] hover:bg-[#3f4147] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh Roster
                  </button>
                </div>
              </div>

              {/* User Controller & Nickname Manager */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AFK Toggle Card */}
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-3">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <UserX className="w-4 h-4 text-indigo-400" />
                      Your AFK Controller &amp; Discord Nickname
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      myAfkActive ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-gray-600/30 text-gray-400'
                    }`}>
                      {myAfkActive ? 'CURRENTLY AFK' : 'ACTIVE / AVAILABLE'}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-[#1e1f22] rounded-lg border border-[#35373c] space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#949ba4]">Original Nickname:</span>
                        <span className="font-mono text-white font-semibold">{myOriginalNickname}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#949ba4]">Server Nickname:</span>
                        <span className={`font-mono font-bold ${myAfkActive ? 'text-indigo-400' : 'text-[#23a55a]'}`}>
                          {myCurrentNickname}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-[#949ba4] border-t border-[#35373c]/50 pt-1.5">
                        <span>Discord 32-Char Limit Safety:</span>
                        <span className="text-[#23a55a] font-semibold">{myCurrentNickname.length}/32 chars (Safe)</span>
                      </div>
                    </div>

                    {!myAfkActive ? (
                      <div className="space-y-2">
                        <label className="text-[#949ba4] block">Set AFK Reason (Commands: <code>!afk [reason]</code> or <code>/afk</code>)</label>
                        <input
                          type="text"
                          value={myAfkReason}
                          onChange={(e) => setMyAfkReason(e.target.value)}
                          placeholder="e.g. Taking a dinner break, studying..."
                          className="w-full bg-[#1e1f22] p-2.5 rounded border border-[#3f4147] text-white"
                        />
                        <button
                          onClick={handleToggleAfk}
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <Moon className="w-4 h-4" />
                          Set AFK Status &amp; Update Nickname
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="p-3 bg-indigo-950/40 border border-indigo-700/40 rounded-lg text-indigo-200">
                          <p className="font-semibold">You are marked as AFK:</p>
                          <p className="text-xs italic mt-0.5">"{myAfkReason}"</p>
                        </div>
                        <button
                          onClick={handleToggleAfk}
                          className="w-full py-2.5 bg-[#23a55a] hover:bg-[#1f9350] text-white font-bold rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <Check className="w-4 h-4" />
                          Return from AFK (Restore Nickname &amp; View Missed Pings)
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Simulate Incoming Mention to AFK Member */}
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-4">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    Simulate Member Pinging AFK Staff
                  </div>
                  <p className="text-xs text-[#949ba4]">
                    When a member mentions an AFK user, the bot intercepts and sends an alert with their reason and elapsed time.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-[#949ba4] block mb-1">Simulated Pinger</label>
                      <input
                        type="text"
                        value={simPingerUsername}
                        onChange={(e) => setSimPingerUsername(e.target.value)}
                        className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[#949ba4] block mb-1">Message Content Mentioning @{myOriginalNickname}</label>
                      <input
                        type="text"
                        value={simPingContent}
                        onChange={(e) => setSimPingContent(e.target.value)}
                        className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                      />
                    </div>
                    <button
                      onClick={handleSimulatePingAfk}
                      disabled={!myAfkActive}
                      className={`w-full py-2 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                        myAfkActive ? 'bg-[#00a8ff] hover:bg-[#0092dd] text-white cursor-pointer shadow' : 'bg-[#35373c] text-[#949ba4] cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      {myAfkActive ? 'Send Mention to AFK Member' : 'Go AFK Above to Test Pings'}
                    </button>
                  </div>

                  {afkSimResponse && (
                    <div className="p-3 bg-[#1e1f22] rounded-lg border border-[#35373c] space-y-2 text-xs">
                      <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        Pinger Alert Dispatched
                      </div>
                      <div className="bg-[#313338] p-2 rounded border-l-2 border-indigo-400 text-white font-mono text-[11px]">
                        {afkSimResponse.message}
                      </div>
                      <div className="text-[10px] text-[#949ba4]">
                        Anti-Spam: Notification throttled to once per 30 seconds per channel.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Welcome Back Embed Preview (Return Modal/Display) */}
              {afkReturnResponse && (
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3 shadow-xl">
                  <div className="font-bold text-white text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#23a55a]" />
                      Welcome Back Announcement Embed
                    </span>
                    <span className="text-xs text-[#23a55a] font-semibold">Nickname Restored to {myOriginalNickname}</span>
                  </div>

                  <div className="bg-[#313338] p-4 rounded-lg border border-[#232428] space-y-3">
                    <div className="border-l-4 border-[#23a55a] bg-[#2b2d31] p-4 rounded-r-lg space-y-3">
                      <div className="text-base font-bold text-white">
                        👋 Welcome back, {myOriginalNickname}!
                      </div>
                      <div className="text-xs text-[#dbdee1]">
                        You were AFK for <strong className="text-white">{afkReturnResponse.durationFormatted}</strong>.
                      </div>

                      <div className="bg-[#1e1f22] p-3 rounded border border-[#3f4147] text-xs space-y-2">
                        <div className="font-bold text-[#949ba4] uppercase tracking-wider text-[11px]">
                          Pings While You Were Away ({afkReturnResponse.pings?.length || 0})
                        </div>
                        {afkReturnResponse.pings?.length > 0 ? (
                          <div className="space-y-1.5">
                            {afkReturnResponse.pings.map((p: any, idx: number) => (
                              <div key={idx} className="text-white text-xs">
                                <strong>@{p.pinger_tag || p.pinger_id}</strong>: <span className="text-[#dbdee1]">"{p.content_snippet}"</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[#949ba4] italic">Nobody pinged you while you were AFK.</div>
                        )}
                      </div>

                      <div className="text-[10px] text-[#949ba4]">
                        West Virginia Roleplay • AFK System • Nickname automatically restored
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Active AFK Members & Recent Ping History */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Active AFK Members (afk_status)</span>
                    <span className="text-xs text-[#949ba4]">{afkData?.activeAfk?.length || 0} Member(s)</span>
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {afkData?.activeAfk?.length > 0 ? (
                      afkData.activeAfk.map((m: any) => (
                        <div key={m.user_id} className="p-3 bg-[#1e1f22] rounded-lg border border-[#35373c] text-xs space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-white">{m.user_tag || m.user_id}</span>
                            <span className="text-[10px] text-[#949ba4]">Since: {new Date(m.afk_since).toLocaleTimeString()}</span>
                          </div>
                          <div className="text-indigo-300 italic">"{m.reason || 'No reason provided'}"</div>
                          <div className="text-[11px] text-[#949ba4] flex justify-between pt-1">
                            <span>Nickname: {m.original_nickname}</span>
                            <span className="text-cyan-400 font-semibold">{m.ping_count || 0} pings logged</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-[#949ba4]">
                        No members currently AFK.
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Logged Missed Pings (afk_pings)</span>
                    <span className="text-xs text-[#949ba4]">Recent Interceptions</span>
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {afkData?.recentPings?.length > 0 ? (
                      afkData.recentPings.map((p: any) => (
                        <div key={p.id} className="p-2.5 bg-[#1e1f22] rounded-lg border border-[#35373c] text-xs space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-white">@{p.pinger_tag || p.pinger_id}</span>
                            <span className="text-[10px] text-[#949ba4]">{new Date(p.created_at).toLocaleTimeString()}</span>
                          </div>
                          <div className="text-[#dbdee1] text-[11px] truncate">"{p.content_snippet}"</div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-[#949ba4]">
                        No pings logged while AFK.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: AUTOMATIC WELCOME SYSTEM */}
          {activeTab === 'welcome' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-[#2b2d31] p-6 rounded-xl border border-[#1f2023] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      Automatic Welcome System
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-semibold">
                        {welcomeConfig?.enabled !== false ? 'ACTIVE' : 'DISABLED'}
                      </span>
                    </h2>
                    <p className="text-xs text-[#949ba4]">
                      Automatically greets every new member joining West Virginia State Roleplay with calculated ordinal count, dual banners, and interactive buttons.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchWelcome}
                    className="px-3 py-1.5 rounded bg-[#35373c] hover:bg-[#3f4147] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh State
                  </button>
                  <button
                    onClick={handleSimulateWelcome}
                    className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-md"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Trigger Simulation
                  </button>
                </div>
              </div>

              {/* Stats & Configuration Badges */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-1">
                  <span className="text-xs text-[#949ba4] font-medium">Total Welcomes Sent</span>
                  <div className="text-2xl font-bold text-white">{welcomeRecords?.length || 0}</div>
                  <span className="text-[10px] text-emerald-400">Persisted in welcome_records</span>
                </div>
                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-1">
                  <span className="text-xs text-[#949ba4] font-medium">Configured Member Target</span>
                  <div className="text-2xl font-bold text-[#00a8ff]">20,028+</div>
                  <span className="text-[10px] text-[#949ba4]">Dynamically calculated ordinals</span>
                </div>
                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-1">
                  <span className="text-xs text-[#949ba4] font-medium">Interactive Buttons</span>
                  <div className="text-2xl font-bold text-amber-400">3 Buttons</div>
                  <span className="text-[10px] text-[#949ba4]">Show Members · Verify · ER:LC</span>
                </div>
                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-1">
                  <span className="text-xs text-[#949ba4] font-medium">Banners Configured</span>
                  <div className="text-2xl font-bold text-purple-400">Top + Bottom</div>
                  <span className="text-[10px] text-[#949ba4]">Local SVG + Remote Fallbacks</span>
                </div>
              </div>

              {/* Simulator & Live Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Simulation Form */}
                <div className="lg:col-span-5 bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-3">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Play className="w-4 h-4 text-emerald-400" />
                      Simulate Incoming Member
                    </span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                      guildMemberAdd
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-[#949ba4] block mb-1 font-medium">New Member Username</label>
                      <input
                        type="text"
                        value={simWelcomeUser.username}
                        onChange={(e) => setSimWelcomeUser({ ...simWelcomeUser, username: e.target.value })}
                        className="w-full bg-[#1e1f22] p-2.5 rounded border border-[#3f4147] text-white focus:outline-none focus:border-emerald-500"
                        placeholder="e.g. CarlosWVRP"
                      />
                    </div>

                    <div>
                      <label className="text-[#949ba4] block mb-1 font-medium">Discord User ID</label>
                      <input
                        type="text"
                        value={simWelcomeUser.id}
                        onChange={(e) => setSimWelcomeUser({ ...simWelcomeUser, id: e.target.value })}
                        className="w-full bg-[#1e1f22] p-2.5 rounded border border-[#3f4147] text-white font-mono"
                        placeholder="e.g. 2056966914"
                      />
                    </div>

                    <div>
                      <label className="text-[#949ba4] block mb-1 font-medium">Server Member Count (Live count simulation)</label>
                      <input
                        type="number"
                        value={simWelcomeCount}
                        onChange={(e) => setSimWelcomeCount(parseInt(e.target.value, 10) || 1)}
                        className="w-full bg-[#1e1f22] p-2.5 rounded border border-[#3f4147] text-white font-mono"
                        placeholder="20028"
                      />
                      <span className="text-[11px] text-[#949ba4] mt-1 block">
                        Auto-calculates ordinal format (e.g. 20,028th, 20,021st, 20,022nd).
                      </span>
                    </div>

                    <button
                      onClick={handleSimulateWelcome}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg cursor-pointer transition flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      Simulate Member Join
                    </button>
                  </div>

                  {/* Config settings breakdown */}
                  <div className="pt-3 border-t border-[#35373c] text-[11px] text-[#949ba4] space-y-1.5">
                    <div className="flex justify-between">
                      <span>Show Member Count:</span>
                      <span className="text-white font-mono">{welcomeConfig?.showMemberCount ? 'true' : 'false'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Verify Button URL:</span>
                      <span className="text-white font-mono truncate max-w-[200px]">{welcomeConfig?.verifyUrl || 'https://blox.link/verify'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ER:LC Join URL:</span>
                      <span className="text-white font-mono truncate max-w-[200px]">{welcomeConfig?.erlcJoinUrl || 'policeroleplay.community/join/wvrp'}</span>
                    </div>
                  </div>
                </div>

                {/* Embed Live Preview */}
                <div className="lg:col-span-7 bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3 shadow-md flex flex-col">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-3">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#00a8ff]" />
                      Discord Embed Live Render
                    </span>
                    <span className="text-xs text-[#949ba4]">Dual Banner Coordinated Layout</span>
                  </div>

                  {/* Mock Discord Message Box */}
                  <div className="bg-[#313338] p-4 rounded-xl border border-[#202225] space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-xs text-white font-medium">
                        👋 Welcome to **West Virginia State Roleplay**, <span className="text-[#00a8ff]">@{simWelcomeUser.username}</span>!
                      </div>

                      {/* Top Banner SVG */}
                      <div className="rounded-t-lg overflow-hidden border border-[#00a8ff]/30 shadow-md">
                        <img
                          src="/banners/banner-welcome.svg"
                          alt="WVRP Welcome Top Banner"
                          className="w-full h-24 object-cover"
                        />
                      </div>

                      {/* Main Embed Content */}
                      <div className="bg-[#2b2d31] border-l-4 border-[#00a8ff] p-4 rounded-b-lg space-y-3 shadow-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-base font-bold text-white flex items-center gap-2">
                              👋 Welcome to West Virginia State Roleplay!
                            </div>
                            <div className="text-xs text-[#dbdee1] mt-2 space-y-1">
                              <div>• Welcome <strong className="text-white">@{simWelcomeUser.username}</strong> to <strong className="text-[#00a8ff]">West Virginia State Roleplay!</strong></div>
                              <div>• You are our <strong className="text-emerald-400 font-mono">{simWelcomeResult?.ordinal || '20,028th'}</strong> member.</div>
                              <div>• We hope you enjoy your stay!</div>
                              <div>• Ensure you verify to access the appropriate community features and participate in ER:LC.</div>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full border-2 border-[#00a8ff] overflow-hidden bg-[#1e1f22] flex-shrink-0">
                            <img src="https://cdn.discordapp.com/embed/avatars/1.png" alt="Avatar" className="w-full h-full object-cover" />
                          </div>
                        </div>

                        {/* Embed Fields */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#35373c] text-xs">
                          <div>
                            <span className="text-[#949ba4] block text-[10px]">👤 Username</span>
                            <span className="text-white font-mono font-medium">{simWelcomeUser.username}</span>
                          </div>
                          <div>
                            <span className="text-[#949ba4] block text-[10px]">👥 Member Count</span>
                            <span className="text-white font-mono font-medium">{simWelcomeCount.toLocaleString()} members</span>
                          </div>
                        </div>

                        {/* Bottom Banner Image */}
                        <div className="pt-2">
                          <img
                            src="/banners/wvrp-banner-bottom.svg"
                            alt="WVRP Bottom Banner"
                            className="w-full h-12 object-cover rounded"
                          />
                        </div>

                        <div className="text-[10px] text-[#949ba4] pt-1">
                          West Virginia State Roleplay · Welcome Center · Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      {/* Welcome Action Buttons */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() => alert(`👥 West Virginia Roleplay Stats:\n• Total Members: ${simWelcomeCount.toLocaleString()}\n• Server Tier: Level 3 Booster Status\n• Active In-Game: 18 Players`)}
                          className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <span>👥</span>
                          <span>Show Members</span>
                        </button>
                        <a
                          href={welcomeConfig?.verifyUrl || 'https://blox.link/verify'}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <span>✅</span>
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3 text-[#949ba4]" />
                        </a>
                        <a
                          href={welcomeConfig?.erlcJoinUrl || 'https://policeroleplay.community/join/wvrp'}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <span>🚨</span>
                          <span>ER:LC Server</span>
                          <ExternalLink className="w-3 h-3 text-[#949ba4]" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Welcome Records Table */}
              <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Persisted Welcome Records (welcome_records)</span>
                  <span className="text-xs text-[#949ba4]">Deduplication Window: 10 minutes</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#dbdee1]">
                    <thead className="bg-[#1e1f22] text-[#949ba4] uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">ID</th>
                        <th className="py-2.5 px-3">User</th>
                        <th className="py-2.5 px-3">Member Count</th>
                        <th className="py-2.5 px-3">Channel</th>
                        <th className="py-2.5 px-3">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#35373c]">
                      {welcomeRecords?.length > 0 ? (
                        welcomeRecords.map((r: any) => (
                          <tr key={r.id} className="hover:bg-[#35373c]/30">
                            <td className="py-2 px-3 font-mono text-[#00a8ff]">#{r.id}</td>
                            <td className="py-2 px-3 font-semibold text-white">@{r.user_tag || r.user_id}</td>
                            <td className="py-2 px-3 font-mono text-emerald-400">{r.member_count?.toLocaleString()}th member</td>
                            <td className="py-2 px-3 text-[#949ba4] font-mono">{r.channel_id}</td>
                            <td className="py-2 px-3 text-[#949ba4]">{new Date(r.created_at).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-[#949ba4]">
                            No welcome events recorded yet. Click "Simulate Member Join" above to test.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVER BOOST & SERVER TAG AUTOMATION */}
          {activeTab === 'boost' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-[#2b2d31] p-6 rounded-xl border border-[#1f2023] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      Server Boost &amp; Server Tag Automation
                      <span className="text-xs bg-pink-500/20 text-pink-400 border border-pink-500/40 px-2 py-0.5 rounded-full font-mono font-semibold">
                        LEVEL 3 BOOSTED
                      </span>
                    </h2>
                    <p className="text-xs text-[#949ba4]">
                      Automatic thank-you embeds when members boost the WVRP Discord server or equip the official WVRP server tag.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchBoost}
                    className="px-3 py-1.5 rounded bg-[#35373c] hover:bg-[#3f4147] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh State
                  </button>
                  <button
                    onClick={handleSimulateBoost}
                    className="px-3 py-1.5 rounded bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-md"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    Simulate Server Boost
                  </button>
                </div>
              </div>

              {/* Boost Metrics Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-1">
                  <span className="text-xs text-[#949ba4] font-medium">Server Boost Level</span>
                  <div className="text-2xl font-bold text-pink-400">Level 3</div>
                  <span className="text-[10px] text-emerald-400">100kbps audio &amp; custom vanity</span>
                </div>
                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-1">
                  <span className="text-xs text-[#949ba4] font-medium">Current Boost Count</span>
                  <div className="text-2xl font-bold text-white">14 Boosts</div>
                  <span className="text-[10px] text-[#949ba4]">guild.premiumSubscriptionCount</span>
                </div>
                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-1">
                  <span className="text-xs text-[#949ba4] font-medium">Boost Logs in DB</span>
                  <div className="text-2xl font-bold text-amber-400">{boostRecords?.length || 0}</div>
                  <span className="text-[10px] text-[#949ba4]">Deduplication: 1 hour</span>
                </div>
                <div className="bg-[#2b2d31] p-4 rounded-xl border border-[#1f2023] space-y-1">
                  <span className="text-xs text-[#949ba4] font-medium">Server Tag Supporters</span>
                  <div className="text-2xl font-bold text-[#00a8ff]">{tagRecords?.length || 0}</div>
                  <span className="text-[10px] text-[#949ba4]">Target tag: [WVRP]</span>
                </div>
              </div>

              {/* Simulators Grid: 1. Boost Thank-You and 2. Server Tag Thank-You */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Server Boost Thank-You */}
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-3">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      1. Server Boost Thank-You Embed
                    </span>
                    <button
                      onClick={handleSimulateBoost}
                      className="px-2.5 py-1 bg-pink-600 hover:bg-pink-500 text-white rounded text-xs font-semibold cursor-pointer transition"
                    >
                      Test Boost
                    </button>
                  </div>

                  <div className="bg-[#313338] p-4 rounded-xl border border-[#202225] space-y-3">
                    <div className="text-xs text-white">
                      🎉 **Massive thank you to <span className="text-pink-400">@{simBoostUser.username}</span> for boosting West Virginia State Roleplay!** 🚀
                    </div>

                    {/* Top Banner SVG */}
                    <div className="rounded-t-lg overflow-hidden border border-pink-500/30">
                      <img src="/banners/banner-boost.svg" alt="Boost Top Banner" className="w-full h-20 object-cover" />
                    </div>

                    {/* Embed Content */}
                    <div className="bg-[#2b2d31] border-l-4 border-pink-500 p-4 rounded-b-lg space-y-3 shadow-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-base font-bold text-white">Thank You for Repping Us!</div>
                          <div className="text-xs text-[#dbdee1] mt-2 italic border-l-2 border-[#5865f2] pl-2 py-0.5">
                            Thank you <strong className="text-white">@{simBoostUser.username}</strong> for boosting our <strong className="text-pink-400">WVRP</strong> server! Showing your support helps our community grow and makes West Virginia State Roleplay even better.
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-pink-500 overflow-hidden bg-[#1e1f22] flex-shrink-0">
                          <img src="https://cdn.discordapp.com/embed/avatars/2.png" alt="Booster Avatar" className="w-full h-full object-cover" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#35373c] text-xs">
                        <div>
                          <span className="text-[#949ba4] block text-[10px]">💎 Booster</span>
                          <span className="text-white font-medium">@{simBoostUser.username}</span>
                        </div>
                        <div>
                          <span className="text-[#949ba4] block text-[10px]">🚀 Boost Tier</span>
                          <span className="text-pink-400 font-bold font-mono">Level {simBoostLevel}</span>
                        </div>
                        <div>
                          <span className="text-[#949ba4] block text-[10px]">✨ Total Boosts</span>
                          <span className="text-white font-mono font-medium">{simBoostCount} Boosts</span>
                        </div>
                      </div>

                      {/* Bottom Banner */}
                      <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-10 object-cover rounded" />

                      <div className="text-[10px] text-[#949ba4]">
                        West Virginia State Roleplay · Server Boost Perks · Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Server Tag Equip Thank-You */}
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-3">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#00a8ff]" />
                      2. Server Tag Equipped Thank-You Embed
                    </span>
                    <button
                      onClick={handleSimulateTag}
                      className="px-2.5 py-1 bg-[#00a8ff] hover:bg-[#0090db] text-white rounded text-xs font-semibold cursor-pointer transition"
                    >
                      Test Server Tag
                    </button>
                  </div>

                  <div className="bg-[#313338] p-4 rounded-xl border border-[#202225] space-y-3">
                    <div className="text-xs text-white">
                      🏷️ **Thank you <span className="text-[#00a8ff]">@{simTagUser.username}</span> for repping WVRP!**
                    </div>

                    {/* Top Banner SVG */}
                    <div className="rounded-t-lg overflow-hidden border border-[#00a8ff]/30">
                      <img src="/banners/banner-boost.svg" alt="Tag Top Banner" className="w-full h-20 object-cover" />
                    </div>

                    {/* Embed Content */}
                    <div className="bg-[#2b2d31] border-l-4 border-[#00a8ff] p-4 rounded-b-lg space-y-3 shadow-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-base font-bold text-white">Thank You for Repping Us!</div>
                          <div className="text-xs text-[#dbdee1] mt-2 italic border-l-2 border-[#5865f2] pl-2 py-0.5">
                            Thank you <strong className="text-white">@{simTagUser.username}</strong> for equipping our <strong className="text-[#00a8ff]">{simTagString}</strong> server tag! Showing it off helps more people discover <strong className="text-white">West Virginia State Roleplay</strong>.
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-[#00a8ff] overflow-hidden bg-[#1e1f22] flex-shrink-0">
                          <img src="https://cdn.discordapp.com/embed/avatars/3.png" alt="Supporter Avatar" className="w-full h-full object-cover" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#35373c] text-xs">
                        <div>
                          <span className="text-[#949ba4] block text-[10px]">🏷️ Equipped Tag</span>
                          <span className="text-white font-mono font-bold bg-[#1e1f22] px-2 py-0.5 rounded border border-[#3f4147]">{simTagString}</span>
                        </div>
                        <div>
                          <span className="text-[#949ba4] block text-[10px]">👤 Supporter</span>
                          <span className="text-white font-medium">@{simTagUser.username}</span>
                        </div>
                      </div>

                      {/* Bottom Banner */}
                      <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-10 object-cover rounded" />

                      <div className="text-[10px] text-[#949ba4]">
                        West Virginia State Roleplay · Community Representatives · Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boost and Tag Audit Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                  <span className="font-bold text-white text-sm">Recent Server Boosts (boost_records)</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#dbdee1]">
                      <thead className="bg-[#1e1f22] text-[#949ba4] uppercase text-[10px]">
                        <tr>
                          <th className="py-2 px-3">User</th>
                          <th className="py-2 px-3">Boost Level</th>
                          <th className="py-2 px-3">Total</th>
                          <th className="py-2 px-3">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#35373c]">
                        {boostRecords?.length > 0 ? (
                          boostRecords.map((b: any) => (
                            <tr key={b.id} className="hover:bg-[#35373c]/30">
                              <td className="py-1.5 px-3 font-semibold text-white">@{b.user_tag}</td>
                              <td className="py-1.5 px-3 text-pink-400 font-mono font-bold">Level {b.boost_level}</td>
                              <td className="py-1.5 px-3 font-mono">{b.total_boosts}</td>
                              <td className="py-1.5 px-3 text-[#949ba4]">{new Date(b.created_at).toLocaleTimeString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan={4} className="py-4 text-center text-[#949ba4]">No boost records yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                  <span className="font-bold text-white text-sm">Server Tag Notifications (server_tag_records)</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#dbdee1]">
                      <thead className="bg-[#1e1f22] text-[#949ba4] uppercase text-[10px]">
                        <tr>
                          <th className="py-2 px-3">User</th>
                          <th className="py-2 px-3">Tag Detected</th>
                          <th className="py-2 px-3">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#35373c]">
                        {tagRecords?.length > 0 ? (
                          tagRecords.map((t: any) => (
                            <tr key={t.id} className="hover:bg-[#35373c]/30">
                              <td className="py-1.5 px-3 font-semibold text-white">@{t.user_tag}</td>
                              <td className="py-1.5 px-3 text-[#00a8ff] font-mono font-bold">{t.tag_detected}</td>
                              <td className="py-1.5 px-3 text-[#949ba4]">{new Date(t.created_at).toLocaleTimeString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan={3} className="py-4 text-center text-[#949ba4]">No server tag equip records yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ROBLOX & BLOXLINK VERIFICATION CENTER */}
          {activeTab === 'verification' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-[#2b2d31] p-6 rounded-xl border border-[#1f2023] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-[#00e5ff] border border-cyan-500/30">
                    <Link2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      Roblox &amp; Bloxlink Verification Center
                      <span className="text-xs bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 px-2 py-0.5 rounded-full font-mono font-semibold">
                        OFFICIAL API V4
                      </span>
                    </h2>
                    <p className="text-xs text-[#949ba4]">
                      Integrates official Bloxlink verification lookup, Roblox user API, headshot thumbnails, group ranks, and SQLite verification cache.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchVerification}
                    className="px-3 py-1.5 rounded bg-[#35373c] hover:bg-[#3f4147] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh List
                  </button>
                  <a
                    href="https://blox.link/verify"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded bg-[#00a8ff] hover:bg-[#0090db] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Bloxlink Portal
                  </a>
                </div>
              </div>

              {/* Live Search & Verification Lookup */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-3">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#00e5ff]" />
                      Live Account Verification Check
                    </span>
                    <span className="text-xs text-[#949ba4]">Bloxlink &amp; Roblox</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setVerifySearchType('discord_id')}
                        className={`flex-1 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                          verifySearchType === 'discord_id'
                            ? 'bg-[#00a8ff] text-white'
                            : 'bg-[#1e1f22] text-[#949ba4] hover:text-white'
                        }`}
                      >
                        Discord User ID
                      </button>
                      <button
                        onClick={() => setVerifySearchType('roblox_username')}
                        className={`flex-1 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                          verifySearchType === 'roblox_username'
                            ? 'bg-[#00a8ff] text-white'
                            : 'bg-[#1e1f22] text-[#949ba4] hover:text-white'
                        }`}
                      >
                        Roblox Username
                      </button>
                    </div>

                    <div>
                      <label className="text-[#949ba4] block mb-1 font-medium">
                        {verifySearchType === 'discord_id' ? 'Discord Account ID' : 'Roblox Username'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={verifySearchQuery}
                          onChange={(e) => setVerifySearchQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleVerifyLookup()}
                          placeholder={verifySearchType === 'discord_id' ? 'e.g. 2056966914' : 'e.g. ronaldoiscat'}
                          className="flex-1 bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white font-mono"
                        />
                        <button
                          onClick={handleVerifyLookup}
                          disabled={verifySearchLoading}
                          className="px-4 py-2 bg-[#00a8ff] hover:bg-[#0090db] text-white font-semibold rounded cursor-pointer transition flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {verifySearchLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                          Check
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Manual Staff Verification Override Box */}
                  <div className="pt-4 border-t border-[#35373c] space-y-3">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      Staff Manual Verification Protocol
                    </span>
                    <p className="text-[11px] text-[#949ba4]">
                      If Bloxlink is pending or a member requires manual account link approval:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] text-[#949ba4]">Discord ID</label>
                        <input
                          type="text"
                          value={manualDiscordId}
                          onChange={(e) => setManualDiscordId(e.target.value)}
                          className="w-full bg-[#1e1f22] p-1.5 rounded border border-[#3f4147] text-white font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#949ba4]">Roblox User/ID</label>
                        <input
                          type="text"
                          value={manualRobloxUser}
                          onChange={(e) => setManualRobloxUser(e.target.value)}
                          className="w-full bg-[#1e1f22] p-1.5 rounded border border-[#3f4147] text-white font-mono text-xs"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleManualVerify}
                      className="w-full py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve &amp; Link Account
                    </button>
                    {manualVerifySuccess && (
                      <div className="p-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[11px]">
                        {manualVerifySuccess}
                      </div>
                    )}
                  </div>
                </div>

                {/* Verification Card Live Output */}
                <div className="lg:col-span-7 bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-4 shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-3">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#00e5ff]" />
                      Verification Embed Result
                    </span>
                    <span className="text-xs text-[#949ba4]">Roblox Official Thumbnails v1</span>
                  </div>

                  {verifySearchResult ? (
                    <div className="bg-[#313338] p-4 rounded-xl border border-[#202225] space-y-3">
                      {/* Top Banner SVG */}
                      <div className="rounded-t-lg overflow-hidden border border-[#00e5ff]/30">
                        <img src="/banners/banner-verification.svg" alt="Verification Top Banner" className="w-full h-20 object-cover" />
                      </div>

                      {/* Main Embed Content */}
                      <div className="bg-[#2b2d31] border-l-4 border-[#00e5ff] p-4 rounded-b-lg space-y-3 shadow-lg">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="text-base font-bold text-white flex items-center gap-2">
                              {verifySearchResult.verified ? '✅' : '⚠️'} Roblox &amp; Bloxlink Verification
                            </div>
                            <p className="text-xs text-[#dbdee1]">
                              {verifySearchResult.verified
                                ? `Account verification confirmed! Your Discord identity is linked with your official Roblox account.`
                                : `Verification check in progress. Please link your account or click Check Verification once completed on Bloxlink.`}
                            </p>
                          </div>
                          <div className="w-16 h-16 rounded-xl border-2 border-[#00e5ff] overflow-hidden bg-[#1e1f22] flex-shrink-0 shadow-md">
                            <img
                              src={verifySearchResult.robloxUser?.avatarHeadshot || 'https://cdn.discordapp.com/embed/avatars/0.png'}
                              alt="Roblox Avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Fields */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2 border-t border-[#35373c] text-xs">
                          <div>
                            <span className="text-[#949ba4] block text-[10px]">🎮 Roblox User</span>
                            <a
                              href={verifySearchResult.robloxUser?.profileUrl || '#'}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#00a8ff] font-semibold hover:underline"
                            >
                              {verifySearchResult.robloxUser?.username || 'Not Linked'}
                            </a>
                          </div>
                          <div>
                            <span className="text-[#949ba4] block text-[10px]">🪪 Roblox User ID</span>
                            <span className="text-white font-mono">{verifySearchResult.robloxUser?.id || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[#949ba4] block text-[10px]">🏷️ Display Name</span>
                            <span className="text-white font-medium">{verifySearchResult.robloxUser?.displayName || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[#949ba4] block text-[10px]">🔗 Bloxlink Status</span>
                            <span className="text-emerald-400 font-mono font-semibold">{verifySearchResult.bloxlinkStatus || 'VERIFIED'}</span>
                          </div>
                          <div>
                            <span className="text-[#949ba4] block text-[10px]">🏛️ Group Rank</span>
                            <span className="text-white font-medium">{verifySearchResult.robloxUser?.groupRank || 'Member'}</span>
                          </div>
                          <div>
                            <span className="text-[#949ba4] block text-[10px]">🗓️ Creation Date</span>
                            <span className="text-[#949ba4]">{verifySearchResult.robloxUser?.createdAt || 'N/A'}</span>
                          </div>
                        </div>

                        {/* Bottom Banner */}
                        <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-10 object-cover rounded" />

                        <div className="text-[10px] text-[#949ba4]">
                          West Virginia State Roleplay · Verification Service · Real API Link
                        </div>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex gap-2 pt-2">
                        <a
                          href="https://blox.link/verify"
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded text-xs font-semibold flex items-center gap-1.5"
                        >
                          <span>🔗</span>
                          <span>Verify on Bloxlink</span>
                        </a>
                        <button
                          onClick={handleVerifyLookup}
                          className="px-3 py-1.5 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>🔄</span>
                          <span>Check Verification</span>
                        </button>
                        <button
                          onClick={() => alert('Verification instructions:\n1. Visit https://blox.link/verify\n2. Authorize Discord account\n3. Complete code verification on Roblox\n4. Return here and press Check Verification')}
                          className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>❓</span>
                          <span>Need Help?</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-16 text-center text-xs text-[#949ba4] space-y-2 border border-dashed border-[#35373c] rounded-xl">
                      <Link2 className="w-8 h-8 text-[#00e5ff] mx-auto opacity-50" />
                      <div>Search for a Discord ID or Roblox Username above to view real-time verification details.</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Verified Registry Table */}
              <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Verified Community Registry (verifications table)</span>
                  <span className="text-xs text-[#949ba4]">Official ER:LC Access Database</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#dbdee1]">
                    <thead className="bg-[#1e1f22] text-[#949ba4] uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Avatar</th>
                        <th className="py-2.5 px-3">Roblox User</th>
                        <th className="py-2.5 px-3">Discord Account</th>
                        <th className="py-2.5 px-3">Roblox ID</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Verified Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#35373c]">
                      {verificationList?.length > 0 ? (
                        verificationList.map((v: any) => (
                          <tr key={v.discord_id} className="hover:bg-[#35373c]/30">
                            <td className="py-2 px-3">
                              <img
                                src={v.roblox_avatar_url || 'https://cdn.discordapp.com/embed/avatars/0.png'}
                                alt="Headshot"
                                className="w-7 h-7 rounded-full border border-[#00e5ff]/50 bg-[#1e1f22]"
                              />
                            </td>
                            <td className="py-2 px-3 font-semibold text-white">
                              {v.roblox_username || 'Not Linked'}
                              {v.roblox_display_name && v.roblox_display_name !== v.roblox_username && (
                                <span className="text-[10px] text-[#949ba4] block">({v.roblox_display_name})</span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-[#949ba4] font-mono">@{v.discord_tag || v.discord_id}</td>
                            <td className="py-2 px-3 font-mono text-[#00a8ff]">{v.roblox_id || 'N/A'}</td>
                            <td className="py-2 px-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                {v.bloxlink_status || 'VERIFIED'}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-[#949ba4]">{v.verified_at ? new Date(v.verified_at).toLocaleDateString() : 'Active'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-4 text-center text-[#949ba4]">
                            No verified members saved in SQLite yet. Use the lookup or manual verify tool above to add records.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTELLIGENT TICKET AUTOMATION & WORKFLOWS */}
          {activeTab === 'workflows' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-[#2b2d31] p-6 rounded-xl border border-[#1f2023] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      Automatic Ticket Responses &amp; Keyword Detection
                      <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono font-semibold">
                        GROQ AI + KEYWORDS
                      </span>
                    </h2>
                    <p className="text-xs text-[#949ba4]">
                      Intelligently detects member inquiries in tickets for Fast-Pass, Department Transfers, Verification, Staff Applications, and 6 other workflows.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchWorkflows}
                    className="px-3 py-1.5 rounded bg-[#35373c] hover:bg-[#3f4147] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh State
                  </button>
                  <button
                    onClick={handleSimulateWorkflow}
                    className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-md"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Test Message
                  </button>
                </div>
              </div>

              {/* 10 Supported Workflows Directory */}
              <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Supported Workflows Matrix (10 Official Services)</span>
                  <span className="text-xs text-[#949ba4]">Deduplication: Prevents double auto-replies</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    { id: 'fast_pass', name: 'Fast-Pass', emoji: '⚡', color: 'border-amber-500/40 text-amber-400 bg-amber-500/10' },
                    { id: 'dept_transfer', name: 'Dept Transfers', emoji: '🚓', color: 'border-blue-500/40 text-blue-400 bg-blue-500/10' },
                    { id: 'staff_app', name: 'Staff Applications', emoji: '📝', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
                    { id: 'roblox_verify', name: 'Roblox Verification', emoji: '🔗', color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10' },
                    { id: 'ban_appeal', name: 'Ban Appeals', emoji: '⚖️', color: 'border-purple-500/40 text-purple-400 bg-purple-500/10' },
                    { id: 'partnership', name: 'Partnerships', emoji: '🤝', color: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10' },
                    { id: 'dept_app', name: 'Dept Applications', emoji: '🛡️', color: 'border-blue-400/40 text-blue-300 bg-blue-400/10' },
                    { id: 'general_support', name: 'General Support', emoji: '⚙️', color: 'border-gray-500/40 text-gray-300 bg-gray-500/10' },
                    { id: 'staff_complaint', name: 'Staff Complaints', emoji: '🚨', color: 'border-red-500/40 text-red-400 bg-red-500/10' },
                    { id: 'erlc_support', name: 'ER:LC Support', emoji: '🎮', color: 'border-pink-500/40 text-pink-400 bg-pink-500/10' }
                  ].map((w) => (
                    <div
                      key={w.id}
                      onClick={() => {
                        setManualWorkflowType(w.id);
                        setSimWorkflowMsg(`How does ${w.name} work in WVRP?`);
                      }}
                      className={`p-3 rounded-lg border ${w.color} cursor-pointer hover:scale-105 transition space-y-1`}
                    >
                      <div className="text-lg">{w.emoji}</div>
                      <div className="font-bold text-xs">{w.name}</div>
                      <div className="text-[10px] text-[#949ba4] font-mono">{w.id}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Simulator & Exact Template Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Simulator Input Box */}
                <div className="lg:col-span-5 bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-3">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      Test Ticket Inbound Message
                    </span>
                    <span className="text-xs text-[#949ba4]">Keywords + Groq</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-[#949ba4] block mb-1 font-medium">Ticket Channel Context</label>
                      <input
                        type="text"
                        value={simWorkflowTicketId}
                        onChange={(e) => setSimWorkflowTicketId(e.target.value)}
                        className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white font-mono"
                        placeholder="e.g. 0850"
                      />
                    </div>

                    <div>
                      <label className="text-[#949ba4] block mb-1 font-medium">Simulated Member Message</label>
                      <textarea
                        rows={3}
                        value={simWorkflowMsg}
                        onChange={(e) => setSimWorkflowMsg(e.target.value)}
                        className="w-full bg-[#1e1f22] p-2.5 rounded border border-[#3f4147] text-white focus:outline-none focus:border-amber-500"
                        placeholder="e.g. I have 2 years of experience as Captain in another server, can I get a fast pass?"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] text-[#949ba4] block w-full">Quick Test Queries:</span>
                      <button
                        onClick={() => setSimWorkflowMsg('Can I get a fast pass for my experience?')}
                        className="px-2 py-0.5 rounded bg-[#1e1f22] hover:bg-[#35373c] text-[#dbdee1] text-[10px]"
                      >
                        ⚡ Fast-Pass
                      </button>
                      <button
                        onClick={() => setSimWorkflowMsg('I want to request a department transfer from State Police to Sheriff')}
                        className="px-2 py-0.5 rounded bg-[#1e1f22] hover:bg-[#35373c] text-[#dbdee1] text-[10px]"
                      >
                        🚓 Dept Transfer
                      </button>
                      <button
                        onClick={() => setSimWorkflowMsg('How do I link my roblox account on bloxlink?')}
                        className="px-2 py-0.5 rounded bg-[#1e1f22] hover:bg-[#35373c] text-[#dbdee1] text-[10px]"
                      >
                        🔗 Verification
                      </button>
                      <button
                        onClick={() => setSimWorkflowMsg('I was banned for FRP yesterday, how can I appeal?')}
                        className="px-2 py-0.5 rounded bg-[#1e1f22] hover:bg-[#35373c] text-[#dbdee1] text-[10px]"
                      >
                        ⚖️ Ban Appeal
                      </button>
                    </div>

                    <button
                      onClick={handleSimulateWorkflow}
                      className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg shadow-lg cursor-pointer transition flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Run Automatic Detection
                    </button>
                  </div>

                  {/* Manual Staff Trigger Section */}
                  <div className="pt-4 border-t border-[#35373c] space-y-3">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-blue-400" />
                      Staff Manual Workflow Override
                    </span>
                    <div className="flex gap-2">
                      <select
                        value={manualWorkflowType}
                        onChange={(e) => setManualWorkflowType(e.target.value)}
                        className="flex-1 bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white text-xs"
                      >
                        <option value="fast_pass">⚡ Fast-Pass</option>
                        <option value="dept_transfer">🚓 Department Transfers</option>
                        <option value="staff_app">📝 Staff Applications</option>
                        <option value="roblox_verify">🔗 Roblox Verification</option>
                        <option value="ban_appeal">⚖️ Ban Appeals</option>
                        <option value="partnership">🤝 Partnerships</option>
                        <option value="dept_app">🛡️ Department Applications</option>
                        <option value="general_support">⚙️ General Support</option>
                        <option value="staff_complaint">🚨 Staff Complaints</option>
                        <option value="erlc_support">🎮 ER:LC Support</option>
                      </select>
                      <button
                        onClick={handleManualTriggerWorkflow}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded transition cursor-pointer"
                      >
                        Trigger
                      </button>
                    </div>
                    {manualWorkflowSuccess && (
                      <div className="p-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-[11px]">
                        {manualWorkflowSuccess}
                      </div>
                    )}
                  </div>
                </div>

                {/* Response Preview Box */}
                <div className="lg:col-span-7 bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-4 shadow-md flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-[#35373c] pb-3">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      Automatic Ticket Response Render
                    </span>
                    {simWorkflowResult?.detection && (
                      <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
                        {simWorkflowResult.detection.type} ({Math.round((simWorkflowResult.detection.confidence || 0.95) * 100)}% match)
                      </span>
                    )}
                  </div>

                  {simWorkflowResult?.payload ? (
                    <div className="bg-[#313338] p-4 rounded-xl border border-[#202225] space-y-3">
                      <div className="text-xs text-white font-medium">
                        {simWorkflowResult.payload.content}
                      </div>

                      {/* Top Banner SVG */}
                      <div className="rounded-t-lg overflow-hidden border border-amber-500/30">
                        <img
                          src={
                            simWorkflowResult.detection.type === 'fast_pass'
                              ? '/banners/banner-fastpass.svg'
                              : simWorkflowResult.detection.type === 'dept_transfer'
                              ? '/banners/banner-departments.svg'
                              : '/banners/banner-assistance.svg'
                          }
                          alt="Workflow Top Banner"
                          className="w-full h-20 object-cover"
                        />
                      </div>

                      {/* Main Embed Body */}
                      <div className="bg-[#2b2d31] border-l-4 border-amber-500 p-4 rounded-b-lg space-y-3 shadow-lg">
                        <div className="text-base font-bold text-white">
                          {simWorkflowResult.payload.embeds?.[simWorkflowResult.payload.embeds.length - 1]?.data?.title || '⚡ Fast-Pass Staff Application'}
                        </div>

                        {/* Format Content */}
                        <div className="bg-[#1e1f22] p-3 rounded border border-[#3f4147] font-mono text-xs text-[#dbdee1] whitespace-pre-wrap leading-relaxed">
                          {simWorkflowResult.detection.type === 'fast_pass' ? (
`Fast-Pass

Your ROBLOX User:

All your previous experiences, please include member count and your rank.

Server invite CODE, if possible:

Why do I want to be staff here?

Copy this, fill in every line and send it here. The team will review it.`
                          ) : simWorkflowResult.detection.type === 'dept_transfer' ? (
`Department Transfer Request

Roblox Username:

Current Department:

Current Rank:

Requested Department:

Previous Experience:

Reason for Requesting a Transfer:

Copy this, fill in every line and send it here. Department High Command will evaluate your qualifications.`
                          ) : (
                            simWorkflowResult.payload.embeds?.[simWorkflowResult.payload.embeds.length - 1]?.data?.description || 'Workflow template registered.'
                          )}
                        </div>

                        {/* Bottom Banner */}
                        <img src="/banners/wvrp-banner-bottom.svg" alt="Bottom Banner" className="w-full h-10 object-cover rounded" />

                        <div className="text-[10px] text-[#949ba4]">
                          West Virginia State Roleplay · Ticket Intelligence Service
                        </div>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            const text = simWorkflowResult.detection.type === 'fast_pass'
                              ? `Fast-Pass\n\nYour ROBLOX User:\n\nAll your previous experiences, please include member count and your rank.\n\nServer invite CODE, if possible:\n\nWhy do I want to be staff here?`
                              : `Roblox Username:\n\nCurrent Department:\n\nCurrent Rank:\n\nRequested Department:\n\nPrevious Experience:\n\nReason for Requesting a Transfer:`;
                            navigator.clipboard.writeText(text);
                            alert('Copied format template to clipboard!');
                          }}
                          className="px-3 py-1.5 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Template Format</span>
                        </button>
                        <button
                          onClick={() => alert('Alerted WVRP High Command & Management for review.')}
                          className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Shield className="w-3.5 h-3.5 text-amber-400" />
                          <span>Staff Review Queue</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-16 text-center text-xs text-[#949ba4] space-y-2 border border-dashed border-[#35373c] rounded-xl">
                      <Zap className="w-8 h-8 text-amber-400 mx-auto opacity-50" />
                      <div>Type a message or select a quick query on the left to test automatic response generation.</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Deduplication & Active Workflows History */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                  <span className="font-bold text-white text-sm">Automated Responses Sent (ticket_auto_responses)</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#dbdee1]">
                      <thead className="bg-[#1e1f22] text-[#949ba4] uppercase text-[10px]">
                        <tr>
                          <th className="py-2 px-3">Ticket</th>
                          <th className="py-2 px-3">Workflow</th>
                          <th className="py-2 px-3">Trigger Phrase</th>
                          <th className="py-2 px-3">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#35373c]">
                        {workflowHistory?.recentResponses?.length > 0 ? (
                          workflowHistory.recentResponses.map((r: any) => (
                            <tr key={r.id} className="hover:bg-[#35373c]/30">
                              <td className="py-1.5 px-3 font-mono text-[#00a8ff]">#{r.ticket_id}</td>
                              <td className="py-1.5 px-3 font-semibold text-amber-400">{r.workflow_type}</td>
                              <td className="py-1.5 px-3 text-[#dbdee1] truncate max-w-[150px]">"{r.trigger_phrase}"</td>
                              <td className="py-1.5 px-3 text-[#949ba4]">{new Date(r.created_at).toLocaleTimeString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan={4} className="py-4 text-center text-[#949ba4]">No automatic responses recorded yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#2b2d31] p-5 rounded-xl border border-[#1f2023] space-y-3">
                  <span className="font-bold text-white text-sm">Active Workflows in Tickets (ticket_automation_workflows)</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#dbdee1]">
                      <thead className="bg-[#1e1f22] text-[#949ba4] uppercase text-[10px]">
                        <tr>
                          <th className="py-2 px-3">Ticket</th>
                          <th className="py-2 px-3">Workflow</th>
                          <th className="py-2 px-3">Source</th>
                          <th className="py-2 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#35373c]">
                        {workflowHistory?.activeWorkflows?.length > 0 ? (
                          workflowHistory.activeWorkflows.map((w: any) => (
                            <tr key={w.id} className="hover:bg-[#35373c]/30">
                              <td className="py-1.5 px-3 font-mono text-[#00a8ff]">#{w.ticket_id}</td>
                              <td className="py-1.5 px-3 font-semibold text-white">{w.workflow_type}</td>
                              <td className="py-1.5 px-3 text-[10px] text-[#949ba4] font-mono">{w.trigger_source}</td>
                              <td className="py-1.5 px-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  {w.status || 'ACTIVE'}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan={4} className="py-4 text-center text-[#949ba4]">No active workflows logged.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: MARKETPLACE TERMS OF SERVICE */}
      {showTosModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#313338] border border-[#202225] rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#3f4147] pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-lg">
                <CheckCircle2 className="w-5 h-5 text-[#23a55a]" />
                WVRP Marketplace Terms of Service
              </div>
              <button onClick={() => setShowTosModal(false)} className="text-[#949ba4] hover:text-white cursor-pointer">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-[#b5bac1] space-y-3 leading-relaxed">
              <p>By purchasing any product, service, membership, advertisement, sponsorship, or other offering through the West Virginia Roleplay Marketplace, you confirm that you have read, understood, and agreed to the following Terms of Service.</p>
              
              <div><strong>01 — ORDER QUEUE</strong><br />All orders, requests, and submissions are processed in the order they are received. Processing times may vary depending on current demand and staff availability.</div>
              <div><strong>02 — RESPECT &amp; CONDUCT</strong><br />We maintain a respectful environment for both customers and staff. Harassment, abuse, threats, discrimination, or disrespectful behavior toward staff or community members will not be tolerated and may result in service denial without compensation.</div>
              <div><strong>03 — LINKS &amp; REQUIRED ASSETS</strong><br />Customers are responsible for providing valid and accessible files, links, information, and other required assets.</div>
              <div><strong>04 — ORDER CHANGES</strong><br />Any changes or revisions to an order must be requested before work begins.</div>
              <div><strong>05 — CLAIMING PURCHASES</strong><br />All purchases, rewards, services, and other marketplace items must be claimed through an official Support Ticket, unless otherwise specified.</div>
              <div><strong>06 — PROCESSING &amp; RESPONSE TIMES</strong><br />Estimated completion and response times are not guaranteed.</div>
              <div><strong>07 — REFUNDS &amp; CANCELLATIONS</strong><br />All purchases are final. We do not offer refunds under any circumstances. Where appropriate, we may provide store credit.</div>
              <div><strong>08 — CHARGEBACKS</strong><br />Initiating a chargeback after receiving a product or service will result in permanent removal from the Marketplace and associated services.</div>
              <div><strong>09 — RIGHT TO REFUSE SERVICE</strong><br />We reserve the right to refuse, suspend, or terminate service to any individual who violates these Terms of Service.</div>
              <div><strong>10 — RESPONSIBILITY</strong><br />West Virginia Roleplay IS NOT responsible to pay the prizes of your giveaways or ADs.</div>
            </div>

            <button
              onClick={() => setShowTosModal(false)}
              className="w-full bg-[#248046] hover:bg-[#1a6334] text-white font-bold text-xs py-2 rounded cursor-pointer"
            >
              I Understand &amp; Agree
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: 15-QUESTION APPLICATION MODAL */}
      {showAppModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#313338] border border-[#202225] rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#3f4147] pb-3">
              <div className="font-bold text-white text-base">
                WVRP Staff Application Questionnaire (Page {appStep} of 3)
              </div>
              <button onClick={() => setShowAppModal(false)} className="text-[#949ba4] hover:text-white cursor-pointer">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Questions 1-5 */}
            {appStep === 1 && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-white block mb-1">1. What is your full Roblox username?</label>
                  <input
                    type="text"
                    value={appAnswers[0]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[0] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="e.g. carlos473"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">2. What device do you play on?</label>
                  <input
                    type="text"
                    value={appAnswers[1]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[1] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="PC / Mobile / Console"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">3. What is your time zone?</label>
                  <input
                    type="text"
                    value={appAnswers[2]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[2] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="EST / CST / PST"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">4. How many hours can you moderate per week?</label>
                  <input
                    type="text"
                    value={appAnswers[3]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[3] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="e.g. 15 hours"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">5. Do you have any prior staff or moderation experience? If so, where?</label>
                  <textarea
                    rows={3}
                    value={appAnswers[4]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[4] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="WRITE IN DETAIL AND FULL SENTENCES"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <button
                  onClick={() => setAppStep(2)}
                  className="w-full bg-[#00a8ff] hover:bg-[#0090db] text-white font-bold py-2 rounded cursor-pointer"
                >
                  Next Page (Questions 6-10)
                </button>
              </div>
            )}

            {/* Questions 6-10 */}
            {appStep === 2 && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-white block mb-1">6. Why do you want to join the WVRP staff team?</label>
                  <textarea
                    rows={2}
                    value={appAnswers[5]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[5] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="WRITE IN DETAIL AND FULL SENTENCES"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">7. What is RDM, and how would you handle it if someone broke this rule?</label>
                  <textarea
                    rows={2}
                    value={appAnswers[6]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[6] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="WRITE IN DETAIL AND FULL SENTENCES"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">8. What is VDM, and how would you handle it if someone broke this rule?</label>
                  <textarea
                    rows={2}
                    value={appAnswers[7]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[7] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="WRITE IN DETAIL AND FULL SENTENCES"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">9. What is LTAP, and how would you handle it if someone broke this rule?</label>
                  <textarea
                    rows={2}
                    value={appAnswers[8]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[8] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="WRITE IN DETAIL AND FULL SENTENCES"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">10. What is FRP, and how would you handle it if someone broke this rule?</label>
                  <textarea
                    rows={2}
                    value={appAnswers[9]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[9] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="WRITE IN DETAIL AND FULL SENTENCES"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setAppStep(1)} className="bg-[#4e5058] text-white text-xs px-3 py-2 rounded">
                    Back
                  </button>
                  <button onClick={() => setAppStep(3)} className="flex-1 bg-[#00a8ff] text-white text-xs font-bold py-2 rounded">
                    Next Page (Questions 11-15)
                  </button>
                </div>
              </div>
            )}

            {/* Questions 11-15 */}
            {appStep === 3 && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-white block mb-1">11. What is NLR, and how would you handle it if someone broke this rule?</label>
                  <textarea
                    rows={2}
                    value={appAnswers[10]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[10] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="WRITE IN DETAIL AND FULL SENTENCES"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">12. What is the punishment if someone rejoins right after being kicked?</label>
                  <input
                    type="text"
                    value={appAnswers[11]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[11] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="WRITE IN DETAIL AND FULL SENTENCES"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">13. A player is spamming in-game chat with inappropriate language after warnings. What do you do step-by-step?</label>
                  <textarea
                    rows={2}
                    value={appAnswers[12]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[12] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="Step-by-step protocol"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">14. Confirm professionalism &amp; asking staff to read results in automatic denial:</label>
                  <select
                    value={appAnswers[13]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[13] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  >
                    <option value="">Select acknowledgment</option>
                    <option value="Yes">Yes — I understand and agree</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-white block mb-1">15. Is there anything else you'd like us to know? (If not, put N/A)</label>
                  <input
                    type="text"
                    value={appAnswers[14]}
                    onChange={(e) => {
                      const copy = [...appAnswers];
                      copy[14] = e.target.value;
                      setAppAnswers(copy);
                    }}
                    placeholder="N/A"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setAppStep(2)} className="bg-[#4e5058] text-white text-xs px-3 py-2 rounded">
                    Back
                  </button>
                  <button
                    onClick={async () => {
                      setShowAppModal(false);
                      const res = await fetch('/api/applications/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ answers: appAnswers })
                      });
                      const data = await res.json();
                      setSubmittedApp({ appId: data.appId, answers: appAnswers, sapling: data.sapling });
                    }}
                    className="flex-1 bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-bold py-2 rounded"
                  >
                    Submit 15-Question Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: INQUIRY POPUP FOR SUPPORT TICKET */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#313338] border border-[#202225] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3f4147] pb-3">
              <div className="font-bold text-white text-base">Open Support Ticket</div>
              <button onClick={() => setShowInquiryModal(false)} className="text-[#949ba4] hover:text-white cursor-pointer">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs space-y-2">
              <label className="text-white font-semibold block">What is your inquiry?</label>
              <textarea
                rows={3}
                value={ticketInquiry}
                onChange={(e) => setTicketInquiry(e.target.value)}
                placeholder="State your reason for reaching out in detail..."
                className="w-full bg-[#1e1f22] p-3 rounded border border-[#3f4147] text-white text-xs focus:outline-none focus:border-[#00a8ff]"
              />
            </div>
            <button
              onClick={() => {
                setShowInquiryModal(false);
                alert(`Support ticket channel #ticket-0850 opened with your inquiry!`);
              }}
              className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold text-xs py-2 rounded cursor-pointer"
            >
              Confirm &amp; Create Ticket
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: 5 SEQUENTIAL INFRACTION APPEAL QUESTIONS */}
      {showAppealModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#313338] border border-[#202225] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3f4147] pb-3">
              <div className="font-bold text-white text-base">Appeal INF-0314 (Question {appealStep} of 5)</div>
              <button onClick={() => setShowAppealModal(false)} className="text-[#949ba4] hover:text-white cursor-pointer">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-3">
              {appealStep === 1 && (
                <div>
                  <label className="font-semibold text-white block mb-1">1. Why are you appealing this infraction?</label>
                  <textarea
                    rows={3}
                    value={appealAnswers[0]}
                    onChange={(e) => {
                      const c = [...appealAnswers];
                      c[0] = e.target.value;
                      setAppealAnswers(c);
                    }}
                    placeholder="Explain your appeal reason..."
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
              )}
              {appealStep === 2 && (
                <div>
                  <label className="font-semibold text-white block mb-1">2. Were there any misunderstandings regarding the incident?</label>
                  <textarea
                    rows={3}
                    value={appealAnswers[1]}
                    onChange={(e) => {
                      const c = [...appealAnswers];
                      c[1] = e.target.value;
                      setAppealAnswers(c);
                    }}
                    placeholder="Clarify circumstances..."
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
              )}
              {appealStep === 3 && (
                <div>
                  <label className="font-semibold text-white block mb-1">3. Do you possess counter-evidence or timestamps?</label>
                  <input
                    type="text"
                    value={appealAnswers[2]}
                    onChange={(e) => {
                      const c = [...appealAnswers];
                      c[2] = e.target.value;
                      setAppealAnswers(c);
                    }}
                    placeholder="Provide evidence links or state None"
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
              )}
              {appealStep === 4 && (
                <div>
                  <label className="font-semibold text-white block mb-1">4. How will you prevent this situation from recurring?</label>
                  <textarea
                    rows={3}
                    value={appealAnswers[3]}
                    onChange={(e) => {
                      const c = [...appealAnswers];
                      c[3] = e.target.value;
                      setAppealAnswers(c);
                    }}
                    placeholder="State your corrective action..."
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  />
                </div>
              )}
              {appealStep === 5 && (
                <div>
                  <label className="font-semibold text-white block mb-1">5. Confirm your adherence to the Staff Code of Conduct:</label>
                  <select
                    value={appealAnswers[4]}
                    onChange={(e) => {
                      const c = [...appealAnswers];
                      c[4] = e.target.value;
                      setAppealAnswers(c);
                    }}
                    className="w-full bg-[#1e1f22] p-2 rounded border border-[#3f4147] text-white"
                  >
                    <option value="">Select acknowledgment</option>
                    <option value="Yes">Yes — I reaffirm my commitment to professionalism</option>
                  </select>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {appealStep > 1 && (
                  <button onClick={() => setAppealStep(appealStep - 1)} className="bg-[#4e5058] text-white text-xs px-3 py-2 rounded">
                    Back
                  </button>
                )}
                {appealStep < 5 ? (
                  <button onClick={() => setAppealStep(appealStep + 1)} className="flex-1 bg-[#00a8ff] text-white text-xs font-bold py-2 rounded">
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowAppealModal(false);
                      setAppealSubmitted(true);
                      alert('Appeal submitted to Internal Affairs channel with all 5 answers!');
                    }}
                    className="flex-1 bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-bold py-2 rounded"
                  >
                    Submit Appeal to Internal Affairs
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
