import { ContentSectionWithAction } from '@/components/common/ContentSection';
import { UserProfile } from '@/components/common/Profile';
import Button from '@/components/ui/Buttons';
import PaginationButton from '@/components/ui/PaginationButton';

export default function DashboardMembers() {
  return (
    <ContentSectionWithAction
      title="구성원"
      titleRight={<PaginationButton page="" size="" totalCount="" />}
    >
      <div className="flex items-center justify-between">
        <UserProfile profileImg="" userName="이름" />
        <Button className="btn-one">삭제</Button>
      </div>
    </ContentSectionWithAction>
  );
}
