
import React, { createContext, useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme preference is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check user's system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      return savedTheme as Theme;
    }
    
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    // Apply transition classes to all relevant elements
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    
    // Update the HTML document class when theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);

    // Add consistent transition to various elements for smoother theme switching
    const elements = document.querySelectorAll('button, a, div, section, card, span, p, h1, h2, h3, h4, h5, h6');
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.transition = 'background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, transform 0.3s ease';
      }
    });

    // Reset transition after theme change is complete
    const timer = setTimeout(() => {
      // Keep transition for hover effects but remove it for the initial theme change
      document.body.style.transition = '';
    }, 700);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    // Add custom transition for specific elements that need it
    document.querySelectorAll('.card, .pattern-bg, .islamic-pattern').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.transition = 'background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, transform 0.3s ease';
      }
    });
    
    // Play a subtle animation when theme changes
    const body = document.querySelector('body');
    if (body) {
      body.classList.add('theme-changing');
      setTimeout(() => body.classList.remove('theme-changing'), 500);
    }
    
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
