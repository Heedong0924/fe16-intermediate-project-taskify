import Link from 'next/link';

import Input from '@/components/common/Input';

const LoginPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <form className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Input label="이메일" type="email" />
          <Input label="비밀번호" type="password" />
        </div>
        <button
          className="bg-violet-primary w-full rounded-lg py-2 text-white"
          type="submit"
        >
          로그인
        </button>
      </form>
      <p className="">
        회원이 아니신가요?{' '}
        <Link href="/auth/register" className="text-violet-primary">
          회원가입
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
