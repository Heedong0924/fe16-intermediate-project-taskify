'use client';

import clsx from 'clsx';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeChanger = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // React 서버 컴포넌트 환경에서 hydration 오류를 방지하기 위해 이 패턴을 권장
  // 서버와 클라이언트에서 렌더링 결과가 달라지는 것을 방지
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const buttonClasses = clsx(
    'group fixed right-6 bottom-6 z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-3 shadow-lg transition-all duration-200 opacity-50 hover:opacity-100 md:h-16 md:w-16 overflow-hidden',
    {
      'border-orange-400 bg-gradient-to-br from-yellow-200 to-yellow-400':
        resolvedTheme === 'light',
      'dark:border-blue-50 dark:bg-gradient-to-br dark:from-blue-400 dark:to-blue-600':
        resolvedTheme === 'dark',
    },
  );

  return (
    <button
      type="button"
      className={buttonClasses}
      aria-label="테마 체인지 버튼"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {/* ☀️ 해 아이콘 - Light 모드일 때만 아래에서 위로 나타남 */}
      <div
        className={clsx(
          'absolute inset-0 flex items-center justify-center transition-transform duration-300',
          {
            'translate-y-0': resolvedTheme === 'light',
            'translate-y-full': resolvedTheme !== 'light',
          },
        )}
      >
        <Sun className="h-9 w-9 fill-orange-400 stroke-orange-400 shadow-inner transition-transform duration-200 group-hover:scale-110 md:h-10 md:w-10" />
      </div>

      {/* 🌙 달 아이콘 - Dark 모드일 때만 아래에서 위로 나타남 */}
      <div
        className={clsx(
          'absolute inset-0 flex items-center justify-center transition-transform duration-300',
          {
            'translate-y-0': resolvedTheme === 'dark',
            'translate-y-full': resolvedTheme !== 'dark',
          },
        )}
      >
        <MoonStar className="h-7 w-7 fill-blue-100 stroke-blue-100 shadow-inner transition-transform duration-200 group-hover:scale-115 md:h-8 md:w-8" />
      </div>
    </button>
  );
};

export default ThemeChanger;
