// ── UI.jsx — Shared styles, icons, and components ────────────────────────────

export const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --base:       #FAFAF8;
  --surface:    #F5F0E8;
  --surface2:   #EDE5D8;
  --border:     #E0D5C5;
  --border2:    #C4A882;
  --brown-lt:   #C4A882;
  --brown:      #8B6F47;
  --brown-dk:   #3D2B1F;
  --text:       #3D2B1F;
  --text2:      #7A6A5A;
  --text3:      #B0A090;
  --sage:       #6A9E6E;
  --sage-bg:    #EAF3EA;
  --amber:      #B87333;
  --amber-bg:   #FDF3E3;
  --rose:       #B55A4A;
  --rose-bg:    #FDECEA;
  --lav:        #7B68A0;
  --serif:      'Cormorant Garamond', Georgia, serif;
  --sans:       'DM Sans', system-ui, sans-serif;
  --r:          10px;
  --r2:         16px;
  --r3:         24px;
  --shadow:     0 2px 8px rgba(61,43,31,0.06);
  --shadow-md:  0 6px 24px rgba(61,43,31,0.10);
  --shadow-lg:  0 16px 48px rgba(61,43,31,0.13);
}

html, body, #root {
  height: 100%;
  background: var(--base);
  color: var(--text);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

/* ── ANIMATIONS ── */
@keyframes fadeUp   { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
@keyframes slideIn  { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
@keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
@keyframes bounce   { 0%,100% { transform:scale(1); } 50% { transform:scale(1.18); } }
@keyframes drawArc  { from { stroke-dashoffset: 220; } to { stroke-dashoffset: 0; } }
@keyframes ringPulse{ 0%,100% { transform:scale(1); opacity:.6; } 50% { transform:scale(1.12); opacity:1; } }
@keyframes dotBounce{ 0%,60%,100% { transform:translateY(0); opacity:.4; } 30% { transform:translateY(-5px); opacity:1; } }
@keyframes msgIn    { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
@keyframes shimmer  { from { background-position:-200% 0; } to { background-position:200% 0; } }

/* ── AUTH ── */
.auth-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #F5F0E8 0%, #FAFAF8 60%);
}
.auth-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--r3);
  padding: 44px 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-lg);
  animation: fadeUp .3s ease;
}
.auth-logo { display:flex; align-items:center; gap:10px; margin-bottom:32px; }
.auth-orb {
  width:34px; height:34px; border-radius:10px;
  background: linear-gradient(135deg, var(--brown-lt), var(--brown));
  display:flex; align-items:center; justify-content:center;
  font-size:15px; color:#fff;
  box-shadow: 0 4px 12px rgba(139,111,71,.3);
}
.auth-brand { font-family:var(--serif); font-size:20px; font-weight:500; letter-spacing:.02em; color:var(--brown-dk); }
.auth-h { font-family:var(--serif); font-size:26px; font-weight:400; margin-bottom:6px; color:var(--brown-dk); }
.auth-sub { font-size:13px; color:var(--text2); margin-bottom:28px; line-height:1.6; }

.field { margin-bottom:16px; }
.field label { display:block; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--text3); margin-bottom:6px; font-weight:500; }
.field input, .field select {
  width:100%; padding:11px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r);
  color: var(--text);
  font-family: var(--sans);
  font-size:14px;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}
.field input:focus, .field select:focus {
  border-color: var(--brown-lt);
  box-shadow: 0 0 0 3px rgba(196,168,130,.15);
}
.field input::placeholder { color:var(--text3); }
.field select option { background: #fff; }

.auth-btn {
  width:100%; padding:13px; border-radius:var(--r);
  border:none; cursor:pointer;
  background: linear-gradient(135deg, var(--brown-lt), var(--brown));
  color:#fff; font-family:var(--sans); font-size:14px; font-weight:500;
  letter-spacing:.04em; transition:all .2s; margin-top:4px;
  box-shadow: 0 4px 14px rgba(139,111,71,.25);
}
.auth-btn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(139,111,71,.3); }
.auth-btn:disabled { opacity:.5; cursor:not-allowed; transform:none; }
.auth-toggle { text-align:center; margin-top:20px; font-size:13px; color:var(--text2); }
.auth-toggle span { color:var(--brown); cursor:pointer; font-weight:500; }
.auth-toggle span:hover { text-decoration:underline; }
.err-box { padding:11px 14px; background:var(--rose-bg); border:1px solid rgba(181,90,74,.2); border-radius:var(--r); font-size:13px; color:var(--rose); margin-bottom:14px; }
.ok-box  { padding:11px 14px; background:var(--sage-bg);  border:1px solid rgba(106,158,110,.2); border-radius:var(--r); font-size:13px; color:var(--sage);  margin-bottom:14px; }
.demo-hint { margin-top:16px; padding:10px 12px; background:var(--surface); border-radius:var(--r); font-size:11.5px; color:var(--text3); text-align:center; }

/* ── APP SHELL ── */
.shell { display:grid; grid-template-columns:240px 1fr; height:100vh; overflow:hidden; }

/* ── SIDEBAR ── */
.side {
  background: #fff;
  border-right: 1px solid var(--border);
  display:flex; flex-direction:column;
  padding:24px 16px;
  position:relative;
  min-height: 0;
}
.brand { padding:0 6px 24px; border-bottom:1px solid var(--border); margin-bottom:16px; }
.brand-mark { display:flex; align-items:center; gap:10px; }
.brand-orb {
  width:30px; height:30px; border-radius:9px;
  background:linear-gradient(135deg, var(--brown-lt), var(--brown));
  display:flex; align-items:center; justify-content:center;
  font-size:13px; color:#fff; flex-shrink:0;
  box-shadow: 0 3px 10px rgba(139,111,71,.25);
}
.brand-name { font-family:var(--serif); font-size:18px; font-weight:500; color:var(--brown-dk); letter-spacing:.02em; }
.brand-tag  { font-size:10px; color:var(--text3); letter-spacing:.12em; text-transform:uppercase; margin-top:2px; padding-left:40px; }

/* Sliding nav indicator */
.nav { display:flex; flex-direction:column; gap:2px; position:relative; }
.nav-indicator {
  position:absolute; left:0; width:3px; border-radius:0 3px 3px 0;
  background:var(--brown);
  transition: top .25s cubic-bezier(.34,1.56,.64,1), height .25s ease;
  pointer-events:none;
}
.ni {
  display:flex; align-items:center; gap:11px;
  padding:10px 12px; border-radius:var(--r);
  cursor:pointer; font-size:13px; color:var(--text2);
  transition: background .15s, color .15s;
  border:none; background:transparent;
  user-select:none; position:relative;
  font-family:var(--sans);
}
.ni:hover { background:var(--surface); color:var(--text); }
.ni.on {
  background:linear-gradient(135deg, rgba(196,168,130,.15), rgba(139,111,71,.08));
  color:var(--brown-dk);
  font-weight:500;
}
.ni svg { width:15px; height:15px; flex-shrink:0; }
.notif-dot {
  position:absolute; right:10px; top:50%; transform:translateY(-50%);
  width:7px; height:7px; border-radius:50%;
  background:var(--rose); border:2px solid #fff;
  animation:bounce .8s ease infinite;
}

.side-gap { flex:1; }

.risk-widget {
  margin:0 2px 10px; padding:14px 16px;
  border-radius:var(--r2); border:1px solid;
  transition:all .3s ease;
}
.risk-widget.Low      { background:var(--sage-bg);  border-color:rgba(106,158,110,.25); }
.risk-widget.Moderate { background:var(--amber-bg); border-color:rgba(184,115,51,.25); }
.risk-widget.High     { background:var(--rose-bg);  border-color:rgba(181,90,74,.25); }
.rw-label { font-size:10px; letter-spacing:.1em; text-transform:uppercase; margin-bottom:5px; font-weight:600; }
.rw-label.Low      { color:var(--sage); }
.rw-label.Moderate { color:var(--amber); }
.rw-label.High     { color:var(--rose); }
.rw-body { font-size:12px; color:var(--text2); line-height:1.55; }

.user-chip {
  padding:12px 10px; border-top:1px solid var(--border);
  display:flex; align-items:center; gap:10px; margin-top:8px;
}
.user-av {
  width:30px; height:30px; border-radius:8px;
  background:linear-gradient(135deg,var(--surface2),var(--border));
  border:1px solid var(--border2);
  display:flex; align-items:center; justify-content:center;
  font-size:12px; font-weight:600; color:var(--brown); flex-shrink:0;
}
.user-name { font-size:12.5px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.user-role { font-size:10px; color:var(--text3); text-transform:uppercase; letter-spacing:.06em; }
.logout-btn {
  background:none; border:none; color:var(--text3);
  cursor:pointer; font-size:11px; padding:3px 6px;
  border-radius:4px; transition:color .15s; white-space:nowrap;
  font-family:var(--sans);
}
.logout-btn:hover { color:var(--rose); }

/* ── PAGE ── */
.page { padding:36px 40px; overflow-y:auto; height:100%; animation:fadeUp .25s ease; }
.eyebrow { font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:var(--brown-lt); margin-bottom:8px; font-weight:600; }
.h1 { font-family:var(--serif); font-size:30px; font-weight:400; line-height:1.15; margin-bottom:6px; color:var(--brown-dk); }
.sub { font-size:14px; color:var(--text2); line-height:1.65; margin-bottom:32px; }

/* ── CARDS ── */
.card {
  background:#fff; border:1px solid var(--border);
  border-radius:var(--r2); padding:24px;
  box-shadow:var(--shadow);
  transition:box-shadow .2s, border-color .2s, transform .2s;
}
.card:hover { box-shadow:var(--shadow-md); border-color:var(--border2); }
.card-label { font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--text3); margin-bottom:10px; font-weight:600; }

/* ── PILL / BADGE ── */
.pill { display:inline-flex; align-items:center; font-size:10.5px; padding:3px 11px; border-radius:100px; font-weight:600; letter-spacing:.06em; border:1px solid; }
.pill.Low      { background:var(--sage-bg);  border-color:rgba(106,158,110,.3); color:var(--sage); }
.pill.Moderate { background:var(--amber-bg); border-color:rgba(184,115,51,.3);  color:var(--amber); }
.pill.High     { background:var(--rose-bg);  border-color:rgba(181,90,74,.3);   color:var(--rose); }

/* ── LOADING ── */
.loading-wrap { display:flex; align-items:center; justify-content:center; height:160px; flex-direction:column; gap:14px; }
.loading-dots { display:flex; gap:6px; }
.ld { width:7px; height:7px; border-radius:50%; background:var(--brown-lt); animation:dotBounce 1.1s infinite; }
.ld:nth-child(2) { animation-delay:.18s; }
.ld:nth-child(3) { animation-delay:.36s; }

/* ── BUTTONS ── */
.submit-btn {
  width:100%; padding:13px; border-radius:var(--r);
  border:none; cursor:pointer;
  background:linear-gradient(135deg,var(--brown-lt),var(--brown));
  color:#fff; font-family:var(--sans); font-size:13.5px; font-weight:500;
  letter-spacing:.04em; transition:all .2s; margin-top:12px;
  box-shadow:0 3px 12px rgba(139,111,71,.2);
}
.submit-btn:hover { transform:translateY(-1px); box-shadow:0 5px 18px rgba(139,111,71,.3); }
.submit-btn:disabled { opacity:.45; cursor:not-allowed; transform:none; box-shadow:none; }
.ghost-btn {
  background:none; border:1px solid var(--border);
  border-radius:var(--r); padding:9px 16px;
  color:var(--text2); font-family:var(--sans); font-size:13px;
  cursor:pointer; transition:all .15s;
}
.ghost-btn:hover { border-color:var(--brown-lt); color:var(--brown); background:var(--surface); }
.danger-btn {
  background:none; border:1px solid rgba(181,90,74,.2);
  border-radius:6px; padding:4px 10px;
  color:var(--rose); font-size:11px; cursor:pointer;
  transition:all .15s; font-family:var(--sans);
}
.danger-btn:hover { background:var(--rose-bg); }

/* ── FORM FIELDS ── */
.field-inline { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.j-ta {
  width:100%; min-height:180px;
  background:var(--surface); border:1px solid var(--border);
  border-radius:var(--r); padding:16px;
  color:var(--text); font-family:var(--sans); font-size:14px;
  line-height:1.7; resize:vertical; outline:none; transition:border-color .2s, box-shadow .2s;
}
.j-ta:focus { border-color:var(--brown-lt); box-shadow:0 0 0 3px rgba(196,168,130,.12); }
.j-ta::placeholder { color:var(--text3); font-style:italic; }

/* ── CHAT ── */
.chat-shell { display:flex; flex-direction:column; height:100vh; background:var(--base); }
.chat-top {
  padding:18px 32px; border-bottom:1px solid var(--border);
  display:flex; align-items:center; gap:14px; flex-shrink:0;
  background:#fff;
}
.chat-av {
  width:38px; height:38px; border-radius:11px;
  background:linear-gradient(135deg,var(--brown-lt),var(--brown));
  display:flex; align-items:center; justify-content:center;
  font-size:16px; color:#fff; flex-shrink:0;
  box-shadow:0 4px 14px rgba(139,111,71,.25);
}
.chat-name  { font-weight:500; font-size:15px; color:var(--brown-dk); }
.chat-stat  { font-size:12px; color:var(--brown-lt); display:flex; align-items:center; gap:5px; }
.pulse-dot  { width:6px; height:6px; border-radius:50%; background:var(--sage); animation:pulse 2s infinite; }
.ctx-bar {
  padding:10px 32px; border-bottom:1px solid var(--border);
  background:var(--surface); display:flex; gap:24px; flex-shrink:0; flex-wrap:wrap;
}
.ctx-chip   { font-size:11.5px; color:var(--text2); display:flex; align-items:center; gap:4px; }
.ctx-chip strong { color:var(--brown-dk); font-weight:500; }
.msgs { flex:1; overflow-y:auto; padding:28px 32px; display:flex; flex-direction:column; gap:18px; }
.msg  { display:flex; gap:10px; max-width:78%; animation:msgIn .2s ease; }
.msg.user      { align-self:flex-end;   flex-direction:row-reverse; }
.msg.assistant { align-self:flex-start; }
.mav {
  width:30px; height:30px; border-radius:8px; flex-shrink:0; margin-top:2px;
  display:flex; align-items:center; justify-content:center; font-size:13px;
}
.msg.assistant .mav {
  background:linear-gradient(135deg,var(--brown-lt),var(--brown));
  color:#fff; box-shadow:0 2px 8px rgba(139,111,71,.2);
}
.msg.user .mav { background:var(--surface); border:1px solid var(--border); color:var(--text2); font-size:11px; }
.bubble { padding:12px 16px; border-radius:14px; font-size:13.5px; line-height:1.65; white-space:pre-wrap; }
.msg.assistant .bubble {
  background:#fff; border:1px solid var(--border);
  border-top-left-radius:4px; color:var(--text);
  box-shadow:var(--shadow);
}
.msg.user .bubble {
  background:linear-gradient(135deg, rgba(196,168,130,.18), rgba(139,111,71,.12));
  border:1px solid rgba(196,168,130,.3);
  border-top-right-radius:4px; color:var(--brown-dk);
}
.mtime { font-size:10px; color:var(--text3); margin-top:5px; }
.msg.user .mtime { text-align:right; }
.input-area { padding:18px 32px; border-top:1px solid var(--border); background:#fff; flex-shrink:0; }
.input-row {
  display:flex; gap:10px; align-items:flex-end;
  background:var(--surface); border:1px solid var(--border);
  border-radius:var(--r2); padding:12px 16px;
  transition:border-color .2s, box-shadow .2s;
}
.input-row:focus-within { border-color:var(--brown-lt); box-shadow:0 0 0 3px rgba(196,168,130,.12); }
.inp { flex:1; background:transparent; border:none; outline:none; color:var(--text); font-family:var(--sans); font-size:14px; resize:none; line-height:1.5; max-height:120px; }
.inp::placeholder { color:var(--text3); }
.send-btn {
  width:34px; height:34px; border-radius:9px;
  background:linear-gradient(135deg,var(--brown-lt),var(--brown));
  border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;
  transition:all .15s; flex-shrink:0;
  box-shadow:0 2px 8px rgba(139,111,71,.2);
}
.send-btn:hover { transform:scale(1.06); box-shadow:0 4px 12px rgba(139,111,71,.3); }
.send-btn:disabled { background:var(--surface2); cursor:not-allowed; transform:none; box-shadow:none; }
.send-btn svg { width:14px; height:14px; color:#fff; }
.hint { font-size:11px; color:var(--text3); text-align:center; margin-top:8px; }

/* ── CHECK-IN ── */
.mood-row { display:flex; gap:8px; margin-top:4px; }
.mood-btn {
  flex:1; padding:14px 6px; border-radius:var(--r);
  border:1px solid var(--border); background:var(--surface);
  cursor:pointer; text-align:center; transition:all .18s; font-size:22px;
}
.mood-btn span { display:block; font-size:10px; color:var(--text3); margin-top:5px; }
.mood-btn:hover { border-color:var(--brown-lt); background:#fff; }
.mood-btn.sel {
  border-color:var(--brown); background:#fff;
  box-shadow:0 0 0 3px rgba(196,168,130,.2);
  transform:translateY(-2px);
}
.mood-btn.sel span { color:var(--brown); }
.slider-track { position:relative; height:5px; background:var(--surface2); border-radius:100px; margin:14px 0 8px; }
.slider-fill { height:100%; border-radius:100px; background:linear-gradient(90deg,var(--sage),var(--amber),var(--rose)); transition:width .15s; }
input[type=range] { position:absolute; inset:-8px 0; opacity:0; cursor:pointer; width:100%; }
.slider-labels { display:flex; justify-content:space-between; }
.slider-labels span { font-size:10px; color:var(--text3); }
.done-card { text-align:center; padding:56px 24px; }
.done-orb  { font-size:44px; margin-bottom:18px; }
.done-title{ font-family:var(--serif); font-size:26px; font-weight:400; margin-bottom:10px; color:var(--brown-dk); }
.done-sub  { font-size:13.5px; color:var(--text2); line-height:1.7; }

/* ── JOURNAL ── */
.j-reflection {
  margin-top:14px; padding:14px 16px;
  background:linear-gradient(135deg,rgba(196,168,130,.08),rgba(139,111,71,.04));
  border:1px solid rgba(196,168,130,.25); border-radius:var(--r);
  font-size:13.5px; color:var(--text2); line-height:1.65; font-style:italic;
}
.j-reflection strong { color:var(--brown); display:block; margin-bottom:5px; font-size:10px; letter-spacing:.1em; text-transform:uppercase; font-style:normal; font-weight:600; }
.entries { display:flex; flex-direction:column; gap:10px; margin-top:20px; }
.entry-card {
  background:#fff; border:1px solid var(--border); border-radius:var(--r);
  padding:16px 20px; transition:all .2s;
}
.entry-card:hover { border-color:var(--brown-lt); box-shadow:var(--shadow); }
.e-date { font-size:10.5px; color:var(--text3); margin-bottom:5px; }
.e-prev { font-size:13.5px; color:var(--text2); line-height:1.55; }
.e-reflection { font-size:12.5px; color:var(--brown-lt); margin-top:8px; font-style:italic; }

/* ── NOTIFICATIONS ── */
.notif-list { display:flex; flex-direction:column; gap:10px; }
.notif-item {
  background:#fff; border:1px solid var(--border); border-radius:var(--r);
  padding:14px 16px; display:flex; gap:12px; align-items:flex-start;
  transition:all .18s;
}
.notif-item.unread {
  border-color:rgba(196,168,130,.35);
  background:linear-gradient(135deg,rgba(245,240,232,.5),#fff);
}
.notif-item:hover { box-shadow:var(--shadow); border-color:var(--brown-lt); }
.notif-icon { width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; }
.notif-icon.reminder  { background:rgba(106,158,110,.1); }
.notif-icon.alert     { background:rgba(181,90,74,.1); }
.notif-icon.milestone { background:rgba(139,111,71,.1); }
.notif-icon.system    { background:var(--surface); }
.notif-title { font-size:13.5px; font-weight:500; margin-bottom:3px; color:var(--brown-dk); }
.notif-body  { font-size:12.5px; color:var(--text2); line-height:1.5; }
.notif-time  { font-size:10.5px; color:var(--text3); margin-top:4px; }

/* ── PLANS ── */
.plan-card {
  background:#fff; border:1px solid var(--border); border-radius:var(--r2);
  padding:22px; margin-bottom:12px; transition:all .2s;
}
.plan-card:hover { box-shadow:var(--shadow-md); border-color:var(--border2); }
.plan-fw {
  font-size:10px; padding:3px 9px; border-radius:100px;
  background:rgba(139,111,71,.08); color:var(--brown);
  border:1px solid rgba(139,111,71,.2); font-weight:600; letter-spacing:.06em;
}
.plan-progress { height:5px; background:var(--surface2); border-radius:100px; overflow:hidden; margin:10px 0 6px; }
.plan-fill { height:100%; border-radius:100px; background:linear-gradient(90deg,var(--brown-lt),var(--brown)); transition:width .5s ease; }

/* ── RESOURCES ── */
.res-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.res-card {
  background:#fff; border:1px solid var(--border); border-radius:var(--r2);
  padding:22px; cursor:pointer; transition:all .22s;
}
.res-card:hover { border-color:var(--border2); transform:translateY(-3px); box-shadow:var(--shadow-md); }
.res-cat   { font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--brown-lt); margin-bottom:10px; font-weight:600; }
.res-title { font-family:var(--serif); font-size:18px; font-weight:400; margin-bottom:8px; line-height:1.3; color:var(--brown-dk); }
.res-meta  { font-size:12px; color:var(--text3); }
.res-expanded { background:var(--surface); border-radius:var(--r); padding:14px; margin-top:12px; font-size:13.5px; color:var(--text2); line-height:1.7; }

/* ── EMERGENCY ── */
.emg-banner {
  background:linear-gradient(135deg, rgba(181,90,74,.07), rgba(181,90,74,.02));
  border:1px solid rgba(181,90,74,.2); border-radius:var(--r2);
  padding:32px; text-align:center; margin-bottom:24px;
}
.emg-title { font-family:var(--serif); font-size:26px; font-weight:400; color:var(--rose); margin-bottom:8px; }
.emg-sub   { font-size:14px; color:var(--text2); }
.help-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:22px; }
.help-card { background:#fff; border:1px solid var(--border); border-radius:var(--r2); padding:20px; text-align:center; box-shadow:var(--shadow); }
.hc-name   { font-weight:500; font-size:13.5px; color:var(--text2); margin-bottom:5px; }
.hc-num    { font-family:var(--serif); font-size:20px; color:var(--brown-dk); }
.panic-btn {
  width:100%; padding:15px; border-radius:var(--r2);
  border:1px solid rgba(181,90,74,.3);
  background:linear-gradient(135deg,rgba(181,90,74,.08),rgba(181,90,74,.03));
  color:var(--rose); font-family:var(--sans); font-size:14px; font-weight:500;
  letter-spacing:.06em; text-transform:uppercase; cursor:pointer; transition:all .2s; margin-bottom:16px;
}
.panic-btn:hover { background:rgba(181,90,74,.12); border-color:rgba(181,90,74,.4); }
.grounding-card { background:#fff; border:1px solid var(--border); border-radius:var(--r2); padding:24px; box-shadow:var(--shadow); }
.g-title { font-family:var(--serif); font-size:20px; font-weight:400; margin-bottom:16px; color:var(--brown-dk); }
.steps { display:flex; flex-direction:column; gap:14px; }
.step  { display:flex; gap:14px; align-items:flex-start; }
.step-n {
  width:26px; height:26px; border-radius:50%; flex-shrink:0;
  background:rgba(181,90,74,.08); border:1px solid rgba(181,90,74,.25);
  color:var(--rose); font-size:11px; font-weight:600;
  display:flex; align-items:center; justify-content:center;
}
.step-t { font-size:13.5px; color:var(--text2); line-height:1.65; padding-top:3px; }

/* ── BREATHING TIMER ── */
.timer-overlay {
  position:fixed; inset:0;
  background:rgba(61,43,31,.55); backdrop-filter:blur(12px);
  display:flex; align-items:center; justify-content:center; z-index:999;
  animation:fadeIn .2s ease;
}
.timer-card {
  background:#fff; border:1px solid var(--border);
  border-radius:var(--r3); padding:48px 40px;
  text-align:center; max-width:400px; width:90%;
  box-shadow:var(--shadow-lg); animation:fadeUp .25s ease;
}
.timer-ring {
  width:120px; height:120px; border-radius:50%;
  border:3px solid var(--surface2);
  display:flex; align-items:center; justify-content:center;
  margin:0 auto 20px; position:relative;
  animation:ringPulse 1s ease-in-out infinite;
}
.timer-ring-fill {
  position:absolute; inset:0; border-radius:50%;
  border:3px solid var(--brown-lt);
  animation:ringPulse 1s ease-in-out infinite;
}
.timer-num   { font-family:var(--serif); font-size:52px; font-weight:300; color:var(--brown-dk); line-height:1; }
.timer-phase { font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--brown-lt); margin-top:8px; font-weight:600; }
.timer-title { font-family:var(--serif); font-size:22px; font-weight:400; color:var(--brown-dk); margin-bottom:6px; }
.timer-sub   { font-size:13px; color:var(--text2); margin-bottom:28px; line-height:1.55; }

/* ── ADMIN ── */
.admin-metrics { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-bottom:24px; }
.am { background:#fff; border:1px solid var(--border); border-radius:var(--r2); padding:18px 20px; transition:box-shadow .2s; }
.am:hover { box-shadow:var(--shadow); }
.am-l { font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--text3); margin-bottom:6px; font-weight:600; }
.am-v { font-family:var(--serif); font-size:28px; color:var(--brown-dk); }
.tbl  { background:#fff; border:1px solid var(--border); border-radius:var(--r2); overflow:hidden; margin-bottom:24px; box-shadow:var(--shadow); }
.thr,.tr { display:grid; padding:12px 20px; }
.thr { background:var(--surface); border-bottom:1px solid var(--border); }
.th  { font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--text3); font-weight:600; }
.tr  { border-bottom:1px solid var(--border); align-items:center; transition:background .15s; }
.tr:last-child { border-bottom:none; }
.tr:hover { background:var(--surface); }
.td-c { font-size:13px; color:var(--text2); }
.badge { font-size:10px; padding:3px 9px; border-radius:100px; font-weight:600; letter-spacing:.05em; }
.badge.admin-b { background:rgba(139,111,71,.1); color:var(--brown); }
.badge.user-b  { background:var(--surface); color:var(--text3); border:1px solid var(--border); }
.broadcast-form { background:#fff; border:1px solid var(--border); border-radius:var(--r2); padding:24px; box-shadow:var(--shadow); }
.bc-title { font-family:var(--serif); font-size:20px; font-weight:400; color:var(--brown-dk); margin-bottom:16px; }

/* ── DASHBOARD SPECIFICS ── */
.d-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:20px; }
.stat-val { font-family:var(--serif); font-size:42px; font-weight:300; line-height:1; color:var(--brown-dk); }
.stat-val.accent { color:var(--brown); }
.stat-caption { font-size:12.5px; color:var(--text2); margin-top:6px; }
.gauge-narrative { font-size:13.5px; color:var(--text2); line-height:1.65; text-align:center; max-width:360px; margin:0 auto; }
.gauge-footer { font-size:11.5px; color:var(--text3); text-align:center; margin-top:14px; }
.gauge-footer span { color:var(--brown); cursor:pointer; font-weight:500; }
.gauge-footer span:hover { text-decoration:underline; }
.chart-bar { border-radius:4px 4px 0 0; min-height:3px; transition:height .5s cubic-bezier(.34,1.56,.64,1); }

/* ── MISC ── */
.gap     { height:16px; }
.row     { display:flex; align-items:center; gap:12px; }
.flex1   { flex:1; }
.divider { height:1px; background:var(--border); margin:24px 0; }
.inline-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .shell { grid-template-columns: 1fr; grid-template-rows: auto 1fr; height: 100vh; }
  .side {
    flex-direction: row; align-items: center;
    padding: 10px 14px; border-right: none;
    border-bottom: 1px solid var(--border);
    overflow-x: auto; gap: 10px; min-height: 0;
  }
  .brand { display: none; }
  .nav { flex-direction: row; gap: 4px; overflow-x: auto; flex: 1; }
  .nav-indicator { display: none; }
  .ni {
    flex-direction: column; gap: 3px;
    padding: 8px 10px; font-size: 10px;
    white-space: nowrap; flex-shrink: 0;
  }
  .side-gap { display: none; }
  .risk-widget { display: none; }
  .user-chip { border-top: none; border-left: 1px solid var(--border); padding-left: 10px; margin-top: 0; flex-shrink: 0; }
  .user-name, .user-role { display: none; }

  .page { padding: 20px 18px; }
  .h1 { font-size: 24px; }
  .d-grid { grid-template-columns: 1fr; }
  .res-grid { grid-template-columns: 1fr; }
  .help-grid { grid-template-columns: 1fr; }
  .admin-metrics { grid-template-columns: repeat(2, 1fr); }
  .field-inline { grid-template-columns: 1fr; }
  .inline-grid { grid-template-columns: 1fr; }

  .chat-shell { height: 100%; }
  .chat-top { padding: 14px 18px; }
  .ctx-bar { padding: 8px 18px; gap: 14px; }
  .msgs { padding: 18px; }
  .msg { max-width: 90%; }
  .input-area { padding: 12px 18px; }

  .auth-card { padding: 32px 24px; max-width: 100%; }
  .timer-card { padding: 36px 24px; }
}

@media (max-width: 480px) {
  .ni { font-size: 0; padding: 9px; }
  .ni svg { width: 18px; height: 18px; }
  .admin-metrics { grid-template-columns: repeat(2, 1fr); }
  .stat-val { font-size: 32px; }
  .am-v { font-size: 22px; }
}
`;

// ── ICONS ─────────────────────────────────────────────────────────────────────
export const IC = {
  dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  chat:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  checkin:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  journal:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  bell:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  plans:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  resources: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  emergency: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  admin:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  send:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
};

// ── GAUGE (animated arc on mount) ─────────────────────────────────────────────
export function Gauge({ score, color }) {
  const r = 70, cx = 100, cy = 92;
  const circ = Math.PI * r;
  const pct  = score / 100;
  const angle = Math.PI + pct * Math.PI;
  const x1 = cx + r * Math.cos(Math.PI), y1 = cy + r * Math.sin(Math.PI);
  const x2 = cx + r * Math.cos(angle),   y2 = cy + r * Math.sin(angle);
  const large = pct > 0.5 ? 1 : 0;

  return (
    <div style={{ display:"flex", justifyContent:"center", padding:"24px 0 12px" }}>
      <svg width="200" height="110" viewBox="0 0 200 110" style={{ overflow:"visible" }}>
        {/* Track */}
        <path d={`M${x1},${y1} A${r},${r} 0 1 1 ${cx+r},${cy}`}
          fill="none" stroke="var(--surface2)" strokeWidth="9" strokeLinecap="round"/>
        {/* Fill — animated */}
        <path d={`M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2}`}
          fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
          style={{ transition:"all 1s cubic-bezier(.34,1.1,.64,1)" }}/>
        {/* Score */}
        <text x={cx} y={cy-10} textAnchor="middle"
          style={{ fill:"var(--brown-dk)", fontFamily:"Cormorant Garamond,serif", fontSize:42, fontWeight:300 }}>
          {score}
        </text>
        <text x={cx} y={cy+12} textAnchor="middle"
          style={{ fill:"var(--text3)", fontSize:10, fontFamily:"DM Sans,sans-serif", letterSpacing:3, textTransform:"uppercase" }}>
          RISK SCORE
        </text>
      </svg>
    </div>
  );
}

export function Loading() {
  return (
    <div className="loading-wrap">
      <div className="loading-dots"><div className="ld"/><div className="ld"/><div className="ld"/></div>
      <div style={{ fontSize:12, color:"var(--text3)" }}>Loading...</div>
    </div>
  );
}

export function ErrorBox({ message }) {
  return <div className="err-box">{message}</div>;
}