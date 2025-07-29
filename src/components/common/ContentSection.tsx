import React from 'react';

type ContentSectionProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

type ContentSectionWithActionProps = ContentSectionProps & {
  titleRight: React.ReactNode;
};

export function ContentSection({
  title,
  children,
  className = '',
}: ContentSectionProps) {
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
}: ContentSectionWithActionProps) {
  return (
    <section
      className={`${className} mb-4 max-w-[none] rounded-[16px] bg-white py-[20px] sm:max-w-[700px] sm:py-[32px]`}
    >
      <div className="class-flex class-grid mx-[20px] mb-[12px] sm:mx-[28px]">
        <h1 className="w-full text-[20px] font-[700] sm:text-[24px]">
          {title}
        </h1>
        {titleRight}
      </div>
      {children}
    </section>
  );
}
