'use client';

import { useState } from 'react';

import PaginationButton from '@/components/common/PaginationButton';
import Button from '@/components/ui/Buttons';
import { LogoLg, LogoMd, LogoSm } from '@/components/ui/SVGLogo';

const TestPage = () => {
  const [page, setPage] = useState(1);
  const size = 4;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button className="btn-login" type="button">
        로그인
      </Button>
      <Button className="btn-login" type="button" disabled>
        로그인
      </Button>

      <div className="flex gap-4">
        <Button className="btn-accept-color" type="button">
          수락
        </Button>
        <Button className="btn-accept-white" type="button">
          거절
        </Button>
      </div>

      <div className="flex gap-4">
        <Button className="btn-modal-color" type="button">
          모달버튼
        </Button>
        <Button className="btn-modal-white" type="button">
          모달버튼
        </Button>
      </div>

      <Button className="btn-add-column" type="button">
        새로운 컬럼 추가하기
      </Button>

      <Button className="btn-add-dash-board" type="button">
        대시보드 추가버튼
      </Button>
      <Button className="btn-delete-dash-board" type="button">
        대시보드 삭제버튼
      </Button>

      <Button className="btn-add-todo" type="button">
        투두 추가(칩)
      </Button>

      <Button className="btn-card-dash-board" type="button">
        대시보드 카드
      </Button>

      <Button className="btn-delete-member" type="button">
        삭제
      </Button>

      <LogoLg fill="blue" />

      <LogoMd fill="red" />

      <LogoSm fill="white" />

      <PaginationButton
        page={page}
        size={size}
        totalCount={21}
        onPageChange={setPage}
      />
    </div>
  );
};

export default TestPage;
