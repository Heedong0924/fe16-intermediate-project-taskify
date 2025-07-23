import Image from 'next/image';
import Link from 'next/link';

import {
  ContentSection,
  ContentSectionWithAction,
} from '@/components/common/ContentSection';
import { UserProfile } from '@/components/common/Profile';
import Button from '@/components/ui/Buttons';

export default function MyPage() {
  return (
    <div className="min-h-screen bg-[var(--gray-FAFAFA)] p-[20px]">
      {/* 뒤로가기 */}
      <nav className="mb-[34px]">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/arrow-left.svg"
            alt="왼쪽으로 가는 화살표 아이콘"
            width={20}
            height={20}
          />
          돌아가기
        </Link>
      </nav>
      {/* 비브리지 */}
      <ContentSection title="비브리지">
        <UserProfile userName="이름" />
      </ContentSection>
      {/* 구성원 */}
      <ContentSectionWithAction title="구성원" titleRight={<div>TEST</div>}>
        <p>콘텐츠</p>
      </ContentSectionWithAction>
      {/* 초대 내역 */}
      <ContentSectionWithAction title="초대 내역" titleRight={<div>TEST</div>}>
        <p>콘텐츠</p>
      </ContentSectionWithAction>
      {/*  대시보드 삭제하기 */}
      {/* onClick 넣어야함 */}
      <Button
        color="white-black"
        className="btn-removeDash w-full border border-[#D9D9D9] bg-transparent md:w-[320px]"
      >
        대시보드 삭제하기
      </Button>
    </div>
  );
}
