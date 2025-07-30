import Image from 'next/image';

import { getTextBasedColorClasses } from '@/lib/utils/colorUtils';

type BaseChipProps = {
  size?: 'sm' | 'md';
};

type ChildrenProp = {
  children: string | number;
};

type ContentChipProps = BaseChipProps & {
  children?: string;
};

type ColorPickerChipProp = BaseChipProps & {
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
    addImage: { width: 14, height: 14 },
    colorPickerImage: { width: 22, height: 22 },
  },
  md: {
    container: 'size-[22px]',
    statusContainer: 'px-[10px] py-[4px] text-[14px]',
    tagContainer: 'px-[6px] py-[4px] text-[14px]',
    colorPickerContainer: 'size-[30px]',
    addImage: { width: 16, height: 16 },
    colorPickerImage: { width: 24, height: 24 },
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
export function AddCountChip({ size = 'sm' }: BaseChipProps) {
  const { container, addImage } = ChipSizeMap[size];
  return (
    <span className={`${container} chip-add cursor-pointer`}>
      <Image src="/images/add-icon.svg" alt="추가하기" {...addImage} />
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
export function StatusChip({ size = 'sm', children }: ContentChipProps) {
  const { statusContainer } = ChipSizeMap[size];
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
export function TagChip({ size = 'sm', children }: ContentChipProps) {
  const trimmed = getTrimmedOrNull(children);
  if (!trimmed) return null;

  const { tagContainer } = ChipSizeMap[size];
  const { bgClass, textClass } = getTextBasedColorClasses(trimmed, 'chip');
  return (
    <span className={`${bgClass} ${textClass} ${tagContainer} chip-tag`}>
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
  size = 'sm',
  value,
  onChange,
}: ColorPickerChipProp) {
  const { colorPickerContainer, colorPickerImage } = ChipSizeMap[size];
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
          <Image
            src="/images/check-white.svg"
            alt="색상 체크"
            className="opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
            {...colorPickerImage}
          />
        </label>
      ))}
    </form>
  );
}
