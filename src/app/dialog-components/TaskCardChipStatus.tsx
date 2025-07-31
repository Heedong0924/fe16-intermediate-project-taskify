import { HTMLAttributes } from 'react';

import { StatusChip, TagChip } from '../../components/common/Chips';

interface TaskCardChipStatusProps extends HTMLAttributes<HTMLDivElement> {
  columnName: string;
  tags: string[] | undefined;
}

const TaskCardChipStatus = ({
  className,
  columnName,
  tags,
}: TaskCardChipStatusProps) => {
  return (
    <div className={className}>
      <div className="grow-0">
        <StatusChip size="sm">{columnName}</StatusChip>
      </div>
      {tags && <span className="text-taskify-neutral-300">|</span>}
      {tags &&
        tags.map((e) => (
          <div key={e} className="grow-0">
            <TagChip size="sm">{e}</TagChip>
          </div>
        ))}
    </div>
  );
};

export default TaskCardChipStatus;
