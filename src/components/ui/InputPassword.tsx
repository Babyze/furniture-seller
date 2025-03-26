import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Input from './Input';
import './InputPassword.css';

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  showPasswordIcon?: React.ReactNode;
  hidePasswordIcon?: React.ReactNode;
}

const InputPassword = ({
  error,
  label,
  showPasswordIcon: ShowPasswordIcon = <FiEye />,
  hidePasswordIcon: HidePasswordIcon = <FiEyeOff />,
  className = '',
  ...props
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';

  return (
    <Input
      type={inputType}
      error={error}
      label={label}
      className={`input-password ${className}`}
      {...props}
    >
      <button
        type="button"
        className="input-password-toggle"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? ShowPasswordIcon : HidePasswordIcon}
      </button>
    </Input>
  );
};

export default InputPassword;
