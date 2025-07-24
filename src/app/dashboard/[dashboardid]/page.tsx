import Image from 'next/image';
import Link from 'next/link';

import { ContentSection } from '@/components/common/ContentSection';
// import Button from '@/components/ui/Buttons';

export default function DashboardDetails() {
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
      {/* 프로필 */}
      <ContentSection title="프로필"> </ContentSection>
      {/* 비밀번호 변경 */}
      <ContentSection title="비밀번호 변경"> </ContentSection>
    </div>
  );
}
