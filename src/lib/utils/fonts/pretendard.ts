// src/lib/utils/fonts/pretendard.ts
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export default pretendard;
