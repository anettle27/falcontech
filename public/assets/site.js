// FalconTech 11041 — mobile menu + photo lightbox
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
  function close() { box.classList.remove("open"); img.removeAttribute("src"); }
  document.querySelectorAll("[data-full]").forEach(function (el) {
    el.addEventListener("click", function () {
      img.src = el.getAttribute("data-full");
      img.alt = el.getAttribute("data-caption") || "";
      cap.textContent = el.getAttribute("data-caption") || "";
      box.classList.add("open");
      box.querySelector(".close").focus();
    });
  });
  box.addEventListener("click", function (e) { if (e.target === box || e.target.classList.contains("close")) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
