const themes = new Set(["dark", "light"]);
const buttons = document.querySelectorAll("[data-theme]");

function setTheme(theme) {
  const selected = themes.has(theme) ? theme : "light";
  document.documentElement.dataset.theme = selected;
  buttons.forEach((button) => {
    const active = button.dataset.theme === selected;
    button.classList.toggle("selected", active);
    button.setAttribute("aria-pressed", String(active));
  });
  try { localStorage.setItem("fynske-theme", selected); } catch (_) {}
}

let saved = "light";
try { saved = localStorage.getItem("fynske-theme") || "light"; } catch (_) {}
setTheme(saved === "nordic" ? "light" : saved);
buttons.forEach((button) => button.addEventListener("click", () => setTheme(button.dataset.theme)));

const backToTop = document.querySelector(".back-to-top");
function updateBackToTop() {
  backToTop.classList.toggle("visible", window.scrollY > 420);
}
window.addEventListener("scroll", updateBackToTop, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
updateBackToTop();
