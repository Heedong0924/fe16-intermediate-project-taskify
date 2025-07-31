import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTextBasedColorClasses } from '@/lib/utils/colorUtils';

type AvatarProfileProps = {
  profileImg?: string | null;
  userName: string;
  size?: 'sm' | 'md' | 'lg';
};

type UserProfileProps = AvatarProfileProps;

const ChipSizeMap = {
  sm: {
    container: 'size-[26px]',
    textSize: 'text-[12px]',
  },
  md: {
    container: 'size-[34px]',
    textSize: 'text-base',
  },
  lg: {
    container: 'size-[38px]',
    textSize: 'text-base',
  },
} as const;

/*
 * AvatarProfile 컴포넌트:
 * 유저의 아바타 (동그란 부분)
 *
 * Props:
 * userName: 사용자 이름
 * profileImg: 값이 없을 경우, 잘못된 주소가 들어올 경우 AvatarFallback로 넘어갑니다.
 * size: 'sm' (작은 사이즈, 모달에 들어가는 담당자 부분), 'md' (중간 사이즈), 'lg' (큰 사이즈)를 지정합니다. 기본값은 'lg'
 */
export function AvatarProfile({
  profileImg = null,
  userName,
  size = 'lg',
}: AvatarProfileProps) {
  const { container, textSize } = ChipSizeMap[size];
  const { bgClass } = getTextBasedColorClasses(userName, 'profile');
  return (
    <Avatar className={`${container} profile-avatar cursor-pointer`}>
      <AvatarImage src={profileImg ?? undefined} />
      <AvatarFallback className={`${bgClass} ${textSize}`}>
        {userName.toUpperCase().slice(0, 1)}
      </AvatarFallback>
    </Avatar>
  );
}

/*
 * UserProfile 컴포넌트:
 * 유저의 아바타 + 유저 이름
 *
 * Props:
 * userName: 사용자 이름
 * profileImg: 값이 없을 경우, 잘못된 주소가 들어올 경우 AvatarFallback로 넘어갑니다.
 * size: 'sm' (작은 사이즈, 모달에 들어가는 담당자 부분), 'md' (중간 사이즈), 'lg' (큰 사이즈)를 지정합니다. 기본값은 'lg'
 */

// cursor-default -> cursor-pointer, size로 <span> 출력 조건 분기
export function UserProfile({
  profileImg = null,
  userName = '',
  size = 'lg',
}: UserProfileProps) {
  return (
    <div className="flex cursor-pointer items-center gap-3 text-base">
      <AvatarProfile profileImg={profileImg} userName={userName} size={size} />
      {size !== 'md' && <span className="font-medium">{userName}</span>}
    </div>
  );
}
