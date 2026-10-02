// FalconTech 11041 — mobile menu + photo lightbox (arrow keys / swipe to browse)
(function () {
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Remember the visitor's language choice for the root redirect
  document.querySelectorAll("[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try { localStorage.setItem("lang", a.getAttribute("data-lang")); } catch (e) {}
    });
  });

  var box = document.querySelector(".lightbox");
  if (!box) return;
  var img = box.querySelector("img");
  var cap = box.querySelector("p");
  var cs = document.documentElement.lang === "cs";
  var items = [], index = 0, opener = null;

  // Previous / next buttons (added here so the page HTML stays unchanged)
  function arrow(cls, label, text) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "nav-arrow " + cls;
    b.setAttribute("aria-label", label);
    b.textContent = text;
    box.appendChild(b);
    return b;
  }
  var prevBtn = arrow("prev", cs ? "Předchozí fotka" : "Previous photo", "‹");
  var nextBtn = arrow("next", cs ? "Další fotka" : "Next photo", "›");

  function show(i) {
    index = (i + items.length) % items.length;
    var el = items[index];
    var text = el.getAttribute("data-caption") || "";
    img.src = el.getAttribute("data-full");
    img.alt = text;
    cap.textContent = items.length > 1 ? text + "  ·  " + (index + 1) + " / " + items.length : text;
    prevBtn.hidden = nextBtn.hidden = items.length < 2;
  }
  function close() {
    box.classList.remove("open");
    img.removeAttribute("src");
    if (opener) opener.focus();
  }

  document.querySelectorAll("[data-full]").forEach(function (el) {
    el.addEventListener("click", function () {
      var group = el.closest(".gallery");
      items = group ? Array.prototype.slice.call(group.querySelectorAll("[data-full]")) : [el];
      opener = el;
      show(items.indexOf(el));
      box.classList.add("open");
      box.querySelector(".close").focus();
    });
  });

  prevBtn.addEventListener("click", function () { show(index - 1); });
  nextBtn.addEventListener("click", function () { show(index + 1); });
  box.addEventListener("click", function (e) { if (e.target === box || e.target.classList.contains("close")) close(); });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
  });

  // Swipe left/right on touch screens
  var startX = null;
  box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
