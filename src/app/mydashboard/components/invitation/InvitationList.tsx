import { Invitation } from '@/types/Invitation';

import InvitationListItem from './InvitationListItem';
import NoResult from './Noresult';

type InvitationProps = {
  invitations: Invitation[];
  searchTerm: string;
};

const InvitationList = ({ invitations, searchTerm }: InvitationProps) => {
  // 검색 결과가 존재하지 않을 시 검색 결과 없음 출력
  if (invitations.length === 0 && searchTerm) {
    return <NoResult />;
  }

  return (
    <table className="w-full text-left">
      <thead className="bg-taskify-neutral-0 sticky top-0 z-10">
        {/* 여백용 빈 row. 테이블 헤드 고정 시 여백을 유지하기 위해 사용 */}
        <tr>
          <th
            colSpan={4}
            aria-hidden="true"
            className="bg-taskify-neutral-0 sticky h-6 border-none"
          >
            &nbsp;
          </th>
        </tr>
        <tr>
          <th className="text-taskify-lg-regular text-taskify-neutral-400 pl-[76px]">
            이름
          </th>
          <th className="text-taskify-lg-regular text-taskify-neutral-400">
            초대자
          </th>
          <th className="text-taskify-lg-regular text-taskify-neutral-400">
            초대한 시점
          </th>
          <th className="text-taskify-lg-regular text-taskify-neutral-400 pl-[65px]">
            수락 여부
          </th>
        </tr>
      </thead>
      <tbody>
        {invitations.map((invitation) => (
          <InvitationListItem
            key={invitation.id}
            invitation={invitation}
            searchTerm={searchTerm}
          />
        ))}
      </tbody>
    </table>
  );
};

export default InvitationList;
