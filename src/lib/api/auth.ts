// src/api/auth.ts

import axiosInstance from '../axiosInstance';

/**
 * 회원가입 요청 API
 * @param data - 회원가입 정보
 * @returns 회원가입 성공 시 사용자 정보
 * @throws 에러 발생 시 에러 메시지
 *  - "message": "이메일 형식으로 작성해주세요."
 *  - "message": "이미 사용중인 이메일입니다."
 *
 */
export interface SignupRequest {
  email: string;
  username: string;
  password: string;
}

export interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const postSignup = async (
  data: SignupRequest,
): Promise<SignupResponse> => {
  const res = await axiosInstance.post<SignupResponse>('/auth/signup', data);
  return res.data;
};

/**
 * 로그인 요청 API
 * @param data - 로그인 정보
 * @returns 로그인 성공 시 사용자 정보
 *
 */
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
