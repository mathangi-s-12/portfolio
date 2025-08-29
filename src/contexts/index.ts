import { createContext } from "react";

import type {
  ContentContextType,
  ThemeContextType,
} from "@types-and-interfaces/interfaces";

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

const ContentContext = createContext<ContentContextType>({
  loading: false,
  data: [],
});

const ThemeContextProvider = ThemeContext.Provider;
const ContentContextProvider = ContentContext.Provider;

export {
  ThemeContext,
  ContentContext,
  ThemeContextProvider,
  ContentContextProvider,
};
