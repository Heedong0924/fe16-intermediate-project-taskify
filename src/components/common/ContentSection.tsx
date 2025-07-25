import React from 'react';

export function ContentSection({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`${className} mb-4 max-w-[none] rounded-[16px] bg-white px-[16px] py-[20px] sm:max-w-[700px] sm:px-[28px] sm:py-[32px]`}
    >
      <h1 className="text-[20px] font-[700] sm:text-[24px]">{title}</h1>
      {children}
    </section>
  );
}

// 타이틀 옆 컨텐츠 있을 경우
export function ContentSectionWithAction({
  title,
  titleRight,
  children,
  className = '',
}: {
  title: string;
  titleRight: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`${className} mb-4 max-w-[none] rounded-[16px] bg-white py-[20px] sm:max-w-[700px] sm:py-[32px]`}
    >
      <div className="mb-[12px] flex items-center justify-between px-[20px] sm:px-[28px]">
        <h1 className="text-[20px] font-[700] sm:text-[24px]">{title}</h1>
        <div className="flex">{titleRight}</div>
      </div>
      {children}
    </section>
  );
}
