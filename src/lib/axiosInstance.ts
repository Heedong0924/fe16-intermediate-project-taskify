import axios, { AxiosError } from 'axios';

import { useAuthStore } from '@/stores/useAuthStore';
// 혹시 환경 변수에 설정 안되어 있는 분들을 위해서..
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://sp-taskify-api.vercel.app/2/';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  // JSON 응답을 Date 객체로 변환
  transformResponse: [
    (data) => {
      try {
        return JSON.parse(data, (key, value) => {
          if (key === 'createdAt' || key === 'updatedAt') {
            return new Date(value);
          }
          return value;
        });
      } catch {
        // JSON이 아닌 경우(예: "Not Found") 그대로 반환
        return data;
      }
    },
  ],
});

// 엑세스 토큰을 요청 헤더에 추가하는 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // JWT 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// API 에러 인터페이스
interface APIError {
  message: string;
}

// 에러 핸들링 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<APIError>) => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || error.message;
      console.error(`[API Error][${status}]: ${message}`);
    } else {
      console.error(`[Network Error]: ${error.message}`);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
