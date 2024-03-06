'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const themes: string[] = ['light', 'dark', 'pink', 'red', 'blue'];

  // Determine the default theme
  const defaultTheme: string = resolvedTheme || 'light';

  const toggleTheme = () => {
    if (theme) {
      const currentIndex = themes.indexOf(theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      setTheme(themes[nextIndex]);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-600 text-white rounded-md"
    >
      Toggle Theme (Current Theme: {theme || defaultTheme})
    </button>
  );
}

export default ThemeToggle;
