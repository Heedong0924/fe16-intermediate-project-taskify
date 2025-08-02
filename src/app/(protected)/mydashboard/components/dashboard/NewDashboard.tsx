import { TbClipboardPlus } from 'react-icons/tb';

const NewDashboard = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex-col justify-items-center">
        <TbClipboardPlus className="text-taskify-neutral-300 h-22 w-22" />
        <p className="text-taskify-neutral-300 mt-3">
          클릭하여 새로운 대시보드를 만들어 보세요
        </p>
      </div>
    </div>
  );
};

export default NewDashboard;
