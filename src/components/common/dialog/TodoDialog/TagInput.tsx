'use client';

import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

import { TagChip } from '@/components/common/Chips'; // 기존 TagChip 컴포넌트 import

interface TagInputProps {
  /** 초기 태그 배열 */
  tags?: string[];
  /** 태그 변경 콜백 함수 */
  onChange: (tags: string[]) => void;
  /** 태그 칩 크기 */
  size?: 'sm' | 'md';
  /** 입력 필드 placeholder */
  placeholder?: string;
  /** 최대 태그 개수 */
  maxTags?: number;
  /** 컨테이너 클래스명 */
  className?: string;
}

/**
 * TagInput 컴포넌트
 * 태그를 입력하고 관리하는 컴포넌트
 *
 * @param tags - 초기 태그 배열
 * @param onChange - 태그 변경 시 호출되는 콜백 함수
 * @param size - TagChip 크기 (기본값: 'sm')
 * @param placeholder - 입력 필드 placeholder
 * @param maxTags - 최대 태그 개수
 * @param className - 추가 CSS 클래스
 */
export function TagInput({
  tags = [],
  onChange,
  size = 'sm',
  placeholder = '태그를 입력하고 Enter를 눌러주세요',
  maxTags,
  className = '',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [currentTags, setCurrentTags] = useState<string[]>(tags);

  /**
   * 태그를 추가하는 함수
   * @param newTag - 추가할 태그
   */
  const addTag = (newTag: string) => {
    const trimmedTag = newTag.trim();

    // 빈 문자열이거나 이미 존재하는 태그인 경우 추가하지 않음
    if (!trimmedTag || currentTags.includes(trimmedTag)) {
      return;
    }

    // 최대 태그 개수 제한
    if (maxTags && currentTags.length >= maxTags) {
      return;
    }

    const updatedTags = [...currentTags, trimmedTag];
    setCurrentTags(updatedTags);
    onChange(updatedTags);
  };

  /**
   * 태그를 제거하는 함수
   * @param tagToRemove - 제거할 태그
   */
  const removeTag = (tagToRemove: string) => {
    const updatedTags = currentTags.filter((tag) => tag !== tagToRemove);
    setCurrentTags(updatedTags);
    onChange(updatedTags);
  };

  /**
   * 키보드 이벤트 핸들러
   * Enter: 태그 추가
   * Backspace: 입력값이 없을 때 마지막 태그 제거
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && currentTags.length > 0) {
      // 입력값이 없고 백스페이스를 누르면 마지막 태그 제거
      removeTag(currentTags[currentTags.length - 1]);
    }
  };

  /**
   * 입력값 변경 핸들러
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  /**
   * 태그 클릭 시 제거 핸들러
   */
  const handleTagClick = (tag: string) => {
    removeTag(tag);
  };

  return (
    <div className={`tag-input-container ${className}`}>
      {/* 태그 표시 영역 */}
      <div className="flex min-h-[44px] flex-wrap gap-2 rounded-lg border border-gray-200 bg-white p-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        {/* 기존 태그들 렌더링 */}
        {currentTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className="group relative cursor-pointer"
            title={`${tag} 제거하기`}
          >
            <TagChip size={size}>{tag}</TagChip>
            {/* 삭제 버튼 오버레이 */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              ×
            </span>
          </button>
        ))}

        {/* 태그 입력 필드 */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={currentTags.length === 0 ? placeholder : ''}
          className="min-w-[120px] flex-1 bg-transparent text-sm outline-none"
          disabled={maxTags ? currentTags.length >= maxTags : false}
        />
      </div>

      {/* 태그 개수 및 제한 표시 */}
      {maxTags && (
        <div className="mt-1 text-right text-xs text-gray-500">
          {currentTags.length} / {maxTags}
        </div>
      )}
    </div>
  );
}
