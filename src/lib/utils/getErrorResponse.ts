import { isAxiosError } from 'axios';

// 에러 객체 메세지로 변환
export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string };
    return data?.message ?? error.message;
  }

  if (error instanceof Error) return error.message;
  return '오류가 발생했습니다.';
};

// 에러 상태
export const getErrorStatus = (error: unknown): number | undefined => {
  if (isAxiosError(error)) {
    return error.response?.status;
  }
  return undefined;
};

// 에러 코드
export const getErrorCode = (error: unknown): unknown | undefined => {
  if (isAxiosError(error)) {
    return error.code;
  }
  return undefined;
};
