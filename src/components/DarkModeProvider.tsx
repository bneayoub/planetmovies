'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    document.documentElement.classList.add('transition');
    setIsDarkMode(prev => !prev);
    setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, 1000);
  };

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-2 bg-skin-fill text-skin-base rounded-full hover:bg-skin-button-accent-hover transition-colors"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      {children}
    </>
  );
};