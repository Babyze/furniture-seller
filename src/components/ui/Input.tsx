import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  children?: React.ReactNode;
}

const Input = ({ error, label, className = '', children, ...props }: InputProps) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className={`input-container ${error ? 'input-container--error' : ''}`}>
        <input className={`input ${className}`} {...props} />
        {children}
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
