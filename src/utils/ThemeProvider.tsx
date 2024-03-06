import { ReactNode, useEffect, useState } from 'react';

const colors = ['green', 'red', 'blue'];
const modes = ['light', 'dark'];

function useStickyState(defaultValue: string | undefined, key: string): [string | undefined, (v: string) => void] {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    const stickyValue = localStorage.getItem(key);
    if (stickyValue !== null) {
      setValue(stickyValue);
    }
  }, [key, setValue]);

  return [value, (v: string) => {
    localStorage.setItem(key, v);
    setValue(v);
  }];
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
   const [color, setColor] = useStickyState(colors[0], 'theme-color');
   const [mode, setMode] = useStickyState(modes[0], 'theme-mode');

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };
  useEffect(() => {
  
  }, [color, mode]);

  return (
    <div className={[
      'font-mono bg-primaryBg h-screen',
      color && `theme-${color}`,
      mode && `theme-${mode}`,
    ].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
