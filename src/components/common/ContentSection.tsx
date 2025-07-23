import React from 'react';

export function ContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-4 rounded-[16px] bg-white px-[16px] py-[20px] md:px-[28px] md:py-[32px]">
      <h1 className="text-[20px] font-[700] md:text-[24px]">{title}</h1>
      <div>{children}</div>
    </section>
  );
}

// 타이틀 옆 컨텐츠 있을 경우
export function ContentSectionWithAction({
  title,
  titleRight,
  children,
}: {
  title: string;
  titleRight: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-4 rounded-[16px] bg-white px-[16px] py-[20px] md:px-[28px] md:py-[32px]">
      <div className="mb-[12px] flex items-center justify-between">
        <h1 className="text-[20px] font-[700] md:text-[24px]">{title}</h1>
        <div className="flex">{titleRight}</div>
      </div>
      <div>{children}</div>
    </section>
  );
}
