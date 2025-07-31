import {
  allBackgroundClassesProfile,
  allBackgroundClassesChip,
  allTextClassesChip,
} from '@/lib/constants/colorArrays';

type Mode = 'profile' | 'chip';

interface ColorClasses {
  bgClass: string;
  textClass?: string;
}

const calculateColorIndex = (hash: number, arrayLength: number): number => {
  return hash % arrayLength;
};

// 일정한 규칙을 통해 받은 텍스트로 랜덤 색상을 보여줌
export const getTextBasedColorClasses = (
  text: string,
  mode: Mode = 'profile',
): ColorClasses => {
  let hash = 0;
  const MODULO_CONSTANT = 1000000007; // 해시 값을 제한할 큰 소수 상수

  // 문자열을 유니코드로 변환
  for (let i = 0; i < text.length; i += 1) {
    hash = (text.charCodeAt(i) + hash * 31) % MODULO_CONSTANT;
    if (hash < 0) {
      hash += MODULO_CONSTANT;
    }
  }

  // profile의 경우
  if (mode === 'profile') {
    const indexProfile = calculateColorIndex(
      hash,
      allBackgroundClassesProfile.length,
    );
    return { bgClass: allBackgroundClassesProfile[indexProfile] };
  }

  // chip의 경우
  const indexChip = calculateColorIndex(hash, allBackgroundClassesChip.length);
  return {
    bgClass: allBackgroundClassesChip[indexChip],
    textClass: allTextClassesChip[indexChip],
  };
};
