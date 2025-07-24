'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';

import Button from '@/components/ui/Buttons';
import {
  useDashboard,
  useUpdateDashboard,
  useDeleteDashboard,
} from '@/hooks/useDashboardEdit';

import DashboardInvitations from './components/DashboardInvitations';
import DashboardMembers from './components/DashboardMembers';
import DashboardUpdate from './components/DashboardUpdate';

export default function DashboardEditPage() {
  const { dashboardsId } = useParams();

  // ID 체크
  const id = Number(dashboardsId);
  if (Number.isNaN(id)) {
    notFound();
  }

  const { data: dashboardData, isLoading, isError } = useDashboard(id);

  // 서버 에러 404 처리
  if (isError) {
    notFound();
  }

  const mutation = useUpdateDashboard(id);

  // 삭제
  const deleteMutation = useDeleteDashboard();

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

      {/* 대시보드 타이틀, 컬러 수정 */}
      <DashboardUpdate
        dashboard={dashboardData}
        isLoading={isLoading}
        // isError={dashboardQuery.isError}
        onUpdate={(data) => mutation.mutate(data)}
      />

      {/* 구성원 */}
      <DashboardMembers dashboardsId={id} />

      {/* 초대 내역 */}
      <DashboardInvitations dashboardsId={id} />

      {/*  대시보드 삭제하기 */}
      <Button
        color="white-black"
        className="btn-removeDash w-full border border-[#D9D9D9] bg-transparent md:w-[320px]"
        onClick={() => deleteMutation.mutate(id)}
      >
        대시보드 삭제하기
      </Button>
    </div>
  );
}
