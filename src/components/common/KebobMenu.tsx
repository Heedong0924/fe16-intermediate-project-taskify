import { CiMenuKebab } from 'react-icons/ci';
import { twMerge } from 'tailwind-merge';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

/**
 *  케밥메뉴 컴포넌트
 *  - shadcn의 DropdownMenu를 사용하여 구현
 *
 * @param MenuItem[] - 메뉴 아이템 배열
 * - 각 아이템은 key, label, onSelect, variant를 포함
 * - variant를 통해 메뉴 아이템의 테마를 지정할 수 있음
 */

// MenuItem의 타입입니다.
export interface MenuItem {
  key: string; // 메뉴 아이템의 고유 키
  label: string; // 메뉴 아이템의 라벨
  onSelect?: () => void; // 메뉴 아이템 선택 시 호출되는 함수
  variant?: 'default' | 'red' | 'disabled'; // 메뉴 아이템의 테마 (기본값: 'default')
}
// KebobMenuProps의 타입입니다.
interface KebobMenuProps {
  menuItems: MenuItem[]; // 메뉴 아이템 배열
}
export const KebobMenu = ({ menuItems }: KebobMenuProps) => {
  // 메뉴 아이템의 variant에 따라 클래스 이름을 설정합니다.
  const variantClasses = {
    default: ' hover:bg-taskify-violet-light hover:text-taskify-violet-primary',
    red: 'text-red-600 hover:bg-red-50',
    disabled: 'text-gray-400 cursor-not-allowed',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-center rounded-md bg-transparent p-2 transition-colors hover:bg-gray-100 focus:outline-none active:bg-gray-100"
        >
          <CiMenuKebab className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 border-1 border-gray-300 bg-white">
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.key} onSelect={item.onSelect}>
            <button
              type="button"
              className={twMerge(
                'hover:text-bold flex w-full items-center justify-between rounded-md px-4 py-2',
                variantClasses[item.variant || 'default'],
              )}
            >
              {item.label}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
