import { useState } from "react";
import { supabase } from "./src/lib/supabase";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,700;1,9..144,900&family=Nunito:wght@400;500;600;700;800;900&display=swap');`;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const css = `
${FONT}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #08080a;
  --s1: #101013;
  --s2: #16161a;
  --border: #1f1f26;
  --amber: #f5c842;
  --amber2: #f97316;
  --green: #4ade80;
  --blue: #60a5fa;
  --text: #efefed;
  --muted: #64748b;
  --muted2: #94a3b8;
}
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Nunito', sans-serif;
  overflow-x: hidden;
}

/* ── NAV ── */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 40px;
  background: rgba(8,8,10,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.nav-right { display: flex; align-items: center; gap: 14px; }
.nav-pill {
  font-size: 12px; font-weight: 700; color: var(--muted2);
  display: flex; align-items: center; gap: 6px;
}
.nav-pill span { color: var(--amber); font-size: 13px; }
.btn-cta {
  background: var(--amber); color: #0d0d0f;
  font-family: 'Nunito', sans-serif; font-weight: 900;
  font-size: 13px; padding: 9px 22px; border-radius: 999px;
  border: none; cursor: pointer; transition: all 0.18s;
  letter-spacing: 0.2px;
}
.btn-cta:hover { background: #e8bc38; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(245,200,66,0.25); }

/* ══════════════════════
   HERO
══════════════════════ */
.hero {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  padding: 130px 24px 80px;
  position: relative; overflow: hidden;
}

/* background atmosphere */
.hero-atmo {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
}
.atmo-ring {
  position: absolute; border-radius: 50%;
  border: 1px solid rgba(245,200,66,0.06);
  top: 50%; left: 50%; transform: translate(-50%, -50%);
}
.atmo-glow1 {
  position: absolute;
  width: 800px; height: 500px;
  background: radial-gradient(ellipse, rgba(245,200,66,0.09) 0%, transparent 65%);
  top: 0; left: 50%; transform: translateX(-50%);
}
.atmo-glow2 {
  position: absolute;
  width: 500px; height: 400px;
  background: radial-gradient(ellipse, rgba(96,165,250,0.06) 0%, transparent 70%);
  bottom: -100px; right: -100px;
}
.atmo-dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* eyebrow */
.hero-eyebrow {
  position: relative; z-index: 2;
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(245,200,66,0.08); border: 1px solid rgba(245,200,66,0.2);
  color: var(--amber); border-radius: 999px;
  padding: 6px 18px; font-size: 12px; font-weight: 800;
  letter-spacing: 0.5px; margin-bottom: 36px;
  animation: riseIn 0.7s cubic-bezier(.22,1,.36,1) both;
}
.eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--amber);
  animation: breathe 2.2s ease-in-out infinite;
}
@keyframes breathe {
  0%,100% { opacity:1; transform:scale(1); }
  50% { opacity:0.4; transform:scale(0.75); }
}

/* wordmark */
.hero-wm {
  position: relative; z-index: 2;
  display: flex; align-items: flex-end; justify-content: center;
  gap: 0; line-height: 1; margin-bottom: 32px;
  animation: riseIn 0.75s cubic-bezier(.22,1,.36,1) 0.08s both;
}
.wm-l {
  font-family: 'Fraunces', serif; font-weight: 900;
  font-size: clamp(56px, 13vw, 152px);
  color: var(--text); line-height: 1; letter-spacing: -4px;
}
.wm-i-wrap {
  position: relative; display: inline-flex;
  flex-direction: column; align-items: center;
}
.wm-ng {
  font-family: 'Fraunces', serif; font-weight: 700;
  font-size: clamp(16px, 3.2vw, 40px); color: var(--amber);
  margin-bottom: clamp(10px, 1.8vw, 22px); margin-left: 3px; line-height: 1;
}

/* tagline */
.hero-tagline {
  position: relative; z-index: 2;
  font-family: 'Fraunces', serif; font-weight: 700; font-style: italic;
  font-size: clamp(20px, 3.5vw, 36px);
  color: var(--muted2); line-height: 1.3; margin-bottom: 20px;
  animation: riseIn 0.75s cubic-bezier(.22,1,.36,1) 0.16s both;
}
.hero-tagline em { font-style: normal; color: var(--text); }

/* desc */
.hero-desc {
  position: relative; z-index: 2;
  font-size: clamp(14px, 1.8vw, 17px); font-weight: 500;
  color: var(--muted); line-height: 1.8; max-width: 500px;
  margin-bottom: 48px;
  animation: riseIn 0.75s cubic-bezier(.22,1,.36,1) 0.22s both;
}

/* form */
.wl-form {
  position: relative; z-index: 2;
  width: 100%; max-width: 460px;
  display: flex; flex-direction: column;
  align-items: center; gap: 10px;
  animation: riseIn 0.75s cubic-bezier(.22,1,.36,1) 0.28s both;
}
.wl-row {
  display: flex; width: 100%;
  background: var(--s2); border: 1px solid var(--border);
  border-radius: 999px; padding: 5px 5px 5px 22px;
  transition: border-color 0.2s;
}
.wl-row:focus-within { border-color: rgba(245,200,66,0.35); }
.wl-input {
  flex: 1; background: transparent; border: none; outline: none;
  font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 600;
  color: var(--text);
}
.wl-input::placeholder { color: var(--muted); font-weight: 500; }
.wl-btn {
  background: var(--amber); color: #0d0d0f;
  font-family: 'Nunito', sans-serif; font-weight: 900;
  font-size: 14px; padding: 11px 24px; border-radius: 999px;
  border: none; cursor: pointer; transition: all 0.18s; white-space: nowrap;
}
.wl-btn:hover { background: #e8bc38; transform: scale(1.03); }
.wl-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
.wl-note { font-size: 12px; color: var(--muted); font-weight: 600; display: flex; align-items: center; gap: 5px; }
.wl-error { font-size: 12px; color: #fda4af; font-weight: 700; text-align: center; line-height: 1.6; }
.wl-ok { font-size: 12px; color: var(--green); font-weight: 700; text-align: center; line-height: 1.6; }

.success-card {
  width: 100%; background: rgba(74,222,128,0.07);
  border: 1px solid rgba(74,222,128,0.2); border-radius: 20px;
  padding: 24px 28px; text-align: center;
  animation: riseIn 0.4s ease both;
}
.sc-emoji { font-size: 36px; margin-bottom: 10px; }
.sc-title { font-family: 'Fraunces',serif; font-weight: 900; font-size: 22px; color: var(--green); margin-bottom: 6px; }
.sc-sub { font-size: 14px; color: var(--muted2); font-weight: 600; line-height: 1.6; }

/* social proof */
.hero-proof {
  position: relative; z-index: 2;
  display: flex; align-items: center; gap: 12px;
  margin-top: 28px; flex-wrap: wrap; justify-content: center;
  animation: riseIn 0.75s cubic-bezier(.22,1,.36,1) 0.34s both;
}
.proof-avatars { display: flex; }
.pa {
  width: 30px; height: 30px; border-radius: 50%;
  border: 2px solid var(--bg);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800; margin-left: -7px;
}
.pa:first-child { margin-left: 0; }
.proof-txt { font-size: 13px; font-weight: 700; color: var(--muted2); }
.proof-txt strong { color: var(--amber); }

/* floating cards */
.floaters { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
.float-card {
  position: absolute;
  background: var(--s1); border: 1px solid var(--border);
  border-radius: 16px; padding: 13px 16px; max-width: 210px;
  box-shadow: 0 16px 48px rgba(0,0,0,0.5);
}
.fc-user { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
.fc-av {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 800; flex-shrink: 0;
}
.fc-name { font-size: 12px; font-weight: 800; color: var(--text); }
.fc-handle { font-size: 11px; color: var(--muted); }
.fc-text { font-size: 12px; color: var(--muted2); line-height: 1.55; font-weight: 500; }
.fc-course { display: inline-block; font-size: 11px; font-weight: 800; color: var(--amber); margin-bottom: 5px; }
.fc-bottom { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
.fc-stat { font-size: 11px; color: var(--muted); font-weight: 600; display: flex; align-items: center; gap: 3px; }
.fc-lock { font-size: 10px; color: var(--green); font-weight: 700; margin-left: auto; display: flex; align-items: center; gap: 3px; }

@keyframes fa { 0%,100%{transform:translateY(0) rotate(-3deg);} 50%{transform:translateY(-14px) rotate(-3deg);} }
@keyframes fb { 0%,100%{transform:translateY(0) rotate(2.5deg);} 50%{transform:translateY(-10px) rotate(2.5deg);} }
@keyframes fc { 0%,100%{transform:translateY(0) rotate(-1.5deg);} 50%{transform:translateY(-12px) rotate(-1.5deg);} }

/* ══════════════════════
   FEED PREVIEW SECTION
══════════════════════ */
.feed-section {
  padding: 100px 24px;
  max-width: 1100px; margin: 0 auto;
}
.sec-eyebrow {
  font-size: 11px; font-weight: 800; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--amber); margin-bottom: 14px;
  text-align: center;
}
.sec-title {
  font-family: 'Fraunces', serif; font-weight: 900;
  font-size: clamp(28px, 5vw, 50px); line-height: 1.1;
  text-align: center; margin-bottom: 56px; letter-spacing: -0.5px;
}
.sec-title em { font-style: italic; color: var(--amber); }

/* mock twitter feed */
.mock-feed {
  display: grid; grid-template-columns: 280px 1fr; gap: 20px;
  background: var(--s1); border: 1px solid var(--border);
  border-radius: 24px; overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,0.5);
}
.mock-sidebar {
  border-right: 1px solid var(--border);
  padding: 20px 16px;
  display: flex; flex-direction: column; gap: 4px;
}
.mock-logo { margin-bottom: 16px; padding: 4px 10px; }
.mock-nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 999px;
  font-size: 15px; font-weight: 700; color: var(--muted2);
  transition: all 0.15s; cursor: default;
}
.mock-nav-item.active { color: var(--text); background: var(--s2); }
.mock-nav-item .ni-icon { font-size: 18px; width: 22px; text-align: center; }
.mock-post-btn {
  background: var(--amber); color: #0d0d0f;
  border-radius: 999px; padding: 13px;
  font-family: 'Nunito',serif; font-weight: 900; font-size: 15px;
  text-align: center; margin-top: 12px; cursor: default;
}
.mock-main { padding: 0; }
.mock-tabs {
  display: flex; border-bottom: 1px solid var(--border);
}
.mock-tab {
  flex: 1; padding: 16px; text-align: center;
  font-size: 14px; font-weight: 800; color: var(--muted);
  border-bottom: 2px solid transparent; cursor: default;
}
.mock-tab.active { color: var(--text); border-bottom-color: var(--amber); }
.mock-posts { display: flex; flex-direction: column; }
.mock-post {
  padding: 16px 20px; border-bottom: 1px solid var(--border);
  display: flex; gap: 12px; cursor: default;
  transition: background 0.15s;
}
.mock-post:hover { background: rgba(255,255,255,0.015); }
.mp-av {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; font-weight: 900; flex-shrink: 0;
}
.mp-body { flex: 1; min-width: 0; }
.mp-top { display: flex; align-items: center; gap: 6px; margin-bottom: 3px; flex-wrap: wrap; }
.mp-name { font-size: 14px; font-weight: 800; color: var(--text); }
.mp-handle { font-size: 13px; color: var(--muted); font-weight: 500; }
.mp-time { font-size: 12px; color: var(--muted); margin-left: auto; }
.mp-course {
  display: inline-block; font-size: 11.5px; font-weight: 800;
  color: var(--amber); margin-bottom: 5px;
  background: rgba(245,200,66,0.08); padding: 1px 8px; border-radius: 4px;
}
.mp-text { font-size: 14px; color: var(--muted2); line-height: 1.6; font-weight: 500; margin-bottom: 10px; }
.mp-actions { display: flex; gap: 20px; }
.mp-action { display: flex; align-items: center; gap: 5px; font-size: 12.5px; color: var(--muted); font-weight: 600; }
.mp-action.liked { color: #f87171; }
.mp-action.reposted { color: var(--green); }
.mp-verified { color: var(--amber); font-size: 13px; }
.mp-lock-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 10px; font-weight: 800; color: var(--green);
  background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2);
  border-radius: 999px; padding: 2px 8px; margin-left: 4px;
}

/* ══════════════════════
   FEATURES GRID
══════════════════════ */
.features-section {
  padding: 80px 24px 100px;
  max-width: 1100px; margin: 0 auto;
}
.feat-grid {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 14px;
}
.feat-card {
  background: var(--s1); border: 1px solid var(--border);
  border-radius: 20px; padding: 26px 22px;
  position: relative; overflow: hidden;
  transition: all 0.22s;
}
.feat-card:hover { transform: translateY(-5px); border-color: rgba(245,200,66,0.18); box-shadow: 0 24px 48px rgba(0,0,0,0.35); }
.feat-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: var(--fc-top, transparent);
  border-radius: 20px 20px 0 0;
}
.feat-icon { font-size: 30px; margin-bottom: 14px; }
.feat-name { font-family: 'Fraunces',serif; font-weight: 900; font-size: 18px; margin-bottom: 8px; }
.feat-desc { font-size: 13.5px; color: var(--muted2); line-height: 1.7; font-weight: 500; }
.feat-new {
  position: absolute; top: 16px; right: 16px;
  font-size: 9px; font-weight: 800; letter-spacing: 1px;
  padding: 3px 8px; border-radius: 999px; text-transform: uppercase;
}
.new-green { background: rgba(74,222,128,0.1); color: var(--green); }
.new-blue { background: rgba(96,165,250,0.1); color: var(--blue); }

/* ══════════════════════
   ENCRYPTION SECTION
══════════════════════ */
.encrypt-section {
  margin: 0 auto 0;
  padding: 80px 24px;
  background: linear-gradient(180deg, var(--bg) 0%, #08120e 50%, var(--bg) 100%);
  position: relative; overflow: hidden;
}
.encrypt-inner {
  max-width: 900px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px;
  align-items: center;
}
.encrypt-left {}
.encrypt-badge {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2);
  border-radius: 999px; padding: 5px 14px;
  font-size: 12px; font-weight: 800; color: var(--green);
  margin-bottom: 20px; letter-spacing: 0.3px;
}
.encrypt-title {
  font-family: 'Fraunces', serif; font-weight: 900;
  font-size: clamp(26px, 4vw, 42px); line-height: 1.15;
  letter-spacing: -0.5px; margin-bottom: 16px;
}
.encrypt-title em { font-style: italic; color: var(--green); }
.encrypt-desc {
  font-size: 15px; color: var(--muted2); line-height: 1.8; font-weight: 500;
  margin-bottom: 24px;
}
.encrypt-points { display: flex; flex-direction: column; gap: 10px; }
.ep {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 14px; color: var(--muted2); font-weight: 600;
}
.ep-icon { color: var(--green); font-size: 16px; flex-shrink: 0; margin-top: 1px; }

/* mock DM */
.mock-dm {
  background: var(--s1); border: 1px solid rgba(74,222,128,0.15);
  border-radius: 20px; overflow: hidden;
  box-shadow: 0 24px 60px rgba(0,0,0,0.5);
}
.dm-header {
  padding: 14px 16px; border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 10px;
}
.dm-av {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800;
  background: linear-gradient(135deg,#6ee7b7,#059669);
  color: #0d0d0f;
}
.dm-name { font-size: 14px; font-weight: 800; }
.dm-lock { margin-left: auto; display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 800; color: var(--green); }
.dm-messages { padding: 16px; display: flex; flex-direction: column; gap: 10px; }
.dm-msg { max-width: 78%; }
.dm-msg.them { align-self: flex-start; }
.dm-msg.me { align-self: flex-end; }
.dm-bubble {
  padding: 9px 14px; border-radius: 18px;
  font-size: 13px; line-height: 1.5; font-weight: 500;
}
.dm-msg.them .dm-bubble { background: var(--s2); color: var(--muted2); border-radius: 18px 18px 18px 4px; }
.dm-msg.me .dm-bubble { background: rgba(245,200,66,0.15); color: var(--text); border-radius: 18px 18px 4px 18px; }
.dm-time { font-size: 10px; color: var(--muted); margin-top: 3px; font-weight: 600; padding: 0 4px; }
.dm-enc-note {
  text-align: center; padding: 10px;
  font-size: 11px; font-weight: 700; color: rgba(74,222,128,0.5);
  display: flex; align-items: center; justify-content: center; gap: 5px;
  border-top: 1px solid var(--border);
}

/* ══════════════════════
   SCHOOLS
══════════════════════ */
.schools-section {
  padding: 60px 24px;
  border-top: 1px solid var(--border);
  text-align: center;
}
.schools-row {
  display: flex; flex-wrap: wrap; gap: 8px;
  justify-content: center; max-width: 780px;
  margin: 20px auto 0;
}
.school-tag {
  background: var(--s1); border: 1px solid var(--border);
  border-radius: 999px; padding: 7px 16px;
  font-size: 13px; font-weight: 700; color: var(--muted2);
  display: flex; align-items: center; gap: 6px;
  transition: all 0.18s;
}
.school-tag:hover { color: var(--text); border-color: rgba(245,200,66,0.25); }
.s-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

/* ══════════════════════
   FOUNDER
══════════════════════ */
.founder-section {
  padding: 100px 24px;
  max-width: 680px; margin: 0 auto; text-align: center;
}
.founder-av {
  width: 76px; height: 76px; border-radius: 50%;
  background: linear-gradient(135deg, var(--amber), var(--amber2));
  display: flex; align-items: center; justify-content: center;
  font-family: 'Fraunces',serif; font-weight: 900;
  font-size: 30px; color: #0d0d0f; margin: 0 auto 28px;
  box-shadow: 0 0 0 4px rgba(245,200,66,0.15);
}
.founder-quote {
  font-family: 'Fraunces', serif; font-weight: 700; font-style: italic;
  font-size: clamp(19px, 3vw, 28px); line-height: 1.5;
  color: var(--text); margin-bottom: 8px;
}
.founder-quote em { font-style: normal; color: var(--amber); }
.founder-attrib { font-size: 14px; color: var(--muted2); font-weight: 700; margin-top: 14px; }
.founder-attrib strong { color: var(--text); }

/* ══════════════════════
   BOTTOM CTA
══════════════════════ */
.cta-section {
  padding: 120px 24px;
  text-align: center; position: relative; overflow: hidden;
  border-top: 1px solid var(--border);
}
.cta-glow {
  position: absolute; pointer-events: none;
  width: 700px; height: 500px;
  background: radial-gradient(ellipse, rgba(245,200,66,0.08) 0%, transparent 65%);
  top: 50%; left: 50%; transform: translate(-50%,-50%);
}
.cta-title {
  font-family: 'Fraunces', serif; font-weight: 900;
  font-size: clamp(34px, 7vw, 72px); line-height: 1.05;
  letter-spacing: -2px; margin-bottom: 18px;
  position: relative; z-index: 2;
}
.cta-title em { font-style: italic; color: var(--amber); }
.cta-sub {
  font-size: clamp(15px, 2vw, 18px); color: var(--muted2);
  font-weight: 500; line-height: 1.7; max-width: 440px;
  margin: 0 auto 44px; position: relative; z-index: 2;
}

/* ══════════════════════
   FOOTER
══════════════════════ */
footer {
  padding: 28px 40px;
  border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
}
.footer-left { display: flex; align-items: center; gap: 14px; }
.footer-copy { font-size: 13px; color: var(--muted); font-weight: 600; }
.footer-links { display: flex; gap: 20px; }
.footer-link { font-size: 13px; color: var(--muted); font-weight: 700; cursor: pointer; transition: color 0.15s; }
.footer-link:hover { color: var(--amber); }

/* ══════════════════════
   ANIMATION
══════════════════════ */
@keyframes riseIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .float-card { display: none; }
  .feed-section,
  .features-section,
  .encrypt-section,
  .founder-section,
  .cta-section { padding-left: 20px; padding-right: 20px; }
  .mock-feed { grid-template-columns: 220px 1fr; }
  .feat-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 800px) {
  nav { padding: 14px 20px; }
  .nav-pill { display: none; }
  .hero { padding: 116px 20px 64px; }
  .mock-feed { grid-template-columns: 1fr; }
  .mock-sidebar { display: none; }
  .feat-grid { grid-template-columns: 1fr; }
  .encrypt-inner { grid-template-columns: 1fr; gap: 36px; }
  footer { flex-direction: column; padding: 24px 20px; text-align: center; }
}

@media (max-width: 640px) {
  nav {
    padding: 12px 16px;
    gap: 12px;
  }
  .btn-cta {
    font-size: 12px;
    padding: 9px 16px;
  }
  .hero {
    min-height: auto;
    padding: 108px 16px 56px;
  }
  .hero-eyebrow {
    margin-bottom: 24px;
    padding: 6px 14px;
    font-size: 11px;
  }
  .hero-wm { margin-bottom: 22px; }
  .wm-l {
    font-size: clamp(44px, 16vw, 72px);
    letter-spacing: -2px;
  }
  .wm-ng {
    font-size: clamp(14px, 5vw, 24px);
    margin-left: 2px;
  }
  .hero-tagline {
    font-size: clamp(18px, 6vw, 28px);
    margin-bottom: 14px;
  }
  .hero-desc {
    font-size: 14px;
    line-height: 1.65;
    margin-bottom: 28px;
  }
  .wl-form { gap: 8px; }
  .wl-row {
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border-radius: 20px;
  }
  .wl-input {
    width: 100%;
    min-width: 0;
    font-size: 15px;
  }
  .wl-btn {
    width: 100%;
    border-radius: 14px;
  }
  .hero-proof {
    margin-top: 22px;
    gap: 10px;
  }
  .proof-txt {
    font-size: 12px;
    line-height: 1.5;
  }
  .schools-section,
  .feed-section,
  .features-section,
  .encrypt-section,
  .founder-section,
  .cta-section { padding-left: 16px; padding-right: 16px; }
  .schools-section { padding-top: 44px; padding-bottom: 44px; }
  .feed-section { padding-top: 72px; padding-bottom: 72px; }
  .features-section { padding-top: 64px; padding-bottom: 72px; }
  .encrypt-section { padding-top: 64px; padding-bottom: 64px; }
  .founder-section { padding-top: 72px; padding-bottom: 72px; }
  .cta-section { padding-top: 80px; padding-bottom: 80px; }
  .sec-title {
    margin-bottom: 32px;
    font-size: clamp(24px, 9vw, 36px);
  }
  .mock-feed,
  .mock-dm { border-radius: 18px; }
  .mock-tabs { overflow-x: auto; }
  .mock-tab {
    min-width: 110px;
    padding: 14px 10px;
    font-size: 13px;
  }
  .mock-post {
    padding: 14px;
    gap: 10px;
  }
  .mp-top { gap: 4px 6px; }
  .mp-time {
    width: 100%;
    margin-left: 0;
  }
  .mp-text {
    font-size: 13px;
    line-height: 1.55;
  }
  .mp-actions {
    flex-wrap: wrap;
    gap: 10px 16px;
  }
  .encrypt-title {
    font-size: clamp(24px, 8vw, 34px);
  }
  .encrypt-desc {
    font-size: 14px;
    line-height: 1.65;
  }
  .dm-header,
  .dm-messages { padding: 14px; }
  .dm-msg { max-width: 88%; }
  .feat-card {
    padding: 22px 18px;
    border-radius: 18px;
  }
  .feat-name { font-size: 17px; }
  .feat-desc { font-size: 13px; }
  .founder-av {
    width: 64px;
    height: 64px;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .founder-quote {
    font-size: clamp(18px, 6vw, 24px);
    line-height: 1.45;
  }
  .founder-attrib {
    font-size: 13px;
    line-height: 1.6;
  }
  .cta-title {
    letter-spacing: -1px;
    font-size: clamp(28px, 10vw, 44px);
  }
  .cta-sub {
    font-size: 14px;
    margin-bottom: 28px;
  }
  .footer-left,
  .footer-links {
    justify-content: center;
    flex-wrap: wrap;
  }
  .footer-links { gap: 14px; }
}

@media (max-width: 420px) {
  nav { padding: 12px 14px; }
  .btn-cta {
    padding: 8px 14px;
    font-size: 11px;
  }
  .hero {
    padding: 100px 14px 48px;
  }
  .hero-eyebrow {
    width: 100%;
    justify-content: center;
  }
  .hero-wm {
    transform: scale(0.94);
    transform-origin: center;
  }
  .sec-eyebrow {
    font-size: 10px;
    letter-spacing: 1.6px;
  }
  .school-tag {
    font-size: 12px;
    padding: 6px 12px;
  }
  .mock-post { padding: 12px; }
  .mp-av {
    width: 36px;
    height: 36px;
    font-size: 13px;
  }
  .dm-msg { max-width: 92%; }
}
`;

function Cap({ size, color = "#f5c842" }) {
  return (
    <svg width={size} height={size * 0.68} viewBox="0 0 64 44" fill="none">
      <ellipse cx="32" cy="26" rx="20" ry="3.5" fill="rgba(0,0,0,0.28)" />
      <polygon points="32,3 60,16 32,29 4,16" fill={color} />
      <polygon points="32,3 60,16 46,14 32,7" fill="rgba(255,255,255,0.18)" />
      <polygon points="32,29 60,16 60,21 32,34" fill={color} style={{ filter: "brightness(0.62)" }} />
      <polygon points="32,29 4,16 4,21 32,34" fill={color} style={{ filter: "brightness(0.78)" }} />
      <line x1="60" y1="16" x2="60" y2="36" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
      <circle cx="60" cy="38" r="3.8" fill={color} opacity="0.75" />
      <line x1="58" y1="41" x2="55" y2="44" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      <line x1="60" y1="42" x2="60" y2="44" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      <line x1="62" y1="41" x2="65" y2="44" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function Logo({ size = 28, color = "#f5c842" }) {
  const cap = size * 0.5;
  const ng = size * 0.46;
  const mb = size * 0.17;
  const ls = size < 40 ? -0.5 : -1;
  return (
    <div style={{ display: "inline-flex", alignItems: "flex-end", gap: 0 }}>
      {["O","n","y"].map(l => <span key={l} style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: size, color: "var(--text)", lineHeight: 1, letterSpacing: ls }}>{l}</span>)}
      <span style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ position: "absolute", bottom: "100%", left: "50%", transform: `translateX(-46%) translateY(${cap * 0.36}px)`, zIndex: 5 }}>
          <Cap size={cap} color={color} />
        </span>
        <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: size, color: "var(--text)", lineHeight: 1, letterSpacing: ls }}>ı</span>
      </span>
      <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: ng, color, marginBottom: mb, marginLeft: 2, lineHeight: 1 }}>.ng</span>
    </div>
  );
}

const POSTS = [
  { av: "CA", avBg: "linear-gradient(135deg,#f5c842,#f97316)", name: "Chisom Agu", handle: "@chisom_agu", verified: true, time: "2h", course: "#CSC304", text: "The trick with Banker's Algorithm is to treat it like a bank refusing bad loans. Draw your Need matrix, then simulate. If Need ≤ Available at any point, you're safe. Took me 3 days to get this 😭", likes: "147", reposts: "43", replies: "28", liked: true },
  { av: "EO", avBg: "linear-gradient(135deg,#6ee7b7,#059669)", name: "Emeka Obi", handle: "@emeka_obi", verified: false, time: "4h", course: "#EEE301", text: "5 years of past questions + Sadiku PDF now uploaded on Onyi.ng. 2019–2023. No stress, no WhatsApp groups at midnight. Just download 📚", likes: "289", reposts: "112", replies: "56", liked: false },
  { av: "AN", avBg: "linear-gradient(135deg,#a78bfa,#7c3aed)", name: "Adaeze Nwosu", handle: "@adaeze_n", verified: true, time: "1d", course: "#MCM215", text: "Honest MCM 215 review: sounds boring, Dr. Okafor makes it actually engaging. CBT exam. Read up on deontology vs consequentialism and Nigerian press laws. You're welcome 🎓", likes: "93", reposts: "37", replies: "19", liked: false },
];

const SCHOOLS = [
  { n: "UNIPORT", c: "#f5c842" }, { n: "UNILAG", c: "#6ee7b7" }, { n: "OAU", c: "#f97316" },
  { n: "UNIABUJA", c: "#a78bfa" }, { n: "UNIBEN", c: "#f472b6" }, { n: "FUTA", c: "#60a5fa" },
  { n: "LASU", c: "#4ade80" }, { n: "UNILORIN", c: "#fbbf24" }, { n: "UNN", c: "#fb7185" },
];

function WaitlistForm({ submitted, setSubmitted, count, setCount }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const handle = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || normalizedEmail.length > 320 || !EMAIL_REGEX.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      setNotice("");
      return;
    }

    setError("");
    setNotice("");
    setLoading(true);

    const { error: insertError } = await supabase.from("waitlist").insert({
      email: normalizedEmail,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        setNotice("This email is already on the waitlist.");
        setLoading(false);
        return;
      }

      if (insertError.code === "42501" || insertError.message?.toLowerCase().includes("row-level security")) {
        setError("Supabase is blocking public inserts right now. We need one quick policy fix.");
        setLoading(false);
        return;
      }

      setError("Couldn't join the waitlist right now. Please try again.");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
    setCount(c => c + 1);
  };
  if (submitted) return (
    <div className="success-card">
      <div className="sc-emoji">🎓</div>
      <div className="sc-title">You're on the list!</div>
      <div className="sc-sub">We'll reach you when Onyi.ng launches.<br />Share with your coursemates and make them jealous.</div>
      {notice && <div className="wl-ok" style={{ marginTop: 10 }}>{notice}</div>}
    </div>
  );
  return (
    <>
      <div className="wl-row">
        <input className="wl-input" type="email" placeholder="your@email.com" value={email} autoComplete="email" required maxLength={320} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
        <button className="wl-btn" onClick={handle} disabled={loading}>{loading ? "Joining..." : "Join the waitlist →"}</button>
      </div>
      <p className="wl-note">🔒 No spam. Just a launch notification.</p>
      {notice && <p className="wl-ok">{notice}</p>}
      {error && <p className="wl-error">{error}</p>}
    </>
  );
}

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(312);
  const heroCapSize = Math.min((typeof window !== "undefined" ? window.innerWidth : 900) * 0.07, 108);

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav>
        <Logo size={24} />
        <div className="nav-right">
          <span className="nav-pill"><span>{count}</span> waiting</span>
          <button className="btn-cta" onClick={() => document.getElementById("wl").scrollIntoView({ behavior: "smooth" })}>Join Waitlist</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-atmo">
          <div className="atmo-dots" />
          <div className="atmo-glow1" />
          <div className="atmo-glow2" />
          {[500,380,260].map((s,i) => <div key={i} className="atmo-ring" style={{ width: s, height: s * 0.55 }} />)}
        </div>

        {/* Floating cards */}
        <div className="floaters">
          <div className="float-card" style={{ top: "24%", left: "2%", animation: "fa 5.5s ease-in-out infinite" }}>
            <div className="fc-user">
              <div className="fc-av" style={{ background: "linear-gradient(135deg,#f5c842,#f97316)", color: "#0d0d0f" }}>CA</div>
              <div><div className="fc-name">Chisom A. ✦</div><div className="fc-handle">@chisom · UNIPORT</div></div>
            </div>
            <div className="fc-course">#CSC304</div>
            <div className="fc-text">Banker's Algorithm = treat it like a bank refusing bad loans 🧠</div>
            <div className="fc-bottom">
              <span className="fc-stat">💚 147</span>
              <span className="fc-stat">🔁 43</span>
            </div>
          </div>
          <div className="float-card" style={{ top: "20%", right: "2%", animation: "fb 6.5s ease-in-out infinite" }}>
            <div className="fc-user">
              <div className="fc-av" style={{ background: "linear-gradient(135deg,#6ee7b7,#059669)", color: "#0d0d0f" }}>EO</div>
              <div><div className="fc-name">Emeka O.</div><div className="fc-handle">@emeka · UNILAG</div></div>
            </div>
            <div className="fc-course">#EEE301</div>
            <div className="fc-text">5 years of past questions + Sadiku PDF uploaded 📚 No more midnight WhatsApp begging</div>
            <div className="fc-bottom">
              <span className="fc-stat">💚 289</span>
              <span className="fc-lock">🔒 E2E</span>
            </div>
          </div>
          <div className="float-card" style={{ bottom: "16%", left: "2%", animation: "fc 4.8s ease-in-out infinite" }}>
            <div className="fc-user">
              <div className="fc-av" style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)", color: "#fff" }}>AN</div>
              <div><div className="fc-name">Adaeze N. ✦</div><div className="fc-handle">@adaeze · UNIPORT</div></div>
            </div>
            <div className="fc-course">#MCM215</div>
            <div className="fc-text">Honest MCM 215 review — Dr. Okafor makes it fire 🔥 CBT. Study press laws.</div>
          </div>
        </div>

        <div className="hero-eyebrow"><div className="eyebrow-dot" />Coming Soon — Join the Waitlist</div>

        {/* BIG WORDMARK */}
        <div className="hero-wm">
          {["O","n","y"].map(l => <span key={l} className="wm-l">{l}</span>)}
          <span className="wm-i-wrap">
            <span style={{ position: "absolute", bottom: "100%", left: "50%", transform: `translateX(-46%) translateY(${heroCapSize * 0.36}px)`, zIndex: 5 }}>
              <Cap size={heroCapSize} color="#f5c842" />
            </span>
            <span className="wm-l">ı</span>
          </span>
          <span className="wm-ng">.ng</span>
        </div>

        <p className="hero-tagline">A gift for the <em>leaders of tomorrow.</em></p>
        <p className="hero-desc">
          The campus social network for Nigerian university students — course tips, past questions, honest reviews, encrypted DMs, and a feed that actually keeps up with student life.
        </p>

        <div className="wl-form" id="wl">
          <WaitlistForm submitted={submitted} setSubmitted={setSubmitted} count={count} setCount={setCount} />
        </div>

        <div className="hero-proof">
          <div className="proof-avatars">
            {[
              { bg: "linear-gradient(135deg,#f5c842,#f97316)", t: "C" },
              { bg: "linear-gradient(135deg,#6ee7b7,#059669)", t: "E" },
              { bg: "linear-gradient(135deg,#a78bfa,#7c3aed)", t: "A" },
              { bg: "linear-gradient(135deg,#60a5fa,#2563eb)", t: "T" },
              { bg: "linear-gradient(135deg,#f472b6,#db2777)", t: "N" },
            ].map((a, i) => <div key={i} className="pa" style={{ background: a.bg, color: "#fff" }}>{a.t}</div>)}
          </div>
          <span className="proof-txt"><strong>{count} students</strong> already waiting across 14 schools 🇳🇬</span>
        </div>
      </section>

      {/* SCHOOLS */}
      <div className="schools-section">
        <p className="sec-eyebrow" style={{ textAlign: "center" }}>Launching across Nigeria</p>
        <div className="schools-row">
          {SCHOOLS.map(s => (
            <div key={s.n} className="school-tag">
              <div className="s-dot" style={{ background: s.c }} />{s.n}
            </div>
          ))}
          <div className="school-tag">+ 29 more</div>
        </div>
      </div>

      {/* FEED PREVIEW */}
      <section className="feed-section">
        <p className="sec-eyebrow">🐦 Twitter-style feed</p>
        <h2 className="sec-title">A campus timeline that <em>actually moves.</em></h2>
        <div className="mock-feed">
          <div className="mock-sidebar">
            <div className="mock-logo"><Logo size={22} /></div>
            {[["🏠","For You"],["🔥","Trending"],["📚","Courses"],["🔒","Messages"],["👤","Profile"],["⭐","Saved"]].map(([icon, label], i) => (
              <div key={i} className={`mock-nav-item${i === 0 ? " active" : ""}`}>
                <span className="ni-icon">{icon}</span>{label}
              </div>
            ))}
            <div className="mock-post-btn">Post</div>
          </div>
          <div className="mock-main">
            <div className="mock-tabs">
              <div className="mock-tab active">For You</div>
              <div className="mock-tab">Following</div>
              <div className="mock-tab">Courses</div>
            </div>
            <div className="mock-posts">
              {POSTS.map((p, i) => (
                <div key={i} className="mock-post">
                  <div className="mp-av" style={{ background: p.avBg, color: p.avBg.includes("059669") || p.avBg.includes("7c3aed") ? "#fff" : "#0d0d0f" }}>{p.av}</div>
                  <div className="mp-body">
                    <div className="mp-top">
                      <span className="mp-name">{p.name}</span>
                      {p.verified && <span className="mp-verified">✦</span>}
                      <span className="mp-handle">{p.handle}</span>
                      <span className="mp-time">{p.time}</span>
                    </div>
                    <div className="mp-course">{p.course}</div>
                    <div className="mp-text">{p.text}</div>
                    <div className="mp-actions">
                      <span className="mp-action">💬 {p.replies}</span>
                      <span className={`mp-action${p.reposts === "112" ? " reposted" : ""}`}>🔁 {p.reposts}</span>
                      <span className={`mp-action${p.liked ? " liked" : ""}`}>{p.liked ? "❤️" : "🤍"} {p.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ENCRYPTION */}
      <section className="encrypt-section">
        <div className="encrypt-inner">
          <div className="encrypt-left">
            <div className="encrypt-badge">🔒 End-to-End Encrypted</div>
            <h2 className="encrypt-title">Your DMs stay <em>between you.</em> Always.</h2>
            <p className="encrypt-desc">What you share with your coursemates is your business. Every message on Onyi.ng is end-to-end encrypted — not even we can read them.</p>
            <div className="encrypt-points">
              {[
                "Messages encrypted before they leave your device",
                "Zero-knowledge architecture — we store nothing readable",
                "Share past questions, notes, and advice privately",
                "No screenshots notification system coming soon",
              ].map((p, i) => <div key={i} className="ep"><span className="ep-icon">✓</span>{p}</div>)}
            </div>
          </div>
          <div className="mock-dm">
            <div className="dm-header">
              <div className="dm-av">AN</div>
              <div><div className="dm-name">Adaeze Nwosu</div><div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>@adaeze_n · UNIPORT</div></div>
              <div className="dm-lock">🔒 Encrypted</div>
            </div>
            <div className="dm-messages">
              <div className="dm-msg them">
                <div className="dm-bubble">Hey, do you have the CSC 394 past questions from 2022?</div>
                <div className="dm-time">2:14 PM</div>
              </div>
              <div className="dm-msg me">
                <div className="dm-bubble">Yes! I just uploaded them. Check my profile under Past Questions 📋</div>
                <div className="dm-time">2:15 PM</div>
              </div>
              <div className="dm-msg them">
                <div className="dm-bubble">You're a lifesaver 🙏🏾 Exam is tomorrow morning</div>
                <div className="dm-time">2:15 PM</div>
              </div>
              <div className="dm-msg me">
                <div className="dm-bubble">Good luck!! Focus on chapters 4–7, that's where the questions come from 💪🏾</div>
                <div className="dm-time">2:16 PM</div>
              </div>
            </div>
            <div className="dm-enc-note">🔒 End-to-end encrypted · Only you two can read this</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <p className="sec-eyebrow">Everything in one place</p>
        <h2 className="sec-title">Built for the way<br />Nigerian students <em>actually live.</em></h2>
        <div className="feat-grid">
          {[
            { icon: "🐦", name: "Twitter-style Feed", desc: "Follow students, repost tips, reply to threads. A real timeline — not a forum from 2009.", top: "linear-gradient(90deg,#f5c842,#f97316)", tag: null },
            { icon: "🔒", name: "Encrypted DMs", desc: "End-to-end encrypted messages. Share past questions, notes, and advice privately.", top: "linear-gradient(90deg,#4ade80,#059669)", tag: { cls: "new-green", txt: "E2E" } },
            { icon: "📋", name: "Past Questions", desc: "Upload and download past exam questions per course, per year, per school. Organised.", top: "linear-gradient(90deg,#60a5fa,#3b82f6)", tag: null },
            { icon: "⭐", name: "Course Reviews", desc: "Rate difficulty, lecturer quality, usefulness. Know before you register. No surprises.", top: "linear-gradient(90deg,#a78bfa,#7c3aed)", tag: null },
            { icon: "🤖", name: "AI Exam Prep", desc: "AI-generated mock exams from real past questions. Track your readiness score per course.", top: "linear-gradient(90deg,#f472b6,#db2777)", tag: { cls: "new-blue", txt: "Pro" } },
            { icon: "🏆", name: "Reputation System", desc: "The more you help your coursemates, the more you rise. Badges, points, leaderboards.", top: "linear-gradient(90deg,#fbbf24,#f59e0b)", tag: null },
          ].map((f, i) => (
            <div key={i} className="feat-card" style={{ "--fc-top": f.top }}>
              {f.tag && <span className={`feat-new ${f.tag.cls}`}>{f.tag.txt}</span>}
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-name">{f.name}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="founder-section">
        <div className="founder-av">D</div>
        <p className="founder-quote">
          "My name means <em>gift.</em> I built Onyi.ng because Nigerian students deserve more than midnight WhatsApp begging and outdated forums. This is my gift to you."
        </p>
        <p className="founder-attrib"><strong>Onyekachukwu David Okafor</strong> · 19 · Founder · UNIPORT CS Student · Delta State</p>
      </section>

      {/* BOTTOM CTA */}
      <section className="cta-section">
        <div className="cta-glow" />
        <h2 className="cta-title">The leaders of<br /><em>tomorrow</em> are waiting.</h2>
        <p className="cta-sub">Join {count} students already on the waitlist. Be first when we launch.</p>
        <div className="wl-form" style={{ position: "relative", zIndex: 2 }}>
          <WaitlistForm submitted={submitted} setSubmitted={setSubmitted} count={count} setCount={setCount} />
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-left">
          <Logo size={20} />
          <span className="footer-copy">© 2025 Onyi.ng — Built in Nigeria 🇳🇬</span>
        </div>
        <div className="footer-links">
          <span className="footer-link">Twitter</span>
          <span className="footer-link">Instagram</span>
          <span className="footer-link">Privacy</span>
        </div>
      </footer>
    </>
  );
}
