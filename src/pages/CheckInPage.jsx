import { useState } from "react";
import { api } from "../utils/api";
import { RISK_COLOR, URGE_LABELS } from "../utils/constants";

const MOODS = [
  { e: "😔", l: "Low" }, { e: "😕", l: "Uneasy" }, { e: "😐", l: "Neutral" },
  { e: "🙂", l: "Stable" }, { e: "😌", l: "Good" },
];

export default function CheckInPage({ onDone }) {
  const [mood, setMood]   = useState(null);
  const [urge, setUrge]   = useState(2);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);

  const submit = async () => {
    if (mood === null) return;
    setSaving(true);
    try {
      const data = await api("POST", "/checkins", { mood: mood + 1, urge, notes });
      setResult(data);
      onDone();
    } catch (e) { alert(e.message); }
    setSaving(false);
  };

  if (result) return (
    <div className="page">
      <div className="card done-card">
        <div className="done-orb">✦</div>
        <div className="done-title">Check-in recorded.</div>
        <div className="done-sub">
          Updated risk score: <strong style={{ color: RISK_COLOR[result.risk?.label] }}>{result.risk?.label} ({result.risk?.score})</strong><br/>
          Streak updated to <strong style={{ color: "var(--sage)" }}>{result.streak} days</strong>.<br/>
          Dashboard has been refreshed.
        </div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="eyebrow">Daily Log</div>
      <div className="h1">How are you right now?</div>
      <div className="sub">Honest data improves your risk analysis. Saved privately to your account.</div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="card-label">Emotional State</div>
        <div className="mood-row">
          {MOODS.map((m, i) => (
            <div key={i} className={`mood-btn ${mood === i ? "sel" : ""}`} onClick={() => setMood(i)}>
              {m.e}<span>{m.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="card-label">Urge Intensity — <strong style={{ color: "var(--text)" }}>{URGE_LABELS[urge]}</strong></div>
        <div className="slider-track">
          <div className="slider-fill" style={{ width: `${(urge / 4) * 100}%` }}/>
          <input type="range" min={0} max={4} value={urge} onChange={(e) => setUrge(+e.target.value)}/>
        </div>
        <div className="slider-labels">{URGE_LABELS.map((l) => <span key={l}>{l}</span>)}</div>
        {urge >= 3 && <div style={{ fontSize: 12, color: "var(--rose)", marginTop: 10 }}>High urge detected. Consider opening AI Support after this check-in.</div>}
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="card-label">Optional Notes</div>
        <textarea className="j-ta" style={{ minHeight: 80 }} placeholder="Anything to add..."
          value={notes} onChange={(e) => setNotes(e.target.value)}/>
      </div>

      <button className="submit-btn" onClick={submit} disabled={mood === null || saving}>
        {saving ? "Saving..." : "Save Check-In"}
      </button>
    </div>
  );
}