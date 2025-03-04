import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  icon,
  children,
  type = 'button',
  ...rest
}) => (
  <button type={type} {...rest}>
    {icon && <span>{icon}</span>}
    {children}
  </button>
);

export default Button;
