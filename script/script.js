const sidebar = document.querySelector("#primary-sidebar");
const openButton = document.querySelector("#open-sidebar");
const closeButton = document.querySelector("#close-sidebar");
const desktopLayout = window.matchMedia("(min-width: 1024px)");

function setSidebarOpen(isOpen) {
  const isDesktop = desktopLayout.matches;
  const shouldHide = !isDesktop && !isOpen;

  sidebar.hidden = shouldHide;
  sidebar.setAttribute("aria-hidden", String(shouldHide));
  openButton.hidden = isDesktop;
  openButton.setAttribute("aria-expanded", String(!isDesktop && isOpen));
  closeButton.hidden = isDesktop;
}

openButton.addEventListener("click", () => setSidebarOpen(true));
closeButton.addEventListener("click", () => setSidebarOpen(false));

sidebar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (!desktopLayout.matches) {
      setSidebarOpen(false);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !desktopLayout.matches) {
    setSidebarOpen(false);
    openButton.focus();
  }
});

desktopLayout.addEventListener("change", () => setSidebarOpen(false));
setSidebarOpen(false);