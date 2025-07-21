// 'use client'

// import { useDebounce } from "@/hooks/useDebounce";
// import { useGetInvitations } from "@/hooks/useGetInvitations";
// import { useMemo, useState } from "react"
// import SearchInput from "./SearchInput";

// const SearchBox = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // 디바운스 시간은 300ms로 사용
//   const debouncedSearchTerm = useDebounce(searchTerm, 300);

//   const { data } = useGetInvitations();

//   // data 또는 debouncedSearchTerm이 바뀔 때만 필터 연산 수행 (불필요한 연산 방지)
//   // const filteredResults = useMemo(()=> { if (!data?.invitations) return [];
//   //   return data.invitations.filter((item)=> item.dashboard.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
//   // }, [data, debouncedSearchTerm]);

//   // 추후 리스트 렌더링 시 filteredResults 연결하여 활용 예정
//   return (
//     <div>
//       <SearchInput value={searchTerm} onChange={setSearchTerm} />
//     </div>
//   )
// }

// export default SearchBox
