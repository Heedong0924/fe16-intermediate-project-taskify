'use client';

import { useTheme } from 'next-themes';

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="align-center fixed right-10 bottom-10 flex h-20 w-20 items-center justify-center rounded-full border bg-amber-500"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      테마체인저
    </button>
  );
};

export default ThemeChanger;
