import AuthHero from './components/AuthHero';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-[30px] px-3">
        <AuthHero />
        <div className="w-full max-w-[520px]">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
