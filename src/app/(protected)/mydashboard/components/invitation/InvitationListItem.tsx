/* eslint-disable react/no-array-index-key */

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import Button from '@/components/ui/Buttons';
import { usePutInvitation } from '@/hooks/usePutInvitation';
import { useTimeAgo } from '@/hooks/useTimeAgo';
import { Invitation } from '@/types/Invitation';

interface InvitationProps {
  invitation: Invitation;
  searchTerm: string;
  observerRef: React.Ref<HTMLTableRowElement>;
  tableColumns?: string;
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

const InvitationListItem = ({
  invitation,
  searchTerm,
  observerRef,
  tableColumns = 'md:w-2/4 lg:w-3/6',
}: InvitationProps) => {
  const { dashboard, inviter, createdAt } = invitation;
  const timeAgo = useTimeAgo(createdAt);

  const { mutate, isPending } = usePutInvitation();
  const queryClient = useQueryClient();

  const [isVisible, setIsVisible] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);

  return (
    isVisible && (
      <tr
        ref={observerRef}
        className={`border-taskify-neutral-200 border-b transition-all duration-700 ease-in-out ${
          isRemoving ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <td
          className={`text-taskify-lg-regular text-taskify-neutral-700 truncate ${tableColumns}`}
        >
          {highlightText(dashboard.title, searchTerm)}
        </td>
        <td className="text-taskify-lg-regular text-taskify-neutral-700 md:w-1/4 lg:w-1/6">
          {inviter.nickname}
        </td>
        <td className="text-taskify-lg-regular text-taskify-neutral-700 hidden lg:table-cell lg:w-1/6">
          {timeAgo}
        </td>
        <td className="py-2 md:w-1/4 lg:w-1/6">
          <div className="flex gap-2">
            <Button
              type="button"
              color="violet-white"
              className="text-taskify-md-medium mt-1.5 px-8 py-2 whitespace-nowrap"
              onClick={() => {
                setIsRemoving(true);
                setTimeout(() => {
                  setIsVisible(false);
                  mutate(
                    { invitationId: invitation.id, inviteAccepted: true },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ['dashboards'],
                        });
                      },
                    },
                  );
                }, 700);
              }}
              disabled={isPending}
            >
              수락
            </Button>
            <Button
              type="button"
              color="white-violet"
              className="border-taskify-neutral-300 text-taskify-md-medium mt-1.5 border-[1px] px-8 py-2 whitespace-nowrap"
              onClick={() => {
                setIsRemoving(true);
                setTimeout(() => {
                  setIsVisible(false);
                  mutate({
                    invitationId: invitation.id,
                    inviteAccepted: false,
                  });
                }, 700);
              }}
              disabled={isPending}
            >
              거절
            </Button>
          </div>
        </td>
      </tr>
    )
  );
};

export default InvitationListItem;
