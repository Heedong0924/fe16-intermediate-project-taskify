'use client';

import { ArrowLeft, ArrowRight } from './SVGLogo';

type PaginationProps = {
  page?: number;
  size?: number;
  totalCount?: number;
  text?: boolean;
  onPageChange: (newPage: number) => void;
  className?: string;
};

// onCilck 이벤트가 있기에 CSR로 해주었습니다.
// page, size 는 query값, totalCount 는 api에 있습니당 요청할 때 받아서 넘겨주세요!
// onPageChange 는 page 상태변경 함수는 넘겨주세요 e.x.setPage

const PaginationButton = ({
  page = 1,
  size = 4,
  totalCount = 1,
  text = true,
  onPageChange,
  className,
}: PaginationProps) => {
  const currentPage = page;
  const totalPage = Math.ceil(totalCount / size);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPage;

  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNextClick = () => {
    if (currentPage < totalPage) onPageChange(currentPage + 1);
  };

  const buttonBaseStyle =
    'text-taskify-neutral-700 disabled:cursor-default cursor-pointer btn-bass-white-black bg-taskify-neutral-0 disabled:bg-taskify-neutral-0 flex h-9 w-9 items-center justify-center border-1 border-gray-400 disabled:text-gray-400 md:h-10 md:w-10';

  const baseWarraperStyle = `flex flex-row items-center text-taskify-neutral-500 gap-3 md:gap-4 ${className || ''}`;

  return (
    <div className={baseWarraperStyle}>
      {text && (
        <p className="whitespace-nowrap">{`${currentPage} of ${totalPage}`}</p>
      )}
      <div className="flex">
        <button
          className={`${buttonBaseStyle} rounded-l-sm`}
          onClick={handlePrevClick}
          disabled={isPrevDisabled}
          type="button"
        >
          <ArrowLeft />
        </button>
        <button
          className={`${buttonBaseStyle} rounded-r-sm`}
          onClick={handleNextClick}
          disabled={isNextDisabled}
          type="button"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PaginationButton;
