const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");

function updateThemeButton() {
  if (root.classList.contains("dark")) {
    themeButton.setAttribute("aria-label", "Switch to light mode");
  } else {
    themeButton.setAttribute("aria-label", "Switch to dark mode");
  }
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
  root.classList.add("dark");
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  root.classList.toggle("dark");
  updateThemeButton();

  if (root.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
