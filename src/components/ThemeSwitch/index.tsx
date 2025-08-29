// Libs
import { useContext } from "react";
// Contexts
import { ThemeContext } from "@src/contexts";
// Styles
import "./index.css";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isThemeDark = theme === "dark";

  return (
    <div
      className={`theme-switch-container ${
        isThemeDark
          ? "bg-(image:--bg-sunset-gradient)"
          : "bg-(image:--bg-sunrise-gradient)"
      }`}
      onClick={() => {
        toggleTheme();
      }}
    >
      <div className="glow" />
      {isThemeDark ? <div className="stars" /> : null}
      <div
        className={`spinner ${
          isThemeDark ? "rotate-[var(--angle-180)]" : "rotate-[var(--angle-0)]"
        }`}
      >
        <div className="sun">
          <div className="ray1" />
          <div className="ray2" />
          <div className="ray3" />
          <div className="ray4" />
        </div>
        <div className="moon" />
      </div>
    </div>
  );
};

export default ThemeSwitch;
