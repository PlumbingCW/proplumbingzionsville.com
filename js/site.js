(function () {
  "use strict";
  var d = document;
  var root = d.documentElement;
  var ham = d.getElementById("hamburger");
  var drawer = d.getElementById("drawer");
  var overlay = d.getElementById("mob-overlay");
  var closeBtn = d.getElementById("drawer-close");
  function setDrawer(open) {
    if (!drawer) { return; }
    drawer.classList.toggle("open", open);
    if (overlay) { overlay.classList.toggle("visible", open); }
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (ham) { ham.setAttribute("aria-expanded", open ? "true" : "false"); }
    root.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) { closeBtn.focus(); } else if (!open && ham && d.activeElement === closeBtn) { ham.focus(); }
  }
  if (ham) { ham.addEventListener("click", function () { setDrawer(!drawer.classList.contains("open")); }); }
  if (closeBtn) { closeBtn.addEventListener("click", function () { setDrawer(false); }); }
  if (overlay) { overlay.addEventListener("click", function () { setDrawer(false); }); }
  d.addEventListener("keydown", function (e) { if (e.key === "Escape") { setDrawer(false); } });
  var mq = window.matchMedia("(min-width: 769px)");
  var onMq = function () { if (mq.matches) { setDrawer(false); } };
  if (mq.addEventListener) { mq.addEventListener("change", onMq); }

  var qs = d.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(qs, function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      var panel = d.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) { panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px"; }
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(qs, function (btn) {
      if (btn.getAttribute("aria-expanded") === "true") {
        var p = d.getElementById(btn.getAttribute("aria-controls"));
        if (p) { p.style.maxHeight = p.scrollHeight + "px"; }
      }
    });
  });

  var fab = d.getElementById("callfab");
  var foot = d.querySelector(".site-foot");
  if (fab && foot && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      fab.classList.toggle("hide", en[0].isIntersecting);
    }, { threshold: 0.05 }).observe(foot);
  }
})();
