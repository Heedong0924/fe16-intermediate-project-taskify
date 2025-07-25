import Image from 'next/image';
import { useState } from 'react';

import { ContentSectionWithAction } from '@/components/common/ContentSection';
import { UserProfile } from '@/components/common/Profile';
import Button from '@/components/ui/Buttons';
import PaginationButton from '@/components/ui/PaginationButton';
import {
  useDashboardMember,
  useDeleteMember,
} from '@/hooks/useDashboardMember';

export default function DashboardMembers({
  dashboardId,
}: {
  dashboardId: number;
}) {
  const [page, setPage] = useState(1);
  const size = 4;

  const { data, isPending, isError } = useDashboardMember({
    page,
    size,
    dashboardId,
  });

  const deleteMutation = useDeleteMember();

  if (isPending) return <p>로딩 중...</p>;
  // 404 페이지와 함께 모달 띄우기
  if (isError) return <p>실패...</p>;

  // 나일때는 삭제 버튼 삭제
  return (
    <ContentSectionWithAction
      className="min-h-[401px] !pb-[16px] sm:min-h-[410px] sm:!pb-[20px]"
      title="구성원"
      titleRight={
        <PaginationButton
          page={page}
          size={size}
          totalCount={data?.totalCount}
          onPageChange={setPage}
        />
      }
    >
      <h2 className="mt-[18px] px-[20px] text-base text-[var(--gray-D9D9D9)] sm:mt-[27px] sm:px-[28px] sm:text-[16px]">
        이름
      </h2>
      <ul className="divide-y">
        {data?.members.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between px-[20px] py-[12px] last:pb-0 sm:px-[28px] sm:py-[16px]"
          >
            {/* 반응형 사이즈 확인 */}
            <UserProfile
              profileImg={member.profileImageUrl}
              userName={member.nickname}
            />
            {!member.isOwner ? (
              <Button
                // 경고 모달창 추가하기
                onClick={() => deleteMutation.mutate(member.id)}
                color="white-violet"
                className="btn-one !rounded-[4px] border border-[var(--gray-D9D9D9)] text-[12px] sm:!text-[14px]"
              >
                삭제
              </Button>
            ) : (
              <Image
                src="/images/icon/crown.svg"
                alt="방장"
                width={20}
                height={20}
              />
            )}
          </li>
        ))}
      </ul>
    </ContentSectionWithAction>
  );
}
