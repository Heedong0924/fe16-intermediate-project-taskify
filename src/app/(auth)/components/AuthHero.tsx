// src/app/(auth)/components/AuthHero.tsx
import Image from 'next/image';

const AuthHero = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-[10px]">
        <div className="w-max-[200px] flex w-full flex-col items-center justify-between gap-[30px]">
          <Image
            src="/images/LogoImage.svg"
            alt="로고"
            width={200}
            height={200}
            priority
            style={{ width: '200px', height: 'auto' }}
          />
          <Image
            src="/images/Taskify.svg"
            alt="Taskify 로고"
            width={200}
            height={50}
            priority
            style={{ width: '200px', height: 'auto' }}
          />
        </div>
        <h3 className="text-center text-xl">오늘도 만나서 반가워요 !</h3>
      </div>
    </div>
  );
};

export default AuthHero;
