import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Initialize theme from localStorage or prefers-color-scheme
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark-theme", saved === "dark");
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.classList.toggle("dark-theme", initial === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark-theme", next === "dark");
    localStorage.setItem("theme", next);
  };

  const logout = async () => {
    await auth.signOut();
    navigate("/", { replace: true });
  };

  return (
    <nav className="theme-header shadow-lg p-4 rounded-xl mb-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold tracking-wide" style={{ color: "var(--header-text)" }}>
            🔗 LinkVault
          </div>
          <div className="text-sm text-white/60" style={{ color: "var(--header-text)" }}>
            <span className="hidden sm:inline">Your personal links manager</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to dark" : "Switch to light"}
            className="flex items-center gap-2 px-3 py-2 transition duration-200 theme-toggle-btn"
            style={{ borderRadius: 9999 }}
          >
            {theme === "light" ? (
              // Moon icon for dark mode target
              <svg className="theme-toggle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
              </svg>
            ) : (
              // Sun icon for light mode target
              <svg className="theme-toggle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.04 2.05l1.79-1.8-1.79-1.79-1.8 1.79 1.8 1.8zM17.24 19.16l1.8 1.79 1.79-1.79-1.79-1.8-1.8 1.8zM20 11v2h3v-2h-3zM12 20v3h2v-3h-2zM4.22 18.36l-1.8 1.79 1.79 1.79 1.8-1.79-1.79-1.79z" fill="currentColor" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            )}
            <span className="hidden sm:inline" style={{ color: "var(--btn-text)" }}>
              {theme === "light" ? "Dark" : "Light"}
            </span>
          </button>

          {auth.currentUser?.email && (
            <span className="text-sm sm:text-base font-medium truncate max-w-[180px] sm:max-w-xs text-center" style={{ color: "var(--header-text)" }}>
              {auth.currentUser.email}
            </span>
          )}

          <button
            onClick={logout}
            className="btn-ghost font-semibold px-4 py-2 rounded-full transition duration-200"
            style={{ color: "var(--btn-text)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
