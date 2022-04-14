import '../stylesheets/Button.css';

const Button = ({ label, handleClick, disabled }) => (
  <button
    className="btn btn-ghost"
    disabled={disabled}
    onClick={handleClick}
  >
    {label}
  </button>
);

export default Button;
