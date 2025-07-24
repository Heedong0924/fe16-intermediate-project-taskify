import { MdOutlineSearchOff } from 'react-icons/md';

const NoResult = () => {
  return (
    <div className="relative">
      <div className="bg-taskify-neutral-200 absolute top-9.5 left-4.5 flex h-63 w-230 items-center justify-center rounded-2xl">
        <div className="flex-col justify-items-center">
          <MdOutlineSearchOff className="text-taskify-neutral-500 h-15 w-15" />
          <p className="text-taskify-2lg-regular text-taskify-neutral-500">
            검색 결과가 없습니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoResult;
