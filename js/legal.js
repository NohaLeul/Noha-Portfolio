(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector("#themeToggle");
  const nav = document.querySelector("#mainNav");
  const menuToggle = document.querySelector("#menuToggle");
  const savedTheme = localStorage.getItem("noha-portfolio-theme");
  if (savedTheme === "dark") root.dataset.theme = "dark";
  const updateIcon = () => {
    const dark = root.dataset.theme === "dark";
    const icon = document.querySelector(".theme-icon");
    if (icon) icon.textContent = dark ? "☀" : "☾";
    if (themeButton) themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  };
  updateIcon();
  themeButton?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("noha-portfolio-theme", root.dataset.theme);
    updateIcon();
  });
  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));
  document.querySelectorAll("[data-current-year]").forEach(el => el.textContent = new Date().getFullYear());
})();