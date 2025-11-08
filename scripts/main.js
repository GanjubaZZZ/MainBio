"use strict";

// === EDIT THIS SECTION ===
// Minimal config for your site. Replace placeholders later.
const SITE = {
  nickname: "ORVCLE", // Your public nickname
  text: {
    ru: {
      titleSuffix: "— Биография",
      tagline: "Минималистичный сайт-биография",
      aboutTitle: "Обо мне",
      aboutText:
        "Здесь будет короткий абзац о вас: кто вы, чем занимаетесь, какие ключевые интересы. Этот текст легко отредактировать в scripts/main.js.",
      contactsTitle: "Контакты",
      contactNote: "Ссылки будут добавлены позже.",
      otherLabel: "Другое",
      emailLabel: "Email",
      telegramLabel: "Telegram",
      githubLabel: "GitHub",
      steamLabel: "Steam",
      soundcloudLabel: "SoundCloud",
      instagramLabel: "Instagram",
      telegramBotLabel: "Telegram Archive",
      botNote: "Телеграм-бот для поиска открытых данных (OSINT) по публичным источникам. На момент 07.11.2025 — закрытое бета-тестирование; публичный релиз запланирован. Используйте только в рамках закона и правил платформ.",
      tiktokLabel: "TikTok",
      discordLabel: "Discord",
      metaDescription: "Краткая биография {nickname}."
    },
    en: {
      titleSuffix: "— Biography",
      tagline: "Minimalist biography website",
      aboutTitle: "About",
      aboutText:
        "Add a short paragraph about who you are, what you do, and your key interests. You can edit this text in scripts/main.js.",
      contactsTitle: "Contacts",
      contactNote: "Links will be added later.",
      otherLabel: "Other",
      emailLabel: "Email",
      telegramLabel: "Telegram",
      githubLabel: "GitHub",
      steamLabel: "Steam",
      soundcloudLabel: "SoundCloud",
      instagramLabel: "Instagram",
      telegramBotLabel: "Telegram Archive",
      botNote: "Telegram bot for open-source intelligence (OSINT) over public data sources. As of 07.11.2025 — closed beta; public release planned. Use only in compliance with law and platform policies.",
      tiktokLabel: "TikTok",
      discordLabel: "Discord",
      metaDescription: "Short biography of {nickname}."
    }
  },
  links: {
    // Set any subset. Icons row shows these platforms (disabled if empty)
    github: "https://github.com/GanjubaZZZ",
    steam: "https://steamcommunity.com/profiles/76561199065074021/",
    soundcloud: "https://soundcloud.com/peajlhaya-kpica",
    telegram: "@aquaFreeze",
    instagram: "https://www.instagram.com/hrjjjksw",
    tiktok: "https://www.tiktok.com/@jfffkeahhh",
    discord: "1206637730608582697", // numeric user ID for direct profile link
    telegramBot: "t.me/BoyArchiv3", // Telegram bot handle

    // Optional: classic list fields (remain supported in text list)
    email: "",
    other: { url: "", label: { ru: "Другое", en: "Other" } }
  },
  defaultLang: "ru"
};
// === END EDIT SECTION ===

// Runtime overrides (safer for non-ASCII in some environments)
try {
  if (SITE?.text?.ru) {
    SITE.text.ru.tagline = "Один из первых веб-проектов";
    SITE.text.ru.botNote = "Архив фотографий из личной жизни";
    SITE.text.ru.aboutText = `Иногда кажется, будто всё рушится сразу: планы, силы, вера в себя. Будто мир сжимается до одной точки, и ты остаёшься один на один со своей усталостью. В такие моменты хочется остановиться — перестать бороться, перестать пытаться.

Но именно тогда важнее всего — сделать хоть один маленький шаг вперёд.

Не нужен подвиг. Не нужно идти быстро. Достаточно просто продолжать. Ещё один день. Ещё одна попытка. Ещё одно «я попробую».

Настоящая сила проявляется не тогда, когда всё получается, а тогда, когда не получается — и ты всё равно идёшь дальше. Жизнь иногда бросает вызовы, заставляет сомневаться, испытывает на прочность. Но с каждым шагом внутри появляется новая устойчивость, новое понимание себя.

Пусть путь будет медленным. Пусть шаги будут неровными. Это нормально. Главное — не останавливаться.

Потому что впереди всегда есть что-то, ради чего стоит идти дальше: новые встречи, новые открытия, новые мечты, которые ещё только ждут своего момента.

Даже когда темно — иди.
Темнота не вечна.
А ты сильнее, чем кажешься.`;
  }
  if (SITE?.text?.en) {
    SITE.text.en.botNote = "Bot is in closed beta. It helps search public open sources; public release is planned.";
  }
} catch (_) {}

// Global FX toggle: honors OS reduce-motion, but allows override via localStorage 'fx' ('on'|'off')
function isFxOn() {
  // Always on unless user requests reduced motion at OS level
  return !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

function detectInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved && (saved === "ru" || saved === "en")) return saved;
  } catch (_) {}
  const sys = (navigator.language || "en").toLowerCase();
  return sys.startsWith("ru") ? "ru" : SITE.defaultLang || "en";
}

let currentLang = detectInitialLang();

function t(key) {
  const pack = SITE.text[currentLang] || SITE.text.en;
  return (pack && pack[key]) || key;
}

function withTokens(str) {
  return String(str).replaceAll("{nickname}", SITE.nickname);
}

function showOrHide(id, visible) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle("hidden", !visible);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function normalizeEmail(link) {
  if (!link) return "";
  return link.startsWith("mailto:") ? link : `mailto:${link}`;
}

function normalizeTelegram(link) {
  if (!link) return "";
  let l = link.trim();
  if (/^https?:\/\//i.test(l)) return l;
  // accept forms like '@user' or 't.me/user' or 'telegram.me/user'
  l = l.replace(/^@/, "");
  l = l.replace(/^t\.me\//i, "").replace(/^telegram\.me\//i, "");
  return `https://t.me/${l}`;
}

function normalizeGithub(link) {
  if (!link) return "";
  if (link.startsWith("http")) return link;
  return `https://github.com/${link}`;
}

function normalizeInstagram(link) {
  if (!link) return "";
  if (link.startsWith("http")) return link;
  const handle = link.replace(/^@/, "");
  return `https://instagram.com/${handle}`;
}

function normalizeSteam(link) {
  if (!link) return "";
  if (link.startsWith("http")) return link;
  const id = link.trim();
  if (/^\d{16,20}$/.test(id)) {
    return `https://steamcommunity.com/profiles/${id}`;
  }
  return `https://steamcommunity.com/id/${id.replace(/^@/, "")}`;
}

function normalizeSoundCloud(link) {
  if (!link) return "";
  if (link.startsWith("http")) return link;
  const handle = link.replace(/^@/, "");
  return `https://soundcloud.com/${handle}`;
}

function normalizeTikTok(link) {
  if (!link) return "";
  if (link.startsWith("http")) return link;
  const handle = link.replace(/^@/, "");
  return `https://www.tiktok.com/@${handle}`;
}

function normalizeDiscord(link) {
  if (!link) return "";
  if (link.startsWith("http")) return link;
  const id = link.trim();
  // Discord direct profile links require numeric user ID
  if (/^\d{17,20}$/.test(id)) return `https://discord.com/users/${id}`;
  return "";
}

function updateLinks() {
  // Email
  const email = SITE.links.email?.trim();
  if (email) {
    const href = normalizeEmail(email);
    const a = document.getElementById("emailLink");
    if (a) { a.href = href; a.textContent = email.replace(/^mailto:/, ""); a.rel = "me noopener noreferrer"; }
    showOrHide("contact-email", true);
  } else {
    showOrHide("contact-email", false);
  }

  // Telegram
  const tg = SITE.links.telegram?.trim();
  if (tg) {
    const href = normalizeTelegram(tg);
    const a = document.getElementById("telegramLink");
    if (a) { a.href = href; a.textContent = tg.startsWith("http") ? tg : (tg.startsWith("@") ? tg : `@${tg}`); a.rel = "me noopener noreferrer"; }
    showOrHide("contact-telegram", true);
  } else {
    showOrHide("contact-telegram", false);
  }

  // GitHub
  const gh = SITE.links.github?.trim();
  if (gh) {
    const href = normalizeGithub(gh);
    const a = document.getElementById("githubLink");
    if (a) { a.href = href; a.textContent = href.replace(/^https?:\/\//, ""); a.rel = "me noopener noreferrer"; }
    showOrHide("contact-github", true);
  } else {
    showOrHide("contact-github", false);
  }

  // Other
  const otherUrl = SITE.links.other?.url?.trim();
  if (otherUrl) {
    const a = document.getElementById("otherLink");
    const lbl = document.getElementById("otherLabel");
    if (a) { a.href = otherUrl; a.textContent = otherUrl.replace(/^https?:\/\//, ""); a.rel = "me noopener noreferrer"; }
    if (lbl) { lbl.textContent = SITE.links.other.label?.[currentLang] || t("otherLabel"); }
    showOrHide("contact-other", true);
  } else {
    showOrHide("contact-other", false);
  }
}

function updateMeta() {
  document.title = `${SITE.nickname} ${t("titleSuffix")}`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", withTokens(t("metaDescription")));
}

function updateLanguageUI() {
  const isRu = currentLang === "ru";
  const ruBtn = document.getElementById("lang-ru");
  const enBtn = document.getElementById("lang-en");
  if (ruBtn && enBtn) {
    ruBtn.classList.toggle("is-active", isRu);
    enBtn.classList.toggle("is-active", !isRu);
    ruBtn.setAttribute("aria-pressed", String(isRu));
    enBtn.setAttribute("aria-pressed", String(!isRu));
  }
}

function render() {
  document.documentElement.setAttribute("lang", currentLang);
  setText("brand", SITE.nickname);
  setText("nickname", SITE.nickname);
  setText("tagline", t("tagline"));
  setText("aboutTitle", t("aboutTitle"));
  setText("aboutText", t("aboutText"));
  setText("contactsTitle", t("contactsTitle"));
  setText("contactNote", t("contactNote"));
  // Footer year
  const year = new Date().getFullYear();
  setText("copyright", `© ${SITE.nickname}, ${year}`);
  updateLinks();
  buildSocialIcons();
  try { buildCalendarSkeleton(); renderCalendar(); } catch (_) {}
  updateMeta();
  updateLanguageUI();
  // Align floating sidebar with hero block
  try { scheduleSyncSidebar(); } catch (_) {}
}

function setLang(lang) {
  if (lang !== "ru" && lang !== "en") return;
  currentLang = lang;
  try { localStorage.setItem("lang", lang); } catch (_) {}
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  // Language switch handlers
  const ruBtn = document.getElementById("lang-ru");
  const enBtn = document.getElementById("lang-en");
  if (ruBtn) ruBtn.addEventListener("click", () => setLang("ru"));
  if (enBtn) enBtn.addEventListener("click", () => setLang("en"));
  render();
  initSocialTooltip();
  initBackgroundParticles();
  runGlitchIntro();
  initCalendarAndClock();
  initTilt();
  // Sidebar alignment with hero size and top position
  scheduleSyncSidebar();
  window.addEventListener('resize', scheduleSyncSidebar, { passive: true });
  window.addEventListener('scroll', scheduleSyncSidebar, { passive: true });
  // Relocate panels to bottom on small screens
  relocatePanelsMobile();
  window.addEventListener('resize', relocatePanelsMobile, { passive: true });
});

// ===============================
// Background Particle Network
// ===============================
(function () {
  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
    return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
  }

  function cssVar(name, fallback) {
    const cs = getComputedStyle(document.documentElement);
    const val = cs.getPropertyValue(name).trim();
    return val || fallback;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  const CONFIG = {
    density: 0.00015, // particles per pixel
    minParticles: 80,
    maxParticles: 220,
    sizeMin: 1.1,
    sizeMax: 2.2,
    gravity: 35, // px/s^2 downward
    wind: 10, // px/s^2 slight random horizontal
    attractRadius: 160, // px
    attractForce: 300, // px/s^2 at close range (decays with distance)
    // Extra pull when holding mouse button
    attractRadiusHold: 300, // px
    attractForceHold: 90000, // px/s^2 (very strong pull while holding)
    swirlStrengthHold: 2400, // px/s^2 tangential acceleration when holding
    swirlFalloff: 1, // >1 = faster falloff with distance
    outwardDampHold: 0.2, // keep only 20% of outward radial velocity while holding
    vtLimitFactor: 0.85, // clamp tangential speed so it doesn't fling out
    colorRadius: 180, // px
    linkDist: 120, // px
    linkOpacity: 0.12,
    linkOpacityAccent: 0.35,
    // Lines from particles to cursor
    cursorLinkDist: 200, // px
    cursorLinkOpacity: 0.6,
    // Cursor glow while attracting
    cursorGlowScale: 0.9, // fraction of attractRadiusHold used for glow radius (softer, larger)
    cursorGlowAlpha: 0.31, // center alpha baseline
    cursorGlowOuterAlpha: 0.06, // edge alpha baseline
    cursorGlowFadeIn: 10, // fade-in rate (per second)
    cursorGlowFadeOut: 6,  // fade-out rate (per second)
    cursorGlowBlur: 90,    // px gaussian blur for glow
    // Click effects
    clickRepelRadius: 170, // px
    clickRepelImpulse: 320, // instantaneous velocity kick (px/s)
    clickSparks: 36,
    clickSparkSpeedMin: 90,
    clickSparkSpeedMax: 220,
    clickSparkLifeMin: 0.6,
    clickSparkLifeMax: 1.2,
    clickPulseDuration: 0.55, // s
    maxFrameDelta: 1 / 20 // clamp dt to avoid jumps
  };

  function createEngine(canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    // Colors from CSS variables
    const baseColorHex = cssVar('--muted', '#5c5c5c');
    const accentHex = cssVar('--accent', '#0f62fe');
    const baseRGB = hexToRgb(baseColorHex) || { r: 92, g: 92, b: 92 };
    const accentRGB = hexToRgb(accentHex) || { r: 15, g: 98, b: 254 };

    // State
    let particles = [];
    let sparks = [];
    let pulses = [];
    let lastClickTs = 0;
    let glowAlpha = 0; // 0..1 animated opacity for glow
    let targetCount = 0;
    const cursor = { x: -9999, y: -9999, active: false };
    let mouseDown = false;
    let running = true;
    let lastTime = performance.now();
    let frameId = 0; // rAF id to prevent duplicate loops
    let attached = false; // listeners attached

    function rand(min, max) { return min + Math.random() * (max - min); }

    function resize() {
      width = Math.max(1, canvas.clientWidth);
      height = Math.max(1, canvas.clientHeight);
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      targetCount = Math.max(CONFIG.minParticles, Math.min(CONFIG.maxParticles, Math.floor(area * CONFIG.density)));
      while (particles.length < targetCount) particles.push(spawnParticle(true));
      if (particles.length > targetCount) particles.length = targetCount;
    }

    function spawnParticle(randomYTop = false) {
      return {
        x: Math.random() * width,
        y: randomYTop ? Math.random() * height : -rand(0, height * 0.15),
        vx: rand(-10, 10),
        vy: rand(10, 40),
        r: rand(CONFIG.sizeMin, CONFIG.sizeMax)
      };
    }

    function step(dt) {
      // Physics: gravity + mild horizontal wind + cursor attraction
      const axWind = (Math.random() * 2 - 1) * CONFIG.wind;
      // Animate cursor glow alpha (smooth appear/disappear)
      {
        const target = (cursor.active && mouseDown) ? 1 : 0;
        const rate = target > glowAlpha ? (CONFIG.cursorGlowFadeIn || 10) : (CONFIG.cursorGlowFadeOut || 6);
        const k = Math.min(1, dt * rate);
        glowAlpha += (target - glowAlpha) * k;
      }
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Gravity
        p.vy += CONFIG.gravity * dt;
        // Wind
        p.vx += axWind * dt * 0.05;
        // Cursor attraction within radius
        if (cursor.active) {
          const dx = cursor.x - p.x;
          const dy = cursor.y - p.y;
          const dist = Math.hypot(dx, dy);
          const r = mouseDown ? CONFIG.attractRadiusHold : CONFIG.attractRadius;
          const force = mouseDown ? CONFIG.attractForceHold : CONFIG.attractForce;
          if (dist < r && dist > 0.001) {
            const f = (force / dist) * dt; // inverse with distance
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;

            // No swirl: keep only radial attraction, inertia preserved
          }
        }
        // Integrate
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Recycle when out of bounds
        if (p.y - p.r > height || p.x + p.r < 0 || p.x - p.r > width) {
          particles[i] = spawnParticle(false);
        }

        // Soft clamp velocity to avoid numerical explosions during strong pull
        const speed = Math.hypot(p.vx, p.vy);
        const maxSpeed = mouseDown ? 1100 : 850; // px/s (keep inertia but avoid explosion)
        if (speed > maxSpeed) {
          const s = maxSpeed / speed;
          p.vx *= s;
          p.vy *= s;
        }
      }

      // Sparks update
      if (sparks.length) {
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          // simple physics
          s.vy += (CONFIG.gravity * 0.5) * dt;
          s.vx *= 0.995;
          s.vy *= 0.995;
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          s.life -= dt;
          if (s.life <= 0) { sparks.splice(i, 1); }
        }
      }

      // Pulses progress
      if (pulses.length) {
        for (let i = pulses.length - 1; i >= 0; i--) {
          const pulse = pulses[i];
          pulse.t += dt / CONFIG.clickPulseDuration;
          if (pulse.t >= 1) pulses.splice(i, 1);
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Soft glow under cursor while holding (smooth, blurred)
      if (cursor.active && glowAlpha > 0.01) {
        const rGlow = (CONFIG.attractRadiusHold * (CONFIG.cursorGlowScale || 0.9)) | 0;
        const innerA = (CONFIG.cursorGlowAlpha ?? 0.28) * glowAlpha;
        const outerA = (CONFIG.cursorGlowOuterAlpha ?? 0.06) * glowAlpha;
        const g = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, rGlow);
        g.addColorStop(0.0, `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${innerA})`);
        g.addColorStop(0.35, `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${innerA * 0.55})`);
        g.addColorStop(0.7, `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${outerA * 0.7})`);
        g.addColorStop(1.0, `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${outerA})`);
        ctx.save();
        if (typeof ctx.filter !== 'undefined') ctx.filter = `blur(${CONFIG.cursorGlowBlur || 14}px)`;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, rGlow, 0, Math.PI * 2);
        ctx.fill();
        if (typeof ctx.filter !== 'undefined') ctx.filter = 'none';
        ctx.restore();
      }

      // Pulses (ripple rings)
      if (pulses.length) {
        ctx.lineWidth = 1.5;
        for (let i = 0; i < pulses.length; i++) {
          const pulse = pulses[i];
          const t = Math.min(1, Math.max(0, pulse.t));
          const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
          const radius = ease * (CONFIG.clickRepelRadius * 1.35);
          const alpha = (1 - t) * 0.35;
          ctx.strokeStyle = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw connections
      const linkDist2 = CONFIG.linkDist * CONFIG.linkDist;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 <= linkDist2) {
            let a = CONFIG.linkOpacity;
            let col = baseRGB;
            if (cursor.active) {
              const nearP = (Math.hypot(p.x - cursor.x, p.y - cursor.y) <= CONFIG.colorRadius);
              const nearQ = (Math.hypot(q.x - cursor.x, q.y - cursor.y) <= CONFIG.colorRadius);
              if (nearP && nearQ) { a = CONFIG.linkOpacityAccent; col = accentRGB; }
            }
            const w = 1 - Math.sqrt(d2) / CONFIG.linkDist;
            ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${Math.max(0, a * w)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Draw lines from particles to cursor
      if (cursor.active) {
        const maxD = CONFIG.cursorLinkDist;
        const maxD2 = maxD * maxD;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - cursor.x;
          const dy = p.y - cursor.y;
          const d2 = dx * dx + dy * dy;
          if (d2 <= maxD2) {
            const w = 1 - Math.sqrt(d2) / maxD;
            const a = Math.max(0, CONFIG.cursorLinkOpacity * w);
            ctx.strokeStyle = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(cursor.x, cursor.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let col = baseRGB;
        if (cursor.active) {
          const d = Math.hypot(p.x - cursor.x, p.y - cursor.y);
          if (d <= CONFIG.colorRadius) col = accentRGB;
        }
        ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, 0.9)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw sparks on top
      if (sparks.length) {
        for (let i = 0; i < sparks.length; i++) {
          const s = sparks[i];
          const a = Math.max(0, Math.min(1, s.life / Math.max(0.0001, s.maxLife)));
          ctx.fillStyle = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${0.25 + 0.55 * a})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.2 + 1.2 * a, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function tick() {
      if (!running) return;
      const now = performance.now();
      let dt = (now - lastTime) / 1000; // seconds
      lastTime = now;
      dt = Math.min(dt, CONFIG.maxFrameDelta);
      step(dt);
      draw();
      frameId = requestAnimationFrame(tick);
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      cursor.x = (e.clientX - rect.left);
      cursor.y = (e.clientY - rect.top);
      cursor.active = true;
    }
    function onMouseLeave() { cursor.active = false; }

    function onMouseDown(e) {
      mouseDown = true;
      onMouseMove(e);
    }

    function onMouseUp(e) {
      mouseDown = false;
      const rect = canvas.getBoundingClientRect();
      const px = (e.clientX - rect.left);
      const py = (e.clientY - rect.top);
      triggerClickAt(px, py);
    }

    // Pointer events (better cross‑browser, includes touch/pen)
    function onPointerDown(e) {
      mouseDown = true;
      const rect = canvas.getBoundingClientRect();
      cursor.x = (e.clientX - rect.left);
      cursor.y = (e.clientY - rect.top);
      cursor.active = true;
    }
    function onPointerUp(e) {
      mouseDown = false;
      const rect = canvas.getBoundingClientRect();
      const px = (e.clientX - rect.left);
      const py = (e.clientY - rect.top);
      triggerClickAt(px, py);
    }
    function onPointerCancel() { mouseDown = false; }

    function onVisibility() {
      const hidden = document.hidden || !isFxOn();
      running = !hidden;
      if (running && !frameId) { lastTime = performance.now(); frameId = requestAnimationFrame(tick); }
      if (!running && frameId) { cancelAnimationFrame(frameId); frameId = 0; }
    }

    function triggerClickAt(px, py) {
      // Update cursor position for immediate visual feedback
      cursor.x = px; cursor.y = py; cursor.active = true;
      lastClickTs = performance.now();

      // Repel particles in radius
      const R = CONFIG.clickRepelRadius;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - px;
        const dy = p.y - py;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist <= R) {
          const k = (1 - dist / R);
          const imp = CONFIG.clickRepelImpulse * k;
          p.vx += (dx / dist) * imp;
          p.vy += (dy / dist) * imp;
        }
      }

      // Spawn sparks burst
      const n = CONFIG.clickSparks | 0;
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = rand(CONFIG.clickSparkSpeedMin, CONFIG.clickSparkSpeedMax);
        const life = rand(CONFIG.clickSparkLifeMin, CONFIG.clickSparkLifeMax);
        sparks.push({ x: px, y: py, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life, maxLife: life });
      }
      if (sparks.length > 600) sparks.length = 600; // cap

      // Add pulse ring
      pulses.push({ x: px, y: py, t: 0 });
      if (pulses.length > 4) pulses.shift();
    }

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const px = (e.clientX - rect.left);
      const py = (e.clientY - rect.top);
      triggerClickAt(px, py);
    }

    // Public API
    return {
      start() {
        if (!attached) {
          resize();
          window.addEventListener('resize', resize);
          window.addEventListener('mousemove', onMouseMove, { passive: true });
          window.addEventListener('mouseleave', onMouseLeave, { passive: true });
          window.addEventListener('mousedown', onMouseDown, { passive: true });
          window.addEventListener('mouseup', onMouseUp, { passive: true });
          window.addEventListener('pointerdown', onPointerDown, { passive: true });
          window.addEventListener('pointerup', onPointerUp, { passive: true });
          window.addEventListener('pointercancel', onPointerCancel, { passive: true });
          document.addEventListener('visibilitychange', onVisibility);
          attached = true;
        }
        running = true;
        if (isFxOn() && !frameId) { lastTime = performance.now(); frameId = requestAnimationFrame(tick); }
      },
      stop() {
        running = false;
        if (frameId) { cancelAnimationFrame(frameId); frameId = 0; }
      }
    };
  }

  window.initBackgroundParticles = function initBackgroundParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const engine = createEngine(canvas);
    window.bgEngine = engine;
    engine.start();
  };
})();

// Build clickable social icons row from SITE.links
function buildSocialIcons() {
  const el = document.getElementById('socialIcons');
  if (!el) return;
  el.innerHTML = '';

  const order = ['github','steam','soundcloud','telegram','instagram','tiktok','discord','telegrambot'];
  for (const type of order) {
    const key = type === 'telegrambot' ? 'telegramBot' : type;
    const raw = (SITE.links[key] || '').trim();
    let href = '';
    switch (type) {
      case 'github': href = normalizeGithub(raw); break;
      case 'steam': href = normalizeSteam(raw); break;
      case 'soundcloud': href = normalizeSoundCloud(raw); break;
      case 'telegram': href = normalizeTelegram(raw); break;
      case 'instagram': href = normalizeInstagram(raw); break;
      case 'tiktok': href = normalizeTikTok(raw); break;
      case 'discord': href = normalizeDiscord(raw); break;
      case 'telegrambot': href = normalizeTelegram(raw); break;
    }
    const labelKey = (
      type === 'telegrambot' ? 'telegramBotLabel' : (type + 'Label')
    );
    const label = t(labelKey);

    const a = document.createElement('a');
    a.className = 'social-icon' + (href ? '' : ' is-disabled');
    a.setAttribute('aria-label', label);
    a.dataset.type = type;
    a.dataset.label = label;
    if (href) a.dataset.href = href;
    // Insert official brand icon inline (currentColor)
    const iconName = (type === 'telegrambot') ? 'telegram' : type; // reuse Telegram icon for bot
    insertBrandIcon(a, iconName);
    if (href) {
      a.href = href;
      a.target = '_blank';
      a.rel = 'me noopener noreferrer';
    } else {
      a.href = '#';
      a.setAttribute('aria-disabled', 'true');
    }
    el.appendChild(a);
  }
  el.classList.toggle('hidden', false);
  // Wire tooltips to all icons
  setupTooltipForIcons(el.querySelectorAll('a.social-icon'));
  // Defer entrance animation to align with glitch effect timeline
  window.socialIconsContainer = el;
  // Prepare icons to be hidden until their scheduled fly-in
  Array.from(el.querySelectorAll('a.social-icon')).forEach(a => {
    a.classList.add('is-flying');
    a.style.opacity = '0';
    a.style.transform = 'translate(0,0)';
  });
}

function createIconSVG(type) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  function path(d) { const p = document.createElementNS(ns, 'path'); p.setAttribute('d', d); return p; }
  function rect(x, y, w, h, rx) { const r = document.createElementNS(ns, 'rect'); r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', w); r.setAttribute('height', h); if (rx != null) r.setAttribute('rx', rx); return r; }
  function polyline(points) { const pl = document.createElementNS(ns, 'polyline'); pl.setAttribute('points', points); return pl; }
  function circle(cx, cy, r) { const c = document.createElementNS(ns, 'circle'); c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', r); return c; }

  switch (type) {
    case 'github': { // simple cat‑like glyph
      svg.appendChild(path('M8 9c0-2.2 1.8-4 4-4s4 1.8 4 4'));
      svg.appendChild(path('M6 10v3c0 3.3 2.7 6 6 6s6-2.7 6-6v-3'));
      svg.appendChild(path('M9 19c0-1.1-.9-2-2-2s-2 .9-2 2'));
      break;
    }
    case 'steam': { // two discs with link arm
      svg.appendChild(circle(8, 14.5, 3));
      svg.appendChild(circle(17.5, 7, 2.5));
      svg.appendChild(path('M10.5 13l5-3.2'));
      break;
    }
    case 'soundcloud': { // cloud + bars
      svg.appendChild(path('M5 15a3 3 0 0 1 3-3 4.5 4.5 0 0 1 8.3-1.7A3 3 0 1 1 17 18H8a3 3 0 0 1-3-3z'));
      svg.appendChild(path('M9 18v-6M11 18v-5M13 18v-4M15 18v-3'));
      break;
    }
    case 'telegram': { // paper plane
      svg.appendChild(polyline('22,3 3,11 10,13 12,20 22,3'));
      break;
    }
    case 'instagram': { // rounded square + lens + dot
      svg.appendChild(rect(4, 4, 16, 16, 4));
      svg.appendChild(circle(12, 12, 4));
      svg.appendChild(circle(17, 7, 1));
      break;
    }
    case 'tiktok': { // musical note motif
      svg.appendChild(path('M14 6v6a3 3 0 1 1-3-3h1'));
      svg.appendChild(path('M14 8c1.6 1.6 3 2.2 5 2.3'));
      break;
    }
    case 'discord': { // stylized mask with eyes
      svg.appendChild(rect(5, 7, 14, 10, 3));
      svg.appendChild(path('M8 7c2-1.6 6-1.6 8 0'));
      svg.appendChild(circle(10, 12, 1.2));
      svg.appendChild(circle(14, 12, 1.2));
      break;
    }
    case 'telegrambot': { // robot head
      svg.appendChild(rect(6, 7, 12, 10, 3));
      svg.appendChild(circle(10, 12, 1.2));
      svg.appendChild(circle(14, 12, 1.2));
      svg.appendChild(path('M12 7V5M9 5h6'));
      break;
    }
    default: {
      svg.appendChild(circle(12, 12, 5));
    }
  }
  return svg;
}

// Show a descriptive note for the Telegram Bot when configured
function updateBotNote() {
  const el = document.getElementById('botNote');
  if (!el) return;
  const hasBot = !!(SITE.links.telegramBot && SITE.links.telegramBot.trim());
  if (hasBot) {
    el.textContent = t('botNote');
    el.classList.remove('hidden');
  } else {
    el.classList.add('hidden');
    el.textContent = '';
  }
}

// Fetch and inline official brand SVG, recolored to currentColor
function insertBrandIcon(container, name) {
  // Prefer embedded vector data (works offline and via file://)
  if (BRAND_ICONS[name]) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', BRAND_ICONS[name].viewBox);
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const paths = BRAND_ICONS[name].paths;
    for (let i = 0; i < paths.length; i++) {
      const p = document.createElementNS(ns, 'path');
      p.setAttribute('d', paths[i]);
      p.setAttribute('fill', 'currentColor');
      svg.appendChild(p);
    }
    container.appendChild(svg);
    return;
  }
  // Fallback: fetch from assets (works when served over HTTP)
  const url = `assets/icons/${name}.svg`;
  fetch(url)
    .then(r => r.text())
    .then(txt => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(txt, 'image/svg+xml');
      let svg = doc.querySelector('svg');
      if (!svg) throw new Error('No SVG');
      svg.setAttribute('width', '20');
      svg.setAttribute('height', '20');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      // Force currentColor on all paths
      svg.querySelectorAll('*').forEach(el => {
        if (el.tagName.toLowerCase() === 'path') el.setAttribute('fill', 'currentColor');
      });
      const title = svg.querySelector('title'); if (title) title.remove();
      container.appendChild(svg);
    })
    .catch(() => {
      // Last resort placeholder (should rarely happen)
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', '20');
      svg.setAttribute('height', '20');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', '12'); c.setAttribute('cy', '12'); c.setAttribute('r', '8');
      c.setAttribute('fill', 'currentColor');
      svg.appendChild(c);
      container.appendChild(svg);
    });
}

// Official brand icon paths (from Simple Icons); colored via currentColor
const BRAND_ICONS = {
  github: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
    ]
  },
  steam: {
    viewBox: '0 0 24 24',
    paths: [
      'M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z'
    ]
  },
  soundcloud: {
    viewBox: '0 0 24 24',
    paths: [
      'M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373Z',
      'M10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0Z',
      'M9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Z',
      'M7.409 9.191c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Z',
      'M5.762 9.961a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Z',
      'M4.092 11.73c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Z',
      'M2.437 11.457c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Z',
      'M.769 12.368c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z'
    ]
  },
  telegram: {
    viewBox: '0 0 24 24',
    paths: [
      'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'
    ]
  },
  instagram: {
    viewBox: '0 0 24 24',
    paths: [
      'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077'
    ]
  },
  tiktok: {
    viewBox: '0 0 24 24',
    paths: [
      'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'
    ]
  },
  discord: {
    viewBox: '0 0 24 24',
    paths: [
      'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z'
    ]
  }
};

// ===============================
// Glitch intro reveal
// ===============================
function runGlitchIntro() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (document.body.dataset.glitched === '1') return;
  document.body.dataset.glitched = '1';
  const total = glitchAllText(document.body) || 1600;
  try { startIconsFlyInAcross(total); } catch (_) {}
}

function glitchReveal(el, { duration = 800, stagger = 12, jitter = true } = {}) {
  const finalText = el.textContent;
  el.style.whiteSpace = 'pre-wrap';
  // Expose original text for pseudo-slice overlays
  try { el.setAttribute('data-g', finalText); } catch (_) {}
  // Wrap by words to prevent mid-word line breaks
  el.textContent = '';
  const spans = [];
  const tokens = finalText.split(/(\s+)/); // keep whitespace tokens
  tokens.forEach(tok => {
    if (tok === '') return;
    if (/^\s+$/.test(tok)) {
      // preserve spaces/newlines as-is for natural wrapping
      el.appendChild(document.createTextNode(tok));
    } else {
      const wordWrap = document.createElement('span');
      wordWrap.className = 'glitch-wordwrap';
      for (const ch of tok) {
        const s = document.createElement('span');
        s.className = 'glitch-char';
        s.textContent = '';
        wordWrap.appendChild(s);
        spans.push(s);
      }
      el.appendChild(wordWrap);
    }
  });
  // Final characters mapped only to non-whitespace positions
  const finalChars = (finalText.match(/[^\s]/g) || []);

  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+/<>{}[]';
  const start = performance.now();
  // activate slices overlay
  el.classList.add('glitch-active');
  spans.forEach((s, i) => {
    const startDelay = i * stagger + Math.random() * 30;
    const settleAt = startDelay + duration + Math.random() * 120;
    const leadMs = 140; // show color overlay slightly before settling
    let settled = false;

    function tick(now) {
      const t = now - start;
      if (t < startDelay) { requestAnimationFrame(tick); return; }
      if (!settled && t < settleAt) {
        // scramble phase
        const randomChar = ABC[(Math.random() * ABC.length) | 0];
        s.textContent = s.textContent === ' ' ? ' ' : randomChar;
        if (jitter && Math.random() < 0.35) s.classList.add('glitch-fx');
        else s.classList.remove('glitch-fx');
        // Lead colored overlay ahead of final white letter
        if (t >= settleAt - leadMs) {
          s.dataset.ch = finalChars[i] || '';
          s.classList.add('glitch-lead');
        } else {
          s.classList.remove('glitch-lead');
        }
        requestAnimationFrame(tick);
      } else {
        // settle to final char
        s.classList.remove('glitch-fx');
        s.classList.remove('glitch-lead');
        s.textContent = finalChars[i] || '';
        settled = true;
      }
    }
    requestAnimationFrame(tick);
  });
  // Remove slices after reveal finishes
  const total = duration + stagger * spans.length + 200;
  setTimeout(() => el.classList.remove('glitch-active'), total);
}

function glitchAllText(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p = node.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      if (p.closest('script,style,noscript,svg,canvas')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const targets = [];
  while (walker.nextNode()) targets.push(walker.currentNode);
  let maxFinish = 0;
  targets.forEach((textNode, idx) => {
    const text = textNode.nodeValue;
    const span = document.createElement('span');
    span.className = 'glitch-word';
    span.dataset.g = text;
    span.textContent = text;
    textNode.parentNode.replaceChild(span, textNode);
    // Stagger blocks a little across the page
    const delay = Math.min(1200, idx * 6);
    setTimeout(() => glitchReveal(span, { duration: 650, stagger: 10, jitter: true }), delay);
    // Roughly predict finish time for this block
    const letters = (text.replace(/\s+/g, '').length);
    const estimate = letters * 10 + 650 + 150; // i*stagger + base duration + jitter
    maxFinish = Math.max(maxFinish, delay + estimate);
  });
  return maxFinish;
}

// ===============================
// Calendar + Clock (digital + analog)
// ===============================
function initCalendarAndClock() {
  buildCalendarSkeleton();
  setupCalendar();
  startDigitalClock();
  startAnalogClock();
}

function buildCalendarSkeleton() {
  const week = document.getElementById('calWeek');
  if (!week) return;
  week.innerHTML = '';
  const days = getWeekdayShortNames();
  for (let i = 0; i < 7; i++) {
    const d = document.createElement('div');
    d.className = 'cal-cell cal-head';
    d.textContent = days[i];
    week.appendChild(d);
  }
}

function getWeekdayShortNames() {
  const lang = (typeof currentLang !== 'undefined' ? currentLang : 'en');
  const base = [];
  const fmt = new Intl.DateTimeFormat(lang, { weekday: 'short' });
  // Start from Monday
  const monday = 1;
  for (let i = 0; i < 7; i++) {
    const day = (monday + i) % 7; // 0=Sunday
    // 2023-01-01 was Sunday; offset by day
    const date = new Date(Date.UTC(2023, 0, 1 + ((day - 0 + 7) % 7)));
    base.push(fmt.format(date).replace('.', ''));
  }
  return base;
}

let calCursor = new Date();
function setupCalendar() {
  const prev = document.getElementById('calPrev');
  const next = document.getElementById('calNext');
  if (prev) prev.addEventListener('click', () => { calCursor.setMonth(calCursor.getMonth() - 1); renderCalendar(); });
  if (next) next.addEventListener('click', () => { calCursor.setMonth(calCursor.getMonth() + 1); renderCalendar(); });
  renderCalendar();
}

function monthTitle(d) {
  const fmt = new Intl.DateTimeFormat((typeof currentLang !== 'undefined' ? currentLang : 'en'), { month: 'long', year: 'numeric' });
  let s = fmt.format(d);
  // Capitalize first letter (some locales give lowercase)
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderCalendar() {
  const title = document.getElementById('calTitle');
  const grid = document.getElementById('calGrid');
  if (!title || !grid) return;
  title.textContent = monthTitle(calCursor);

  grid.innerHTML = '';
  const y = calCursor.getFullYear();
  const m = calCursor.getMonth();
  const first = new Date(y, m, 1);
  const startDay = (first.getDay() + 6) % 7; // make Monday=0
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();
  const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;
  const today = new Date();
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cal-cell';
    let dayNum, out = false;
    if (i < startDay) { dayNum = prevDays - startDay + i + 1; out = true; }
    else if (i >= startDay + daysInMonth) { dayNum = i - (startDay + daysInMonth) + 1; out = true; }
    else { dayNum = i - startDay + 1; }
    cell.textContent = String(dayNum);
    if (out) cell.classList.add('is-out');
    const isToday = (!out && today.getFullYear() === y && today.getMonth() === m && today.getDate() === dayNum);
    if (isToday) cell.classList.add('is-today');
    grid.appendChild(cell);
  }
}

function startDigitalClock() {
  const el = document.getElementById('timeDigital');
  if (!el) return;
  function pad(n, len = 2) { return n.toString().padStart(len, '0'); }
  function tick() {
    const d = new Date();
    const t = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(),3)}`;
    el.textContent = t;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function startAnalogClock() {
  const c = document.getElementById('timeAnalog');
  if (!c) return;
  const ctx = c.getContext('2d');
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  function resize() {
    const css = getComputedStyle(c);
    const sizeCss = parseFloat(css.width) || 100;
    const size = Math.round(sizeCss);
    c.width = size * dpr; c.height = size * dpr; c.style.width = `${size}px`; c.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);
  function draw() {
    const w = c.width / dpr, h = c.height / dpr;
    const cx = w / 2, cy = h / 2; const R = Math.min(cx, cy) - 6;
    ctx.clearRect(0,0,w,h);
    // Face
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--surface').trim() || '#141a22';
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#1f2a37';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    // Ticks
    ctx.save();
    for (let i=0;i<60;i++){
      const a = i * Math.PI/30; const r1 = R-6; const r2 = (i%5===0)? r1-6 : r1-3;
      const x1 = cx + Math.cos(a)*r1, y1 = cy + Math.sin(a)*r1;
      const x2 = cx + Math.cos(a)*r2, y2 = cy + Math.sin(a)*r2;
      ctx.strokeStyle = 'rgba(230,233,239,0.7)'; ctx.lineWidth = (i%5===0)? 1.5: 1;
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    }
    ctx.restore();
    const d = new Date();
    const ms = d.getMilliseconds();
    const sec = d.getSeconds() + ms/1000;
    const min = d.getMinutes() + sec/60;
    const hr  = (d.getHours()%12) + min/60;
    // Hands
    function hand(angle, len, width, color){
      const a = angle - Math.PI/2; ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(a)*len, cy+Math.sin(a)*len); ctx.stroke();
    }
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#0f62fe';
    hand(hr * Math.PI/6, R*0.5, 3, 'rgba(230,233,239,0.9)');
    hand(min * Math.PI/30, R*0.72, 2, 'rgba(230,233,239,0.85)');
    hand(sec * Math.PI/30, R*0.78, 1.5, accent);
    // Center dot
    ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(cx,cy,2.5,0,Math.PI*2); ctx.fill();
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

// ===== Social icons tooltip =====
let tooltipEl;
function initSocialTooltip() {
  ensureTooltip();
  window.addEventListener('scroll', forceHideTooltip, { passive: true });
  window.addEventListener('resize', forceHideTooltip, { passive: true });
}

function ensureTooltip() {
  if (tooltipEl) return;
  tooltipEl = document.createElement('div');
  tooltipEl.id = 'socialTooltip';
  tooltipEl.className = 'tooltip';
  tooltipEl.innerHTML = `
    <div class="tooltip-row">
      <span class="tooltip-icon" id="ttIcon"></span>
      <span class="tooltip-label" id="ttLabel"></span>
    </div>
    <div class="tooltip-link"><a id="ttLink" href="#" target="_blank" rel="noopener noreferrer"></a></div>
    <div class="bot-note hidden" id="ttBotNote"></div>
  `;
  document.body.appendChild(tooltipEl);
  // Keep tooltip visible while hovering it
  tooltipEl.addEventListener('mouseenter', () => {
    hoveringTooltip = true;
    clearTimeout(hideTimer);
  });
  tooltipEl.addEventListener('mouseleave', () => {
    hoveringTooltip = false;
    scheduleHideTooltip();
  });
}

function setupTooltipForIcons(icons) {
  ensureTooltip();
  icons.forEach((a) => {
    if (a.classList.contains('is-disabled')) return;
    a.addEventListener('mouseenter', () => { hoveringIcon = true; showTooltipFor(a); });
    a.addEventListener('mouseleave', () => { hoveringIcon = false; scheduleHideTooltip(); });
    a.addEventListener('focus', () => { hoveringIcon = true; showTooltipFor(a); });
    a.addEventListener('blur', () => { hoveringIcon = false; scheduleHideTooltip(); });
  });
}

function showTooltipFor(a) {
  ensureTooltip();
  const label = a.dataset.label || a.getAttribute('aria-label') || '';
  const href = a.dataset.href || a.href || '';
  const type = a.dataset.type || '';

  // Fill content
  const iconHost = tooltipEl.querySelector('#ttIcon');
  iconHost.innerHTML = '';
  const iconName = (type === 'telegrambot') ? 'telegram' : type;
  insertBrandIcon(iconHost, iconName);
  tooltipEl.querySelector('#ttLabel').textContent = label;
  const linkEl = tooltipEl.querySelector('#ttLink');
  linkEl.href = href;
  linkEl.textContent = href.replace(/^https?:\/\//, '');

  // Bot note if Telegram Bot
  const bot = tooltipEl.querySelector('#ttBotNote');
  if (type === 'telegrambot') {
    bot.textContent = t('botNote');
    bot.classList.remove('hidden');
  } else {
    bot.textContent = '';
    bot.classList.add('hidden');
  }

  // Position above the icon
  tooltipEl.classList.add('is-visible');
  tooltipEl.style.top = '-9999px';
  tooltipEl.style.left = '-9999px';
  const rect = a.getBoundingClientRect();
  const ttRect = tooltipEl.getBoundingClientRect();
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const spacing = 10;
  let top = Math.max(8, rect.top - ttRect.height - spacing);
  let left = rect.left + rect.width / 2 - ttRect.width / 2;
  left = Math.max(8, Math.min(left, vw - ttRect.width - 8));
  tooltipEl.style.top = `${Math.round(top)}px`;
  tooltipEl.style.left = `${Math.round(left)}px`;
  const anchorCenter = rect.left + rect.width / 2;
  const arrowLeft = Math.max(10, Math.min(ttRect.width - 10, anchorCenter - left));
  tooltipEl.style.setProperty('--arrow-left', `${Math.round(arrowLeft)}px`);
}

let hideTimer, hoveringIcon = false, hoveringTooltip = false;
function scheduleHideTooltip() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    // Keep visible if either icon or tooltip under cursor, or the icon has focus
    const focusOnIcon = document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('social-icon');
    if (!hoveringIcon && !hoveringTooltip && !focusOnIcon) {
      tooltipEl && tooltipEl.classList.remove('is-visible');
    }
  }, 80);
}

function forceHideTooltip() {
  clearTimeout(hideTimer);
  hoveringIcon = false; hoveringTooltip = false;
  tooltipEl && tooltipEl.classList.remove('is-visible');
}

// Entrance fly-in for social icons
function flyInSocialIcons(container) {
  const icons = Array.from(container.querySelectorAll('a.social-icon'));
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  icons.forEach((a, i) => {
    // Skip disabled
    if (a.classList.contains('is-disabled')) return;
    const dir = ['left','right','top','bottom'][i % 4];
    const rand = (min, max) => min + Math.random() * (max - min);
    let dx = 0, dy = 0;
    switch (dir) {
      case 'left': dx = - (vw * rand(0.6, 1) + rand(40, 200)); dy = rand(-120, 120); break;
      case 'right': dx = (vw * rand(0.6, 1) + rand(40, 200)); dy = rand(-120, 120); break;
      case 'top': dy = - (vh * rand(0.6, 1) + rand(40, 200)); dx = rand(-100, 100); break;
      case 'bottom': dy = (vh * rand(0.6, 1) + rand(40, 200)); dx = rand(-100, 100); break;
    }
    const rot = rand(-25, 25);
    a.classList.add('is-flying');
    a.style.willChange = 'transform, opacity';
    a.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
    a.style.opacity = '0';
    // Staggered start
    const delay = i * 90 + rand(0, 60);
    setTimeout(() => {
      // Animate to final position
      const dur = 680 + i * 30 + rand(0, 120);
      a.style.transition = `transform ${dur}ms cubic-bezier(.2,.7,.1,1), opacity ${dur}ms ease-out`;
      a.style.transform = 'translate(0,0) rotate(0deg)';
      a.style.opacity = '1';
      const cleanup = () => {
        a.classList.remove('is-flying');
        a.style.willChange = '';
        a.style.transition = '';
        a.removeEventListener('transitionend', cleanup);
      };
      a.addEventListener('transitionend', cleanup);
    }, delay);
  });
}

// Distribute icon fly-in across a total duration (ms) to match glitch timeline
function startIconsFlyInAcross(totalMs) {
  const el = window.socialIconsContainer || document.getElementById('socialIcons');
  if (!el || el.dataset.animated === '1') return;
  const icons = Array.from(el.querySelectorAll('a.social-icon'));
  const n = icons.length || 1;
  const baseDelay = 120; // initial small delay after start
  const usable = Math.max(300, totalMs - baseDelay);
  icons.forEach((a, i) => {
    // Spread linearly with tiny jitter
    const jitter = Math.floor(Math.random() * 120);
    const delay = baseDelay + Math.floor((usable * i) / n) + jitter;
    setTimeout(() => {
      // Animate this icon using same motion as flyInSocialIcons
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const dirs = ['left','right','top','bottom'];
      const dir = dirs[i % 4];
      const rand = (min, max) => min + Math.random() * (max - min);
      let dx = 0, dy = 0;
      switch (dir) {
        case 'left': dx = - (vw * rand(0.6, 1) + rand(40, 200)); dy = rand(-120, 120); break;
        case 'right': dx = (vw * rand(0.6, 1) + rand(40, 200)); dy = rand(-120, 120); break;
        case 'top': dy = - (vh * rand(0.6, 1) + rand(40, 200)); dx = rand(-100, 100); break;
        case 'bottom': dy = (vh * rand(0.6, 1) + rand(40, 200)); dx = rand(-100, 100); break;
      }
      const rot = rand(-25, 25);
      a.classList.add('is-flying');
      a.style.willChange = 'transform, opacity';
      a.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
      a.style.opacity = '0';
      const dur = 680 + i * 30 + rand(0, 120);
      a.style.transition = `transform ${dur}ms cubic-bezier(.2,.7,.1,1), opacity ${dur}ms ease-out`;
      // force layout
      void a.offsetWidth;
      a.style.transform = 'translate(0,0) rotate(0deg)';
      a.style.opacity = '1';
      const cleanup = () => {
        a.classList.remove('is-flying');
        a.style.willChange = '';
        a.style.transition = '';
        a.removeEventListener('transitionend', cleanup);
      };
      a.addEventListener('transitionend', cleanup);
    }, delay);
  });
  el.dataset.animated = '1';
}

// ===============================
// Align floating sidebar with hero height/position
// ===============================
let sidebarSyncRAF = 0;
function scheduleSyncSidebar() {
  if (sidebarSyncRAF) return;
  sidebarSyncRAF = requestAnimationFrame(syncSidebarPanel);
}

function syncSidebarPanel() {
  sidebarSyncRAF = 0;
  if ((window.innerWidth || document.documentElement.clientWidth) < 1024) return; // only desktop
  const panels = [document.getElementById('sidebar'), document.getElementById('sidebar-right')].filter(Boolean);
  if (!panels.length) return;
  // Center vertically; let CSS handle max-height. Do not force height.
  panels.forEach(p => {
    p.style.top = '50%';
    p.style.transform = 'translateY(-50%)';
    p.style.height = '';
  });
}

function relocatePanelsMobile() {
  const isMobile = (window.innerWidth || document.documentElement.clientWidth) < 1024;
  const main = document.querySelector('main');
  if (!main) return;
  let stack = document.getElementById('panels-stack');
  if (isMobile) {
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'panels-stack';
      stack.className = 'panels-stack container';
      main.parentNode.insertBefore(stack, main.nextSibling);
    }
    ['sidebar','sidebar-right'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.parentNode !== stack) stack.appendChild(el);
    });
  } else {
    // Keep as-is; fixed positioning makes order irrelevant on desktop
  }
}

function applyFxSetting() {
  try {
    if (window.bgEngine) {
      if (isFxOn()) {
        window.bgEngine.start();
      } else {
        window.bgEngine.stop();
      }
    }
  } catch (_) {}
  // Clear previous tilt, then (re)enable if FX on
  try { clearTilt(); } catch (_) {}
  try { if (isFxOn()) initTilt(); } catch (_) {}
}

function clearTilt() {
  const els = document.querySelectorAll('.tilt-target');
  els.forEach(el => {
    try { if (el._tiltCleanup) el._tiltCleanup(); } catch (_) {}
    el.style.transform = '';
    el.style.boxShadow = '';
    el.classList.remove('tilt-target');
  });
}

// ===============================
// 3D tilt effect (panels + social icons follow cursor)
// ===============================
function initTilt() {
  if (!isFxOn()) return;
  const left = document.getElementById('sidebar');
  const right = document.getElementById('sidebar-right');
  if (((window.innerWidth || document.documentElement.clientWidth) >= 1024) && left) addTilt(left, { max: 8, shadow: true, base: 'translateY(-50%)', global: true, range: 600, scale: 1.02 });
  if (((window.innerWidth || document.documentElement.clientWidth) >= 1024) && right) addTilt(right, { max: 8, shadow: true, base: 'translateY(-50%)', global: true, range: 600, scale: 1.02 });
  // Icons tilt bound in buildSocialIcons via setupTiltForIcons
  const icons = document.querySelectorAll('a.social-icon');
  setupTiltForIcons(icons);
}

function setupTiltForIcons(icons) {
  if (!isFxOn()) return;
  Array.from(icons || []).forEach(el => addTilt(el, { max: 8, scale: 1.06, shadow: true, global: true, range: 500 }));
}

function addTilt(target, opts = {}) {
  const max = opts.max || 10; // deg
  const scale = opts.scale || 1;
  const withShadow = !!opts.shadow;
  const base = opts.base || '';
  const global = !!opts.global;
  const range = typeof opts.range === 'number' ? Math.max(50, opts.range) : 400;
  target.classList.add('tilt-target');
  if (target._tiltCleanup) { try { target._tiltCleanup(); } catch (_) {} }
  let raf = 0, rect = null, hover = false;
  function onEnter() { rect = target.getBoundingClientRect(); hover = true; }
  function onLeave() { hover = false; apply(0,0); }
  function onMove(e) {
    if (!rect) rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = (x / rect.width) - 0.5; // -0.5..0.5
    const dy = (y / rect.height) - 0.5;
    const rx = (-dy * max);
    const ry = (dx * max);
    schedule(rx, ry);
  }
  function onWindowMove(e) {
    rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(-range, Math.min(range, e.clientX - cx));
    const dy = Math.max(-range, Math.min(range, e.clientY - cy));
    const rx = (-dy / range) * max;
    const ry = (dx / range) * max;
    schedule(rx, ry);
  }
  function schedule(rx, ry) {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => apply(rx, ry));
  }
  function apply(rx, ry) {
    raf = 0;
    const t = `${base} perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${hover ? scale : 1})`;
    target.style.transform = t;
    if (withShadow) {
      const ax = Math.abs(ry) / max; // 0..1
      const ay = Math.abs(rx) / max;
      const spread = 24 + 16 * (ax + ay) / 2;
      target.style.boxShadow = `0 10px ${Math.round(spread)}px rgba(0,0,0,0.28)`;
    }
  }
  if (global) {
    hover = true; // always scaled slightly in global mode
    window.addEventListener('mousemove', onWindowMove, { passive: true });
    target._tiltCleanup = () => { window.removeEventListener('mousemove', onWindowMove); apply(0,0); };
  } else {
    target.addEventListener('mouseenter', onEnter);
    target.addEventListener('mousemove', onMove);
    target.addEventListener('mouseleave', onLeave);
    target._tiltCleanup = () => {
      target.removeEventListener('mouseenter', onEnter);
      target.removeEventListener('mousemove', onMove);
      target.removeEventListener('mouseleave', onLeave);
      apply(0,0);
    };
  }
}
