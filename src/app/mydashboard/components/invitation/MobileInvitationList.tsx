import Button from '@/components/ui/Buttons';
import { usePutInvitation } from '@/hooks/usePutInvitation';

interface MobileInvitationListProps {
  invitation: {
    id: number;
    inviter: {
      nickname: string;
    };
    dashboard: {
      title: string;
    };
  };
  observerRef?:
    | React.RefObject<HTMLDivElement>
    | ((el: HTMLDivElement | null) => void);
}

const MobileInvitationList = ({
  invitation,
  observerRef,
}: MobileInvitationListProps) => {
  const { mutate, isPending } = usePutInvitation();

  return (
    <div className="border-b px-2 py-4" ref={observerRef}>
      <div className="flex">
        <div className="text-taskify-md-regular text-taskify-neutral-400 w-15">
          이름
        </div>
        <p className="text-taskify-md-regular text-taskify-neutral-700 max-w-48 truncate">
          {invitation.dashboard.title}
        </p>
      </div>
      <div className="flex">
        <div className="text-taskify-md-regular text-taskify-neutral-400 w-15">
          초대자
        </div>
        <p className="text-taskify-md-regular text-taskify-neutral-700">
          {invitation.inviter.nickname}
        </p>
      </div>
      <div className="mt-2 flex gap-2">
        <div className="flex">
          <Button
            type="button"
            color="violet-white"
            className="text-taskify-md-medium m-1.5 px-[45px] py-[5px]"
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
            className="border-taskify-neutral-300 text-taskify-md-medium m-1.5 border-[1px] px-[45px] py-[5px]"
            onClick={() => {
              mutate({ invitationId: invitation.id, inviteAccepted: false });
            }}
            disabled={isPending}
          >
            거절
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileInvitationList;
