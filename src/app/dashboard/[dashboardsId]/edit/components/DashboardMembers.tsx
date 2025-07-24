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
  dashboardsId,
}: {
  dashboardsId: number;
}) {
  const [page, setPage] = useState(1);
  const size = 5;

  // isPending, isError
  const { data } = useDashboardMember({
    page,
    size,
    dashboardId: dashboardsId,
  });

  const deleteMutation = useDeleteMember();

  // 나일때는 삭제 버튼 삭제
  return (
    <ContentSectionWithAction
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
      {data?.members.map((member) => (
        <div key={member.id} className="flex items-center justify-between">
          <UserProfile profileImg="" userName={member.nickname} />
          <Button
            // 삭제 후 페이지 이동
            onClick={() => deleteMutation.mutate(member.id)}
            className="btn-one"
          >
            삭제
          </Button>
        </div>
      ))}
    </ContentSectionWithAction>
  );
}
