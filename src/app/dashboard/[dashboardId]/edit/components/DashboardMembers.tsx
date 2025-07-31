import Image from 'next/image';
import { useState } from 'react';

import { ContentSectionWithAction } from '@/components/common/ContentSection';
import { UserProfile } from '@/components/common/Profile';
import Button from '@/components/ui/Buttons';
import PaginationButton from '@/components/ui/PaginationButton';
import SkeletonLine from '@/components/ui/SkeletonLIne';
import { useDashboard } from '@/hooks/useDashboardEdit';
import {
  useDashboardMember,
  useDeleteMember,
} from '@/hooks/useDashboardMember';
import { useSkeleton } from '@/hooks/useSkeleton';

export default function DashboardMembers({
  dashboardId,
  isSkeletonVisible,
}: {
  dashboardId: number;
  isSkeletonVisible: boolean;
}) {
  const [page, setPage] = useState(1);
  const size = 4;

  const { data } = useDashboardMember({
    page,
    size,
    dashboardId,
  });

  const { data: dashboardData } = useDashboard(dashboardId);
  const { showSkeleton, isFadingOut } = useSkeleton(isSkeletonVisible, 1200);
  const shouldShowSkeleton = showSkeleton || !dashboardData;

  const deleteMutation = useDeleteMember();

  return (
    <ContentSectionWithAction
      className="dashboard-section-action-item !pb-[16px] md:!pb-[20px]"
      title={
        shouldShowSkeleton ? (
          <SkeletonLine className="h-10 w-[100%]" isFadingOut={isFadingOut} />
        ) : (
          '구성원'
        )
      }
      titleRight={
        shouldShowSkeleton ? (
          <SkeletonLine className="h-10 w-[135px]" isFadingOut={isFadingOut} />
        ) : (
          <PaginationButton
            page={page}
            size={size}
            totalCount={data?.totalCount}
            onPageChange={setPage}
          />
        )
      }
    >
      <div className="mt-[18px] h-[264px] md:mt-[27px] md:h-[291px]">
        {shouldShowSkeleton ? (
          <div className="h-full px-[20px] md:px-[28px]">
            <SkeletonLine className="h-full w-full" isFadingOut={isFadingOut} />
          </div>
        ) : (
          <>
            <h2 className="px-[20px] text-base text-[var(--gray-D9D9D9)] md:px-[28px] md:text-[16px]">
              이름
            </h2>
            <ul className="divide-y">
              {data?.members.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-between px-[20px] py-[12px] last:pb-0 md:px-[28px] md:py-[16px]"
                >
                  <UserProfile
                    profileImg={member.profileImageUrl}
                    userName={member.nickname}
                  />
                  {!member.isOwner ? (
                    <Button
                      // 경고 모달창 추가하기
                      onClick={() => deleteMutation.mutate(member.id)}
                      color="white-violet"
                      className="btn-one !rounded-[4px] border border-[var(--gray-D9D9D9)] text-[12px] md:!text-[14px]"
                    >
                      삭제
                    </Button>
                  ) : (
                    <span className="flex w-[52px] justify-center">
                      <Image
                        src="/images/icon/crown.svg"
                        alt="방장"
                        width={20}
                        height={20}
                      />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </ContentSectionWithAction>
  );
}
