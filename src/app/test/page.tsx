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
      <Button color="violet-white" purpose="login" type="button">
        로그인
      </Button>
      <Button color="violet-white" purpose="login" type="button" disabled>
        가입하기
      </Button>

      <div className="flex gap-4">
        <Button color="violet-white" purpose="db" type="button">
          수락
        </Button>
        <Button color="white-violet" purpose="db" type="button">
          거절
        </Button>
      </div>

      <div className="flex gap-4">
        <Button color="violet-white" purpose="modal-db" type="button">
          모달긍정
        </Button>
        <Button color="modal-cancel" purpose="modal-db" type="button">
          모달부정
        </Button>
      </div>

      <Button color="white-black" purpose="addCol" type="button">
        새로운 컬럼 추가하기(chip)
      </Button>

      <Button color="white-black" purpose="addDash" type="button">
        대시보드 추가버튼
      </Button>
      <Button color="white-black" purpose="removeDash" type="button">
        대시보드 삭제버튼
      </Button>

      <Button color="white-black" purpose="addTodo" type="button">
        투두 추가(칩)
      </Button>

      <Button color="white-black" purpose="dash" type="button">
        대시보드 카드
      </Button>

      <Button color="white-black" purpose="one" type="button">
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
