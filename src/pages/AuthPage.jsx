import { useState } from "react";
import { RECOVERY_FOCUSES } from "../utils/constants";

export default function AuthPage({ onLogin, onRegister }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", recovery_focus: "Alcohol" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    setError(""); setLoading(true);
    try {
      if (mode === "login") {
        await onLogin(form.email, form.password);
      } else {
        await onRegister(form);
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-orb">✦</div>
          <div className="auth-title">Serenity</div>
        </div>
        <div className="auth-h">{mode === "login" ? "Welcome back." : "Begin your recovery."}</div>
        <div className="auth-sub">
          {mode === "login"
            ? "Sign in to your account to continue."
            : "Create an account. Your data is private and encrypted."}
        </div>
        {error && <div className="err-box">{error}</div>}
        {mode === "register" && (
          <div className="field">
            <label>Full Name</label>
            <input placeholder="Your name" value={form.name} onChange={(e) => set("name", e.target.value)}/>
          </div>
        )}
        <div className="field">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)}/>
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={form.password}
            onChange={(e) => set("password", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}/>
        </div>
        {mode === "register" && (
          <div className="field">
            <label>Recovery Focus</label>
            <select value={form.recovery_focus} onChange={(e) => set("recovery_focus", e.target.value)}>
              {RECOVERY_FOCUSES.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
        )}
        <button className="auth-btn" onClick={submit} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
        <div className="auth-toggle">
          {mode === "login"
            ? <> No account? <span onClick={() => setMode("register")}>Register here</span></>
            : <> Have an account? <span onClick={() => setMode("login")}>Sign in</span></>}
        </div>
        {mode === "login" && (
          <div style={{ marginTop: 16, padding: "10px 12px", background: "var(--bg3)", borderRadius: "var(--r)", fontSize: 12, color: "var(--text3)" }}>
            Demo: alex@serenity.app / user123 &nbsp;·&nbsp; admin@serenity.app / admin123
          </div>
        )}
      </div>
    </div>
  );
}