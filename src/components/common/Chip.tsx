import { getTextBasedColorClasses } from '@/lib/utils/colorUtils';

type ChipProps = {
  children: string;
};

// 값이 들어오지 않을 경우 렌더링X
// 앞뒤 공백 제거
export default function Chip({ children }: ChipProps) {
  if (!children?.trim()) return null;

  const trimText = children.trim();
  const { bgClass, textClass } = getTextBasedColorClasses(trimText, 'chip');
  return (
    <span
      className={`${bgClass} ${textClass} rounded-[4px] px-[6px] py-[4px] text-[14px]`}
    >
      {trimText}
    </span>
  );
}
