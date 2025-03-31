import { ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = ({
  children,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? 'button--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} disabled={disabled || isLoading} {...props}>
      {icon && iconPosition === 'left' ? <span className="button__icon">{icon}</span> : null}
      <span className="button__content">{children}</span>
      {icon && iconPosition === 'right' ? <span className="button__icon">{icon}</span> : null}
      {isLoading ? <span className="button__spinner" /> : null}
    </button>
  );
};

export default Button;
