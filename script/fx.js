/* Nexus AI — scroll-cinema layer.
   Four effects, all framework-free and individually guarded:
     1. Lenis momentum smooth-scroll (if the CDN lib loaded)
     2. a top scroll-progress bar
     3. word-by-word colour reveal on section headings as they enter view
     4. a rotating filament globe behind the hero
   Everything no-ops under prefers-reduced-motion. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  /* ---- 1. Lenis smooth scroll ------------------------------------------- */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    });
    function lraf(time) { lenis.raf(time); requestAnimationFrame(lraf); }
    requestAnimationFrame(lraf);
    // make in-page anchor clicks ride Lenis
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80 }); }
    });
  }

  /* ---- 2. Scroll-progress bar ------------------------------------------- */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  function setProgress() {
    var h = document.documentElement;
    var max = (h.scrollHeight - h.clientHeight) || 1;
    var p = Math.max(0, Math.min(1, (window.scrollY || h.scrollTop) / max));
    bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
  }

  /* ---- 3. Word-by-word heading reveal ----------------------------------- */
  // Wrap each word of targeted headings in a span we can light up on scroll.
  var revealEls = [];
  var targets = document.querySelectorAll(".section-stamp h2, [data-reveal-words]");
  targets.forEach(function (el) {
    if (el.dataset.rwDone) return;
    el.dataset.rwDone = "1";
    var spans = [];
    // walk child nodes so inline elements (e.g. the animated cycle span)
    // survive intact — only text gets split into per-word reveal spans.
    var kids = Array.prototype.slice.call(el.childNodes);
    el.textContent = "";
    kids.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (w) {
          if (w === "") return;
          if (/^\s+$/.test(w)) { el.appendChild(document.createTextNode(w)); return; }
          var s = document.createElement("span");
          s.className = "rw";
          s.textContent = w;
          el.appendChild(s);
          spans.push(s);
        });
      } else {
        el.appendChild(node); // keep animated/inline children as-is
      }
    });
    revealEls.push({ el: el, spans: spans });
    if (reduce) spans.forEach(function (s) { s.classList.add("on"); });
  });
  function paintReveals() {
    if (reduce) return;
    var vh = window.innerHeight;
    for (var k = 0; k < revealEls.length; k++) {
      var r = revealEls[k];
      var rect = r.el.getBoundingClientRect();
      // progress: 0 when heading sits at 85% viewport, 1 at 35%
      var prog = (vh * 0.85 - rect.top) / (vh * 0.5);
      prog = Math.max(0, Math.min(1, prog));
      var active = Math.round(prog * r.spans.length);
      for (var i = 0; i < r.spans.length; i++) {
        r.spans[i].classList.toggle("on", i < active);
      }
    }
  }

  /* ---- shared scroll pump (rAF-throttled) ------------------------------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { setProgress(); paintReveals(); ticking = false; });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  if (lenis) lenis.on("scroll", onScroll);
  setProgress(); paintReveals();

  /* ---- 4. Hero filament globe ------------------------------------------- */
  var holder = document.querySelector(".hero");
  if (holder && !reduce) buildGlobe(holder);

  function buildGlobe(hero) {
    var cv = document.createElement("canvas");
    cv.className = "hero-globe";
    cv.setAttribute("aria-hidden", "true");
    hero.insertBefore(cv, hero.firstChild);
    var ctx = cv.getContext("2d");
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var W = 0, H = 0, R = 0, cx = 0, cy = 0;

    // theme palette (sky / cyan / indigo — brand-adjacent)
    var PAL = {
      light: { dot: "20,140,210", lines: ["20,150,230", "40,190,225", "120,110,235"], dotA: 0.5, lineA: 0.16 },
      dark:  { dot: "120,200,250", lines: ["56,189,248", "34,211,238", "129,140,248"], dotA: 0.85, lineA: 0.30 }
    };
    function pal() { return root.getAttribute("data-theme") === "dark" ? PAL.dark : PAL.light; }

    // points on a Fibonacci sphere
    var N = 260, pts = [];
    var off = 2 / N, inc = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < N; i++) {
      var y = i * off - 1 + off / 2;
      var r = Math.sqrt(1 - y * y);
      var phi = i * inc;
      pts.push({ x: Math.cos(phi) * r, y: y, z: Math.sin(phi) * r });
    }
    // precompute near-neighbour links (3D distance threshold)
    var links = [];
    for (i = 0; i < N; i++) {
      for (var j = i + 1; j < N; j++) {
        var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z;
        if (dx * dx + dy * dy + dz * dz < 0.085) links.push([i, j]);
      }
    }

    function size() {
      var rect = hero.getBoundingClientRect();
      W = rect.width; H = rect.height;
      cv.width = Math.floor(W * dpr); cv.height = Math.floor(H * dpr);
      cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) * (W < 720 ? 0.42 : 0.46);
      // sit globe toward the right so the headline stays clear on the left
      cx = W < 720 ? W * 0.5 : W * 0.72;
      cy = H * 0.52;
    }

    var ang = 0, tilt = 0.42, raf = null, zoom = 1;
    var proj = new Array(N);
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var P = pal();
      ang += 0.0016;
      // scroll-zoom: globe scales up + drifts as you scroll into the page
      var sc = window.scrollY || document.documentElement.scrollTop || 0;
      var heroProg = Math.max(0, Math.min(1, sc / (H || 1)));
      zoom += (1 + heroProg * 0.7 - zoom) * 0.12; // eased follow
      var Rz = R * zoom;
      var cyz = cy - heroProg * H * 0.10;
      var sa = Math.sin(ang), ca = Math.cos(ang);
      var st = Math.sin(tilt), ctt = Math.cos(tilt);
      // rotate + project
      for (var i = 0; i < N; i++) {
        var p = pts[i];
        var x = p.x * ca - p.z * sa;
        var z = p.x * sa + p.z * ca;
        var yy = p.y * ctt - z * st;
        var zz = p.y * st + z * ctt;
        var depth = (zz + 1) / 2; // 0 back .. 1 front
        proj[i] = { sx: cx + x * Rz, sy: cyz + yy * Rz, d: depth };
      }
      // links
      for (var l = 0; l < links.length; l++) {
        var a = proj[links[l][0]], b = proj[links[l][1]];
        var dd = (a.d + b.d) / 2;
        var la = P.lineA * (0.25 + dd * 0.95);
        var col = P.lines[(links[l][0] + links[l][1]) % P.lines.length];
        ctx.strokeStyle = "rgba(" + col + "," + la.toFixed(3) + ")";
        ctx.lineWidth = 0.6 + dd * 0.7;
        ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
      }
      // nodes
      for (i = 0; i < N; i++) {
        var q = proj[i];
        var r2 = 0.5 + q.d * 1.7;
        ctx.fillStyle = "rgba(" + P.dot + "," + (P.dotA * (0.2 + q.d * 0.9)).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(q.sx, q.sy, r2, 0, 6.2832); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    function startG() { if (!raf) raf = requestAnimationFrame(draw); }
    function stopG() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    size();
    window.addEventListener("resize", size, { passive: true });
    document.addEventListener("visibilitychange", function () { if (document.hidden) stopG(); else startG(); });
    // pause when the hero scrolls fully out of view
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) startG(); else stopG();
      }, { threshold: 0 }).observe(hero);
    }
    startG();
  }
})();
