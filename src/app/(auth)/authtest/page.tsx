'use client';

import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';
import { getMyInfo } from '@/lib/api/auth';

/**
 *
 * 회원가입 후 사용자 정보를 확인할 수 있는 테스트 페이지
 * - 로그인 상태 확인
 * - 사용자 정보 표시
 * - 로그아웃 버튼
 * - 내 프로필 조회 버튼 (서버에서 사용자 정보 조회)
 * - 로그인 페이지로 이동 링크
 *
 */

const AuthTestPage = () => {
  const { isAuth, user, logout } = useAuth();
  const [{ data, refetch }] = useQueries({
    queries: [
      {
        queryKey: ['userProfile'],
        queryFn: getMyInfo,
        enabled: false,
      },
    ],
  });
  const handleMyProfile = () => {
    refetch();
    alert(`내 프로필: ${JSON.stringify(data)}`);
  };
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
          <div className="flex w-full items-center justify-center">
            <button
              type="button"
              className="m-3 rounded bg-violet-600 px-4 py-2 text-white"
              onClick={() => logout()}
            >
              로그아웃
            </button>

            <button
              type="button"
              className="m-3 rounded bg-violet-600 px-4 py-2 text-white"
              onClick={handleMyProfile}
            >
              서버에서 내 프로필 보기
            </button>
          </div>
        </div>
      )}
      {!isAuth && (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p>로그인 후 사용자 정보를 확인할 수 있습니다.</p>
          <Link className="rounded bg-violet-600 text-white" href="/login">
            로그인하러 가기
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthTestPage;
