/* eslint-disable react/no-array-index-key */

import Button from '@/components/ui/Buttons';
import { usePutInvitation } from '@/hooks/usePutInvitation';
import { useTimeAgo } from '@/hooks/useTimeAgo';
import { Invitation } from '@/types/Invitation';

interface InvitationProps {
  invitation: Invitation;
  searchTerm: string;
}

// 검색 시 키워드 두꺼운 보라색으로 하이라이팅
const highlightText = (text: string, keyword: string) => {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark
        key={`highlight-${part}-${i}`}
        className="text-taskify-purple bg-transparent font-extrabold"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
};

const InvitationListItem = ({ invitation, searchTerm }: InvitationProps) => {
  const { dashboard, inviter, createdAt } = invitation;
  const timeAgo = useTimeAgo(createdAt);

  const { mutate, isPending } = usePutInvitation();

  return (
    <tr className="border-taskify-neutral-200 border-b">
      <td className="text-taskify-lg-regular text-taskify-neutral-700 pl-[76px]">
        {highlightText(dashboard.title, searchTerm)}
      </td>
      <td className="text-taskify-lg-regular text-taskify-neutral-700">
        {inviter.nickname}
      </td>
      <td className="text-taskify-lg-regular text-taskify-neutral-700">
        {timeAgo}
      </td>
      <td className="py-1">
        <div className="flex gap-2.5">
          <Button
            type="button"
            color="violet-white"
            className="text-taskify-md-medium m-1.5 px-[29px] py-[7px]"
            onClick={() => {
              mutate({ invitationId: invitation.id, inviteAccepted: true });
            }}
            disabled={isPending}
          >
            수락
          </Button>
          <Button
            type="button"
            color="white-violet"
            className="border-taskify-neutral-300 text-taskify-md-medium m-1.5 border-[1px] px-[29px] py-[7px]"
            onClick={() => {
              mutate({ invitationId: invitation.id, inviteAccepted: false });
            }}
            disabled={isPending}
          >
            거절
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default InvitationListItem;
