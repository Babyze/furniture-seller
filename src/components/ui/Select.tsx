import './Select.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

const Select = ({ error, label, className = '', children, ...props }: SelectProps) => {
  return (
    <div className="select-wrapper">
      {label && <label className="select-label">{label}</label>}
      <div className={`select-container ${error ? 'select-container--error' : ''}`}>
        <select className={`select ${className}`} {...props}>
          {children}
        </select>
      </div>
      {error && <span className="select-error">{error}</span>}
    </div>
  );
};

export default Select;
