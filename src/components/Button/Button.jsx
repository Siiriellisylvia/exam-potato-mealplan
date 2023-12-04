import { Link } from "react-router-dom";
import "./Button.css";

const Button = (props) => {
   const handleClick = () => {
     // Your custom logic or function to execute on button click
     console.log("Button clicked!");
     // You can also conditionally execute a provided function
     if (props.onClick) {
       props.onClick();
     }
   };
  return (
    <Link
      to={props.to}
      className={`button-primary ${props.className || "button-primary"}`} // Button styles, if no class is given, default to primary
      type={props.type}
      onClick={handleClick} // Use the local handleClick function here
    >
      {props.text || "button"}{" "}
      {/* Button text, defaulting to "button" if not provided */}
    </Link>
  );
};

export default Button;
