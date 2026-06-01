/* Particle text morph — vanilla canvas port of the steering "particle text
   effect". Particles fly in from random positions and steer into the letters,
   then morph between words. Theme-aware (light/dark), hover scatters the swarm,
   pauses offscreen, static under prefers-reduced-motion. */
(function () {
  var wrap = document.getElementById("vapor");
  if (!wrap) return;
  var canvas = wrap.querySelector("canvas") || wrap.appendChild(document.createElement("canvas"));
  var ctx = canvas.getContext("2d", { willReadFrequently: true });
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var WORDS = (wrap.dataset.texts || "Design.|Build.|Rank.|Grow.").split("|");
  // brand palette — each word picks a slightly different sky/cyan/indigo
  var PALETTE = [[14,165,233],[34,211,238],[99,102,241],[56,189,248],[125,135,245]];
  var dpr = Math.min(2, window.devicePixelRatio || 1);

  var W = 0, H = 0, particles = [], wordIdx = 0, frame = 0, raf = null;
  var inView = false, last = 0;
  var mouse = { x: -9999, y: -9999, active: false };

  function bgFill() {
    // higher alpha clears trails faster, so a settled word reads crisp
    return root.getAttribute("data-theme") === "dark"
      ? "rgba(35,39,50,0.42)" : "rgba(237,241,246,0.5)";
  }

  /* ---- Particle ---------------------------------------------------------- */
  function Particle() {
    this.x = 0; this.y = 0; this.vx = 0; this.vy = 0; this.ax = 0; this.ay = 0;
    this.tx = 0; this.ty = 0;
    this.maxSpeed = Math.random() * 5 + 7;
    this.maxForce = this.maxSpeed * 0.09;
    this.size = 2;
    this.sc = [0,0,0]; this.tc = [0,0,0]; this.cw = 0;
    this.blend = Math.random() * 0.025 + 0.004;
    this.killed = false;
  }
  Particle.prototype.move = function (dt) {
    var dx = this.tx - this.x, dy = this.ty - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    // snap to rest when essentially on target (unless being repelled) -> crisp word
    if (dist < 1.4 && !this.killed && !mouse.active) {
      this.x = this.tx; this.y = this.ty; this.vx = 0; this.vy = 0; this.ax = 0; this.ay = 0;
      return;
    }
    var prox = dist < 45 ? dist / 45 : 1;
    var m = dist || 1;
    var desX = dx / m * this.maxSpeed * prox, desY = dy / m * this.maxSpeed * prox;
    var sx = desX - this.vx, sy = desY - this.vy;
    var sm = Math.sqrt(sx * sx + sy * sy) || 1;
    this.ax += sx / sm * this.maxForce;
    this.ay += sy / sm * this.maxForce;
    // hover repel
    if (mouse.active && !this.killed) {
      var mdx = this.x - mouse.x, mdy = this.y - mouse.y;
      var md2 = mdx * mdx + mdy * mdy;
      if (md2 < 6400) { var md = Math.sqrt(md2) || 1, f = (1 - md / 80) * 2.2;
        this.ax += mdx / md * f; this.ay += mdy / md * f; }
    }
    var k = dt * 60;
    this.vx += this.ax * k; this.vy += this.ay * k;
    this.x += this.vx * k; this.y += this.vy * k;
    this.ax = 0; this.ay = 0;
  };
  Particle.prototype.draw = function () {
    if (this.cw < 1) this.cw = Math.min(this.cw + this.blend, 1);
    var r = Math.round(this.sc[0] + (this.tc[0] - this.sc[0]) * this.cw);
    var g = Math.round(this.sc[1] + (this.tc[1] - this.sc[1]) * this.cw);
    var b = Math.round(this.sc[2] + (this.tc[2] - this.sc[2]) * this.cw);
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  };
  Particle.prototype.kill = function () {
    if (this.killed) return;
    var ang = Math.random() * Math.PI * 2, mag = (W + H) / 2;
    this.tx = W / 2 + Math.cos(ang) * mag; this.ty = H / 2 + Math.sin(ang) * mag;
    this.sc = [this.sc[0] + (this.tc[0]-this.sc[0])*this.cw, this.sc[1] + (this.tc[1]-this.sc[1])*this.cw, this.sc[2] + (this.tc[2]-this.sc[2])*this.cw];
    this.tc = root.getAttribute("data-theme") === "dark" ? [35,39,50] : [237,241,246];
    this.cw = 0; this.killed = true;
  };

  function rnd(mag) {
    var ang = Math.random() * Math.PI * 2;
    return { x: W / 2 + Math.cos(ang) * mag, y: H / 2 + Math.sin(ang) * mag };
  }

  /* ---- Sample a word into particle targets ------------------------------- */
  function nextWord(word) {
    var off = document.createElement("canvas");
    off.width = Math.max(1, Math.floor(W)); off.height = Math.max(1, Math.floor(H));
    var octx = off.getContext("2d");
    var fs = Math.min(W * 0.16, H * 0.62);
    octx.fillStyle = "#fff";
    octx.font = "900 " + fs + "px 'Archivo Black', system-ui, sans-serif";
    octx.textAlign = "center"; octx.textBaseline = "middle";
    octx.fillText(word, off.width / 2, off.height / 2);
    var px = octx.getImageData(0, 0, off.width, off.height).data;

    var color = PALETTE[wordIdx % PALETTE.length];
    var step = 4, coords = [];
    for (var y = 0; y < off.height; y += step)
      for (var x = 0; x < off.width; x += step)
        if (px[(y * off.width + x) * 4 + 3] > 90) coords.push([x, y]);
    // shuffle for fluid assignment
    for (var i = coords.length - 1; i > 0; i--) { var j = (Math.random() * (i + 1)) | 0; var t = coords[i]; coords[i] = coords[j]; coords[j] = t; }

    var pi = 0;
    for (var c = 0; c < coords.length; c++) {
      var p;
      if (pi < particles.length) { p = particles[pi]; p.killed = false; pi++; }
      else { p = new Particle(); var s = rnd((W + H) / 2); p.x = s.x; p.y = s.y; particles.push(p); }
      p.sc = [p.sc[0] + (p.tc[0]-p.sc[0])*p.cw, p.sc[1] + (p.tc[1]-p.sc[1])*p.cw, p.sc[2] + (p.tc[2]-p.sc[2])*p.cw];
      p.tc = color; p.cw = 0;
      p.tx = coords[c][0]; p.ty = coords[c][1];
    }
    for (var k = pi; k < particles.length; k++) particles[k].kill();
  }

  /* ---- Loop -------------------------------------------------------------- */
  function animate(t) {
    raf = requestAnimationFrame(animate);
    var dt = Math.min(0.05, (t - last) / 1000) || 0; last = t;
    if (!inView || reduce) return;
    ctx.fillStyle = bgFill();
    ctx.fillRect(0, 0, W, H);
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.move(dt); p.draw();
      if (p.killed && (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20)) particles.splice(i, 1);
    }
    frame++;
    if (frame % 300 === 0) { wordIdx = (wordIdx + 1) % WORDS.length; nextWord(WORDS[wordIdx]); }
  }

  function staticRender() {
    ctx.clearRect(0, 0, W, H);
    var color = PALETTE[0];
    ctx.fillStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
    for (var i = 0; i < particles.length; i++) { var p = particles[i]; ctx.fillRect(p.tx, p.ty, 2, 2); }
  }

  function build() {
    var r = wrap.getBoundingClientRect();
    W = r.width; H = r.height;
    if (!W || !H) return;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = [];
    nextWord(WORDS[wordIdx]);
    if (reduce) { // settle particles onto targets immediately
      for (var i = 0; i < particles.length; i++) { particles[i].x = particles[i].tx; particles[i].y = particles[i].ty; particles[i].cw = 1; particles[i].sc = particles[i].tc; }
      staticRender();
    }
  }

  // pointer
  wrap.addEventListener("pointermove", function (e) { var r = wrap.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true; }, { passive: true });
  wrap.addEventListener("pointerleave", function () { mouse.active = false; });

  build();
  window.addEventListener("resize", build, { passive: true });
  window.addEventListener("themechange", function () { if (reduce) staticRender(); });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { es.forEach(function (e) { inView = e.isIntersecting; }); }, { threshold: 0.15 }).observe(wrap);
  } else inView = true;
  if (!reduce) { last = performance.now(); raf = requestAnimationFrame(animate); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
})();
