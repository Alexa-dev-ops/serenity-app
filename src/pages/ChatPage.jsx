import { useState, useRef, useEffect } from "react";
import { IC } from "../components/UI";
import { api } from "../utils/api";
import { RISK_COLOR, URGE_LABELS, TS } from "../utils/constants";

export default function ChatPage({ dash }) {
  const last = dash?.lastCheckin;
  const risk = dash?.risk;

  const [msgs, setMsgs] = useState([{
    role: "assistant",
    content: last
      ? `I'm Serenity.\n\nYour last check-in showed urge at ${URGE_LABELS[last.urge] || "unknown"} and mood at ${last.mood}/5. What's going on for you right now?`
      : "I'm Serenity — your recovery companion. What's on your mind today?",
    time: TS(),
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim(), time: TS() };
    const next = [...msgs, userMsg];
    setMsgs(next); setInput(""); setLoading(true);
    try {
      // Gemini requires chat history to start with role 'user'.
      // Our local state always starts with a hardcoded assistant greeting
      // for display purposes, so strip everything before the first
      // real user message before sending to the backend/Gemini.
      const firstUserIdx = next.findIndex((m) => m.role === "user");
      const history = firstUserIdx === -1 ? [] : next.slice(firstUserIdx);

      const data = await api("POST", "/chat", { messages: history.map((m) => ({ role: m.role, content: m.content })) });
      setMsgs((p) => [...p, { role: "assistant", content: data.reply || "I'm here.", time: TS() }]);
    } catch (err) {
      console.error("Chat API error:", err);
      setMsgs((p) => [...p, { role: "assistant", content: "Connection interrupted. Breathe. I'll be here when you're ready.", time: TS() }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-shell">
      <div className="chat-top">
        <div className="chat-av">✦</div>
        <div>
          <div className="chat-name">Serenity AI</div>
          <div className="chat-status"><span className="pulse-dot"/>Recovery Specialist · Active</div>
        </div>
      </div>

      <div className="ctx-bar">
        <div className="ctx-chip">Mood <strong>{last ? `${last.mood}/5` : "—"}</strong></div>
        <div className="ctx-chip">Urge <strong>{last ? URGE_LABELS[last.urge] : "—"}</strong></div>
        <div className="ctx-chip">Day <strong>{dash?.streak ?? "—"}</strong></div>
        <div className="ctx-chip">Risk <strong style={{ color: RISK_COLOR[risk?.label] || "var(--text)" }}>{risk?.label || "—"}</strong></div>
      </div>

      <div className="msgs">
        {msgs.map((m, i) => (
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
              <div style={{ display: "flex", gap: 3 }}><div className="ld"/><div className="ld"/><div className="ld"/></div>
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      <div className="input-area">
        <div className="input-row">
          <textarea className="inp" rows={1} placeholder="Express what's happening right now..."
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}/>
          <button className="send-btn" onClick={send} disabled={loading || !input.trim()}>{IC.send}</button>
        </div>
        <div className="hint">Shift+Enter for new line · Conversations are private</div>
      </div>
    </div>
  );
}