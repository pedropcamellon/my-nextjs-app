"use client";

import { useState } from "react";

import ThemeContext from "@/context/themeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Get dark theme from local storage
  const themeFromStorage: boolean =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("theme") === "dark"
      : false;

  const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
        <div className="dark:text-white dark:bg-black text-[#1e1e1e]">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
