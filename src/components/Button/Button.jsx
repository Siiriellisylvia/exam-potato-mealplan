import { Link } from "react-router-dom";
import "./Button.css";

const Button = (props) => {
  return (
    <Link
      to={props.Link}
      className={`button-primary ${props.className || "button-primary"}`} // Button styles, if no class is given, default to button-green
      type={props.type}
      onClick={props.function}
    >
      {props.text || "button"}{" "}
      {/* Button text, defaulting to "button" if not provided */}
    </Link>
  );
};

export default Button;
