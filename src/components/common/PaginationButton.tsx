'use client';

import ArrowLeft from '@/../public/images/arrow-left.svg';
import ArrowRight from '@/../public/images/arrow-right.svg';

type PaginationProps = {
  page?: number;
  size?: number;
  totalCount?: number;
  onPageChange: (newPage: number) => void;
};

// onCilck 이벤트가 있기에 CSR로 해주었습니다.
// page, size 는 query값, totalCount 는 api에 있습니당 요청할 때 받아서 넘겨주세요!
// onPageChange 는 page 상태변경 함수는 넘겨주세요 e.x.setPage

const PaginationButton = ({
  page = 1,
  size = 4,
  totalCount = 1,
  onPageChange,
}: PaginationProps) => {
  const currentPage = page;
  const totalPage = Math.ceil(totalCount / size);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPage;

  const handlePrevCilck = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNextCilck = () => {
    if (currentPage < totalPage) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex flex-row items-center gap-3 md:gap-4">
      <p>{`${currentPage} 페이지 중 ${totalPage}`}</p>
      <div className="flex">
        <button
          className="btn-bass-white-black h-9 w-9 rounded-l-sm border-1 border-gray-400 disabled:bg-white disabled:text-gray-400 md:h-10 md:w-10"
          onClick={handlePrevCilck}
          disabled={isPrevDisabled}
          type="button"
        >
          <ArrowLeft alt="arrow left button" />
        </button>
        <button
          className="btn-bass-white-black h-9 w-9 rounded-r-sm border-1 border-gray-400 disabled:bg-white disabled:text-gray-400 md:h-10 md:w-10"
          onClick={handleNextCilck}
          disabled={isNextDisabled}
          type="button"
        >
          <ArrowRight alt="arrow right button" />
        </button>
      </div>
    </div>
  );
};

export default PaginationButton;
