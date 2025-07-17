// src/app/fonts/pretendard.ts
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {
      path: './Pretendard-Thin.woff2', // Thin
      weight: '100',
      style: 'normal',
    },
    {
      path: './Pretendard-ExtraLight.woff2', // ExtraLight
      weight: '200',
      style: 'normal',
    },
    {
      path: './Pretendard-Regular.woff2', // Regular
      weight: '400', // 기본 굵기
      style: 'normal',
    },
    {
      path: './Pretendard-Medium.woff2', // Medium
      weight: '500',
      style: 'normal',
    },
    {
      path: './Pretendard-SemiBold.woff2', // SemiBold
      weight: '600',
      style: 'normal',
    },
    {
      path: './Pretendard-Bold.woff2', // Bold
      weight: '700',
      style: 'normal',
    },
    {
      path: './Pretendard-ExtraBold.woff2', // ExtraBold
      weight: '800',
      style: 'normal',
    },
    {
      path: './Pretendard-Black.woff2', // Black
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap', // 폰트 로딩 전략: 폰트가 로드될 때까지 텍스트를 숨기지 않고 임시로 표시
  variable: '--font-pretendard', // CSS 변수 이름 설정
});

export default pretendard;
