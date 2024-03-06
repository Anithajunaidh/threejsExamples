// ThemeContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { lightTheme, darkTheme, purpleTheme } from './theme';
import { Theme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
  getThemeObject: () => Theme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'purple' : 'light'
    );
  };

  const getThemeObject = () => {
    switch (theme) {
      case 'dark':
        return darkTheme;
      case 'purple':
        return purpleTheme;
      default:
        return lightTheme;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getThemeObject }}>
      <MuiThemeProvider theme={getThemeObject()}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
