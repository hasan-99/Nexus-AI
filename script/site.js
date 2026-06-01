/* Hasan Services — shared site behaviour (progressive enhancement).
   Every effect is guarded, so the same file is safe on every page. */
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Nav condenses after a small scroll
  var nav = document.querySelector(".service-nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Dark-mode toggle — persisted in localStorage, broadcast to the canvas bg
  var THEME_KEY = "jn-theme";
  function applyTheme(mode) {
    if (mode === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    var pressed = mode === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(pressed));
    });
    // tell bg.js / vapor.js to re-read CSS colors
    window.dispatchEvent(new CustomEvent("themechange", { detail: { mode: mode } }));
    // keep the address-bar / PWA chrome in step
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", pressed ? "#23272f" : "#f7f9fc");
  }
  var toggles = document.querySelectorAll("[data-theme-toggle]");
  if (toggles.length) {
    var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current);
    toggles.forEach(function (btn) {
      btn.addEventListener("click", function () {
        current = current === "dark" ? "light" : "dark";
        try { localStorage.setItem(THEME_KEY, current); } catch (e) {}
        applyTheme(current);
      });
    });
  }

  // Seed a plausible "manual steps removed" value so the ticker feels live
  var steps = document.querySelectorAll("[data-steps]");
  if (steps.length) {
    var seed = 290 + Math.floor((Date.now() / 1000) % 51); // 290..340
    steps.forEach(function (el) { el.textContent = seed; });
  }

  // Scroll-reveal for flow strips + process blocks; reduced-motion shows them instantly
  var reveals = document.querySelectorAll(".js-reveal");
  if (reveals.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("revealed"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
        });
      }, { threshold: 0.25 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  // Press Enter anywhere (outside a field/control) to jump to the booking console
  var book = document.getElementById("book");
  if (book) {
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var t = e.target;
      if (t && t.closest && t.closest("a, button, input, textarea, select, [contenteditable]")) return;
      book.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      book.classList.add("pulse");
      setTimeout(function () { book.classList.remove("pulse"); }, 900);
    });
  }

  // Contact page: personalise from ?service= so spec-row "Book" links land warm
  var svc = new URLSearchParams(window.location.search).get("service");
  if (svc) {
    var names = {
      "web-design": "Web Design & Development",
      "ai-solutions": "AI Solutions",
      "seo": "SEO & Local Visibility",
      "content": "Content Creation",
      "social": "Social Media Marketing",
      "automation": "Business Automation",
      "backend": "Backend & API Systems",
      "branding": "Branding & Identity"
    };
    var label = names[svc];
    if (label) {
      document.querySelectorAll("[data-service-name]").forEach(function (el) { el.textContent = label; });
      document.querySelectorAll("[data-service-mail]").forEach(function (a) {
        a.href = "mailto:jahousenexus@gmail.com?subject=" + encodeURIComponent("Consultation request: " + label);
      });
      var slot = document.querySelector("[data-service-slot]");
      if (slot) slot.hidden = false;
      var sel = document.getElementById("f-svc");
      if (sel) {
        var short = {
          "web-design": "Web Design", "ai-solutions": "AI Solutions", "seo": "SEO",
          "content": "Content Creation", "social": "Social Media", "automation": "Automation",
          "backend": "Backend & API", "branding": "Branding"
        }[svc];
        if (short) for (var i = 0; i < sel.options.length; i++) {
          if (sel.options[i].text === short) { sel.selectedIndex = i; break; }
        }
      }
    }
  }

  // Web3Forms AJAX submit for the free-demo lead form; native POST is the no-JS fallback
  var form = document.querySelector("[data-web3form]");
  if (form && window.fetch) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      var btn = form.querySelector('button[type="submit"]');
      if (status) { status.className = "form-status"; status.textContent = "Sending…"; }
      if (btn) btn.disabled = true;
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.success) {
            if (status) { status.className = "form-status ok"; status.textContent = "Thanks, I'll reply, usually the same day."; }
            form.reset();
          } else {
            if (status) { status.className = "form-status err"; status.textContent = "Could not send. Email jahousenexus@gmail.com instead."; }
          }
        })
        .catch(function () {
          if (status) { status.className = "form-status err"; status.textContent = "Network issue. Email jahousenexus@gmail.com instead."; }
        })
        .then(function () { if (btn) btn.disabled = false; });
    });
  }

  // 3D pointer-tilt + glow tracking for service cards (desktop, motion-OK only)
  if (!reduce && !window.matchMedia("(pointer: coarse)").matches) {
    document.querySelectorAll(".svc-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.transform = "rotateY(" + ((px - 0.5) * 9).toFixed(2) + "deg) rotateX(" + ((0.5 - py) * 9).toFixed(2) + "deg) translateY(-4px)";
        card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  // Animated word cycler (blur + slide). Markup: <span class="cycle" data-words="a|b|c">
  document.querySelectorAll(".cycle").forEach(function (el) {
    var words = (el.getAttribute("data-words") || "").split("|").filter(Boolean);
    if (!words.length) return;
    var i = 0;
    el.textContent = words[0];
    if (reduce) return;
    setInterval(function () {
      el.classList.add("cycle-out");
      setTimeout(function () {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove("cycle-out");
        el.classList.add("cycle-in");
        setTimeout(function () { el.classList.remove("cycle-in"); }, 440);
      }, 300);
    }, 2600);
  });
})();
