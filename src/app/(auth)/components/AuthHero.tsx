// src/app/(auth)/components/AuthHero.tsx
import { LogoLg } from '@/components/ui/SVGLogo';

const AuthHero = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-[10px]">
        <LogoLg />
        <h3 className="text-center text-xl">오늘도 만나서 반가워요 !</h3>
      </div>
    </div>
  );
};

export default AuthHero;
