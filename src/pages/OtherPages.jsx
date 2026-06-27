// ── JOURNAL ───────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import { api } from "../utils/api";
import { Loading } from "../components/UI";
import { FRAMEWORKS, RISK_COLOR } from "../utils/constants";

export function JournalPage() {
  const [entries, setEntries] = useState(null);
  const [text, setText]       = useState("");
  const [saving, setSaving]   = useState(false);
  const [reflection, setReflection] = useState(null);

  const load = async () => {
    try { setEntries(await api("GET", "/journal")); } catch { setEntries([]); }
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!text.trim()) return;
    setSaving(true);
    try {
      const entry = await api("POST", "/journal", { content: text });
      setReflection(entry.ai_reflection);
      setText("");
      load();
    } catch (e) { alert(e.message); }
    setSaving(false);
  };

  const del = async (id) => {
    if (!confirm("Delete this entry?")) return;
    try { await api("DELETE", `/journal/${id}`); load(); } catch {}
  };

  return (
    <div className="page">
      <div className="eyebrow">Private Journal</div>
      <div className="h1">Internal State Log</div>
      <div className="sub">Entries are saved to your account. Each one receives an AI reflection prompt.</div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "monospace" }}>SESSION · {Date.now().toString(36).toUpperCase()}</div>
          <div style={{ fontSize: 10, color: "var(--sage)", letterSpacing: ".1em", textTransform: "uppercase" }}>Encrypted</div>
        </div>
        <textarea className="j-ta" placeholder="Write about your current state, what happened today..."
          value={text} onChange={(e) => { setText(e.target.value); setReflection(null); }}/>
        {reflection && (
          <div className="j-reflection">
            <strong>Serenity's Reflection</strong>
            {reflection}
          </div>
        )}
        <button className="submit-btn" onClick={save} disabled={!text.trim() || saving}>
          {saving ? "Saving & generating reflection..." : "Commit Entry"}
        </button>
      </div>

      <div className="card-label" style={{ marginBottom: 10 }}>Previous Entries</div>
      {!entries ? <Loading/> : entries.length === 0
        ? <div style={{ fontSize: 13, color: "var(--text3)" }}>No entries yet.</div>
        : (
          <div className="entries">
            {entries.map((e, i) => (
              <div className="entry-card" key={i}>
                <div className="e-date">
                  {new Date(e.created_at).toLocaleString()}
                  <button style={{ float: "right", background: "none", border: "none", color: "var(--text3)", cursor: "pointer", fontSize: 11 }}
                    onClick={() => del(e.id)}>Delete</button>
                </div>
                <div className="e-prev">{e.content}</div>
                {e.ai_reflection && <div className="e-reflection">"{e.ai_reflection}"</div>}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
export function NotificationsPage({ onRead }) {
  const [notifs, setNotifs] = useState(null);
  const ICONS = { reminder: "🔔", alert: "⚠️", milestone: "🏆", system: "📢" };

  const load = async () => {
    try { setNotifs(await api("GET", "/notifications")); } catch { setNotifs([]); }
  };
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api("PATCH", `/notifications/${id}/read`);
    load(); onRead();
  };
  const markAll = async () => {
    await api("PATCH", "/notifications/read-all");
    load(); onRead();
  };

  return (
    <div className="page">
      <div className="eyebrow">Inbox</div>
      <div className="h1">Notifications</div>
      <div className="sub">Reminders, milestones, and alerts from Serenity.</div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <button className="ghost-btn" onClick={markAll}>Mark all as read</button>
      </div>
      {!notifs ? <Loading/> : notifs.length === 0
        ? <div style={{ fontSize: 13, color: "var(--text3)" }}>No notifications.</div>
        : (
          <div className="notif-list">
            {notifs.map((n, i) => (
              <div key={i} className={`notif-item ${!n.read ? "unread" : ""}`}
                onClick={() => !n.read && markRead(n.id)}
                style={{ cursor: !n.read ? "pointer" : "default" }}>
                <div className={`notif-icon ${n.type}`}>{ICONS[n.type] || "📢"}</div>
                <div style={{ flex: 1 }}>
                  <div className="notif-title">{n.title}</div>
                  <div className="notif-body">{n.body}</div>
                  <div className="notif-time">{new Date(n.created_at).toLocaleString()}</div>
                </div>
                {!n.read && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sage)", marginTop: 6, flexShrink: 0 }}/>}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

// ── PLANS ─────────────────────────────────────────────────────────────────────
export function PlansPage() {
  const [plans, setPlans]     = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]       = useState({ title: "", framework: "CBT", duration_days: 30 });
  const [creating, setCreating] = useState(false);

  const load = async () => {
    try { setPlans(await api("GET", "/plans")); } catch { setPlans([]); }
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.title.trim()) return;
    setCreating(true);
    try {
      await api("POST", "/plans", form);
      setForm({ title: "", framework: "CBT", duration_days: 30 });
      setShowForm(false);
      load();
    } catch (e) { alert(e.message); }
    setCreating(false);
  };

  const update = async (id, body) => {
    try { await api("PATCH", `/plans/${id}`, body); load(); } catch {}
  };

  const active   = plans?.filter((p) => p.active);
  const archived = plans?.filter((p) => !p.active);

  return (
    <div className="page">
      <div className="eyebrow">Recovery</div>
      <div className="h1">Recovery Plans</div>
      <div className="sub">Structured programmes for your journey. Progress is tracked by you.</div>

      {showForm ? (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-label" style={{ marginBottom: 14 }}>New Plan</div>
          <div className="field"><label>Plan Title</label>
            <input placeholder="e.g. CBT Relapse Prevention" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}/>
          </div>
          <div className="inline-grid">
            <div className="field"><label>Framework</label>
              <select value={form.framework} onChange={(e) => setForm((p) => ({ ...p, framework: e.target.value }))}>
                {FRAMEWORKS.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="field"><label>Duration (days)</label>
              <input type="number" min={7} max={365} value={form.duration_days}
                onChange={(e) => setForm((p) => ({ ...p, duration_days: +e.target.value }))}/>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="submit-btn" style={{ flex: 1 }} onClick={create} disabled={creating || !form.title.trim()}>
              {creating ? "Creating..." : "Create Plan"}
            </button>
            <button className="ghost-btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="submit-btn" style={{ marginBottom: 20 }} onClick={() => setShowForm(true)}>+ New Recovery Plan</button>
      )}

      {!plans ? <Loading/> : (
        <>
          {active?.length > 0 && (
            <><div className="card-label" style={{ marginBottom: 10 }}>Active Plans</div>
              {active.map((p) => <PlanCard key={p.id} plan={p} onUpdate={update}/>)}</>
          )}
          {archived?.length > 0 && (
            <><div className="card-label" style={{ marginBottom: 10, marginTop: 20 }}>Archived</div>
              {archived.map((p) => <PlanCard key={p.id} plan={p} onUpdate={update}/>)}</>
          )}
          {!plans.length && <div style={{ fontSize: 13, color: "var(--text3)" }}>No recovery plans yet. Create one above.</div>}
        </>
      )}
    </div>
  );
}

function PlanCard({ plan, onUpdate }) {
  const [prog, setProg] = useState(plan.progress);
  return (
    <div className="plan-card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ fontWeight: 500, fontSize: 14 }}>{plan.title}</div>
        <span className="plan-fw">{plan.framework}</span>
      </div>
      {plan.description && <div style={{ fontSize: 12.5, color: "var(--text2)", marginBottom: 12, lineHeight: 1.5 }}>{plan.description}</div>}
      <div className="plan-progress"><div className="plan-fill" style={{ width: `${prog}%` }}/></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, color: "var(--text3)" }}>{prog}% · {plan.duration_days} days</div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="ghost-btn" style={{ fontSize: 11, padding: "4px 10px" }}
            onClick={() => { const n = Math.min(100, prog + 10); setProg(n); onUpdate(plan.id, { progress: n }); }}>+10%</button>
          <button className="ghost-btn" style={{ fontSize: 11, padding: "4px 10px" }}
            onClick={() => onUpdate(plan.id, { active: !plan.active })}>
            {plan.active ? "Archive" : "Restore"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── RESOURCES ─────────────────────────────────────────────────────────────────
export function ResourcesPage() {
  const [resources, setResources] = useState(null);
  const [expanded, setExpanded]   = useState(null);

  useEffect(() => {
    api("GET", "/resources").then(setResources).catch(() => setResources([]));
  }, []);

  return (
    <div className="page">
      <div className="eyebrow">Knowledge Base</div>
      <div className="h1">Educational Resources</div>
      <div className="sub">Evidence-based content. Tap any article to read.</div>
      {!resources ? <Loading/> : (
        <div className="res-grid">
          {resources.map((r, i) => (
            <div className="res-card" key={i} onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="res-cat">{r.category}</div>
              <div className="res-title">{r.title}</div>
              <div className="res-meta">{r.read_time_minutes} min read</div>
              {expanded === i && <div className="res-expanded">{r.content}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── EMERGENCY ─────────────────────────────────────────────────────────────────
export function EmergencyPage() {
  const [timer, setTimer] = useState(false);
  const [count, setCount] = useState(4);
  const [phase, setPhase] = useState("Inhale");
  const phases = ["Inhale", "Hold", "Exhale", "Hold"];
  const iRef = useRef(null);

  const start = () => {
    setTimer(true); setCount(4); setPhase("Inhale");
    let c = 4, pi = 0;
    iRef.current = setInterval(() => {
      c--;
      if (c <= 0) { c = 4; pi = (pi + 1) % 4; setPhase(phases[pi]); }
      setCount(c);
    }, 1000);
  };
  const stop = () => { clearInterval(iRef.current); setTimer(false); };

  return (
    <div className="page">
      <div className="emg-banner">
        <div className="emg-title">Emergency Support</div>
        <div className="emg-sub">You are not alone. Help is available right now.</div>
      </div>
      <div className="help-grid">
        <div className="help-card"><div className="hc-name">SAMHSA Helpline</div><div className="hc-num">1-800-662-4357</div></div>
        <div className="help-card"><div className="hc-name">Crisis Text Line</div><div className="hc-num">Text HOME to 741741</div></div>
      </div>
      <button className="panic-btn" onClick={start}>Start 4-4-4 Breathing Timer</button>
      <div className="grounding-card">
        <div className="g-title">Active Grounding Protocol</div>
        <div className="steps">
          {[
            "Stop everything. One full 4-4-4 breath: inhale 4 counts, hold 4, exhale 4.",
            "Physical anchor: cold water on face or hands activates the dive reflex and interrupts the craving loop.",
            "Name five objects in your environment aloud.",
            "Contact your support anchor. If unavailable, text 741741.",
            "This urge is a temporary neurological event. It peaks at 15-30 minutes and passes.",
          ].map((s, i) => (
            <div className="step" key={i}>
              <div className="step-n">{i + 1}</div>
              <div className="step-t">{s}</div>
            </div>
          ))}
        </div>
      </div>
      {timer && (
        <div className="timer-overlay">
          <div className="timer-card">
            <div className="timer-title">4-4-4 Breathing</div>
            <div className="timer-sub">Follow the count. You're doing well.</div>
            <div className="timer-num">{count}</div>
            <div className="timer-phase">{phase}</div>
            <button className="ghost-btn" onClick={stop}>End Session</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────
export function AdminPage() {
  const [data, setData]     = useState(null);
  const [bc, setBc]         = useState({ title: "", body: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]     = useState(false);

  const load = async () => {
    try { setData(await api("GET", "/admin")); } catch {}
  };
  useEffect(() => { load(); }, []);

  const delUser = async (id, name) => {
    if (!confirm(`Delete ${name} and all their data? This cannot be undone.`)) return;
    try { await api("DELETE", `/admin/users/${id}`); load(); } catch (e) { alert(e.message); }
  };

  const broadcast = async () => {
    if (!bc.title || !bc.body) return;
    setSending(true);
    try {
      await api("POST", "/admin/notify", { ...bc, type: "system" });
      setSent(true);
      setBc({ title: "", body: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (e) { alert(e.message); }
    setSending(false);
  };

  if (!data) return <div className="page"><Loading/></div>;
  const { stats, users } = data;

  return (
    <div className="page">
      <div className="eyebrow">Restricted Access</div>
      <div className="h1">Administration</div>
      <div className="sub">Live data from the database. Risk scores computed in real time.</div>

      <div className="admin-metrics">
        {[["Total Users", stats.totalUsers], ["Check-ins", stats.totalCheckins], ["Journal Entries", stats.totalJournal], ["Notifications", stats.totalNotifications], ["High Risk", stats.highRiskCount]].map(([l, v]) => (
          <div className="am" key={l}>
            <div className="am-l">{l}</div>
            <div className="am-v" style={l === "High Risk" && v > 0 ? { color: "var(--rose)" } : {}}>{v}</div>
          </div>
        ))}
      </div>

      <div className="tbl">
        <div className="thr" style={{ gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr" }}>
          {["Name", "Email", "Role", "Risk", "Streak", "Action"].map((h) => <div className="th" key={h}>{h}</div>)}
        </div>
        {users.map((u, i) => (
          <div className="tr" key={i} style={{ gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr" }}>
            <div className="td-c">{u.name}</div>
            <div className="td-c" style={{ color: "var(--text3)", fontSize: 11 }}>{u.email}</div>
            <div className="td-c"><span className={`badge ${u.role === "admin" ? "admin-b" : "user-b"}`}>{u.role.toUpperCase()}</span></div>
            <div className="td-c"><span className={`pill ${u.risk?.label || "Low"}`} style={{ fontSize: 10 }}>{u.risk?.label} ({u.risk?.score})</span></div>
            <div className="td-c">{u.streak}d</div>
            <div className="td-c">{u.role !== "admin" && <button className="danger-btn" onClick={() => delUser(u.id, u.name)}>Delete</button>}</div>
          </div>
        ))}
      </div>

      <div className="broadcast-form">
        <div style={{ fontFamily: "var(--serif)", fontSize: 18, marginBottom: 16 }}>Broadcast Notification</div>
        <div className="sub" style={{ marginBottom: 16 }}>Sends to all non-admin users instantly.</div>
        {sent && <div className="ok-box">Notification sent to all users.</div>}
        <div className="field"><label>Title</label>
          <input placeholder="e.g. Scheduled Maintenance" value={bc.title} onChange={(e) => setBc((p) => ({ ...p, title: e.target.value }))}/>
        </div>
        <div className="field"><label>Message</label>
          <input placeholder="Notification body..." value={bc.body} onChange={(e) => setBc((p) => ({ ...p, body: e.target.value }))}/>
        </div>
        <button className="submit-btn" onClick={broadcast} disabled={sending || !bc.title || !bc.body}>
          {sending ? "Sending..." : "Broadcast to All Users"}
        </button>
      </div>
    </div>
  );
}