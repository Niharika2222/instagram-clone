// ThemeContext.js
import React, {createContext, useState, useContext} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  // Define other light mode colors
};

const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  // Define other dark mode colors
};
