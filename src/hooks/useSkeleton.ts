/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';

/**
 * @typedef {object} UseSkeletonReturn
 * @property {boolean} showSkeleton - 스켈레톤 UI를 화면에 렌더링해야 하는지 여부.
 * @property {boolean} isFadingOut - 스켈레톤이 현재 페이드 아웃 애니메이션 중인지 여부.
 */

/**
 * @description 데이터 로딩 상태에 따라 스켈레톤 UI의 표시 여부와 페이드 아웃 애니메이션을 관리하는 훅.
 *
 * @param {boolean} isPending - 현재 데이터 로딩 상태.
 * @param {number} [fadeoutDuration=300] - 스켈레톤이 사라지는 데 걸리는 시간(ms).
 * @returns {UseSkeletonReturn} 스켈레톤 UI 관리에 필요한 상태 값들.
 */
export const useSkeleton = (
  isPending: boolean,
  fadeoutDuration: number = 300,
) => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isPending) {
      setShowSkeleton(true);
      setIsFadingOut(false);
    }
  }, [isPending]);

  useEffect(() => {
    if (!isPending && showSkeleton) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setShowSkeleton(false);
        setIsFadingOut(false);
      }, fadeoutDuration);

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [isPending, showSkeleton, fadeoutDuration]);

  return { showSkeleton, isFadingOut };
};
