import Image from 'next/image';
import { HTMLAttributes } from 'react';

import { getTextBasedColorClasses } from '@/lib/utils/colorUtils';

type BaseChipProps = {
  size?: 'sm' | 'md';
} & HTMLAttributes<HTMLDivElement>;

type ChildrenProp = {
  children: string | number;
} & HTMLAttributes<HTMLDivElement>;

type ContentChipProps = BaseChipProps & {
  children?: string;
};

type ColorPickerChipProp = {
  size?: 'sm' | 'md';
  value: string;
  onChange: (color: string) => void;
};

// Chip 스타일
const ChipSizeMap = {
  sm: {
    container: 'size-[20px]',
    statusContainer: 'px-[8px] py-[4px] text-[12px]',
    tagContainer: 'px-[6px] py-[4px] text-[12px]',
    colorPickerContainer: 'size-[28px]',
    addImage: 'size-[14px]',
    colorPickerImage: 'size-[22px]',
  },
  md: {
    container: 'size-[22px]',
    statusContainer: 'px-[10px] py-[4px] text-[14px]',
    tagContainer: 'px-[6px] py-[4px] text-[14px]',
    colorPickerContainer: 'size-[30px]',
    addImage: 'size-[16px]',
    colorPickerImage: 'size-[24px]',
  },
} as const;

// ColorPickerChip의 색상, 라디오 버튼에 대응하는 색상 옵션을 나타냅니다.
const ColorPickerChips = [
  { id: 'color-green', value: '#7AC555', label: '초록색' },
  { id: 'color-purple', value: '#760DDE', label: '보라색' },
  { id: 'color-orange', value: '#FFA500', label: '주황색' },
  { id: 'color-sky', value: '#76A5EA', label: '하늘색' },
  { id: 'color-pink', value: '#E876EA', label: '분홍색' },
];

// 값을 공백을 삭제 후 반환.
const getTrimmedOrNull = (value: unknown): string | null => {
  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : null;
};

/*
 * AddCountChip 컴포넌트:
 * 새로운 항목(칼럼)을 추가하는 데 사용되는 칩
 *
 * Props:
 * size: 'sm' (작은 사이즈) 또는 'md' (큰 사이즈)를 지정합니다. 기본값은 'sm'
 */
export function AddCountChip({ size }: BaseChipProps) {
  const { container, addImage } = size
    ? ChipSizeMap[size]
    : {
        container: 'transition-all size-[20px] md:size-[22px]',
        addImage: 'size-[14px] md:size-[16px]',
      };
  return (
    <span className={`${container} chip-add cursor-pointer`}>
      <span className={`${addImage} relative`}>
        <Image src="/images/add-icon.svg" alt="추가하기" fill />
      </span>
    </span>
  );
}

/*
 * CounterChip 컴포넌트:
 * 항목(칼럼)의 수를 표시하는 칩
 *
 * Props:
 * children: 표시될 값. 기본 값 0
 */
export function CounterChip({ children = 0 }: ChildrenProp) {
  const trimmed = getTrimmedOrNull(children);
  if (!trimmed) return null;

  return <span className="chip-counter px-[6px] py-[3px]">{trimmed}</span>;
}

/*
 * StatusChip 컴포넌트:
 * 상태를 표시하는 칩
 *
 * Props:
 * size: 'sm' (작은 사이즈) 또는 'md' (큰 사이즈)를 지정합니다. 기본값은 'sm'
 * children: 표시될 값.
 */
export function StatusChip({ size, children }: ContentChipProps) {
  const { statusContainer } = size
    ? ChipSizeMap[size]
    : {
        statusContainer:
          'transition-all px-[8px] py-[4px] text-[12px] md:px-[10px] md:py-[4px] md:text-[14px]',
      };
  return (
    <span className={`${statusContainer} chip-status`}>
      <i> </i>
      <span>{children}</span>
    </span>
  );
}

/*
 * TagChip 컴포넌트:
 * 태그 칩, 텍스트에 따라 색상 랜덤
 *
 * Props:
 * size: 'sm' (작은 사이즈) 또는 'md' (큰 사이즈)를 지정합니다. 기본값은 'sm'
 * children: 표시될 값.
 */
export function TagChip({ size, children }: ContentChipProps) {
  const trimmed = getTrimmedOrNull(children);
  if (!trimmed) return null;

  const { tagContainer } = size
    ? ChipSizeMap[size]
    : {
        tagContainer:
          'transition-all px-[6px] py-[4px] text-[12px] md:text-[14px]',
      };
  const { bgClass, textClass } = getTextBasedColorClasses(trimmed, 'chip');
  return (
    <span
      className={`${bgClass} ${textClass} ${tagContainer} chip-tag shrink-0`}
    >
      {trimmed}
    </span>
  );
}

/*
 * ColorPickerChip 컴포넌트:
 * 사용자가 색상 선택을 하면 값을 변경하는 콜백을 호출.
 * 내부적으로 useState가 아니라, 상위 컴포넌트가 상태를 관리합니다.
 *
 * Props:
 * size: 'sm' (작은 사이즈) 또는 'md' (큰 사이즈)를 지정합니다. 기본값은 'sm'
 * value: 선택된 색상 값 (HEX 코드)
 * onChange: 색상 변경 콜백
 */
export function ColorPickerChip({
  size,
  value,
  onChange,
}: ColorPickerChipProp) {
  const { colorPickerContainer, colorPickerImage } = size
    ? ChipSizeMap[size]
    : {
        colorPickerContainer: 'transition-all size-[28px] md:size-[30px]',
        colorPickerImage: 'size-[22px] md:size-[24px]',
      };
  return (
    <form className="chip-colorPick">
      {ColorPickerChips.map(({ id, value: val, label }) => (
        <label
          key={val}
          htmlFor={id}
          aria-label={label}
          className={colorPickerContainer}
          style={{ backgroundColor: val }}
        >
          <input
            id={id}
            name="color"
            type="radio"
            value={val}
            checked={value === val}
            onChange={() => onChange(val)}
            className="peer hidden"
          />
          <span
            className={`${colorPickerImage} relative opacity-0 transition-opacity duration-200 peer-checked:opacity-100`}
          >
            <Image src="/images/check-white.svg" alt="색상 체크" fill />
          </span>
        </label>
      ))}
    </form>
  );
}
