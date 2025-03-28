/**
 * Theme Module - Handles dark/light mode functionality
 */

// Create and inject the theme toggle button
function createThemeToggle() {
  const nav = document.querySelector(".nav_");

  // Create the theme toggle button
  const themeToggle = document.createElement("div");
  themeToggle.id = "theme-toggle";
  themeToggle.className = "theme-toggle";
  themeToggle.setAttribute("title", "Toggle light/dark mode");

  // Get saved theme or use default
  const savedTheme = localStorage.getItem("theme") || "light";

  // Set initial icon based on saved theme
  themeToggle.innerHTML =
    savedTheme === "light"
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';

  // Insert the toggle button in the nav after the logo container but before the toggle menu
  const toggleMenu = document.querySelector(".toggleMenu");
  nav.insertBefore(themeToggle, toggleMenu);

  // Apply the saved theme
  document.body.classList.toggle("dark-theme", savedTheme === "dark");

  // Set up the toggle function
  themeToggle.addEventListener("click", () => {
    // Toggle theme class
    const isDarkMode = document.body.classList.toggle("dark-theme");

    // Update icon based on current theme
    themeToggle.innerHTML = isDarkMode
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';

    // Save preference
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
}

// Initialize the theme toggle
export function initTheme() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createThemeToggle);
  } else {
    createThemeToggle();
  }
}
