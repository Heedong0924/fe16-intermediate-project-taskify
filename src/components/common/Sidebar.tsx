'use client';

// 기능 - 대시보드 생성 버튼 클릭시 생성 모달, 대시보드 리스트 클릭시 link-대시보드 상세 페이지
// api 받아오기 "BASE_URL/dashboards"
//      내가만든 대시보드 끝에 왕관?
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { mockDashboardData } from '@/mock/mockDashboardData';
import Dashboard from '@/types/Dashboard';

import { LogoMd } from '../ui/SVGLogo';

const Sidebar = () => {
  const [dashboards, setDashboars] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDashboards = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await mockDashboardData();
        setDashboars(data.dashboards);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('데이터 페치 실패:', err);
        }
        setError('대시보드를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getDashboards();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-lg font-medium">
        대시보드를 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-lg font-medium text-red-500">
        {error}
      </div>
    );
  }

  return (
    <aside className="text-taskify-neutral-500 bg-taskify-neutral-0 left-0ntop-0 fixed z-40 hidden h-full min-h-screen w-[160px] shadow-md md:block xl:w-[300px]">
      <div className="px-2 py-5">
        <Link href="/">
          <LogoMd />
        </Link>
        <div className="mt-14">
          <button
            // onClick={대시보드 생성 모달}
            className="hover:bg-taskify-neutral-200 mb-[15px] flex h-5 w-full items-center justify-between"
            type="button"
          >
            <div className="text-taskify-md-semibold my-4 flex justify-between">
              Dash Boards
            </div>
            <div className="w-5">+</div>
          </button>
          <div className="">
            {/* 대시보드 리스트 - map으로 api 요청받아온 리스트 - 재사용 가능한가?
            ㅇㅇ 내 대시보드 리스트랑 같음 맡기자 이건 여기도 무한스크롤? ㄴㄴ
            페이지네이션 시안상으론 15개씩 */}
            {dashboards.map((dashboard) => (
              <Link
                key={dashboard.id}
                href={`/dashboard/${dashboard.id}`}
                className="hover:bg-taskify-neutral-200 flex h-[42px] items-center justify-between px-[10px] py-[7px] transition-colors duration-20"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className="bg- h-2 w-2 rounded-full"
                    style={{ backgroundColor: dashboard.color }}
                  />
                  <span className="text-taskify-lg-medium overflow-hidden text-ellipsis whitespace-nowrap">
                    {dashboard.title}
                  </span>
                </div>
                {dashboard.createdByMe && (
                  <span
                    className="ml-auto text-lg text-yellow-300"
                    title="내가 만든 대시보드"
                  >
                    ♛
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
