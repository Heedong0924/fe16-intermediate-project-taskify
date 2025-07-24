'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ContentSectionWithAction } from '@/components/common/ContentSection';
import Button from '@/components/ui/Buttons';
import { useDashboard, useUpdateDashboard } from '@/hooks/useDashboardEdit';

import DashboardMembers from './components/DashboardMembers';
import DashboardUpdate from './components/DashboardUpdate';

export default function DashboardEditPage() {
  const { dashboardsId } = useParams();

  // 임시보드
  const isTemp = dashboardsId === 'temp';
  const id = isTemp ? null : Number(dashboardsId);

  const dashboardQuery = useDashboard(id!);

  console.log(dashboardQuery);

  // http://localhost:3000/dashboard/temp/edit 임시 보드
  const tempDashboard = {
    id: '-1',
    title: '새 대시보드123',
    color: '#76A5EA', // 기본 색상
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 조건 분기: 임시 보드면 훅 호출 X
  const queryResult = isTemp
    ? { data: tempDashboard, isLoading: false, isError: false }
    : dashboardQuery;

  const mutation = useUpdateDashboard(id ?? 0);

  return (
    <div className="min-h-screen bg-[var(--gray-FAFAFA)] p-[20px]">
      {/* 뒤로가기 */}
      <nav className="mb-[34px]">
        <Link
          href={`/dashboard/${dashboardsId}`}
          className="flex items-center gap-2"
        >
          <Image
            src="/images/arrow-left.svg"
            alt="돌아가기"
            width={20}
            height={20}
          />
          돌아가기
        </Link>
      </nav>

      {/* 대시보드 수정 */}
      <DashboardUpdate
        dashboard={queryResult.data}
        isLoading={queryResult.isLoading}
        isError={queryResult.isError}
        onUpdate={(data) => mutation.mutate(data)}
      />

      {/* 구성원 */}
      <DashboardMembers />

      {/* 초대 내역 */}
      <ContentSectionWithAction title="초대 내역" titleRight={<div>TEST</div>}>
        <p>콘텐츠</p>
      </ContentSectionWithAction>
      {/*  대시보드 삭제하기 */}
      <Button
        color="white-black"
        className="btn-removeDash w-full border border-[#D9D9D9] bg-transparent md:w-[320px]"
      >
        대시보드 삭제하기
      </Button>
    </div>
  );
}
