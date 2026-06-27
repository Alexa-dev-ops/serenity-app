import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    const lines = [
      "You don't have to\nfigure this out alone.",
      "Recovery happens\none day at a time.",
      "Your progress\nis real. So is today."
    ];
    let lineIdx = 0;
    let i = 0;
    let currentText = "";
    let isDeleting = false;
    let timeoutId;
    let isMounted = true;

    const cycle = () => {
      if (!isMounted) return;
      const currentLine = lines[lineIdx];

      if (!isDeleting) {
        currentText = currentLine.slice(0, i + 1);
        setTypedText(currentText);
        i++;
        if (i === currentLine.length) {
          if (lineIdx === lines.length - 1) {
            setIsDone(true);
            return;
          }
          isDeleting = true;
          timeoutId = setTimeout(cycle, 2400);
        } else {
          timeoutId = setTimeout(cycle, 38);
        }
      } else {
        currentText = currentLine.slice(0, i - 1);
        setTypedText(currentText);
        i--;
        if (i === 0) {
          isDeleting = false;
          lineIdx = (lineIdx + 1) % lines.length;
          timeoutId = setTimeout(cycle, 200);
        } else {
          timeoutId = setTimeout(cycle, 18);
        }
      }
    };
    timeoutId = setTimeout(cycle, 800);
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="landing-page">
      <nav className={`landing-nav ${isScrolled ? 'scrolled' : ''}`}>
        <a className="nav-logo" href="#">
          <div className="nav-orb">✦</div>
          <span className="nav-brand">Serenity</span>
        </a>
        <Link className="nav-cta" to="/register">Begin your recovery</Link>
      </nav>

      <section className="hero" id="start">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="hero-eyebrow">
          <span className="eyebrow-dot" />
          AI-powered recovery companion
        </div>

        <h1 className="hero-headline">
          <span>
            {typedText.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx === 0 && <br />}
              </React.Fragment>
            ))}
          </span>
          <span className={`cursor ${isDone ? 'done' : ''}`} />
        </h1>

        <p className="hero-sub">
          Serenity tracks your mood, monitors relapse risk in real time, and gives you a trained AI companion available every hour of every day — no appointment needed.
        </p>

        <div className="hero-actions">
          <Link className="btn-primary" to="/register">Create a free account</Link>
          <a className="btn-ghost" href="#features">See how it works</a>
        </div>

        <div className="hero-trust">
          <div className="trust-item">
            <span className="trust-num">12</span>
            <span className="trust-label">Day streaks tracked</span>
          </div>
          <div className="trust-div" />
          <div className="trust-item">
            <span className="trust-num">CBT</span>
            <span className="trust-label">Evidence-based framework</span>
          </div>
          <div className="trust-div" />
          <div className="trust-item">
            <span className="trust-num">24 / 7</span>
            <span className="trust-label">AI support, always on</span>
          </div>
        </div>
      </section>

      <section className="features landing-section reveal" id="features">
        <div className="section-inner">
          <p className="section-eyebrow">What Serenity does</p>
          <h2 className="section-title">Built for every part<br />of your recovery</h2>

          <div className="features-grid">
            <div className="feat-card reveal">
              <div className="feat-icon">🧠</div>
              <div className="feat-title">AI Emotional Support</div>
              <div className="feat-body">A recovery-trained AI companion that responds using CBT, ACT, and Motivational Interviewing — not generic chat. It knows your history and speaks to where you actually are.</div>
            </div>
            <div className="feat-card reveal" style={{ transitionDelay: '.1s' }}>
              <div className="feat-icon">📊</div>
              <div className="feat-title">Live Relapse Risk Score</div>
              <div className="feat-body">A score computed from your mood, urge intensity, and recovery streak — updated every time you check in. Not a static label. An honest picture of where you are today.</div>
            </div>
            <div className="feat-card reveal" style={{ transitionDelay: '.2s' }}>
              <div className="feat-icon">📓</div>
              <div className="feat-title">Private Journal</div>
              <div className="feat-body">Write without filtering. Each entry gets an AI-generated reflection prompt designed to help you go deeper — not to judge, but to surface what's already there.</div>
            </div>
            <div className="feat-card reveal" style={{ transitionDelay: '.05s' }}>
              <div className="feat-icon">✅</div>
              <div className="feat-title">Daily Check-Ins</div>
              <div className="feat-body">Log your mood and urge intensity in under a minute. Your answers feed the risk engine, build your streak, and help Serenity respond to you more accurately over time.</div>
            </div>
            <div className="feat-card reveal" style={{ transitionDelay: '.15s' }}>
              <div className="feat-icon">🗺️</div>
              <div className="feat-title">Recovery Plans</div>
              <div className="feat-body">Structured programmes — CBT, ACT, MI, CRAFT, DBT — created for your specific focus. Progress tracked week by week, updated by you at your own pace.</div>
            </div>
            <div className="feat-card reveal" style={{ transitionDelay: '.25s' }}>
              <div className="feat-icon">🚨</div>
              <div className="feat-title">Emergency Tools</div>
              <div className="feat-body">A panic button that opens a live grounding protocol and breathing timer. Crisis line numbers always one tap away. Built for the moments when you need something that works fast.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="how landing-section">
        <div className="section-inner">
          <p className="section-eyebrow reveal">How it works</p>
          <h2 className="section-title reveal">Three things, every day</h2>
          <p className="section-sub reveal">Recovery doesn't require a dramatic routine. Serenity asks for three small honest acts.</p>

          <div className="how-steps">
            <div className="how-step reveal">
              <div className="how-num">1</div>
              <div className="how-title">Check in</div>
              <div className="how-body">Rate your mood and urge intensity. Takes under a minute. This single act feeds your risk score and keeps your streak alive.</div>
            </div>
            <div className="how-step reveal" style={{ transitionDelay: '.12s' }}>
              <div className="how-num">2</div>
              <div className="how-title">Talk to Serenity</div>
              <div className="how-body">Tell the AI what's happening. It already knows your risk level and your history. It won't give you generic advice — it knows where you are today.</div>
            </div>
            <div className="how-step reveal" style={{ transitionDelay: '.24s' }}>
              <div className="how-num">3</div>
              <div className="how-title">Track your progress</div>
              <div className="how-body">Watch your mood trend build. See your relapse risk move in real time. A streak you can actually see is a streak that's harder to break.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="preview landing-section">
        <div className="preview-inner">
          <div className="preview-text reveal">
            <p className="section-eyebrow">In the app</p>
            <h2 className="section-title">Your recovery,<br /><em style={{ fontStyle: 'italic', color: 'var(--brown)' }}>clearly seen</em></h2>
            <p className="section-sub">The Serenity dashboard shows your streak, your mood trend, and your live risk score — all in one clean view. Nothing is hidden, nothing is sugarcoated.</p>
            <Link className="btn-primary" to="/register" style={{ display: 'inline-block', marginTop: 0, padding: '13px 28px', textDecoration: 'none', borderRadius: '100px' }}>Open the app</Link>
          </div>
          <div className="preview-screen reveal" style={{ transitionDelay: '.15s' }}>
            <div className="screen-bar">
              <div className="screen-dot" style={{ background: '#E8C4C0' }} />
              <div className="screen-dot" style={{ background: '#E8DDB0' }} />
              <div className="screen-dot" style={{ background: '#C4D8C0' }} />
              <span style={{ fontSize: '11px', color: 'var(--text3)', marginLeft: '8px', fontFamily: 'var(--sans)' }}>Serenity · AI Support</span>
            </div>
            <div className="screen-body">
              <div className="screen-stat-row" style={{ marginBottom: '20px' }}>
                <div className="screen-stat">
                  <div className="screen-stat-num">12</div>
                  <div className="screen-stat-label">Days sober</div>
                </div>
                <div className="screen-stat">
                  <div className="screen-stat-num">2/5</div>
                  <div className="screen-stat-label">Mood</div>
                </div>
                <div className="screen-stat" style={{ background: 'rgba(184,115,51,.06)', borderColor: 'rgba(184,115,51,.2)' }}>
                  <div className="screen-stat-num" style={{ color: 'var(--amber)' }}>42</div>
                  <div className="screen-stat-label" style={{ color: 'var(--amber)' }}>Risk</div>
                </div>
              </div>
              <div className="screen-row">
                <div className="screen-avatar" />
                <div className="screen-bubble">I can see your urge intensity has been elevated for two days. What's been happening around you?</div>
              </div>
              <div className="screen-row" style={{ flexDirection: 'row-reverse' }}>
                <div className="screen-bubble user">Ran into someone from before. It's been hard to shake.</div>
              </div>
              <div className="screen-row">
                <div className="screen-avatar" />
                <div className="screen-bubble">That's cue-reactivity — your brain recognising a person tied to past use. It's neurological, not weakness. What can you put between yourself and that memory tonight?</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial landing-section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <span className="quote-mark reveal">"</span>
          <p className="quote-text reveal">
            It doesn't feel like an app. It feels like something that actually understands what day 12 is like — and doesn't pretend it's easy.
          </p>
          <p className="quote-attr reveal">Alex, 12 days into recovery</p>
        </div>
      </section>

      <section className="final-cta landing-section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <p className="section-eyebrow reveal">Start today</p>
          <h2 className="section-title reveal">Your first check-in<br />takes 60 seconds</h2>
          <p className="section-sub reveal">No referral. No waitlist. Create a free account and begin tracking your recovery today.</p>
          <div className="hero-actions reveal" style={{ justifyContent: 'center' }}>
            <Link className="btn-primary" to="/register">Create a free account</Link>
            <a className="btn-ghost" href="#features">Learn more</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-copy">© 2026 Serenity. Built with care for recovery.</div>
        <div class="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Crisis Support</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}