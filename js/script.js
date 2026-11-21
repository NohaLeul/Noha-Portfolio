(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const root = document.documentElement;
  const contactForm = $("#portfolioContactForm");
  contactForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const visitorName = $("#name").value.trim();
    const visitorEmail = $("#email").value.trim();
    const visitorMessage = $("#message").value.trim();
    const subject = "New Portfolio Inquiry";
    const body = `Name: ${visitorName}\n\nEmail: ${visitorEmail}\n\nMessage:\n${visitorMessage}`;
    const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent("nohaleul27@gmail.com") +
      "&su=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    const opened = window.open(gmailUrl, "_blank");
    const success = $("#formSuccess");
    const error = $("#formOpenError");
    if (opened) {
      opened.opener = null;
      if (success) success.hidden = false;
      if (error) error.hidden = true;
      contactForm.reset();
    } else {
      if (error) error.hidden = false;
      if (success) success.hidden = true;
    }
  });

  const themeButton = $("#themeToggle");
  const savedTheme = localStorage.getItem("noha-portfolio-theme");
  if (savedTheme === "dark") root.dataset.theme = "dark";
  const updateThemeIcon = () => {
    const dark = root.dataset.theme === "dark";
    $(".theme-icon").textContent = dark ? "☀" : "☾";
    themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  };
  updateThemeIcon();
  themeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("noha-portfolio-theme", root.dataset.theme);
    updateThemeIcon();
  });

  const menuToggle = $("#menuToggle");
  const nav = $("#mainNav");
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  const progress = $("#scrollProgress");
  const toTop = $("#toTop");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    toTop.classList.toggle("visible", window.scrollY > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const modal = $("#previewModal");
  const modalImage = $("img", modal);
  const modalCaption = $("p", modal);
  const originalPreview = {
    src: modalImage.getAttribute("src"),
    alt: modalImage.getAttribute("alt"),
    caption: modalCaption.textContent
  };
  const openModal = (button) => {
    const image = $("img", button);
    modalImage.src = button.dataset.previewSrc || image.src;
    modalImage.alt = image.alt.replace(/^Homepage screenshot of /, "Large preview of ");
    modalCaption.textContent = button.dataset.previewCaption || originalPreview.caption;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalImage.src = originalPreview.src;
    modalImage.alt = originalPreview.alt;
    modalCaption.textContent = originalPreview.caption;
  };
  document.querySelectorAll(".project-image-button").forEach(button => {
    button.addEventListener("click", () => openModal(button));
  });
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

  $("#year").textContent = new Date().getFullYear();
})();