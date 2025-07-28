// src/lib/validationRules.ts
/**
 * 유효성 검사 규칙 모음
 * - 이메일, 닉네임, 비밀번호, 비밀번호 확인에 대한 유효성 검사 규칙을 정의
 * - React Hook Form에서 사용하기 위한 규칙
 */

/**
 * 이메일 유효성 검사 규칙
 * - 필수 입력
 * - 올바른 이메일 형식
 */
export const emailValidation = {
  required: '이메일을 입력해주세요',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '유효한 이메일이 아닙니다',
  },
};

/**
 * 닉네임 유효성 검사 규칙
 * - 필수 입력
 * - 최소 2자 이상
 */
export const nicknameValidation = {
  required: '닉네임을 입력해주세요',
  minLength: { value: 2, message: '2자 이상 입력해주세요' },
};

/**
 * 비밀번호 유효성 검사 규칙
 * - 필수 입력
 * - 최소 8자 이상
 */
export const passwordValidation = {
  required: '비밀번호를 입력해주세요',
  minLength: { value: 8, message: '8자 이상 입력해주세요' },
};

/**
 * 비밀번호 확인용 유효성 검사 규칙
 * @param getValues - useForm에서 제공되는 현재 필드 값 조회 함수
 */
export const confirmPasswordValidation = (
  getValues: () => { password: string },
) => ({
  required: '비밀번호 확인을 입력해주세요',
  validate: (value: string) =>
    value === getValues().password || '비밀번호가 일치하지 않습니다',
});

/**
 * 대시보드 이름 유효성 검사 규칙
 * - 필수 입력
 * - 빈 공백 X
 */
export const dashboardTitleValidation = {
  required: '대시보드 이름을 입력해주세요',
  validate: (value: string) => {
    const trimmed = value.trim();
    return (
      (trimmed.length !== 0 || '공백은 대시보드 이름으로 입력할 수 없습니다') &&
      (trimmed.length <= 20 || '20자 이하 입력해주세요')
    );
  },
};
