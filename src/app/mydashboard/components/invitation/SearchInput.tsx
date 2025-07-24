import { ChangeEvent } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

interface SearchInputProps {
  val: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ val, onChange }: SearchInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  console.log(val);
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="초대받은 프로젝트 이름을 검색하세요"
        value={val}
        onChange={handleChange}
        className="text-taskify-lg-regular text-taskify-neutral-400 border-taskify-neutral-300 h-[40px] w-[954px] rounded-md border-[1px] py-1.5 pl-10"
      />
      <IoSearchSharp className="text-taskify-neutral-700 absolute top-2.5 left-3 h-5.5 w-5.5" />
    </div>
  );
};

export default SearchInput;
