// src/api/auth.ts

import { User } from '@/types/User.type';

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

// 사용자 정보 인터페이스(서버에서 오는 데이터 구조)
// 사용자 정보와 생성/수정 날짜 포함
interface ServeUser extends User {
  createdAt: Date;
  updatedAt: Date;
}

// 회원가입 요청 바디 인터페이스
export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

// 회원가입 응답 인터페이스
// 사용자 정보와 생성/수정 날짜 포함
export type SignupResponse = ServeUser;

export const postSignup = async (
  data: SignupRequest,
): Promise<SignupResponse> => {
  const res = await axiosInstance.post<SignupResponse>('users', data);
  return res.data;
};

/**
 * 로그인 요청 API
 * @param data - 로그인 정보
 * @returns 로그인 성공 시 사용자 정보
 *
 */

// 로그인 요청 바디 인터페이스
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 인터페이스
export interface LoginResponse {
  accessToken: string;
  user: ServeUser;
}

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>('auth/login', data);
  return res.data;
};

/**
 * 내 정보 조회 API
 * @returns 내 정보
 * @throws 에러 발생 시 에러 메시지
 *  -
 */
export type MyInfoResponse = ServeUser;

export const getMyInfo = async (): Promise<MyInfoResponse> => {
  const res = await axiosInstance.get<MyInfoResponse>('users/me');
  return res.data;
};
