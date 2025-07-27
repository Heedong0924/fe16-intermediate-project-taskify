/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      /*
      이미지 최적화 도메인 설정
      예시:
      {
        protocol: "https",
        hostname: "nextjs.org", // Next.js 로고가 있는 도메인
        port: "",
        pathname: "/icons/**",
      },
      */
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Picsum 도메인 (테스트 이미지)
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Placehold 도메인 (Placehold 이미지)
      },
    ],
  },
  env: {
    // 클라이언트 사이드 코드에서도 접근 가능한 환경 변수
    // 접두사는 NEXT_PUBLIC_ 으로 시작
    // 예시: NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // 서버 사이드에서만 접근 가능한 환경 변수는 .env.local 또는 .env 파일에만 두세요.
  },
  async redirects() {
    return [
      /*
      {
        source: "/old-path", // 사용자가 접근하는 이전 경로
        destination: "/new-path", // 리다이렉트될 새 경로
        permanent: true, // true: 영구 리다이렉트 (301) false: 임시 리다이렉트 (307)
      },
      */
    ];
  },
};

export default nextConfig;
