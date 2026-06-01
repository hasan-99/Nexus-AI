/* AI command console — types the process out line by line when it scrolls into
   view. Command lines type character by character; output lines reveal after.
   Real text stays in the DOM for no-JS / SEO; reduced-motion shows it instantly. */
(function () {
  var term = document.getElementById("proc-term") || document.querySelector(".terminal");
  if (!term) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lines = Array.prototype.slice.call(term.querySelectorAll(".tl"));
  if (!lines.length) return;

  if (reduce) {
    lines.forEach(function (l) {
      l.classList.add("show");
      var t = l.querySelector(".typed");
      if (t) t.textContent = l.getAttribute("data-text") || "";
    });
    return;
  }

  lines.forEach(function (l) { l.classList.remove("show"); });
  var started = false;

  function run() {
    if (started) return;
    started = true;
    var i = 0;
    function next() {
      if (i >= lines.length) return;
      var line = lines[i];
      line.classList.add("show");
      if (line.classList.contains("cmd")) {
        var full = line.getAttribute("data-text") || "";
        var span = line.querySelector(".typed");
        var c = 0;
        (function type() {
          if (span) span.textContent = full.slice(0, c);
          c++;
          if (c <= full.length) setTimeout(type, 32);
          else { i++; setTimeout(next, 230); }
        })();
      } else {
        i++;
        setTimeout(next, line.classList.contains("done") ? 80 : 480);
      }
    }
    next();
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) run(); });
    }, { threshold: 0.3 }).observe(term);
  } else {
    run();
  }
})();
