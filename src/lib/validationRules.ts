// src/lib/validationRules.ts
export const emailValidation = {
  required: '이메일을 입력해주세요',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '유효한 이메일이 아닙니다',
  },
};

export const passwordValidation = {
  required: '비밀번호를 입력해주세요',
  minLength: { value: 8, message: '8자 이상 입력해주세요' },
};
