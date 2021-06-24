import { createContext, ReactNode, useEffect, useState } from "react";

import "./../styles/dark.scss";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storageValue = localStorage.getItem("theme");

    return (storageValue ?? "light") as Theme;
  });

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <div className={currentTheme}>
      <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  );
}
