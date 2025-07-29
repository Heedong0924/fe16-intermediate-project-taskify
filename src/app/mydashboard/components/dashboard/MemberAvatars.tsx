'use client';

import { AvatarProfile } from '@/components/common/Profile';
import { Member } from '@/types/DashboardMember';

interface MemberAvatarsProps {
  members: Member[];
}

const MemberAvatars = ({ members = [] }: Partial<MemberAvatarsProps>) => {
  // 아바타는 3명까지만 노출되며 그 이후는 +rest로 처리
  const visible = members.slice(0, 3);
  const rest = members.length - visible.length;

  return (
    <div className="flex">
      {visible.map((member, idx) => (
        <div key={member.id} className={idx !== 0 ? '-ml-2' : ''}>
          <AvatarProfile
            userName={member.nickname}
            profileImg={member.profileImageUrl}
            size="md"
          />
        </div>
      ))}
      {rest > 0 && (
        <div className="bg-muted text-muted-foreground z-10 -ml-2 flex size-[26px] items-center justify-center rounded-full border border-white text-xs font-medium">
          +{rest}
        </div>
      )}
    </div>
  );
};

export default MemberAvatars;
