import { useEffect } from "react";
import { Gauge, Loading, ErrorBox } from "../components/UI";
import { RISK_COLOR, URGE_LABELS } from "../utils/constants";

export default function DashboardPage({ dash, error, setPage, onRefresh }) {
  useEffect(() => { onRefresh(); }, []);

  if (error) return <div className="page"><ErrorBox message={`Could not reach the server: ${error}. Make sure the backend is running on port 4000.`}/></div>;
  if (!dash) return <div className="page"><Loading/></div>;

  const { user, streak, risk, lastCheckin, checkins, journalCount, activePlans } = dash;
  const color = RISK_COLOR[risk.label] || "#7ec8a4";
  const chart = checkins.slice(-7);

  return (
    <div className="page">
      <div className="eyebrow">Recovery Overview</div>
      <div className="h1">Good morning, {user.name.split(" ")[0]}.</div>
      <div className="sub">Day {streak} of your commitment. All data is live from your records.</div>

     <div className="d-grid">
        <div className="card">
          <div className="card-label">Days Sober</div>
          <div className="stat-val sage">{streak}</div>
          <div className="stat-caption">{user.recovery_focus} recovery</div>
        </div>
        <div className="card">
          <div className="card-label">Last Mood</div>
          <div className="stat-val">{lastCheckin ? `${lastCheckin.mood}/5` : "—"}</div>
          <div className="stat-caption">{lastCheckin ? new Date(lastCheckin.created_at).toLocaleDateString() : "No check-ins yet"}</div>
        </div>
        <div className="card">
          <div className="card-label">Journal Entries</div>
          <div className="stat-val">{journalCount}</div>
          <div className="stat-caption">{activePlans?.length || 0} active recovery plan{activePlans?.length !== 1 ? "s" : ""}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="row" style={{ marginBottom: 4 }}>
          <div className="card-label flex1">Live Relapse Risk Score</div>
          <span className={`pill ${risk.label}`}>{risk.label}</span>
        </div>
        <Gauge score={risk.score} color={color}/>
        <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.65, textAlign: "center", maxWidth: 360, margin: "0 auto" }}>
          {risk.label === "Low" && "Mood and urge data is stable. Continue daily logging to maintain this picture."}
          {risk.label === "Moderate" && `Average urge elevated across recent check-ins. Last urge: ${lastCheckin ? URGE_LABELS[lastCheckin.urge] : "unknown"}. Engage with your recovery plan today.`}
          {risk.label === "High" && "Multiple concurrent risk indicators active. Open AI Support or contact your support anchor immediately."}
        </p>
        <div style={{ fontSize: 11, color: "var(--text3)", textAlign: "center", marginTop: 12 }}>
          Recalculates on every check-in · <span style={{ color: "var(--sage)", cursor: "pointer" }} onClick={() => setPage("checkin")}>Log now →</span>
        </div>
      </div>

      {activePlans?.length > 0 && (
        <div className="card" style={{ marginBottom: 18 }}>
          <div className="card-label">Active Recovery Plans</div>
          {activePlans.map((p) => (
            <div key={p.id} style={{ marginTop: 12 }}>
              <div className="row">
                <span style={{ fontSize: 13.5, fontWeight: 500, flex: 1 }}>{p.title}</span>
                <span className="plan-fw">{p.framework}</span>
              </div>
              <div className="plan-progress" style={{ marginTop: 8, marginBottom: 4 }}>
                <div className="plan-fill" style={{ width: `${p.progress}%` }}/>
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)" }}>{p.progress}% complete — {p.duration_days} day programme</div>
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <div className="card-label">Mood Trend — Last {chart.length} Sessions</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 72, marginTop: 12 }}>
          {chart.map((c, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{ width: "100%", borderRadius: "4px 4px 0 0", minHeight: 3, height: `${(c.mood / 5) * 100}%`, background: `linear-gradient(180deg,${color} 0%,var(--sage-dim) 100%)`, opacity: 0.6 + 0.4 * (i / chart.length), transition: "height .4s ease" }}/>
              <div style={{ fontSize: 10, color: "var(--text3)" }}>
                {new Date(c.created_at).toLocaleDateString("en", { weekday: "short" }).slice(0, 2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}