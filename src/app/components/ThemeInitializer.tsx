'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import { ReactNode, useEffect } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeInitailizer({ children }: ThemeProviderProps) {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) {
      const isSystemDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setTheme(isSystemDark ? 'dark' : 'light');
    }
  }, [resolvedTheme, setTheme]);

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
