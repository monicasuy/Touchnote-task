import '../stylesheets/Button.css';
// Button component that will take the props and return a button HTML element using those props
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
