import Image from 'next/image';

const NoInvitation = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex-col justify-items-center">
        <Image
          src="/images/envelope.png"
          alt="초대 없음"
          width={87.5}
          height={75}
        />
        <p className="text-taskify-neutral-300">
          아직 초대받은 대시보드가 없어요
        </p>
      </div>
    </div>
  );
};

export default NoInvitation;

// (
//   <div className="bg-taskify-neutral-0 flex h-[450px] w-[1022px] items-center justify-center rounded-2xl p-6 px-[32px]">
//     <div className="flex-col justify-items-center">
//       <Image
//         src="/images/envelope.png"
//         alt="초대 없음"
//         width={87.5}
//         height={75}
//       />
//       <p className="text-taskify-neutral-300">
//         아직 초대받은 대시보드가 없어요
//       </p>
//     </div>
//   </div>
// );
