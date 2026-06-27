import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { STYLES, IC } from "./components/UI.jsx";
import { useAuth } from "./hooks/useAuth";
import { useDashboard } from "./hooks/useDashboard";
import './index.css';
import './styles/landing.css';

// Import all your pages
import LandingPage   from "./pages/LandingPage";
import AuthPage      from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage      from "./pages/ChatPage";
import CheckInPage   from "./pages/CheckInPage";

import {
  JournalPage, NotificationsPage, PlansPage,
  ResourcesPage, EmergencyPage, AdminPage,
} from "./pages/OtherPages";

const RISK_MSG = {
  Low:      "Stable. Keep checking in daily.",
  Moderate: "Urge pattern elevated. Engage with your plan.",
  High:     "Multiple indicators active. Open AI Support now.",
};

// ── Inner App Component (Router Consumer) ─────────────────────────────────────
function MainApp() {
  const { user, checked, login, register, logout } = useAuth();
  const { dash, error, refresh } = useDashboard();

  const location = useLocation();
  const navigate = useNavigate();

  // Derive current page from the URL path (remove leading slash)
  const currentPath = location.pathname.replace("/", "");
  const page = currentPath || "dashboard";

  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const navRefs = useRef({});

  useEffect(() => { if (user) refresh(); }, [user]);

  // Update sliding indicator position when page changes
  useEffect(() => {
    const el = navRefs.current[page];
    if (el) {
      const { offsetTop, offsetHeight } = el;
      setIndicatorStyle({ top: offsetTop, height: offsetHeight });
    }
  }, [page, user]);

  // ── Loading splash ──────────────────────────────────────────────────────────
  if (!checked) {
    return (
      <>
        <style>{STYLES}</style>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", flexDirection:"column", gap:14 }}>
          <div style={{ display:"flex", gap:6 }}><div className="ld"/><div className="ld"/><div className="ld"/></div>
          <div style={{ fontSize:12, color:"var(--text3)", fontFamily:"DM Sans,sans-serif" }}>Loading Serenity...</div>
        </div>
      </>
    );
  }

  // ── Public Routes (Not logged in) ───────────────────────────────────────────
  if (!user) {
    return (
      <>
        <style>{STYLES}</style>
        <Routes>
          {/* The beautiful animated landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* The login / register forms */}
          <Route path="/login" element={<AuthPage initialMode="login" onLogin={login} onRegister={register} />} />
          <Route path="/register" element={<AuthPage initialMode="register" onLogin={login} onRegister={register} />} />

          {/* If an unauthenticated user tries to go anywhere else, send them to the landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    );
  }

  // ── Authenticated App Shell ─────────────────────────────────────────────────

  // If logged in but sitting at root/auth URLs, send to dashboard
  if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
    return <Navigate to="/dashboard" replace />;
  }

  const risk   = dash?.risk   || { score: 0, label: "Low" };
  const unread = dash?.unreadNotifs || 0;

  const NAV = [
    { id:"dashboard",     label:"Dashboard",     icon:"dashboard" },
    { id:"chat",          label:"AI Support",    icon:"chat"      },
    { id:"checkin",       label:"Check-In",      icon:"checkin"   },
    { id:"journal",       label:"Journal",       icon:"journal"   },
    { id:"notifications", label:"Notifications", icon:"bell",  badge:unread },
    { id:"plans",         label:"Recovery Plans",icon:"plans"     },
    { id:"resources",     label:"Resources",     icon:"resources" },
    { id:"emergency",     label:"Emergency",     icon:"emergency" },
    ...(user.role === "admin" ? [{ id:"admin", label:"Admin", icon:"admin" }] : []),
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="shell">

        {/* ── SIDEBAR ── */}
        <aside className="side">
          <div className="brand">
            <div className="brand-mark">
              <div className="brand-orb">✦</div>
              <div>
                <div className="brand-name">Serenity</div>
                <div className="brand-tag">Recovery Platform</div>
              </div>
            </div>
          </div>

          <nav className="nav">
            <div className="nav-indicator" style={{
              top:    indicatorStyle.top,
              height: indicatorStyle.height,
              opacity: indicatorStyle.height ? 1 : 0,
            }}/>

            {NAV.map((n) => (
              <div
                key={n.id}
                ref={(el) => { navRefs.current[n.id] = el; }}
                className={`ni ${page === n.id ? "on" : ""}`}
                onClick={() => navigate(`/${n.id}`)}
              >
                {IC[n.icon]}
                {n.label}
                {n.badge > 0 && <span className="notif-dot"/>}
              </div>
            ))}
          </nav>

          <div className="side-gap"/>

          <div className={`risk-widget ${risk.label}`} style={{ transition:"all .4s ease" }}>
            <div className={`rw-label ${risk.label}`}>
              Relapse Risk · {risk.label}
            </div>
            <div className="rw-body">{RISK_MSG[risk.label]}</div>
          </div>

          <div className="user-chip">
            <div className="user-av">{user.name[0]}</div>
            <div style={{ flex:1, overflow:"hidden" }}>
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
            <button className="logout-btn" onClick={logout}>Sign out</button>
          </div>
        </aside>

        {/* ── MAIN CONTENT (React Router Routes) ── */}
        <main style={{ overflow:"hidden", display:"flex", flexDirection:"column", background:"var(--base)" }}>
          <Routes>
            <Route path="/dashboard"     element={<DashboardPage dash={dash} error={error} setPage={(p) => navigate(`/${p}`)} onRefresh={refresh}/>} />
            <Route path="/chat"          element={<ChatPage dash={dash}/>} />
            <Route path="/checkin"       element={<CheckInPage onDone={refresh}/>} />
            <Route path="/journal"       element={<JournalPage/>} />
            <Route path="/notifications" element={<NotificationsPage onRead={refresh}/>} />
            <Route path="/plans"         element={<PlansPage/>} />
            <Route path="/resources"     element={<ResourcesPage/>} />
            <Route path="/emergency"     element={<EmergencyPage/>} />

            {user.role === "admin" && (
              <Route path="/admin" element={<AdminPage/>} />
            )}

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

// ── Exported App (Router Provider) ────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}