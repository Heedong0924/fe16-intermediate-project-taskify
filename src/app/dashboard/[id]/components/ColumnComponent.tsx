import Image from 'next/image';

import settingIcon from '@/../public/images/icon/settings.svg';
import { AddCountChip, CounterChip } from '@/components/common/Chips';
import Button from '@/components/ui/Buttons';
import Column from '@/types/Column';

const ColumnComponent = ({ column }: { column: Column }) => {
  return (
    <section className="border-r-1 px-5">
      <div className="border-taskify-neutral-300 w-full shrink-0 border-t-1 pt-[22px] xl:h-full xl:max-w-[354px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="bg-taskify-violet-primary h-2 w-2 shrink-0 rounded-full" />
            <span className="text-taskify-2lg-bold mx-2">{column.title}</span>
            <CounterChip>3</CounterChip>
          </div>
          <button className="cursor-pointer" type="button">
            <Image src={settingIcon} alt="칼럼 수정 버튼" />
          </button>
        </div>
        <Button color="white-black" className="btn-addTodo mt-5 mb-4">
          <AddCountChip size="sm" />
        </Button>
        <div className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-200 my-4 cursor-pointer rounded-lg border-1 p-4">
          투두 카드
        </div>
        <div className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-200 my-4 cursor-pointer rounded-lg border-1 p-4">
          투두 카드
        </div>
        <div className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-200 my-4 cursor-pointer rounded-lg border-1 p-4">
          투두 카드
        </div>
      </div>
    </section>
  );
};

export default ColumnComponent;
