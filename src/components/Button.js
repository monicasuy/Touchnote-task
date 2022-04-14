import '../stylesheets/Button.css';



const Button = ({ label, handleClick, disabled }) => (
  <button
    className="btn btn-default"
    disabled={disabled}
    onClick={handleClick}
  >
    {label}
  </button>
);

export default Button;
