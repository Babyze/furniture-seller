import './Textarea.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  className?: string;
}

const Textarea = ({ error, label, className = '', ...props }: TextareaProps) => {
  return (
    <div className="textarea-wrapper">
      {label && <label className="textarea-label">{label}</label>}
      <div className={`textarea-container ${error ? 'textarea-container--error' : ''}`}>
        <textarea className={`textarea ${className}`} {...props} />
      </div>
      {error && <span className="textarea-error">{error}</span>}
    </div>
  );
};

export default Textarea;
