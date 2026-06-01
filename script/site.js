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
        a.href = "mailto:hasan.cy99@gmail.com?subject=" + encodeURIComponent("Consultation request — " + label);
      });
      var slot = document.querySelector("[data-service-slot]");
      if (slot) slot.hidden = false;
    }
  }
})();
