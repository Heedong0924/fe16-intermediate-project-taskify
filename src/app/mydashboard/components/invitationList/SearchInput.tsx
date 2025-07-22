import { ChangeEvent } from 'react';

interface SearchInputProps {
  val: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ val, onChange }: SearchInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  console.log(val);
  // css 예시. 수정 필요
  return (
    <input
      type="text"
      placeholder="초대받은 프로젝트 이름을 검색하세요"
      value={val}
      onChange={handleChange}
      className="h-6 w-90"
    />
  );
};

export default SearchInput;
