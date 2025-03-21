import React, { ButtonHTMLAttributes, FC } from 'react';

type Props = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ icon, children, type = 'button', ...rest }) => (
  <button type={type} {...rest}>
    {icon && <span>{icon}</span>}
    {children}
  </button>
);

export default Button;
