const themes = new Set(["morning", "day", "evening"]);
const buttons = document.querySelectorAll("[data-theme]");

function setTheme(theme) {
  const selected = themes.has(theme) ? theme : "day";
  document.documentElement.dataset.theme = selected;
  buttons.forEach((button) => {
    const active = button.dataset.theme === selected;
    button.classList.toggle("selected", active);
    button.setAttribute("aria-pressed", String(active));
  });
  try { localStorage.setItem("fynske-theme", selected); } catch (_) {}
}

let saved = "day";
try { saved = localStorage.getItem("fynske-theme") || "day"; } catch (_) {}
if (saved === "dark") saved = "evening";
if (saved === "nordic" || saved === "light") saved = "day";
setTheme(saved);
buttons.forEach((button) => button.addEventListener("click", () => setTheme(button.dataset.theme)));

const backToTop = document.querySelector(".back-to-top");
function handleScroll() { backToTop.classList.toggle("visible", window.scrollY > 420); }
window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const galleryButtons = [...document.querySelectorAll("[data-lightbox]")];
const lightbox = document.querySelector(".lightbox");
if (lightbox && galleryButtons.length) {
  const largeImage = lightbox.querySelector("figure img");
  const caption = lightbox.querySelector("figcaption");
  let activeIndex = 0;

  function showImage(index) {
    activeIndex = (index + galleryButtons.length) % galleryButtons.length;
    const thumbnail = galleryButtons[activeIndex].querySelector("img");
    const text = galleryButtons[activeIndex].closest("figure").querySelector("figcaption").textContent;
    largeImage.src = thumbnail.src;
    largeImage.alt = thumbnail.alt;
    caption.textContent = `${text} · ${activeIndex + 1} / ${galleryButtons.length}`;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  galleryButtons.forEach((button, index) => button.addEventListener("click", () => openLightbox(index)));
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", (event) => { event.stopPropagation(); showImage(activeIndex - 1); });
  lightbox.querySelector(".lightbox-next").addEventListener("click", (event) => { event.stopPropagation(); showImage(activeIndex + 1); });
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
  });
}
