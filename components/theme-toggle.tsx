"use client";

import { useEffect, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nova-theme");
    const shouldUseDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", shouldUseDark);
    setDark(shouldUseDark);
    setHydrated(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("nova-theme", next ? "dark" : "light");
    setDark(next);
  };

  if (!hydrated) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/40 bg-white/80 text-slate-900 dark:border-white/20 dark:bg-white/10 dark:text-white"
      >
        <SunMedium className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/40 bg-white/80 text-slate-900 transition hover:scale-105 dark:border-white/20 dark:bg-white/10 dark:text-white"
    >
      {dark ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
    </button>
  );
}
