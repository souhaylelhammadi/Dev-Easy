document.addEventListener("DOMContentLoaded", function () {
  // Animations fade-in
  var fadeEls = document.querySelectorAll(
    ".fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .fade-in-zoom"
  );
  var observer = new window.IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Stagger effect for children
          if (entry.target.classList.contains("stagger")) {
            var children = entry.target.children;
            for (let i = 0; i < children.length; i++) {
              setTimeout(() => {
                children[i].classList.add("visible");
              }, i * 150);
            }
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeEls.forEach(function (el) {
    observer.observe(el);
  });
  // Also observe stagger containers
  var staggerEls = document.querySelectorAll(".stagger");
  staggerEls.forEach(function (el) {
    observer.observe(el);
  });

  // Modal contact interaction
  (function () {
    var modal = document.getElementById("contact-modal");
    var openBtns = document.querySelectorAll(".btn-contact-modal");
    var closeBtn = modal ? modal.querySelector(".close-modal") : null;
    var overlay = modal ? modal.querySelector(".modal-overlay") : null;
    var form = document.getElementById("contact-form");
    var successMsg = document.getElementById("contact-success");

    function openModal(e) {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
    function closeModal(e) {
      if (e) e.preventDefault();
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
    openBtns.forEach(function (btn) {
      btn.addEventListener("click", openModal);
    });
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (overlay) overlay.addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
    if (form)
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        form.querySelectorAll("input, textarea, button").forEach(function (el) {
          el.disabled = true;
        });
        setTimeout(function () {
          successMsg.style.display = "block";
          form
            .querySelectorAll("input, textarea, button")
            .forEach(function (el) {
              el.disabled = false;
            });
          form.reset();
          setTimeout(closeModal, 1800);
          setTimeout(function () {
            successMsg.style.display = "none";
          }, 2000);
        }, 900);
      });
  })();

  // Ripple effect for modern-btn
  document.querySelectorAll(".modern-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var ripple = document.createElement("span");
      ripple.className = "ripple";
      var rect = btn.getBoundingClientRect();
      ripple.style.width = ripple.style.height =
        Math.max(rect.width, rect.height) + "px";
      ripple.style.left = e.clientX - rect.left - rect.width / 2 + "px";
      ripple.style.top = e.clientY - rect.top - rect.height / 2 + "px";
      btn.appendChild(ripple);
      setTimeout(function () {
        ripple.remove();
      }, 600);
    });
  });
});
