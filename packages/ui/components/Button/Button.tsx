import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  className = '',
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles.default,
    disabled ? styles.disabled : '',
    isLoading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !isLoading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
