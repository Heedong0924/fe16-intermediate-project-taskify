import {
  allBackgroundClassesProfile,
  allBackgroundClassesChip,
  allTextClassesChip,
} from '@/lib/constants/ColorArrays';

type Mode = 'profile' | 'chip';

interface ColorClasses {
  bgClass: string;
  textClass?: string;
}

// 일정한 규칙을 통해 받은 텍스트로 랜덤 색상을 보여줌
export const getTextBasedColorClasses = (
  text: string,
  mode: Mode = 'profile',
): ColorClasses => {
  let hash = 0;
  // 문자열을 유니코드로 변환
  for (let i = 0; i < text.length; i += 1) {
    hash = text.charCodeAt(i) + hash * 31;
  }

  // profile의 경우
  const indexProfile = Math.abs(hash) % allBackgroundClassesProfile.length;
  if (mode === 'profile') {
    return { bgClass: allBackgroundClassesProfile[indexProfile] };
  }

  // chip의 경우
  const indexChip = Math.abs(hash) % allBackgroundClassesChip.length;
  return {
    bgClass: allBackgroundClassesChip[indexChip],
    textClass: allTextClassesChip[indexChip],
  };
};
