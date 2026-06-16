import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#07070f",
  surface: "#0f0f1a",
  card: "#13131f",
  card2: "#18182a",
  border: "#22223a",
  accent: "#7c3aed",
  accentL: "#a855f7",
  accentGlow: "rgba(124,58,237,0.2)",
  gold: "#f59e0b",
  silver: "#94a3b8",
  bronze: "#cd7c2f",
  green: "#10b981",
  red: "#ef4444",
  blue: "#3b82f6",
  cyan: "#06b6d4",
  text: "#e2e8f0",
  muted: "#4a4a6a",
  dim: "#7a7a9a",
};

const TABS = [
  { id: "home", icon: "⚡", label: "Home" },
  { id: "tournaments", icon: "🏆", label: "Play" },
  { id: "create", icon: "➕", label: "Host" },
  { id: "leaderboard", icon: "📊", label: "Ranks" },
  { id: "profile", icon: "👤", label: "Me" },
];

const TOURNAMENTS = [
  { id: 1, name: "BGMI Pro League S4", game: "BGMI", prize: "₹50,000", slots: 64, filled: 58, status: "live", format: "Battle Royale", entry: 50, startTime: "Today 8:00 PM", banner: "🎯", tag: "LIVE", roomCode: "BGMI2024", roomPass: "PRO123" },
  { id: 2, name: "Free Fire Masters Cup", game: "Free Fire", prize: "₹25,000", slots: 32, filled: 24, status: "upcoming", format: "Squad", entry: 30, startTime: "Tomorrow 6:00 PM", banner: "🔥", tag: "UPCOMING", roomCode: null, roomPass: null },
  { id: 3, name: "COD Mobile Clash", game: "COD Mobile", prize: "₹15,000", slots: 16, filled: 16, status: "full", format: "TDM", entry: 20, startTime: "Today 10:00 PM", banner: "💥", tag: "FULL", roomCode: null, roomPass: null },
  { id: 4, name: "Valorant Open Series", game: "Valorant", prize: "₹1,00,000", slots: 128, filled: 97, status: "upcoming", format: "5v5", entry: 100, startTime: "Sat 5:00 PM", banner: "⚡", tag: "HOT", roomCode: null, roomPass: null },
  { id: 5, name: "BGMI Solo Showdown", game: "BGMI", prize: "₹10,000", slots: 100, filled: 45, status: "upcoming", format: "Solo", entry: 0, startTime: "Sun 2:00 PM", banner: "🎮", tag: "FREE", roomCode: null, roomPass: null },
  { id: 6, name: "Free Fire Weekend War", game: "Free Fire", prize: "₹5,000", slots: 50, filled: 50, status: "completed", format: "Duo", entry: 15, startTime: "Completed", banner: "🏆", tag: "ENDED", roomCode: null, roomPass: null },
];

const LEADERBOARD = [
  { rank: 1, name: "PhantomX99", game: "BGMI", wins: 47, kd: 8.2, earnings: 28500, avatar: "👾" },
  { rank: 2, name: "ShadowStrike", game: "Free Fire", wins: 41, kd: 7.8, earnings: 21200, avatar: "🦊" },
  { rank: 3, name: "NightHunter", game: "COD Mobile", wins: 38, kd: 7.1, earnings: 18900, avatar: "🐺" },
  { rank: 4, name: "BlitzKing", game: "BGMI", wins: 35, kd: 6.9, earnings: 15300, avatar: "⚡" },
  { rank: 5, name: "VoidWalker", game: "Valorant", wins: 31, kd: 6.4, earnings: 12800, avatar: "🌀" },
  { rank: 6, name: "IronFist", game: "Free Fire", wins: 29, kd: 6.1, earnings: 10100, avatar: "🤖" },
  { rank: 7, name: "ArcaneGhost", game: "BGMI", wins: 27, kd: 5.8, earnings: 8500, avatar: "👻" },
  { rank: 8, name: "ThunderBolt", game: "COD Mobile", wins: 24, kd: 5.5, earnings: 6200, avatar: "🌩️" },
];

const BRACKET = {
  rounds: [
    { name: "Quarter Finals", matches: [
      { id:1, p1:"PhantomX99", p2:"ShadowStrike", s1:12, s2:8, done:true, winner:"PhantomX99" },
      { id:2, p1:"NightHunter", p2:"BlitzKing", s1:15, s2:11, done:true, winner:"NightHunter" },
      { id:3, p1:"VoidWalker", p2:"IronFist", s1:9, s2:14, done:true, winner:"IronFist" },
      { id:4, p1:"ArcaneGhost", p2:"ThunderBolt", s1:13, s2:7, done:true, winner:"ArcaneGhost" },
    ]},
    { name: "Semi Finals", matches: [
      { id:5, p1:"PhantomX99", p2:"NightHunter", s1:18, s2:14, done:true, winner:"PhantomX99" },
      { id:6, p1:"IronFist", p2:"ArcaneGhost", s1:null, s2:null, done:false, winner:null },
    ]},
    { name: "Grand Final", matches: [
      { id:7, p1:"PhantomX99", p2:"TBD", s1:null, s2:null, done:false, winner:null },
    ]},
  ],
};

const NOTIFICATIONS = [
  { id:1, icon:"🔴", title:"Match Starting Soon!", body:"BGMI Pro League S4 starts in 30 mins. Get ready!", time:"5m ago", unread:true },
  { id:2, icon:"🏆", title:"You Won!", body:"You placed #3 in Free Fire Weekend War. Prize: ₹500", time:"2h ago", unread:true },
  { id:3, icon:"👥", title:"Referral Bonus!", body:"Your friend ShadowX joined using your code. +₹50 added!", time:"5h ago", unread:false },
  { id:4, icon:"📢", title:"New Tournament Live", body:"Valorant Open Series is now accepting registrations!", time:"1d ago", unread:false },
  { id:5, icon:"💰", title:"Withdrawal Successful", body:"₹1,200 transferred to your UPI ID.", time:"2d ago", unread:false },
];

const CHAT_INIT = [
  { id:1, user:"PhantomX99", avatar:"👾", msg:"Gg wp everyone 🔥", time:"8:02 PM", mine:false },
  { id:2, user:"NightHunter", avatar:"🐺", msg:"Let's gooo!! 💪", time:"8:03 PM", mine:false },
  { id:3, user:"BlitzKing", avatar:"⚡", msg:"Good game, rematch next time", time:"8:04 PM", mine:false },
  { id:4, user:"YoungBlade", avatar:"🎮", msg:"GG all! See you in finals 🏆", time:"8:05 PM", mine:true },
];

export default function App() {
  const [splash, setSplash] = useState(true);
  const [splashAnim, setSplashAnim] = useState(0);
  const [tab, setTab] = useState("home");
  const [wallet, setWallet] = useState(1850);
  const [coins, setCoins] = useState(320);
  const [joined, setJoined] = useState([]);
  const [joinModal, setJoinModal] = useState(null);
  const [roomModal, setRoomModal] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [toast, setToast] = useState(null);
  const [hostedTournaments, setHostedTournaments] = useState([]);
  const [allTournaments, setAllTournaments] = useState(TOURNAMENTS);
  const [selectedT, setSelectedT] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const t1 = setTimeout(() => setSplashAnim(1), 300);
    const t2 = setTimeout(() => setSplashAnim(2), 1200);
    const t3 = setTimeout(() => setSplash(false), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const handleJoin = (t) => {
    if (joined.includes(t.id)) return showToast("Already joined!", "info");
    if (t.status === "full" || t.status === "completed") return showToast("Not open!", "error");
    setJoinModal(t);
  };

  const confirmJoin = (t) => {
    if (t.entry > wallet) return showToast("Insufficient balance!", "error");
    setWallet(w => w - t.entry);
    setJoined(j => [...j, t.id]);
    setJoinModal(null);
    showToast(`Joined ${t.name}! 🎉`);
    setNotifs(n => [{ id: Date.now(), icon: "🎮", title: "Tournament Joined!", body: `You've joined ${t.name}. Good luck!`, time: "Just now", unread: true }, ...n]);
  };

  const unreadCount = notifs.filter(n => n.unread).length;

  if (splash) return <Splash anim={splashAnim} />;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, maxWidth: 480, margin: "0 auto", position: "relative", paddingBottom: 70, overflowX: "hidden" }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: toast.type === "error" ? C.red : toast.type === "info" ? C.blue : C.green, color: "#fff", padding: "10px 22px", borderRadius: 30, zIndex: 9999, fontWeight: 700, fontSize: 13, boxShadow: "0 4px 24px rgba(0,0,0,0.6)", whiteSpace: "nowrap", transition: "all 0.3s" }}>
          {toast.msg}
        </div>
      )}

      {/* Join Modal */}
      {joinModal && (
        <Modal onClose={() => setJoinModal(null)}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>{joinModal.banner}</div>
            <div style={{ fontWeight: 800, fontSize: 18, marginTop: 8 }}>{joinModal.name}</div>
            <div style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>{joinModal.game} • {joinModal.format}</div>
          </div>
          <InfoRow label="🏆 Prize Pool" value={`₹${joinModal.prize || joinModal.prize}`} highlight />
          <InfoRow label="🎟 Entry Fee" value={joinModal.entry === 0 ? "FREE" : `₹${joinModal.entry}`} />
          <InfoRow label="⏰ Starts" value={joinModal.startTime} />
          <InfoRow label="💳 Your Balance" value={`₹${wallet}`} />
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Btn label="Cancel" onClick={() => setJoinModal(null)} ghost />
            <Btn label="⚔️ Confirm Join" onClick={() => confirmJoin(joinModal)} />
          </div>
        </Modal>
      )}

      {/* Room Code Modal */}
      {roomModal && (
        <Modal onClose={() => setRoomModal(null)}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>🚪</div>
            <div style={{ fontWeight: 800, fontSize: 18, margin: "8px 0 4px" }}>Match Room</div>
            <div style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>{roomModal.name}</div>
          </div>
          <div style={{ background: C.bg, borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 12, border: `1px solid ${C.accent}55` }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>ROOM ID</div>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 4, color: C.accentL }}>{roomModal.roomCode}</div>
          </div>
          <div style={{ background: C.bg, borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 20, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>PASSWORD</div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 3, color: C.gold }}>{roomModal.roomPass}</div>
          </div>
          <div style={{ fontSize: 12, color: C.muted, textAlign: "center", marginBottom: 16 }}>⚠️ Don't share room details with non-participants</div>
          <Btn label="Got it! Let's Battle 🔥" onClick={() => setRoomModal(null)} />
        </Modal>
      )}

      {/* Notifications Panel */}
      {notifOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} onClick={() => setNotifOpen(false)} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "85%", maxWidth: 380, height: "100%", background: C.surface, borderLeft: `1px solid ${C.border}`, overflowY: "auto" }}>
            <div style={{ padding: "20px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Notifications</div>
              <button onClick={() => { setNotifs(n => n.map(x => ({ ...x, unread: false }))); setNotifOpen(false); }} style={{ background: "none", border: "none", color: C.accentL, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Mark all read</button>
            </div>
            {notifs.map(n => (
              <div key={n.id} onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, unread: false } : x))} style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 12, background: n.unread ? `${C.accent}11` : "transparent", cursor: "pointer" }}>
                <div style={{ fontSize: 24, width: 36, textAlign: "center" }}>{n.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: n.unread ? 700 : 500, fontSize: 14 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: C.dim, marginTop: 2 }}>{n.body}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{n.time}</div>
                </div>
                {n.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accentL, marginTop: 4, flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screen */}
      <div style={{ minHeight: "calc(100vh - 70px)", overflowY: "auto" }}>
        {tab === "home" && <HomeScreen allTournaments={allTournaments} joined={joined} onJoin={handleJoin} onRoomCode={setRoomModal} onNotif={() => setNotifOpen(true)} unread={unreadCount} wallet={wallet} coins={coins} onViewT={(t) => { setSelectedT(t); setTab("tournaments"); }} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        {tab === "tournaments" && <TournamentsScreen allTournaments={allTournaments} joined={joined} onJoin={handleJoin} onRoomCode={setRoomModal} selected={selectedT} setSelected={setSelectedT} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        {tab === "create" && <CreateScreen onHost={(t) => { const nt = { ...t, id: Date.now(), filled: 0, status: "upcoming", tag: "NEW", banner: "🎯", roomCode: null, roomPass: null }; setAllTournaments(a => [nt, ...a]); setHostedTournaments(h => [nt, ...h]); showToast("Tournament Created! 🎉"); setTab("home"); }} />}
        {tab === "leaderboard" && <LeaderboardScreen />}
        {tab === "profile" && <ProfileScreen wallet={wallet} coins={coins} joined={joined} hosted={hostedTournaments} showToast={showToast} setWallet={setWallet} setCoins={setCoins} />}
      </div>

      {/* Bottom Nav */}
      <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", zIndex: 200 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSelectedT(null); }} style={{ flex: 1, padding: "10px 0 6px", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: t.id === "create" ? 22 : 18, ...(t.id === "create" ? { background: `linear-gradient(135deg,${C.accent},${C.accentL})`, borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", marginTop: -10, boxShadow: `0 4px 16px ${C.accentGlow}` } : {}) }}>{t.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: tab === t.id ? C.accentL : C.muted, letterSpacing: 0.5 }}>{t.label}</span>
            {tab === t.id && <div style={{ width: 16, height: 2, background: C.accentL, borderRadius: 2 }} />}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Splash({ anim }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1)", transform: anim >= 1 ? "scale(1)" : "scale(0.3)", opacity: anim >= 1 ? 1 : 0 }}>
        <div style={{ fontSize: 72, textAlign: "center", filter: "drop-shadow(0 0 30px rgba(124,58,237,0.8))" }}>⚡</div>
      </div>
      <div style={{ transition: "all 0.6s ease", opacity: anim >= 2 ? 1 : 0, transform: anim >= 2 ? "translateY(0)" : "translateY(20px)", textAlign: "center", marginTop: 16 }}>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1, background: `linear-gradient(135deg, ${C.accentL}, ${C.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BATTLEZONE</div>
        <div style={{ fontSize: 13, color: C.muted, letterSpacing: 3, marginTop: 4 }}>ESPORTS TOURNAMENTS</div>
      </div>
    </div>
  );
}

function HomeScreen({ allTournaments, joined, onJoin, onRoomCode, onNotif, unread, wallet, coins, onViewT, searchQuery, setSearchQuery }) {
  const live = allTournaments.filter(t => t.status === "live");
  const upcoming = allTournaments.filter(t => t.status === "upcoming");
  const filtered = searchQuery ? allTournaments.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.game.toLowerCase().includes(searchQuery.toLowerCase())) : null;

  return (
    <div>
      {/* Header */}
      <div style={{ padding: "20px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, textTransform: "uppercase" }}>Welcome back</div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5, background: `linear-gradient(135deg, #fff, ${C.accentL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>YoungBlade 🎮</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "6px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: C.muted }}>🪙 COINS</div>
            <div style={{ fontWeight: 800, color: C.gold, fontSize: 14 }}>{coins}</div>
          </div>
          <button onClick={onNotif} style={{ position: "relative", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
            🔔
            {unread > 0 && <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: C.red, borderRadius: "50%", border: `2px solid ${C.bg}` }} />}
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "0 16px 12px" }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search tournaments, games..." style={{ background: "none", border: "none", color: C.text, outline: "none", fontSize: 13, flex: 1, fontFamily: "inherit" }} />
          {searchQuery && <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16 }}>✕</button>}
        </div>
      </div>

      {filtered ? (
        <div style={{ padding: "0 16px" }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: C.dim }}>Results for "{searchQuery}"</div>
          {filtered.length === 0 ? <div style={{ textAlign: "center", color: C.muted, padding: "40px 0" }}>No tournaments found</div>
            : filtered.map(t => <TCard key={t.id} t={t} joined={joined.includes(t.id)} onJoin={onJoin} onRoom={onRoomCode} />)}
        </div>
      ) : (
        <>
          {/* Wallet Banner */}
          <div style={{ margin: "0 16px 14px", display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: `linear-gradient(135deg, ${C.accent}cc, ${C.card})`, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.accent}55` }}>
              <div style={{ fontSize: 10, color: C.accentL, letterSpacing: 1, fontWeight: 700 }}>WALLET</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginTop: 2 }}>₹{wallet.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>Available balance</div>
            </div>
            <div style={{ background: C.card, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
              <StatMini icon="🏅" label="Rank" val="#12" />
              <StatMini icon="🎮" label="Joined" val={joined.length} />
              <StatMini icon="🔴" label="Live" val={live.length} />
            </div>
          </div>

          {/* Hero Banner */}
          <div style={{ margin: "0 16px 14px", background: `linear-gradient(135deg, #1a0a2e, #0a0a1f)`, borderRadius: 16, padding: "18px", border: `1px solid ${C.accent}55`, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)", fontSize: 80, opacity: 0.15 }}>⚡</div>
            <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>🔥 Featured Tournament</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 6, marginBottom: 4 }}>Valorant Open Series</div>
            <div style={{ fontSize: 13, color: C.dim, marginBottom: 12 }}>Prize Pool: <span style={{ color: C.gold, fontWeight: 800 }}>₹1,00,000</span> • 128 Players</div>
            <Btn label="View Details →" onClick={() => onViewT(TOURNAMENTS[3])} small />
          </div>

          {/* Referral Banner */}
          <div style={{ margin: "0 16px 14px", background: `linear-gradient(135deg, #0f2a1a, #0a1a0f)`, borderRadius: 14, padding: "14px 16px", border: `1px solid ${C.green}44`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>🎁 Refer & Earn</div>
              <div style={{ fontSize: 12, color: C.dim, marginTop: 2 }}>Get <span style={{ color: C.gold, fontWeight: 700 }}>₹50</span> per referral</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Your code: <span style={{ color: C.accentL, fontWeight: 700 }}>BLADE2024</span></div>
            </div>
            <div style={{ background: C.green, borderRadius: 8, padding: "8px 14px", fontWeight: 700, fontSize: 12, color: "#fff", cursor: "pointer" }}>Share 📤</div>
          </div>

          {live.length > 0 && (
            <Section title="🔴 Live Now">
              {live.map(t => <TCard key={t.id} t={t} joined={joined.includes(t.id)} onJoin={onJoin} onRoom={onRoomCode} />)}
            </Section>
          )}
          <Section title="📅 Upcoming">
            {upcoming.slice(0, 4).map(t => <TCard key={t.id} t={t} joined={joined.includes(t.id)} onJoin={onJoin} onRoom={onRoomCode} />)}
          </Section>
        </>
      )}
    </div>
  );
}

function TournamentsScreen({ allTournaments, joined, onJoin, onRoomCode, selected, setSelected, searchQuery, setSearchQuery }) {
  const [filter, setFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const games = ["All", "BGMI", "Free Fire", "COD Mobile", "Valorant"];
  const statuses = ["All", "Live", "Upcoming", "Free"];

  if (selected) return <TournamentDetail t={selected} joined={joined.includes(selected.id)} onJoin={onJoin} onRoom={onRoomCode} onBack={() => setSelected(null)} />;

  let data = allTournaments;
  if (filter !== "All") data = data.filter(t => t.game === filter);
  if (statusFilter === "Live") data = data.filter(t => t.status === "live");
  if (statusFilter === "Upcoming") data = data.filter(t => t.status === "upcoming");
  if (statusFilter === "Free") data = data.filter(t => t.entry === 0);
  if (searchQuery) data = data.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.game.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <div style={{ padding: "20px 16px 10px" }}>
        <div style={{ fontSize: 22, fontWeight: 900 }}>Tournaments</div>
        <div style={{ color: C.muted, fontSize: 13 }}>Find your next battle</div>
      </div>
      <div style={{ padding: "0 16px 10px" }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "8px 12px", display: "flex", gap: 8, alignItems: "center" }}>
          <span>🔍</span>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." style={{ background: "none", border: "none", color: C.text, outline: "none", fontSize: 13, flex: 1, fontFamily: "inherit" }} />
        </div>
      </div>
      <ScrollRow items={games} active={filter} onSelect={setFilter} />
      <ScrollRow items={statuses} active={statusFilter} onSelect={setStatusFilter} />
      <div style={{ padding: "6px 16px" }}>
        {data.length === 0 ? <div style={{ textAlign: "center", color: C.muted, padding: "40px 0" }}>No tournaments found</div>
          : data.map(t => <TCard key={t.id} t={t} joined={joined.includes(t.id)} onJoin={onJoin} onRoom={onRoomCode} onClick={() => setSelected(t)} />)}
      </div>
    </div>
  );
}

function TournamentDetail({ t, joined, onJoin, onRoom, onBack }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chat, setChat] = useState(CHAT_INIT);
  const [msg, setMsg] = useState("");
  const pct = Math.round((t.filled / t.slots) * 100);

  const sendMsg = () => {
    if (!msg.trim()) return;
    setChat(c => [...c, { id: Date.now(), user: "YoungBlade", avatar: "🎮", msg: msg.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), mine: true }]);
    setMsg("");
  };

  return (
    <div>
      <div style={{ padding: "16px 16px 0", display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={onBack} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", color: C.text, cursor: "pointer", fontWeight: 700 }}>← Back</button>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Tournament Details</span>
      </div>
      <div style={{ margin: 16 }}>
        <div style={{ background: `linear-gradient(135deg, ${C.card2}, ${C.card})`, borderRadius: 16, padding: 20, border: `1px solid ${C.border}`, textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 56 }}>{t.banner}</div>
          <div style={{ fontWeight: 900, fontSize: 20, marginTop: 6 }}>{t.name}</div>
          <div style={{ color: C.muted, fontSize: 13, marginTop: 4, marginBottom: 12 }}>{t.game} • {t.format}</div>
          <Tag label={t.tag} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[["🏆 Prize", t.prize || `₹${t.prize}`], ["🎟 Entry", t.entry === 0 ? "FREE" : `₹${t.entry}`], ["⏰ Starts", t.startTime], ["👥 Players", `${t.filled}/${t.slots}`]].map(([k, v]) => (
            <div key={k} style={{ background: C.card, borderRadius: 12, padding: 14, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.muted }}>{k}</div>
              <div style={{ fontWeight: 800, fontSize: 15, marginTop: 4, color: k === "🏆 Prize" ? C.gold : C.text }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 6 }}><span>Slots</span><span>{pct}%</span></div>
          <div style={{ background: C.surface, borderRadius: 4, height: 6 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: pct > 90 ? C.red : `linear-gradient(90deg, ${C.accent}, ${C.accentL})`, borderRadius: 4 }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <button onClick={() => onJoin(t)} disabled={t.status === "completed"} style={{ flex: 2, padding: "13px 0", borderRadius: 12, border: "none", cursor: joined ? "default" : "pointer", background: joined ? `${C.green}22` : t.status === "completed" ? C.surface : `linear-gradient(135deg, ${C.accent}, ${C.accentL})`, color: joined ? C.green : t.status === "completed" ? C.muted : "#fff", fontWeight: 800, fontSize: 14, border: joined ? `1px solid ${C.green}44` : "none" }}>
            {joined ? "✅ Joined" : t.status === "completed" ? "Tournament Ended" : "⚔️ Join Tournament"}
          </button>
          {joined && t.roomCode && (
            <button onClick={() => onRoom(t)} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: `1px solid ${C.gold}`, background: `${C.gold}18`, color: C.gold, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>🚪 Room</button>
          )}
        </div>
        {/* Chat */}
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <button onClick={() => setChatOpen(!chatOpen)} style={{ width: "100%", background: "none", border: "none", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: C.text }}>
            <span style={{ fontWeight: 700 }}>💬 Match Chat ({chat.length})</span>
            <span style={{ color: C.muted }}>{chatOpen ? "▲" : "▼"}</span>
          </button>
          {chatOpen && (
            <div>
              <div style={{ maxHeight: 200, overflowY: "auto", padding: "0 12px 8px", borderTop: `1px solid ${C.border}` }}>
                {chat.map(m => (
                  <div key={m.id} style={{ display: "flex", gap: 8, marginTop: 10, flexDirection: m.mine ? "row-reverse" : "row" }}>
                    <span style={{ fontSize: 20 }}>{m.avatar}</span>
                    <div style={{ maxWidth: "75%" }}>
                      {!m.mine && <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>{m.user}</div>}
                      <div style={{ background: m.mine ? C.accent : C.card2, borderRadius: m.mine ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "8px 12px", fontSize: 13 }}>{m.msg}</div>
                      <div style={{ fontSize: 10, color: C.muted, marginTop: 2, textAlign: m.mine ? "right" : "left" }}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, padding: "8px 12px", borderTop: `1px solid ${C.border}` }}>
                <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Type a message..." style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontSize: 12, outline: "none", fontFamily: "inherit" }} />
                <button onClick={sendMsg} style={{ background: C.accent, border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff", cursor: "pointer", fontWeight: 700 }}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CreateScreen({ onHost }) {
  const [form, setForm] = useState({ name: "", game: "BGMI", format: "Battle Royale", prize: "", slots: "32", entry: "0", startTime: "" });
  const [step, setStep] = useState(1);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.name || !form.prize || !form.startTime) return;
    onHost({ name: form.name, game: form.game, format: form.format, prize: `₹${form.prize}`, slots: parseInt(form.slots), entry: parseInt(form.entry), startTime: form.startTime });
  };

  return (
    <div>
      <div style={{ padding: "20px 16px 10px" }}>
        <div style={{ fontSize: 22, fontWeight: 900 }}>Host Tournament</div>
        <div style={{ color: C.muted, fontSize: 13 }}>Create your own battle arena</div>
      </div>
      {/* Steps */}
      <div style={{ display: "flex", padding: "0 16px 16px", gap: 8 }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 4, background: s <= step ? `linear-gradient(90deg, ${C.accent}, ${C.accentL})` : C.border, cursor: "pointer", transition: "all 0.3s" }} onClick={() => setStep(s)} />
        ))}
      </div>
      <div style={{ padding: "0 16px" }}>
        {step === 1 && (
          <div>
            <div style={{ fontWeight: 700, marginBottom: 14, color: C.accentL }}>① Basic Info</div>
            <Field label="Tournament Name" value={form.name} onChange={v => set("name", v)} placeholder="e.g. Sunday Showdown" />
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Game</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["BGMI", "Free Fire", "COD Mobile", "Valorant", "Other"].map(g => (
                  <button key={g} onClick={() => set("game", g)} style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${form.game === g ? C.accent : C.border}`, background: form.game === g ? C.accentGlow : "transparent", color: form.game === g ? C.accentL : C.dim, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{g}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Format</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Solo", "Duo", "Squad", "5v5", "TDM", "Battle Royale"].map(f => (
                  <button key={f} onClick={() => set("format", f)} style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${form.format === f ? C.accent : C.border}`, background: form.format === f ? C.accentGlow : "transparent", color: form.format === f ? C.accentL : C.dim, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{f}</button>
                ))}
              </div>
            </div>
            <Btn label="Next →" onClick={() => setStep(2)} />
          </div>
        )}
        {step === 2 && (
          <div>
            <div style={{ fontWeight: 700, marginBottom: 14, color: C.accentL }}>② Prize & Entry</div>
            <Field label="Prize Pool (₹)" value={form.prize} onChange={v => set("prize", v)} placeholder="e.g. 10000" type="number" />
            <Field label="Entry Fee (₹) — 0 for Free" value={form.entry} onChange={v => set("entry", v)} placeholder="e.g. 50" type="number" />
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Max Slots</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["16", "32", "64", "100", "128"].map(s => (
                  <button key={s} onClick={() => set("slots", s)} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${form.slots === s ? C.accent : C.border}`, background: form.slots === s ? C.accentGlow : "transparent", color: form.slots === s ? C.accentL : C.dim, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn label="← Back" onClick={() => setStep(1)} ghost />
              <Btn label="Next →" onClick={() => setStep(3)} />
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div style={{ fontWeight: 700, marginBottom: 14, color: C.accentL }}>③ Schedule & Review</div>
            <Field label="Start Time" value={form.startTime} onChange={v => set("startTime", v)} placeholder="e.g. Tomorrow 6:00 PM" />
            {/* Preview Card */}
            <div style={{ background: C.card, borderRadius: 14, padding: 16, border: `1px solid ${C.accent}44`, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, color: C.accentL }}>Preview</div>
              {[["Name", form.name || "—"], ["Game", form.game], ["Format", form.format], ["Prize Pool", form.prize ? `₹${form.prize}` : "—"], ["Entry Fee", form.entry === "0" ? "FREE" : `₹${form.entry}`], ["Slots", form.slots], ["Starts", form.startTime || "—"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: C.muted }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn label="← Back" onClick={() => setStep(2)} ghost />
              <Btn label="🚀 Launch Tournament" onClick={handleSubmit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LeaderboardScreen() {
  const [filter, setFilter] = useState("All");
  const [tab, setTab] = useState("earnings");
  const games = ["All", "BGMI", "Free Fire", "COD Mobile", "Valorant"];
  let data = filter === "All" ? LEADERBOARD : LEADERBOARD.filter(p => p.game === filter);
  if (tab === "kd") data = [...data].sort((a, b) => b.kd - a.kd);
  if (tab === "wins") data = [...data].sort((a, b) => b.wins - a.wins);

  const top3 = LEADERBOARD.slice(0, 3);

  return (
    <div>
      <div style={{ padding: "20px 16px 10px" }}>
        <div style={{ fontSize: 22, fontWeight: 900 }}>Leaderboard</div>
        <div style={{ color: C.muted, fontSize: 13 }}>Season 4 Rankings</div>
      </div>
      {/* Podium */}
      <div style={{ padding: "0 16px 16px", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8 }}>
        {[top3[1], top3[0], top3[2]].map((p, i) => {
          const h = [110, 140, 95][i];
          const col = [C.silver, C.gold, C.bronze][i];
          const pos = [2, 1, 3][i];
          const medals = ["🥈","🥇","🥉"];
          return (
            <div key={p.rank} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 4 }}>{p.avatar}</div>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
              <div style={{ height: h, background: `linear-gradient(180deg, ${col}33, ${col}11)`, border: `1px solid ${col}66`, borderRadius: "8px 8px 0 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <div style={{ fontSize: 22 }}>{medals[i]}</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: col }}>#{pos}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{p.wins}W</div>
                <div style={{ fontSize: 10, color: col, fontWeight: 700 }}>₹{(p.earnings / 1000).toFixed(1)}k</div>
              </div>
            </div>
          );
        })}
      </div>

      <ScrollRow items={games} active={filter} onSelect={setFilter} />
      <div style={{ display: "flex", gap: 8, padding: "6px 16px 10px" }}>
        {[["earnings", "💰 Earnings"], ["wins", "🏆 Wins"], ["kd", "⚡ K/D"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${tab === k ? C.accent : C.border}`, background: tab === k ? C.accentGlow : "transparent", color: tab === k ? C.accentL : C.muted, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: "0 16px" }}>
        {data.map((p, i) => (
          <div key={p.rank} style={{ display: "flex", alignItems: "center", gap: 12, background: i < 3 ? `${C.accent}0d` : C.card, borderRadius: 12, padding: "12px 14px", marginBottom: 8, border: `1px solid ${i < 3 ? C.accent + "33" : C.border}` }}>
            <div style={{ width: 28, textAlign: "center", fontWeight: 900, fontSize: 14, color: [C.gold, C.silver, C.bronze][i] || C.muted }}>{i < 3 ? ["🥇","🥈","🥉"][i] : `#${p.rank}`}</div>
            <div style={{ fontSize: 26 }}>{p.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{p.game}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, color: C.gold, fontSize: 14 }}>₹{p.earnings.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{p.wins}W · {p.kd} K/D</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ wallet, coins, joined, hosted, showToast, setWallet, setCoins }) {
  const [activeTab, setActiveTab] = useState("stats");
  const [addAmount, setAddAmount] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const profile = { name: "YoungBlade", avatar: "🎮", level: 24, badge: "Gold", game: "BGMI", wins: 18, losses: 7, kd: 4.3, rank: 12 };
  const matches = [
    { tournament: "BGMI Solo Cup", result: "Win", prize: "₹800", date: "Yesterday" },
    { tournament: "Free Fire Duo", result: "Loss", prize: "-", date: "2d ago" },
    { tournament: "BGMI Pro League S3", result: "Win", prize: "₹2,000", date: "5d ago" },
    { tournament: "COD Mobile War", result: "Win", prize: "₹500", date: "1w ago" },
  ];
  const winRate = Math.round((profile.wins / (profile.wins + profile.losses)) * 100);
  const referrals = [{ name: "ShadowX", earned: "₹50", date: "3d ago" }, { name: "GhostBlade", earned: "₹50", date: "1w ago" }];

  return (
    <div>
      {/* Header */}
      <div style={{ background: `linear-gradient(180deg, ${C.accent}33, transparent)`, padding: "24px 16px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 60, marginBottom: 8 }}>{profile.avatar}</div>
        <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: -0.5 }}>{profile.name}</div>
        <div style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>{profile.game} • Level {profile.level}</div>
        <div style={{ display: "inline-flex", gap: 8, marginTop: 10 }}>
          <span style={{ background: C.accentGlow, border: `1px solid ${C.accent}`, borderRadius: 20, padding: "3px 12px", fontSize: 11, color: C.accentL, fontWeight: 700 }}>🏅 {profile.badge}</span>
          <span style={{ background: `${C.gold}18`, border: `1px solid ${C.gold}55`, borderRadius: 20, padding: "3px 12px", fontSize: 11, color: C.gold, fontWeight: 700 }}>Rank #{profile.rank}</span>
        </div>
      </div>

      {/* Wallet Card */}
      <div style={{ margin: "0 16px 14px", background: C.card, borderRadius: 14, padding: 16, border: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: C.muted }}>Wallet Balance</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: C.gold }}>₹{wallet.toLocaleString()}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: C.muted }}>Battle Coins</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.cyan }}>🪙 {coins}</div>
          </div>
        </div>
        {showAdd ? (
          <div style={{ display: "flex", gap: 8 }}>
            <input value={addAmount} onChange={e => setAddAmount(e.target.value)} placeholder="Amount (₹)" type="number" style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontSize: 13, outline: "none", fontFamily: "inherit" }} />
            <button onClick={() => { if (!addAmount) return; setWallet(w => w + parseInt(addAmount)); setCoins(c => c + Math.floor(parseInt(addAmount) / 10)); showToast(`₹${addAmount} added! 🎉`); setAddAmount(""); setShowAdd(false); }} style={{ background: C.green, border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Add</button>
            <button onClick={() => setShowAdd(false)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.muted, cursor: "pointer" }}>✕</button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            {[["+ Add Money", C.accent, () => setShowAdd(true)], ["Withdraw", C.surface, () => showToast("Withdrawal initiated! ✅")], ["History", C.surface, () => setActiveTab("wallet")]].map(([l, bg, fn]) => (
              <button key={l} onClick={fn} style={{ flex: 1, padding: "8px 0", background: bg, border: bg === C.surface ? `1px solid ${C.border}` : "none", borderRadius: 8, color: bg === C.accent ? "#fff" : C.text, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{l}</button>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", padding: "0 16px 10px", gap: 6 }}>
        {[["stats","📊 Stats"], ["history","🎮 History"], ["hosted","🏆 Hosted"], ["referral","🎁 Refer"]].map(([k, l]) => (
          <button key={k} onClick={() => setActiveTab(k)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${activeTab === k ? C.accent : C.border}`, background: activeTab === k ? C.accentGlow : "transparent", color: activeTab === k ? C.accentL : C.muted, cursor: "pointer", fontSize: 10, fontWeight: 700 }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: "0 16px 16px" }}>
        {activeTab === "stats" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[["🏆", "Wins", profile.wins, C.gold], ["💀", "Losses", profile.losses, C.red], ["⚡", "K/D", profile.kd, C.accentL], ["📈", "Win Rate", `${winRate}%`, C.green], ["🎮", "Joined", joined.length, C.cyan], ["🏅", "Hosted", hosted.length, C.gold]].map(([ic, l, v, col]) => (
                <div key={l} style={{ background: C.card, borderRadius: 12, padding: 14, textAlign: "center", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 20 }}>{ic}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: col, marginTop: 4 }}>{v}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "history" && (
          <div>
            {matches.map((m, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 12, padding: "12px 14px", marginBottom: 8, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{m.tournament}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{m.date}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, color: m.result === "Win" ? C.green : C.red, fontSize: 13 }}>{m.result}</div>
                  <div style={{ fontSize: 11, color: C.gold }}>{m.prize}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "hosted" && (
          <div>
            {hosted.length === 0 ? (
              <div style={{ textAlign: "center", color: C.muted, padding: "40px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
                <div>No tournaments hosted yet</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Go to "Host" tab to create one!</div>
              </div>
            ) : hosted.map((t, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 12, padding: "12px 14px", marginBottom: 8, border: `1px solid ${C.border}` }}>
                <div style={{ fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{t.game} • {t.format} • {t.slots} slots</div>
                <div style={{ fontSize: 12, color: C.gold, marginTop: 4 }}>Prize: {t.prize}</div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "referral" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, #0f2a1a, #0a1a0f)`, borderRadius: 14, padding: 20, border: `1px solid ${C.green}44`, textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 36 }}>🎁</div>
              <div style={{ fontWeight: 800, fontSize: 18, marginTop: 8 }}>Refer & Earn</div>
              <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>Earn <span style={{ color: C.gold, fontWeight: 700 }}>₹50</span> for every friend who joins!</div>
              <div style={{ background: C.bg, borderRadius: 10, padding: "12px 16px", marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 800, fontSize: 16, color: C.accentL, letterSpacing: 2 }}>BLADE2024</span>
                <button onClick={() => showToast("Code copied! 📋")} style={{ background: C.accent, border: "none", borderRadius: 6, padding: "6px 12px", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Copy</button>
              </div>
            </div>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Your Referrals ({referrals.length})</div>
            {referrals.map((r, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 10, padding: "12px 14px", marginBottom: 8, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 600 }}>{r.name}</div>
                <div style={{ color: C.green, fontWeight: 700 }}>{r.earned}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Shared UI Components ----
function TCard({ t, joined, onJoin, onRoom, onClick }) {
  const pct = Math.round((t.filled / t.slots) * 100);
  return (
    <div onClick={onClick} style={{ background: C.card, borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${C.border}`, cursor: onClick ? "pointer" : "default" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ fontSize: 34, width: 48, textAlign: "center", flexShrink: 0 }}>{t.banner}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{t.name}</div>
            <Tag label={t.tag} />
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{t.game} · {t.format} · {t.startTime}</div>
          <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 12 }}>
            <span>🏆 <span style={{ color: C.gold, fontWeight: 700 }}>{t.prize}</span></span>
            <span>🎟 <span style={{ fontWeight: 600 }}>{t.entry === 0 ? "Free" : `₹${t.entry}`}</span></span>
            <span>👥 <span style={{ fontWeight: 600 }}>{t.filled}/{t.slots}</span></span>
          </div>
          <div style={{ marginTop: 8, background: C.surface, borderRadius: 3, height: 4 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: pct > 90 ? C.red : `linear-gradient(90deg, ${C.accent}, ${C.accentL})`, borderRadius: 3, transition: "width 0.5s" }} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={(e) => { e.stopPropagation(); onJoin(t); }} disabled={t.status === "completed"} style={{ flex: joined ? 1 : 2, padding: "9px 0", borderRadius: 8, border: "none", cursor: joined ? "default" : "pointer", background: joined ? `${C.green}22` : t.status === "completed" ? C.surface : `linear-gradient(135deg, ${C.accent}, ${C.accentL})`, color: joined ? C.green : t.status === "completed" ? C.muted : "#fff", fontWeight: 700, fontSize: 13, border: joined ? `1px solid ${C.green}33` : "none" }}>
          {joined ? "✅ Joined" : t.status === "completed" ? "Ended" : t.status === "full" ? "Waitlist" : "Join"}
        </button>
        {joined && t.roomCode && (
          <button onClick={(e) => { e.stopPropagation(); onRoom(t); }} style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: `1px solid ${C.gold}55`, background: `${C.gold}18`, color: C.gold, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>🚪 Room</button>
        )}
      </div>
    </div>
  );
}

function Tag({ label }) {
  const colors = { "LIVE": C.green, "UPCOMING": C.blue, "FREE": C.green, "HOT": C.gold, "FULL": C.red, "ENDED": C.muted, "NEW": C.cyan };
  const c = colors[label] || C.muted;
  return <span style={{ fontSize: 9, fontWeight: 800, color: c, background: `${c}22`, border: `1px solid ${c}44`, borderRadius: 5, padding: "2px 7px", whiteSpace: "nowrap", letterSpacing: 0.5 }}>{label}</span>;
}

function Section({ title, children }) {
  return <div style={{ padding: "0 16px 8px" }}><div style={{ fontWeight: 800, fontSize: 15, marginBottom: 10 }}>{title}</div>{children}</div>;
}

function ScrollRow({ items, active, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 8, padding: "0 16px 10px", overflowX: "auto" }}>
      {items.map(item => (
        <button key={item} onClick={() => onSelect(item)} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${active === item ? C.accent : C.border}`, background: active === item ? C.accentGlow : "transparent", color: active === item ? C.accentL : C.muted, cursor: "pointer", whiteSpace: "nowrap", fontSize: 12, fontWeight: 700 }}>{item}</button>
      ))}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.card, borderRadius: 20, padding: 24, border: `1px solid ${C.border}`, width: "100%", maxWidth: 360, maxHeight: "90vh", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

function Btn({ label, onClick, ghost, small }) {
  return (
    <button onClick={onClick} style={{ width: ghost ? "auto" : "100%", flex: ghost ? 1 : undefined, padding: small ? "8px 16px" : "12px 0", borderRadius: 10, border: ghost ? `1px solid ${C.border}` : "none", background: ghost ? "transparent" : `linear-gradient(135deg, ${C.accent}, ${C.accentL})`, color: ghost ? C.muted : "#fff", fontWeight: 700, fontSize: small ? 12 : 14, cursor: "pointer" }}>{label}</button>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
      <span style={{ color: C.muted }}>{label}</span>
      <span style={{ fontWeight: 700, color: highlight ? C.gold : C.text }}>{value}</span>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>{label}</div>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type} style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
    </div>
  );
}

function StatMini({ icon, label, val }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12 }}>
      <span>{icon}</span><span style={{ color: C.muted }}>{label}:</span><span style={{ fontWeight: 700 }}>{val}</span>
    </div>
  );
}
