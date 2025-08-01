'use client';

import { useState } from 'react';

export type SortOption = 'name' | 'inviter' | 'date';
export type SortOrder = 'asc' | 'desc';

interface SortDropdownProps {
  onSortChange: (option: SortOption, order: SortOrder) => void;
  currentSort: SortOption;
  currentOrder: SortOrder;
}

const sortOptions = [
  { value: 'name', label: '프로젝트 이름' },
  { value: 'inviter', label: '초대자' },
  { value: 'date', label: '초대한 시점' },
] as const;

const SortDropdown = ({
  onSortChange,
  currentSort,
  currentOrder,
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = (option: SortOption) => {
    if (currentSort === option) {
      // 같은 옵션 클릭시 오름차순/내림차순 토글
      const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
      onSortChange(option, newOrder);
    } else {
      // 다른 옵션 클릭시 오름차순으로 설정
      onSortChange(option, 'asc');
    }
    setIsOpen(false);
  };

  const currentLabel = sortOptions.find(
    (opt) => opt.value === currentSort,
  )?.label;

  return (
    <div className="relative flex items-center gap-2">
      <label
        htmlFor="btn"
        className="text-taskify-neutral-500 text-taskify-lg-regular"
      >
        Sort
      </label>
      <button
        id="btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border-taskify-neutral-300 hover:bg-taskify-neutral-50 text-taskify-md-medium w-40 items-center gap-2 rounded-md border bg-white px-3 py-2"
      >
        <div className="flex items-center justify-between">
          <span className="text-taskify-neutral-500">{currentLabel}</span>
          <span className="text-taskify-neutral-400">
            {currentOrder === 'asc' ? '↑' : '↓'}
          </span>
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="border-taskify-neutral-300 absolute top-full left-10 z-20 mt-1 w-40 rounded-md border bg-white shadow-lg">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSortClick(option.value)}
              className={`hover:bg-taskify-neutral-300 text-taskify-md-regular w-full px-3 py-2 text-left first:rounded-t-md last:rounded-b-md ${
                currentSort === option.value ? 'text-taskify-purple' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option.label}</span>
                {currentSort === option.value && (
                  <span className="text-taskify-neutral-400">
                    {currentOrder === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
