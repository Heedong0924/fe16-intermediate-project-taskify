import React from 'react';

type ButtonProps = {
  type?: 'button' | 'submit';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
};

const Button = ({
  type = 'button',
  className,
  onClick,
  children,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      {...(disabled && { disabled: true })}
      type={type === 'button' ? 'button' : 'submit'}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
