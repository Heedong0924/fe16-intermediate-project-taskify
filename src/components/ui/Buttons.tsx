import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'violet-white' | 'white-black' | 'white-violet' | 'modal-cancel'; // bg-text
  purpose?:
    | 'login' // 로그인 버튼
    | 'modal' // 버튼 1개짜리 모달
    | 'modal-db' // 버튼 2개짜리 모달
    | 'one' // 혼자있는 버튼
    | 'db' // 짝이 있는 버튼
    | 'addCol' // 칼럼 추가버튼
    | 'addDash' // 대시보드 추가 버튼
    | 'removeDash' // 대시보드 삭제 버튼
    | 'dash' // 대시보드 리스트(?)
    | 'addTodo'; // 투두 추가 버튼
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  color = 'violet-white',
  purpose = 'db',
  onClick,
  className,
  children,
  disabled = false,
}) => {
  const baseStyles =
    'flex justify-center items-center cursor-pointer rounded-lg disabled:cursor-default disabled:bg-taskify-neutral-400';

  // variant에 따른 Tailwind 유틸리티 클래스 조합
  let colorStyle: string;
  switch (color) {
    case 'violet-white':
      colorStyle =
        'bg-taskify-violet-primary text-taskify-neutral-0 hover:bg-taskify-purple';
      break;
    case 'white-violet':
      colorStyle =
        'bg-taskify-neutral-0 text-taskify-violet-primary hover:bg-taskify-neutral-200';
      break;
    case 'white-black':
      colorStyle =
        'bg-taskify-neutral-0 text-taskify-neutral-700 hover:bg-taskify-neutral-200';
      break;
    case 'modal-cancel':
      colorStyle =
        'bg-taskify-neutral-0 text-taskify-neutral-500 hover:bg-taskify-neutral-200';
      break;
    default:
      colorStyle = ''; // 기본 variant가 없다면 빈 문자열
  }

  // size에 따른 Tailwind 유틸리티 클래스 조합
  // login: 로그인, 가입하기 버튼 | modal: 버튼1개 모달 | modal-db: 버튼2개 모달 | one: 버튼 하나짜리(e.x.구성원삭제버튼) | db: 버튼 두개짜리 (e.x.수락, 거절버튼)
  let purposeStyle: string;
  switch (purpose) {
    case 'login':
      purposeStyle = 'text-taskify-2lg-medium h-[50px] w-[351px] md:w-[500px]';
      break;
    case 'modal':
      purposeStyle =
        'text-taskify-md-medium md:text-taskify-lg-semibold  h-[42px] w-[192px] md:h-12 md:w-60';
      break;
    case 'modal-db':
      purposeStyle = 'text-taskify-lg-semibold h-[54px] w-[144px] md:w-[256px]';
      break;
    case 'one':
      purposeStyle =
        'text-taskify-xs-medium md:text-taskify-md-medium h-8 w-[52px] md:w-[84px]';
      break;
    case 'db':
      purposeStyle =
        'text-taskify-xs-medium md:text-taskify-md-medium h-8 w-[109px] md:w-[72px] xl:w-[84px]';
      break;
    case 'addCol':
      purposeStyle =
        'text-taskify-lg-bold md:text-taskify-2lg-bold h-[66px] w-[284px] md:h-[70px] md:w-[544px] xl:w-[534px]';
      break;
    case 'addDash':
      purposeStyle =
        'text-taskify-md-semibold md:text-taskify-lg-semibold h-[58px] w-[260px]  md:h-[68px] md:w-[247px] xl:h-[70px] xl:w-[332px]';
      break;
    case 'removeDash':
      purposeStyle =
        'text-taskify-lg-medium md:text-taskify-2lg-medium h-[52px] w-[284px]  md:h-[62px] md:w-80';
      break;
    case 'dash':
      purposeStyle =
        'text-taskify-md-semibold md:text-taskify-lg-semibold h-[58px] w-[260px] md:h-[68px] md:w-[247px] xl:h-[70px] xl:w-[332px]';
      break;
    case 'addTodo':
      purposeStyle = 'h-8 w-[284px] md:h-10 md:w-[544px] xl:w-10';
      break;

    default:
      purposeStyle = '';
  }

  const allClassName =
    `${baseStyles} ${colorStyle} ${purposeStyle} ${className || ''}`.trim();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type === 'submit' ? 'submit' : 'button'}
      className={allClassName}
    >
      {children}
    </button>
  );
};

export default Button;
