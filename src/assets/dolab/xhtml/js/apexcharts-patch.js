/* ==========================================================
   ApexCharts patch for templates that render charts on pages
   where the containers don't exist (Angular routing).
   Fixes: "Error: Element not found" from global:scripts.js
   ========================================================== */

(function () {
  function patch() {
    try {
      var AC = window.ApexCharts;
      if (!AC || !AC.prototype) return false;

      // Avoid double patch
      if (AC.prototype.__patched_render__) return true;

      var originalRender = AC.prototype.render;

      AC.prototype.render = function () {
        try {
          var el = this && this.el ? this.el : null;

          // Some templates pass selector string; ApexCharts usually resolves it to el
          // but we handle just in case
          if (typeof el === "string") {
            el = document.querySelector(el);
            this.el = el;
          }

          // If element missing, skip render safely
          if (!el || !document.body.contains(el)) {
            return Promise.resolve();
          }
        } catch (e) {
          return Promise.resolve();
        }

        return originalRender.apply(this, arguments);
      };

      AC.prototype.__patched_render__ = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  // Try immediately + retry a few times in case scripts load later
  if (patch()) return;

  var tries = 0;
  var maxTries = 60; // ~6s
  var timer = setInterval(function () {
    tries++;
    if (patch() || tries >= maxTries) clearInterval(timer);
  }, 100);
})();
