"use strict";

// Theme script as separate file loaded first to avoid white flash
function setTheme() {
  document.documentElement.setAttribute("theme", theme);

  try {
    localStorage.theme = theme;
  } catch (_unused) {}
}

try {
  var theme = localStorage.theme;
} catch (_unused2) {
  console.error("Could not read localStorage, using defaults");
}

if (theme === undefined) {
  theme = "dark";
}

if (theme === "dark") {
  setTheme();
} else {
  theme = "light";
}

//# sourceMappingURL=theme.js.map