import { useState } from 'react';

import { ContentSectionWithAction } from '@/components/common/ContentSection';
import { AvatarProfile, UserProfile } from '@/components/common/Profile';
import Button from '@/components/ui/Buttons';
import PaginationButton from '@/components/ui/PaginationButton';
import {
  useDashboardMember,
  useDeleteMember,
} from '@/hooks/useDashboardMember';

export default function DashboardMembers({
  dashboardsId,
}: {
  dashboardsId: number;
}) {
  const [page, setPage] = useState(1);
  const size = 4;

  const { data, isPending, isError } = useDashboardMember({
    page,
    size,
    dashboardId: dashboardsId,
  });

  const deleteMutation = useDeleteMember();

  if (isPending) return <p>로딩 중...</p>;
  // 404 페이지와 함께 모달 띄우기
  if (isError) return <p>실패...</p>;

  // 나일때는 삭제 버튼 삭제
  return (
    <ContentSectionWithAction
      className="min-h-[401px] !pb-[16px] md:min-h-[410px] md:!pb-[20px]"
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
      <h2 className="mt-[18px] px-[20px] text-base text-[var(--gray-D9D9D9)] md:mt-[27px] md:px-[28px] md:text-[16px]">
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
            <AvatarProfile
              userName={member.nickname}
              profileImg={member.profileImageUrl}
              size="md"
            />
            {!member.isOwner ? (
              <Button
                // 경고 모달창 추가하기
                onClick={() => deleteMutation.mutate(member.id)}
                color="white-violet"
                className="btn-one o !rounded-[4px] border border-[var(--gray-D9D9D9)] text-[12px] md:!text-[14px]"
              >
                삭제
              </Button>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    </ContentSectionWithAction>
  );
}
