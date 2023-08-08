const themeFromStorage = localStorage.getItem("theme");

if (
  themeFromStorage === "dark" ||
  (themeFromStorage !== "light" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
