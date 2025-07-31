'use client';

import Image from 'next/image';

import sectionImg from 'public/images/hero.jpg';

import LandingFooter from './components/LandingFooter';
import LandingLoginButton from './components/LandingLoginButton';
import PointCard from './components/PointCard';
import SettingCard from './components/SettingCard';

export default function Home() {
  return (
    <main className="bg-taskify-neutral-900 text-taskify-neutral-0 mx-auto my-0">
      {/* padding-x container */}
      <div className="px-4 md:px-10 xl:mx-auto xl:max-w-300 xl:px-0">
        {/* grid */}
        <div className="grid grid-cols-3 place-items-center">
          {/* hero */}
          <div className="relative col-span-3 mt-10 aspect-video w-[77vw] max-w-[722px] md:mt-23.5 md:w-[72vw] xl:mt-50">
            <Image
              className="rounded-sm object-cover"
              src={sectionImg}
              alt="Taskify Hero 이미지"
              fill
              sizes="(max-width: 768px) 77vw, (max-width: 1200px) 72vw, 722px"
              priority
              data-aos="fade-up"
            />
          </div>
          <div
            className="col-span-3 mt-[26px] flex flex-col items-center justify-center md:mt-12 md:flex-row md:gap-6 md:leading-25 xl:gap-7"
            data-aos="fade-up"
          >
            <h1 className="col-span-3 text-[2.5rem] font-bold md:text-[3.5rem] xl:text-[4.75rem]">
              새로운 일정 관리
            </h1>
            <h1 className="text-taskify-violet-primary text-[2.625rem] font-bold md:text-[3.5rem] xl:text-[4.75rem]">
              Taskify
            </h1>
          </div>
          <div
            className="col-span-3 mt-25 md:mt-22 xl:mt-23"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            <LandingLoginButton className="h-[46px] w-[235px] md:h-[54px] md:w-[280px]" />
          </div>

          {/* point cards */}
          <section className="col-span-3 mt-19 flex w-full flex-col gap-15 md:mt-45 md:gap-22.5">
            <PointCard
              className="md:mx-auto md:w-full md:max-w-192 xl:h-150 xl:max-w-none"
              pointNum={1}
              imageUrl="https://placehold.co/600x500/F1EFFD/760DDE.jpg?text=<Task Management>"
              imagePosition="bottom-right"
              aos={{
                'data-aos': 'zoom-out-right',
                'data-aos-anchor-placement': 'center-bottom',
              }}
            >
              일의 우선순위를
              <br />
              관리하세요
            </PointCard>
            <PointCard
              className="md:mx-auto md:w-full md:max-w-192 xl:h-150 xl:max-w-none"
              pointNum={2}
              imageUrl="https://placehold.co/440x500/F1EFFD/760DDE.jpg?text=<Add a task>"
              imagePosition="bottom"
              aos={{
                'data-aos': 'zoom-out-left',
                'data-aos-anchor-placement': 'center-bottom',
              }}
            >
              해야 할 일을
              <br />
              등록하세요
            </PointCard>
          </section>

          {/* setting cards */}
          <section className="col-span-3 mt-22.5 flex w-full flex-col items-center justify-between gap-10 md:gap-12 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:gap-y-9">
            <p
              className="text-center text-[1.375rem] font-bold md:text-[1.75rem] md:leading-8 xl:col-span-3 xl:text-left"
              data-aos="fade-down"
              data-offset="250"
            >
              생산성을 높이는 다양한 설정 ⚡
            </p>
            <SettingCard
              className="w-full"
              title="대시보드 설정"
              imageUrl="https://placehold.co/600x400/F1EFFD/760DDE.jpg?text=<Dashboard>&bg=0000FF&text_color=FFFFFF"
              aos={{
                'data-aos': 'fade-down',
                'data-aos-delay': '200',
                'data-aos-anchor-placement': 'bottom-bottom',
              }}
            >
              대시보드 사진과 이름을 변경할 수 있어요.
            </SettingCard>
            <SettingCard
              className="w-full"
              title="초대"
              imageUrl="https://placehold.co/600x400/F1EFFD/760DDE.jpg?text=<Invitation>"
              aos={{
                'data-aos': 'fade-down',
                'data-aos-delay': '400',
                'data-aos-anchor-placement': 'bottom-bottom',
              }}
            >
              새로운 팀원을 초대할 수 있어요.
            </SettingCard>
            <SettingCard
              className="w-full"
              title="구성원"
              imageUrl="https://placehold.co/600x400/F1EFFD/760DDE.jpg?text=<Member>"
              aos={{
                'data-aos': 'fade-down',
                'data-aos-delay': '600',
                'data-aos-anchor-placement': 'bottom-bottom',
              }}
            >
              구성원을 초대하고 내보낼 수 있어요.
            </SettingCard>
          </section>

          {/* footer */}
          <LandingFooter className="col-span-3 w-full" />
        </div>
      </div>
    </main>
  );
}
