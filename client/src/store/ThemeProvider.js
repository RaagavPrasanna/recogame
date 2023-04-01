import { useState } from 'react';
import ThemeContext from './theme-context';

function ThemeProvider({ children }) {
  const [light, setLight] = useState(false);

  const setTheme = () => {
    const isLight = !light;
    setLight(isLight);
  };

  const theme = light ? 'dark' : 'light';

  const themeContext = {
    theme: theme,
    setTheme: setTheme,
  };

  return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;