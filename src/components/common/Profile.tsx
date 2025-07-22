import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTextBasedColorClasses } from '@/lib/utils/colorUtils';

type AvatarProfileProps = {
  profileImg?: string | null;
  userName: string;
};

type UserProfileProps = AvatarProfileProps;

// 아바타(동그란 이미지)
// userName 값은 필수, profileImg을 못 받을 경우 AvatarFallback가 보여집니다.
export function AvatarProfile({
  profileImg = null,
  userName,
}: AvatarProfileProps) {
  const { bgClass } = getTextBasedColorClasses(userName, 'profile');
  return (
    <Avatar className="border-2 border-solid border-white font-bold text-white">
      <AvatarImage src={profileImg ?? undefined} />
      <AvatarFallback className={bgClass}>
        {userName.toUpperCase().slice(0, 1)}
      </AvatarFallback>
    </Avatar>
  );
}

// 아바타 + 유저
// userName 값은 필수, profileImg을 못 받을 경우 AvatarFallback가 보여집니다.
export function UserProfile({
  profileImg = null,
  userName = '',
}: UserProfileProps) {
  return (
    <div className="flex items-center gap-3 text-base">
      <AvatarProfile profileImg={profileImg} userName={userName} />
      <span className="font-medium">{userName}</span>
    </div>
  );
}
