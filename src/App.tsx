// Libs
import { useState, useEffect } from "react";
// Contexts
import { ThemeContextProvider } from "@src/contexts";
// Pages
import HomePage from "@src/pages/HomePage";
// Types
import type { Theme } from "./types-and-interfaces/types";
// Styles
import "./App.css";

function App() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContextProvider value={{ theme, toggleTheme }}>
      <HomePage />
    </ThemeContextProvider>
  );
}

export default App;
