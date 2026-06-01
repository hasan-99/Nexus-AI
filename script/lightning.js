/* Lightning text — vanilla canvas port. Reveals the heading column by column,
   firing lightning bolts and sparks along the glyph strokes. Scoped to its
   container (#lightning), brand sky-blue palette, click to strike. Pauses
   offscreen; renders plain text under prefers-reduced-motion. */
(function () {
  var wrap = document.getElementById("lightning");
  if (!wrap) return;
  var canvas = wrap.querySelector("canvas") || wrap.appendChild(document.createElement("canvas"));
  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COPY = (wrap.dataset.text || "REQUEST A DEMO");
  var dpr = Math.min(2, window.devicePixelRatio || 1);
  var W = 0, H = 0, raf = null, inView = false;
  var thunder = [], particles = [], text = null;

  function Text() {
    var pool = document.createElement("canvas");
    pool.width = W; pool.height = H;
    var b = pool.getContext("2d");
    // fit font to ~82% of width
    var size = Math.min(H * 0.5, 200);
    b.font = "900 " + size + "px 'Archivo Black', system-ui, sans-serif";
    var m = b.measureText(COPY);
    if (m.width > W * 0.82) { size *= (W * 0.82) / m.width; }
    this.size = size;
    b.clearRect(0, 0, W, H);
    b.font = "900 " + size + "px 'Archivo Black', system-ui, sans-serif";
    b.textBaseline = "alphabetic";
    this.bound = b.measureText(COPY);
    this.bound.height = size * 1.32;
    this.x = W * 0.5 - this.bound.width * 0.5;
    this.y = H * 0.5 - this.bound.height * 0.5;
    b.lineWidth = 1.4;
    b.strokeStyle = "rgba(255,255,255,0.96)";
    b.strokeText(COPY, 0, this.bound.height * 0.8);
    this.data = b.getImageData(0, 0, Math.max(1, Math.ceil(this.bound.width)), Math.ceil(this.bound.height));
    this.index = 0;
    this.delay = 2; this.basedelay = 2;
  }
  Text.prototype.update = function () {
    if (this.index >= this.bound.width) { this.index = 0; return; }
    var data = this.data.data, w = this.data.width;
    for (var i = this.index * 4; i < data.length; i += 4 * w) {
      var lit = data[i] + data[i + 1] + data[i + 2] + data[i + 3];
      if (lit > 255 && Math.random() > 0.94) {
        var x = this.x + this.index;
        var y = this.y + (i / w / 4);
        thunder.push(new Thunder(x, y));
        if (Math.random() > 0.45) particles.push(new Particles(x, y));
      }
    }
    if (this.delay-- < 0) { this.index += 1; this.delay += this.basedelay; }
  };
  Text.prototype.render = function () {
    ctx.putImageData(this.data, this.x, this.y, 0, 0, this.index, this.bound.height);
  };

  function Thunder(x, y) {
    this.lifespan = Math.round(Math.random() * 10 + 10); this.maxlife = this.lifespan;
    this.color = "#1d3fb8"; this.glow = "#3f7fff";
    this.x = x; this.y = y; this.width = 2;
    this.direct = Math.random() * Math.PI * 2;
    this.max = Math.round(Math.random() * 8 + 14);
    this.segments = [];
    for (var i = 0; i < this.max; i++) this.segments.push({ direct: this.direct + (Math.PI * Math.random() * 0.2 - 0.1), length: Math.random() * 16 + 18, change: Math.random() * 0.04 - 0.02 });
  }
  Thunder.prototype.update = function (i, arr) {
    for (var s = 0; s < this.segments.length; s++) { var g = this.segments[s]; g.direct += g.change; if (Math.random() > 0.96) g.change *= -1; }
    if (this.lifespan > 0) this.lifespan--; else arr.splice(i, 1);
  };
  Thunder.prototype.render = function () {
    if (this.lifespan <= 0) return;
    ctx.beginPath();
    ctx.globalAlpha = this.lifespan / this.maxlife;
    ctx.strokeStyle = this.color; ctx.lineWidth = this.width;
    ctx.shadowBlur = 26; ctx.shadowColor = this.glow;
    ctx.moveTo(this.x, this.y);
    var prev = { x: this.x, y: this.y };
    for (var s = 0; s < this.segments.length; s++) {
      var seg = this.segments[s];
      var x = prev.x + Math.cos(seg.direct) * seg.length;
      var y = prev.y + Math.sin(seg.direct) * seg.length;
      prev = { x: x, y: y }; ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.closePath(); ctx.shadowBlur = 0;
    var strength = Math.random() * 60 + 30;
    var light = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, strength);
    light.addColorStop(0, "rgba(40,90,220,0.32)");
    light.addColorStop(0.1, "rgba(40,90,220,0.14)");
    light.addColorStop(0.5, "rgba(40,90,220,0.04)");
    light.addColorStop(1, "rgba(40,90,220,0)");
    ctx.beginPath(); ctx.fillStyle = light; ctx.arc(this.x, this.y, strength, 0, Math.PI * 2); ctx.fill(); ctx.closePath();
  };

  function Spark(x, y) {
    this.x = x; this.y = y;
    this.v = { direct: Math.random() * Math.PI * 2, weight: Math.random() * 10 + 2, friction: 0.88 };
    this.a = { change: Math.random() * 0.4 - 0.2, min: this.v.direct - Math.PI * 0.4, max: this.v.direct + Math.PI * 0.4 };
    this.g = { direct: Math.PI * 0.5 + (Math.random() * 0.4 - 0.2), weight: Math.random() * 0.25 + 0.25 };
    this.width = Math.random() * 2.4;
    this.lifespan = Math.round(Math.random() * 18 + 30); this.maxlife = this.lifespan;
    this.color = "#1e40d0"; this.prev = { x: x, y: y };
  }
  Spark.prototype.update = function (i, arr) {
    this.prev = { x: this.x, y: this.y };
    this.x += Math.cos(this.v.direct) * this.v.weight + Math.cos(this.g.direct) * this.g.weight;
    this.y += Math.sin(this.v.direct) * this.v.weight + Math.sin(this.g.direct) * this.g.weight;
    if (this.v.weight > 0.2) this.v.weight *= this.v.friction;
    this.v.direct += this.a.change;
    if (this.v.direct > this.a.max || this.v.direct < this.a.min) this.a.change *= -1;
    if (this.lifespan > 0) this.lifespan--; else arr.splice(i, 1);
  };
  Spark.prototype.render = function () {
    if (this.lifespan <= 0) return;
    ctx.beginPath(); ctx.globalAlpha = this.lifespan / this.maxlife;
    ctx.strokeStyle = this.color; ctx.lineWidth = this.width;
    ctx.moveTo(this.x, this.y); ctx.lineTo(this.prev.x, this.prev.y); ctx.stroke(); ctx.closePath();
  };
  function Particles(x, y) {
    this.max = Math.round(Math.random() * 8 + 8); this.sparks = [];
    for (var i = 0; i < this.max; i++) this.sparks.push(new Spark(x, y));
  }
  Particles.prototype.update = function () { for (var i = 0; i < this.sparks.length; i++) this.sparks[i].update(i, this.sparks); };
  Particles.prototype.render = function () { for (var i = 0; i < this.sparks.length; i++) this.sparks[i].render(ctx); };

  function size() {
    var r = wrap.getBoundingClientRect();
    W = Math.max(1, Math.floor(r.width)); H = Math.max(1, Math.floor(r.height));
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    text = new Text();
    if (reduce) renderStatic();
  }
  function renderStatic() {
    ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);
    text.index = Math.ceil(text.bound.width); text.render();
  }
  function loop() {
    raf = requestAnimationFrame(loop);
    if (!inView) return;
    text.update();
    var i;
    for (i = thunder.length - 1; i >= 0; i--) thunder[i].update(i, thunder);
    for (i = 0; i < particles.length; i++) particles[i].update();
    if (particles.length > 60) particles.splice(0, particles.length - 60);
    ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);
    text.render();
    for (i = 0; i < thunder.length; i++) thunder[i].render();
    for (i = 0; i < particles.length; i++) particles[i].render();
    ctx.globalAlpha = 1;
  }

  wrap.addEventListener("click", function (e) {
    var r = wrap.getBoundingClientRect();
    var x = e.clientX - r.left, y = e.clientY - r.top;
    thunder.push(new Thunder(x, y)); particles.push(new Particles(x, y));
  });

  size();
  window.addEventListener("resize", size, { passive: true });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { es.forEach(function (e) { inView = e.isIntersecting; }); }, { threshold: 0 }).observe(wrap);
  } else inView = true;
  if (reduce) { renderStatic(); return; }
  raf = requestAnimationFrame(loop);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(size);
})();
