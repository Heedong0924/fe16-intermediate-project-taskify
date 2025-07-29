// import { useEffect, useRef, useState } from 'react';

// import { mockInvitations } from '@/app/mydashboard/components/invitation/mockData';
// import { Invitation } from '@/types/Invitation';

// import InvitationListItem from './InvitationListItem';
// import NoResult from './Noresult';

// type InvitationProps = {
//   searchTerm: string;
// };

// const InvitationListTest = ({ searchTerm }: InvitationProps) => {
//   const observerEl = useRef<HTMLTableRowElement | null>(null);
//   const [page, setPage] = useState(1);
//   const [invitations, setInvitations] = useState<Invitation[]>([]);
//   const size = 10;

//   const filtered = mockInvitations.filter((inv) =>
//     inv.dashboard.title.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const paginated = filtered.slice(0, page * size);

//   useEffect(() => {
//     setInvitations(paginated);
//   }, [page, searchTerm]);

//   useEffect(() => {
//     const currentEl = observerEl.current;
//     const io = new IntersectionObserver((entries) => {
//       console.log('intersection:', entries[0].isIntersecting);

//       if (entries[0].isIntersecting && page * size < filtered.length) {
//         setPage((prev) => prev + 1);
//       }
//     });

//     if (currentEl) io.observe(currentEl);
//     return () => {
//       if (currentEl) io.disconnect();
//     };
//   }, [filtered.length, page]);

//   if (filtered.length === 0) {
//     return <NoResult />;
//   }

//   return (
//     <table className="w-full text-left">
//       <thead className="bg-taskify-neutral-0 sticky top-0 z-10">
//         <tr>
//           <th
//             colSpan={4}
//             aria-hidden="true"
//             className="bg-taskify-neutral-0 sticky h-6 border-none"
//           >
//             &nbsp;
//           </th>
//         </tr>
//         <tr>
//           <th className="text-taskify-lg-regular text-taskify-neutral-400 pl-[76px]">
//             이름
//           </th>
//           <th className="text-taskify-lg-regular text-taskify-neutral-400">
//             초대자
//           </th>
//           <th className="text-taskify-lg-regular text-taskify-neutral-400">
//             초대한 시점
//           </th>
//           <th className="text-taskify-lg-regular text-taskify-neutral-400 pl-[65px]">
//             수락 여부
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {invitations.map((invitation, i) => {
//           const isLast = i === invitations.length - 1;
//           return (
//             <InvitationListItem
//               key={invitation.id}
//               invitation={invitation}
//               searchTerm={searchTerm}
//               observerRef={isLast ? observerEl : null} // 👈 마지막 요소에만 ref 전달
//             />
//           );
//         })}
//         <tr ref={observerEl}>
//           <td colSpan={4} aria-hidden="true">
//             <div style={{ height: '10px' }} />
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };

// export default InvitationListTest;
