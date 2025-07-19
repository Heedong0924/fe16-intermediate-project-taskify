// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://sp-taskify-api.vercel.app/16-2',
  timeout: 5000, // 요청 타임아웃 (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
