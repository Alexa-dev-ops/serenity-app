import { useState, useRef, useEffect } from "react";
import { IC } from "../components/UI";
import { api } from "../utils/api";
import { RISK_COLOR, URGE_LABELS, TS } from "../utils/constants";

const WELCOME_MSG = (last) => ({
  role: "assistant",
  content: last
    ? `I'm Serenity.\n\nYour last check-in showed urge at ${URGE_LABELS[last.urge] || "unknown"} and mood at ${last.mood}/5. What's going on for you right now?`
    : "I'm Serenity — your recovery companion. What's on your mind today?",
  time: TS(),
});

export default function ChatPage({ dash }) {
  const last = dash?.lastCheckin;
  const risk = dash?.risk;

  const [msgs, setMsgs]       = useState(null); // null = loading
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const endRef = useRef(null);

  // Load persisted history on mount
  useEffect(() => {
    api("GET", "/chat/history")
      .then((history) => {
        if (history.length > 0) {
          setMsgs(history);
        } else {
          setMsgs([WELCOME_MSG(last)]);
        }
      })
      .catch(() => setMsgs([WELCOME_MSG(last)]));
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const send = async () => {
    if (!input.trim() || loading || !msgs) return;
    const userMsg = { role: "user", content: input.trim(), time: TS() };
    const next = [...msgs, userMsg];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const data = await api("POST", "/chat", {
        messages: next.map((m) => ({ role: m.role, content: m.content })),
      });
      const reply = { role: "assistant", content: data.reply || "I'm here.", time: TS() };
      setMsgs((p) => [...p, reply]);
    } catch {
      setMsgs((p) => [...p, {
        role: "assistant",
        content: "Connection interrupted. Breathe. I'll be here when you're ready.",
        time: TS(),
      }]);
    }
    setLoading(false);
  };

  const clearHistory = async () => {
    if (!confirm("Clear your entire chat history with Serenity? This cannot be undone.")) return;
    setClearing(true);
    try {
      await api("DELETE", "/chat/history");
      setMsgs([WELCOME_MSG(last)]);
    } catch (e) { alert(e.message); }
    setClearing(false);
  };

  return (
    <div className="chat-shell">
      {/* Header */}
      <div className="chat-top">
        <div className="chat-av">✦</div>
        <div style={{ flex: 1 }}>
          <div className="chat-name">Serenity AI</div>
          <div className="chat-stat">
            <span className="pulse-dot"/>
            Recovery Specialist · Active
          </div>
        </div>
        <button
          onClick={clearHistory}
          disabled={clearing}
          style={{
            background: "none", border: "1px solid var(--border)",
            borderRadius: "var(--r)", padding: "6px 12px",
            fontSize: 11, color: "var(--text3)", cursor: "pointer",
            fontFamily: "var(--sans)", transition: "all .15s",
          }}
          onMouseOver={(e) => { e.target.style.borderColor = "var(--rose)"; e.target.style.color = "var(--rose)"; }}
          onMouseOut={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text3)"; }}
        >
          {clearing ? "Clearing..." : "Clear history"}
        </button>
      </div>

      {/* Context bar */}
      <div className="ctx-bar">
        <div className="ctx-chip">Mood <strong>{last ? `${last.mood}/5` : "—"}</strong></div>
        <div className="ctx-chip">Urge <strong>{last ? URGE_LABELS[last.urge] : "—"}</strong></div>
        <div className="ctx-chip">Day <strong>{dash?.streak ?? "—"}</strong></div>
        <div className="ctx-chip">Risk <strong style={{ color: RISK_COLOR[risk?.label] || "var(--text)" }}>{risk?.label || "—"}</strong></div>
      </div>

      {/* Messages */}
      <div className="msgs">
        {/* Loading state */}
        {msgs === null && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flex:1, flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", gap:6 }}><div className="ld"/><div className="ld"/><div className="ld"/></div>
            <div style={{ fontSize:12, color:"var(--text3)" }}>Loading your conversation history...</div>
          </div>
        )}

        {msgs?.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="mav">{m.role === "assistant" ? "✦" : "A"}</div>
            <div>
              <div className="bubble">{m.content}</div>
              <div className="mtime">{m.time}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="msg assistant">
            <div className="mav">✦</div>
            <div className="bubble">
              <div style={{ display:"flex", gap:3 }}>
                <div className="ld"/><div className="ld"/><div className="ld"/>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Input */}
      <div className="input-area">
        <div className="input-row">
          <textarea
            className="inp" rows={1}
            placeholder="Express what's happening right now..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
            }}
          />
          <button className="send-btn" onClick={send} disabled={loading || !input.trim() || msgs === null}>
            {IC.send}
          </button>
        </div>
        <div className="hint">Shift+Enter for new line · Your conversation is saved and private</div>
      </div>
    </div>
  );
}