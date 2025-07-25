// 'use client'; // 개발중에만

// import { useMemberStore } from '@/stores/useMemberStore';
// import { AvatarProfile } from '@/components/common/Profile';
// import { useEffect } from 'react';

// const MemberAvatars = () => {
//   const members = useMemberStore((state) => state.getMembers());

//   // 개발중에만 아래 주석까지
//   const setMembers = useMemberStore((state) => state.setMembers);

//   useEffect(() => {
//     if (members.length === 0) {
//       setMembers([
//         {
//           id: 1,
//           nickname: '은하',
//           profileImageUrl: null,
//           isOwner: true,
//           userId: 0,
//           email: '',
//           createdAt: '',
//           updatedAt: '',
//         },
//         {
//           id: 2,
//           nickname: '지우',
//           profileImageUrl: null,
//           isOwner: false,
//           userId: 0,
//           email: '',
//           createdAt: '',
//           updatedAt: '',
//         },
//         {
//           id: 3,
//           nickname: '민재',
//           profileImageUrl: null,
//           isOwner: false,
//           userId: 0,
//           email: '',
//           createdAt: '',
//           updatedAt: '',
//         },
//         {
//           id: 4,
//           nickname: '태윤',
//           profileImageUrl: null,
//           isOwner: false,
//           userId: 0,
//           email: '',
//           createdAt: '',
//           updatedAt: '',
//         },
//       ]);
//     }
//   }, [members, setMembers]);

//   // 위까지 개발환경코드

//   const visible = members.slice(0, 3);
//   const rest = members.length - visible.length;

//   return (
//     <div className="flex">
//       {visible.map((member, idx) => (
//         <div key={member.id} className={idx !== 0 ? '-ml-2' : ''}>
//           <AvatarProfile
//             userName={member.nickname}
//             profileImg={member.profileImageUrl}
//             size="md"
//           />
//         </div>
//       ))}
//       {rest > 0 && (
//         <div className="bg-muted text-muted-foreground -ml-2 flex size-[34px] items-center justify-center rounded-full border border-white text-xs font-medium">
//           +{rest}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MemberAvatars;
