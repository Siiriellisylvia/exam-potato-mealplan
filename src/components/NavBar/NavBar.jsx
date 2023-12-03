import { NavLink } from "react-router-dom";
import home from "../../assets/home.svg"
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav>
      <NavLink exact to="/home" className="nav-link">
        <img src={home} alt="Home" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/" className="nav-link">
        <img src={home} alt="Home" />
        <span>Home</span>
      </NavLink>
      <NavLink exact to="/" className="nav-link">
        <img src={home} alt="Home" />
        <span>Home</span>
      </NavLink>
      <NavLink exact to="/" className="nav-link">
        <img src={home} alt="Home" />
        <span>Home</span>
      </NavLink>
    </nav>
  );
}
