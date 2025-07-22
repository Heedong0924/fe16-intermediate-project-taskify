import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'violet-white' | 'white-black' | 'white-violet' | 'modal-cancel';
} // <bg>-<text>

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  color = 'violet-white',
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
      colorStyle = ''; // 기본 color 가 없다면 빈 문자열
  }

  const allClassName = `${baseStyles} ${colorStyle} ${className || ''}`.trim();

  return (
    <button
      onClick={onClick}
      {...(disabled && { disabled: true })}
      type={type === 'button' ? 'button' : 'submit'}
      className={allClassName}
    >
      {children}
    </button>
  );
};

export default Button;
