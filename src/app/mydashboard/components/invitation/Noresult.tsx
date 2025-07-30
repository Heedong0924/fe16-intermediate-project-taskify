import { MdOutlineSearchOff } from 'react-icons/md';

const NoResult = () => {
  return (
    <div className="relative">
      <div className="bg-taskify-neutral-0 absolute top-5 left-4.5 flex h-55 w-64 items-center justify-center rounded-2xl md:h-63 md:w-132 lg:h-63 lg:w-230">
        <div className="flex-col justify-items-center">
          <MdOutlineSearchOff className="text-taskify-neutral-500 h-15 w-15" />
          <p className="text-taskify-lg-regular text-taskify-neutral-500">
            검색 결과가 없습니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoResult;
