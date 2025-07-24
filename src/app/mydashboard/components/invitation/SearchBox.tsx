'use client';

import SearchInput from './SearchInput';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const SearchBox = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div>
      <SearchInput val={searchTerm} onChange={setSearchTerm} />
    </div>
  );
};

export default SearchBox;
