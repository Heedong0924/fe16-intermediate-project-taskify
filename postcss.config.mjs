/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}', // App Router
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/globals.css', // <-- 이 부분이 중요합니다! globals.css 파일 자체도 스캔 대상에 포함
        // 필요한 경우 여기에 추가적인 경로를 명시합니다.
      ],
    },
    autoprefixer: {},
  },
};

export default config;
