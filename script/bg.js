/* Hero background — animated gold flow-field of drifting particles on dark.
   Pauses offscreen; renders a single static frame on reduced-motion. */
(function () {
  var canvas = document.getElementById("hero-bg");
  if (!canvas) return;
  var host = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dpr = Math.min(2, window.devicePixelRatio || 1);

  var W = 0, H = 0, parts = [], raf = null, t = 0;

  function resize() {
    var r = host.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.max(40, Math.min(150, Math.round(W * H / 9000)));
    parts = [];
    for (var i = 0; i < count; i++) parts.push(spawn(true));
  }
  function spawn(seed) {
    return {
      x: seed ? Math.random() * W : -10,
      y: Math.random() * H,
      sp: 0.25 + Math.random() * 0.65,
      w: 0.6 + Math.random() * 1.7,
      life: Math.random()
    };
  }
  // Cheap pseudo-noise vector field
  function field(x, y) {
    return Math.sin(x * 0.0016 + t * 0.00030) +
           Math.cos(y * 0.0018 - t * 0.00026) +
           Math.sin((x + y) * 0.0011 + t * 0.00020);
  }
  function frame() {
    ctx.fillStyle = "rgba(26,23,19,0.16)"; // matches --bg, builds soft trails
    ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      var a = field(p.x, p.y) * Math.PI;
      p.x += Math.cos(a) * p.sp * 1.5;
      p.y += Math.sin(a) * p.sp * 1.5;
      p.life -= 0.0026;
      var op = 0.08 + 0.18 * Math.max(0, Math.min(1, p.life));
      ctx.fillStyle = "rgba(224,162,58," + op.toFixed(3) + ")";
      ctx.fillRect(p.x, p.y, p.w, p.w);
      if (p.x < -12 || p.x > W + 12 || p.y < -12 || p.y > H + 12 || p.life <= 0) {
        parts[i] = spawn(true);
      }
    }
    t += 16;
    raf = requestAnimationFrame(frame);
  }
  function staticFrame() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      ctx.fillStyle = "rgba(224,162,58,0.16)";
      ctx.fillRect(p.x, p.y, p.w + 0.5, p.w + 0.5);
    }
  }

  resize();
  window.addEventListener("resize", function () { resize(); if (reduce) staticFrame(); }, { passive: true });

  if (reduce) { staticFrame(); return; }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { if (!raf) raf = requestAnimationFrame(frame); }
        else if (raf) { cancelAnimationFrame(raf); raf = null; }
      });
    }, { threshold: 0 }).observe(canvas);
  }
  raf = requestAnimationFrame(frame);
})();
