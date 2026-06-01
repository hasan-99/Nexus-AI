/* Vaporize text cycle — vanilla canvas port (gold particles on dark).
   Samples rendered text into particles, vaporizes them left-to-right,
   then fades the next phrase back in. Pauses offscreen; static on reduced-motion. */
(function () {
  var wrap = document.getElementById("vapor");
  if (!wrap) return;
  var canvas = wrap.querySelector("canvas");
  if (!canvas) { canvas = document.createElement("canvas"); wrap.appendChild(canvas); }
  var ctx = canvas.getContext("2d", { willReadFrequently: true });
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var TEXTS = (wrap.dataset.texts || "We think.|You grow.").split("|");
  var COLOR = wrap.dataset.color || "224,162,58";
  var dpr = Math.min(2, window.devicePixelRatio || 1);

  var W = 0, H = 0, particles = [], idx = 0;
  var state = "static", prog = 0, fade = 0, bounds = { left: 0, width: 0 };
  var raf = null, last = 0, inView = false;

  function fontPx() { return Math.max(30, Math.min(W * 0.11, 92)); }
  function build() {
    var r = wrap.getBoundingClientRect();
    W = r.width; H = r.height;
    if (!W || !H) return;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
    sample(TEXTS[idx]);
    if (reduce) render(1);
  }
  function sample(text) {
    var fs = fontPx() * dpr;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "900 " + fs + "px 'Archivo Black', system-ui, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "rgb(" + COLOR + ")";
    var cx = canvas.width / 2, cy = canvas.height / 2;
    var m = ctx.measureText(text);
    bounds = { left: cx - m.width / 2, width: m.width };
    ctx.fillText(text, cx, cy);
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    particles = [];
    var step = Math.max(1, Math.round(dpr * 1.7));
    for (var y = 0; y < canvas.height; y += step) {
      for (var x = 0; x < canvas.width; x += step) {
        if (data[(y * canvas.width + x) * 4 + 3] > 45) {
          particles.push({ x: x, y: y, ox: x, oy: y, vx: 0, vy: 0, op: 1, sp: 0 });
        }
      }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function render(op) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var s = dpr;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i], o = op == null ? p.op : op;
      if (o > 0.01) { ctx.fillStyle = "rgba(" + COLOR + "," + o + ")"; ctx.fillRect(p.x, p.y, s, s); }
    }
  }
  function step(dt) {
    if (state === "vaporizing") {
      prog += dt * 55;
      var vx = bounds.left + bounds.width * Math.min(100, prog) / 100;
      var done = true;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (p.ox <= vx) {
          if (p.sp === 0) {
            var ang = Math.random() * Math.PI * 2;
            p.sp = (Math.random() * 1 + 0.5) * 2.2;
            p.vx = Math.cos(ang) * p.sp; p.vy = Math.sin(ang) * p.sp;
          }
          p.x += p.vx * dt * 60; p.y += p.vy * dt * 30;
          p.vx *= 0.97; p.vy *= 0.97;
          p.op = Math.max(0, p.op - dt * 0.9);
          if (p.op > 0.01) done = false;
        } else { done = false; }
      }
      render();
      if (prog >= 100 && done) { idx = (idx + 1) % TEXTS.length; sample(TEXTS[idx]); particles.forEach(function (p) { p.op = 0; }); state = "fadingIn"; fade = 0; }
    } else if (state === "fadingIn") {
      fade += dt * 1.1; render(Math.min(1, fade));
      if (fade >= 1) { state = "waiting"; setTimeout(function () { prog = 0; state = "vaporizing"; }, 1200); }
    } else { render(); }
  }
  function loop(t) {
    var dt = Math.min(0.05, (t - last) / 1000) || 0; last = t;
    if (inView && !reduce) step(dt);
    raf = requestAnimationFrame(loop);
  }

  function init() {
    build();
    window.addEventListener("resize", function () { build(); }, { passive: true });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { inView = e.isIntersecting; });
      }, { threshold: 0.2 }).observe(wrap);
    } else { inView = true; }
    if (!reduce) { last = performance.now(); raf = requestAnimationFrame(loop); }
  }

  init();
  // Re-sample once the display font loads so glyph shapes are correct
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { build(); }); }
})();
