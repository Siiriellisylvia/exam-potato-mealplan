import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const location = useLocation();

  const isHomeActive = location.pathname === "/";

  return (
    <nav>
      <NavLink
        to="/home"
        className={`nav-link ${isHomeActive ? "active" : ""}`}
      >
        <i className="material-symbols-rounded">home</i>
        <a>Home</a>
      </NavLink>

      <NavLink to="/mealplan" className="nav-link">
        <i className="material-symbols-rounded">stockpot</i>
        <a>Meal plan</a>
      </NavLink>

      <NavLink to="/groceries" className="nav-link">
        <i className="material-symbols-rounded">list_alt</i>
        <a>Groceries</a>
      </NavLink>

      <NavLink to="/profile" className="nav-link">
        <i className="material-symbols-rounded">person_apron</i>
        <a>Profile</a>
      </NavLink>
    </nav>
  );
}
