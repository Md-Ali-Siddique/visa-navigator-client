import { useEffect, useState } from "react";

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "visa-dark"
    : "visa-light";
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "visa-light" ? "visa-dark" : "visa-light"));

  return { theme, toggleTheme };
};

export default useTheme;
