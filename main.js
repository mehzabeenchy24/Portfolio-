/* ===========================================================
   Mehzabeen — Product Manager Portfolio
   main.js — vanilla JS: icons + scroll animations
   No libraries. Everything degrades gracefully and respects
   the user's reduced-motion preference.
   =========================================================== */

(function () {
  "use strict";

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------
     1. ICON SET  (inline SVG, stroke = currentColor)
     ----------------------------------------------------------- */
  var ICON_ATTRS =
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';

  var ICONS = {
    user:      '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
    layers:    '<path d="M12 3 3 7.5 12 12l9-4.5L12 3Z"/><path d="m3 12 9 4.5L21 12"/><path d="m3 16.5 9 4.5 9-4.5"/>',
    check:     '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.8 2.8L16 9"/>',
    beaker:    '<path d="M9 3h6"/><path d="M10 3v6l-4.6 8.3A2 2 0 0 0 7.2 21h9.6a2 2 0 0 0 1.8-3.7L14 9V3"/><path d="M7.5 15h9"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
    mail:      '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone:     '<path d="M5 4h3.5l1.6 4-2.2 1.3a12 12 0 0 0 5 5L14 12l4 1.6V17a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z"/>',
    linkedin:  '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10.5V17"/><path d="M8 7.2v.01"/><path d="M12 17v-3.6a2.4 2.4 0 0 1 4.8 0V17"/><path d="M12 17v-6.5"/>',
    message:   '<path d="M21 11.4a8.4 8.4 0 0 1-12.1 7.6L3 21l2-5.9A8.4 8.4 0 1 1 21 11.4Z"/>',
    clipboard: '<rect x="8" y="3" width="8" height="4" rx="1"/><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/>',
    sparkles:  '<path d="M12 3.5 13.7 8 18 9.7 13.7 11.4 12 16 10.3 11.4 6 9.7 10.3 8 12 3.5Z"/><path d="M18.5 14 19.4 16.1 21.5 17 19.4 17.9 18.5 20 17.6 17.9 15.5 17 17.6 16.1 18.5 14Z"/>',
    grid:      '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    ticket:    '<path d="M4 9a2 2 0 0 0 0 6v1.5A1.5 1.5 0 0 0 5.5 18h13a1.5 1.5 0 0 0 1.5-1.5V15a2 2 0 0 1 0-6V7.5A1.5 1.5 0 0 0 18.5 6h-13A1.5 1.5 0 0 0 4 7.5Z"/><path d="M13 6v12" stroke-dasharray="2 2"/>',
    inbox:     '<path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"/><path d="M3 12 6 5h12l3 7"/><path d="M3 12h5l1.5 2.5h5L16 12h5"/>',
    share:     '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.9 7.6-3.7M8.2 13.1l7.6 3.7"/>',
    zap:       '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    file:      '<path d="M14 3v5h5"/><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M9 13h6M9 17h6"/>',
    target:    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    users:     '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M16.5 5.2a3.5 3.5 0 0 1 0 6.6"/><path d="M18 15.2c1.9.6 3 2 3 4.8"/>',
    trending:  '<path d="M3 17 9 11l4 4 8-8"/><path d="M15 7h6v6"/>',
    chevrons:  '<path d="m7 6 5 5 5-5"/><path d="m7 13 5 5 5-5"/>'
  };

  function injectIcons() {
    var nodes = document.querySelectorAll("[data-icon]");
    nodes.forEach(function (el) {
      var name = el.getAttribute("data-icon");
      var inner = ICONS[name];
      if (inner) {
        el.innerHTML = "<svg " + ICON_ATTRS + ">" + inner + "</svg>";
      }
    });
  }

  /* -----------------------------------------------------------
     2. SCROLL REVEAL  (variants + per-group stagger)
     ----------------------------------------------------------- */
  var revealObserver = null;

  function tagReveals(selector, variant, step) {
    var els = document.querySelectorAll(selector);
    var counters = new Map();
    els.forEach(function (el) {
      el.classList.add("reveal", "reveal--" + (variant || "up"));
      if (step) {
        var parent = el.parentElement;
        var i = counters.get(parent) || 0;
        el.style.transitionDelay = (i * step).toFixed(3) + "s";
        counters.set(parent, i + 1);
      }
    });
  }

  function setupReveals() {
    /* selector, variant, per-group stagger step (seconds) */
    tagReveals(".section-head", "up");
    tagReveals(".about-body p", "up", 0.12);
    tagReveals("article.case .case-head", "up");
    tagReveals("article.case h3", "up");
    tagReveals("article.case .sub", "up");
    tagReveals("article.case .tag", "scale", 0.05);
    tagReveals("article.case h4", "left");
    tagReveals("article.case ul", "up");
    tagReveals("article.case > p:not(.sub)", "up");
    tagReveals("article.case .role-note", "scale");
    tagReveals(".grid .card", "scale", 0.07);
    tagReveals(".side", "scale");
    tagReveals(".skills > div", "up", 0.1);
    tagReveals(".contact-links a", "up", 0.08);

    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* -----------------------------------------------------------
     3. SCROLL PROGRESS BAR
     ----------------------------------------------------------- */
  function setupProgress() {
    var bar = document.getElementById("progress");
    if (!bar) return;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  /* -----------------------------------------------------------
     4. NAV SCROLL-SPY
     ----------------------------------------------------------- */
  function setupScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll("nav.top ul a")
    );
    if (!links.length) return;
    var sections = links.map(function (a) {
      return document.querySelector(a.getAttribute("href"));
    });
    function spy() {
      var pos = window.scrollY + 130;
      var idx = -1;
      sections.forEach(function (s, i) {
        if (s && s.offsetTop <= pos) idx = i;
      });
      links.forEach(function (a, i) {
        a.classList.toggle("active", i === idx);
      });
    }
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  /* -----------------------------------------------------------
     5. PARALLAX (hero glow) — rAF throttled
     ----------------------------------------------------------- */
  function setupParallax() {
    var nodes = Array.prototype.slice.call(
      document.querySelectorAll("[data-parallax]")
    );
    if (!nodes.length) return;
    var ticking = false;
    function apply() {
      var y = window.scrollY;
      nodes.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
        el.style.transform = "translate3d(0," + (y * speed).toFixed(1) + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(apply);
          ticking = true;
        }
      },
      { passive: true }
    );
    apply();
  }

  /* -----------------------------------------------------------
     6. CARD CURSOR SPOTLIGHT
     ----------------------------------------------------------- */
  function setupSpotlight() {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }

  /* -----------------------------------------------------------
     7. MAGNETIC BUTTONS (contact links)
     ----------------------------------------------------------- */
  function setupMagnetic() {
    document.querySelectorAll(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform =
          "translate(" + mx * 0.18 + "px," + my * 0.28 + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* -----------------------------------------------------------
     8. HERO SCROLL HINT (fade out after scrolling)
     ----------------------------------------------------------- */
  function setupScrollHint() {
    var hint = document.querySelector(".scroll-hint");
    if (!hint) return;
    function update() {
      hint.classList.toggle("hide", window.scrollY > 60);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* -----------------------------------------------------------
     INIT
     ----------------------------------------------------------- */
  function init() {
    injectIcons();        // always — icons aren't motion
    setupProgress();
    setupScrollSpy();
    setupScrollHint();

    if (!prefersReduced && "IntersectionObserver" in window) {
      setupReveals();
      setupParallax();
      setupSpotlight();
      setupMagnetic();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
