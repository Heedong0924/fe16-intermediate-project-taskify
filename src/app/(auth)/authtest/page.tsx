'use client';

import { useAuth } from '@/hooks/useAuth';

const AuthTestPage = () => {
  const { isAuth, user, logout } = useAuth();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-4 ring-2 ring-violet-600">
      <h1>Auth Test Page</h1>
      <p>당신은 {isAuth ? '로그인 상태입니다.' : '로그인 상태가 아닙니다.'}</p>
      {isAuth && (
        <div>
          <p>사용자 정보:</p>
          {isAuth && user && (
            <ul>
              <li>ID: {user.id}</li>
              <li>Email: {user.email}</li>
              <li>Nickname: {user.nickname}</li>
              <li />
            </ul>
          )}
          <button
            type="button"
            className="rounded bg-violet-600 px-4 py-2 text-white"
            onClick={() => logout()}
          >
            로그아웃
          </button>
        </div>
      )}
      {!isAuth && <p>로그인 후 사용자 정보를 확인할 수 있습니다.</p>}
    </div>
  );
};

export default AuthTestPage;
