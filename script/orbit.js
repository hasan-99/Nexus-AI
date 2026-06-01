/* Services orbit — interactive "system map".
   Vanilla port of a radial orbital timeline, in the Nexus AI gold theme.
   Progressive enhancement: if this runs, it replaces the static fallback chips. */
(function () {
  var root = document.getElementById("orbit");
  if (!root) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var DATA = [
    { id: 1, label: "Web Design", cat: "BUILD",    icon: "fa-display",                desc: "Fast, mobile-first sites that make the offer, trust, and contact path obvious.", related: [2, 4], slug: "web-design" },
    { id: 2, label: "AI",         cat: "AUTOMATE",  icon: "fa-robot",                  desc: "Agents and assistants that answer, qualify leads, and route work into your tools.", related: [1, 6], slug: "ai-solutions" },
    { id: 3, label: "SEO",        cat: "GROW",      icon: "fa-magnifying-glass-chart", desc: "Rank for the searches that bring customers, with structure crawlers understand.", related: [4, 1], slug: "seo" },
    { id: 4, label: "Content",    cat: "GROW",      icon: "fa-pen-nib",                desc: "Copy, visuals, and posts that sound like you and move people to act.", related: [3, 5], slug: "content" },
    { id: 5, label: "Social",     cat: "GROW",      icon: "fa-hashtag",                desc: "A consistent presence and campaigns that grow reach, trust, and inbound.", related: [4, 8], slug: "social" },
    { id: 6, label: "Automation", cat: "AUTOMATE",  icon: "fa-gears",                  desc: "Remove repeated admin from forms, calls, messages, and handoffs.", related: [2, 7], slug: "automation" },
    { id: 7, label: "Backend",    cat: "BUILD",     icon: "fa-server",                 desc: "Secure APIs, integrations, and dashboards that stay maintainable as you grow.", related: [6, 2], slug: "backend" },
    { id: 8, label: "Branding",   cat: "BRAND",     icon: "fa-shapes",                 desc: "A logo, system, and voice that make a small business look established.", related: [1, 5], slug: "branding" }
  ];

  // Clear fallback, build stage
  root.innerHTML = "";
  var ring = el("div", "orbit-ring"); ring.setAttribute("aria-hidden", "true");
  var core = el("div", "orbit-core"); core.setAttribute("aria-hidden", "true"); core.innerHTML = "<span>NA</span>";
  var stage = el("div", "orbit-stage");
  var hint = el("div", "orbit-hint"); hint.textContent = "tap a node ↗";
  root.appendChild(ring); root.appendChild(core); root.appendChild(stage); root.appendChild(hint);

  var nodes = DATA.map(function (d) {
    var node = el("div", "orbit-node"); node.dataset.id = d.id;
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "node-btn";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", d.label + " — open details");
    btn.innerHTML = '<i class="fa-solid ' + d.icon + '" aria-hidden="true"></i><span class="node-label">' + d.label + "</span>";
    var rel = d.related.map(function (r) { var t = find(r); return t ? t.label : ""; }).filter(Boolean).join(" · ");
    var panel = el("div", "node-panel"); panel.hidden = true;
    panel.innerHTML =
      '<span class="pcat">' + d.cat + "</span>" +
      "<h4>" + d.label + "</h4><p>" + d.desc + "</p>" +
      '<div class="prelated"><span>Pairs with</span><b>' + rel + "</b></div>" +
      '<a class="pbook" href="contact.html?service=' + d.slug + '">Book ' + d.label + " →</a>";
    node.appendChild(btn); node.appendChild(panel);
    stage.appendChild(node);
    btn.addEventListener("click", function (e) { e.stopPropagation(); toggle(d.id); });
    return { d: d, node: node, btn: btn, panel: panel };
  });

  var angle = -90, radius = 200, activeId = null, timer = null;

  function layout() {
    var r = root.getBoundingClientRect();
    radius = Math.max(118, Math.min(r.width * 0.40, r.height * 0.36));
    ring.style.width = ring.style.height = (radius * 2) + "px";
    render();
  }

  function render() {
    var n = nodes.length;
    nodes.forEach(function (it, i) {
      var a = ((i / n) * 360 + angle) % 360;
      var rad = a * Math.PI / 180;
      var x = radius * Math.cos(rad), y = radius * Math.sin(rad);
      var z = Math.round(100 + 50 * Math.cos(rad));
      var op = Math.max(0.55, Math.min(1, 0.55 + 0.45 * ((1 + Math.sin(rad)) / 2)));
      var on = it.node.classList.contains("is-active");
      it.node.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      it.node.style.zIndex = on ? 200 : z;
      it.node.style.opacity = on ? 1 : op.toFixed(2);
    });
  }

  function start() {
    if (reduce) return;
    stop();
    root.classList.remove("is-paused");
    timer = setInterval(function () { angle = (angle + 0.3) % 360; render(); }, 50);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  function toggle(id) {
    if (activeId === id) { close(); return; }
    activeId = id; stop(); root.classList.add("is-paused");
    var related = (find(id) || {}).related || [];
    nodes.forEach(function (it) {
      var on = it.d.id === id;
      it.node.classList.toggle("is-active", on);
      it.node.classList.toggle("is-related", related.indexOf(it.d.id) !== -1);
      it.panel.hidden = !on;
      it.btn.setAttribute("aria-expanded", on ? "true" : "false");
    });
    var idx = DATA.findIndex(function (d) { return d.id === id; });
    angle = -90 - (idx / DATA.length) * 360; // bring active node to top
    render();
  }

  function close() {
    activeId = null;
    nodes.forEach(function (it) {
      it.node.classList.remove("is-active", "is-related");
      it.panel.hidden = true;
      it.btn.setAttribute("aria-expanded", "false");
    });
    render();
    start();
  }

  root.addEventListener("click", function (e) {
    if (e.target === root || e.target === ring || e.target === core || e.target.parentNode === core) close();
  });
  window.addEventListener("resize", layout, { passive: true });

  // Pause rotation when the orbit scrolls offscreen
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { if (!activeId) start(); }
        else stop();
      });
    }, { threshold: 0.1 }).observe(root);
  }

  layout();
  start();

  function el(tag, cls) { var e = document.createElement(tag); e.className = cls; return e; }
  function find(id) { return DATA.find(function (d) { return d.id === id; }); }
})();
