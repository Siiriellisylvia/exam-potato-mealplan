import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({currentMealPlanId}) {
  console.log("currentMealPlanId", currentMealPlanId);
  const location = useLocation();

  const isMealPlanActive =
    location.pathname === "/" || location.pathname.startsWith("/mealplan");

  return (
    <nav>
      <section className="nav-links">
        <NavLink
          to={currentMealPlanId ? `/mealplan/${currentMealPlanId}` : "/"}
          className={`nav-link ${isMealPlanActive ? "active" : ""}`}
        >
          <i className="material-symbols-rounded">stockpot</i>
          <a>Meal plan</a>
        </NavLink>

        <NavLink to="/shoppinglist" className="nav-link">
          <i className="material-symbols-rounded">list_alt</i>
          <a>Shopping list</a>
        </NavLink>

        <NavLink to="/profile" className="nav-link">
          <i className="material-symbols-rounded">person_apron</i>
          <a>Profile</a>
        </NavLink>
      </section>
    </nav>
  );
}
