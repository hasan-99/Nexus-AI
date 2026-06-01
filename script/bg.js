/* Site-wide LIVING background — a fixed canvas behind every page.
   Layers: drifting aurora light, a glowing flow-field particle swarm,
   a constellation network that links near neighbours, and a cursor
   force-field the swarm reacts to. Theme-aware (light / dark), pauses
   when the tab is hidden, and degrades to a calm static frame under
   prefers-reduced-motion. Auto-injects its own canvas. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var canvas = document.getElementById("site-bg");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "site-bg";
    canvas.className = "site-bg";
    canvas.setAttribute("aria-hidden", "true");
    if (document.body.firstChild) document.body.insertBefore(canvas, document.body.firstChild);
    else document.body.appendChild(canvas);
  }
  var ctx = canvas.getContext("2d");
  var dpr = Math.min(2, window.devicePixelRatio || 1);
  var W = 0, H = 0, parts = [], raf = null, t = 0;

  /* ---- Theme palettes ---------------------------------------------------- */
  // Three brand-adjacent hues: sky, cyan, indigo. Aurora is the soft wash;
  // trail is the per-frame fade (lower alpha => longer light trails).
  var THEMES = {
    light: {
      trail: "rgba(247,249,252,0.16)",
      comp: "source-over",
      dots: [[14,165,233], [34,211,238], [99,102,241]],
      line: "20,140,210",
      lineMax: 0.16,
      dotMax: 0.42,
      aurora: [
        { c: "20,150,230", a: 0.05 },
        { c: "56,200,235", a: 0.045 },
        { c: "120,110,245", a: 0.04 }
      ],
      auroraR: 0.55
    },
    dark: {
      trail: "rgba(20,24,33,0.20)",
      comp: "lighter",
      dots: [[56,189,248], [34,211,238], [129,140,248]],
      line: "90,190,250",
      lineMax: 0.22,
      dotMax: 0.55,
      aurora: [
        { c: "30,120,210", a: 0.10 },
        { c: "20,180,210", a: 0.085 },
        { c: "110,100,240", a: 0.085 }
      ],
      auroraR: 0.6
    }
  };
  var P = THEMES.light;
  function readTheme() {
    P = document.documentElement.getAttribute("data-theme") === "dark" ? THEMES.dark : THEMES.light;
    sprites = P.dots.map(makeSprite);
  }

  /* ---- Glow sprites (one soft radial dot per palette colour) -------------- */
  var SPR = 64, sprites = [];
  function makeSprite(rgb) {
    var c = document.createElement("canvas");
    c.width = c.height = SPR;
    var g = c.getContext("2d");
    var grad = g.createRadialGradient(SPR / 2, SPR / 2, 0, SPR / 2, SPR / 2, SPR / 2);
    grad.addColorStop(0, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ",1)");
    grad.addColorStop(0.35, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ",0.5)");
    grad.addColorStop(1, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ",0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, SPR, SPR);
    return c;
  }

  /* ---- Pointer force-field ----------------------------------------------- */
  var mouse = { x: -9999, y: -9999, active: false };
  window.addEventListener("pointermove", function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  }, { passive: true });
  window.addEventListener("pointerleave", function () { mouse.active = false; });
  window.addEventListener("blur", function () { mouse.active = false; });

  /* ---- Particles --------------------------------------------------------- */
  function spawn() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      sp: 0.3 + Math.random() * 0.8,
      r: 0.8 + Math.random() * 2.2,
      ci: (Math.random() * 3) | 0,
      life: Math.random(),
      vx: 0, vy: 0
    };
  }
  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.max(46, Math.min(120, Math.round(W * H / 13000)));
    parts = [];
    for (var i = 0; i < count; i++) parts.push(spawn());
  }
  function field(x, y) {
    return Math.sin(x * 0.0016 + t * 0.00032) +
           Math.cos(y * 0.0018 - t * 0.00027) +
           Math.sin((x + y) * 0.0012 + t * 0.00021);
  }

  /* ---- Aurora wash ------------------------------------------------------- */
  function drawAurora() {
    var R = Math.max(W, H) * P.auroraR;
    for (var i = 0; i < P.aurora.length; i++) {
      var b = P.aurora[i];
      var ph = t * 0.00009 + i * 2.1;
      var cx = W * (0.5 + 0.42 * Math.sin(ph * (1 + i * 0.3)));
      var cy = H * (0.5 + 0.42 * Math.cos(ph * (1.2 - i * 0.2)));
      var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      grad.addColorStop(0, "rgba(" + b.c + "," + b.a + ")");
      grad.addColorStop(1, "rgba(" + b.c + ",0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }
  }

  /* ---- Main loop --------------------------------------------------------- */
  function frame() {
    // fade previous frame (leaves light trails)
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = P.trail;
    ctx.fillRect(0, 0, W, H);

    ctx.globalCompositeOperation = P.comp;
    drawAurora();

    var i, p;
    // update
    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      var a = field(p.x, p.y) * Math.PI;
      p.vx = p.vx * 0.86 + Math.cos(a) * p.sp * 0.22;
      p.vy = p.vy * 0.86 + Math.sin(a) * p.sp * 0.22;

      // cursor swirl + pull
      if (mouse.active) {
        var dx = mouse.x - p.x, dy = mouse.y - p.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 42000) {
          var d = Math.sqrt(d2) || 1, f = (1 - d / 205) * 1.5;
          p.vx += (dx / d) * f * 0.6 - (dy / d) * f * 0.9; // pull + tangential swirl
          p.vy += (dy / d) * f * 0.6 + (dx / d) * f * 0.9;
        }
      }
      p.x += p.vx; p.y += p.vy;
      p.life -= 0.0022;
      if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20 || p.life <= 0) parts[i] = spawn();
    }

    // constellation links (near neighbours)
    ctx.lineWidth = 1;
    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      for (var j = i + 1; j < parts.length; j++) {
        var q = parts[j];
        var ex = p.x - q.x, ey = p.y - q.y;
        var dist = ex * ex + ey * ey;
        if (dist < 13000) {
          var la = P.lineMax * (1 - dist / 13000);
          ctx.strokeStyle = "rgba(" + P.line + "," + la.toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    // glowing dots
    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      var lf = Math.max(0, Math.min(1, p.life));
      var op = (0.14 + P.dotMax * lf);
      var s = p.r * 6;
      ctx.globalAlpha = op;
      ctx.drawImage(sprites[p.ci], p.x - s / 2, p.y - s / 2, s, s);
    }
    ctx.globalAlpha = 1;

    // cursor halo
    if (mouse.active) {
      var hr = 150;
      var hg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, hr);
      hg.addColorStop(0, "rgba(" + P.line + ",0.10)");
      hg.addColorStop(1, "rgba(" + P.line + ",0)");
      ctx.fillStyle = hg;
      ctx.fillRect(mouse.x - hr, mouse.y - hr, hr * 2, hr * 2);
    }

    ctx.globalCompositeOperation = "source-over";
    t += 16;
    raf = requestAnimationFrame(frame);
  }

  function staticFrame() {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, W, H);
    drawAurora();
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i], s = p.r * 6;
      ctx.globalAlpha = 0.3;
      ctx.drawImage(sprites[p.ci], p.x - s / 2, p.y - s / 2, s, s);
    }
    ctx.globalAlpha = 1;
  }
  function start() { if (reduce || raf) return; raf = requestAnimationFrame(frame); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  readTheme();
  resize();
  window.addEventListener("resize", function () { resize(); if (reduce) staticFrame(); }, { passive: true });
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
  window.addEventListener("themechange", function () { readTheme(); if (reduce) staticFrame(); });

  if (reduce) { staticFrame(); return; }
  start();
})();
