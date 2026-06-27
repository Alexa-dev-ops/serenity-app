import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RECOVERY_FOCUSES } from "../utils/constants";

export default function AuthPage({ onLogin, onRegister, initialMode = "login" }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: "", email: "", password: "", recovery_focus: "Alcohol" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    // 1. Prevent hard page reload
    if (e) e.preventDefault();
    
    setError(""); 
    setLoading(true);

    try {
      if (mode === "login") {
        await onLogin(form.email, form.password);
      } else {
        await onRegister(form);
      }
      
      // 2. Navigate to dashboard upon success
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        {/* Wrap in form to properly handle the Enter key and prevent reloads */}
        <form onSubmit={submit}>
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
              <input 
                placeholder="Your name" 
                value={form.name} 
                onChange={(e) => set("name", e.target.value)}
                required={mode === "register"}
              />
            </div>
          )}
          
          <div className="field">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={form.email} 
              onChange={(e) => set("email", e.target.value)}
              required
            />
          </div>
          
          <div className="field">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              required
            />
          </div>
          
          {mode === "register" && (
            <div className="field">
              <label>Recovery Focus</label>
              <select value={form.recovery_focus} onChange={(e) => set("recovery_focus", e.target.value)}>
                {RECOVERY_FOCUSES.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
          )}
          
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="auth-toggle">
          {mode === "login"
            ? <> No account? <span onClick={() => setMode("register")}>Register here</span></>
            : <> Have an account? <span onClick={() => setMode("login")}>Sign in</span></>}
        </div>
      </div>
    </div>
  );
}