import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Mealplan.css";
import MealplanCard from "../../components/MealplanCards/MealPlanCard";

export default function Mealplan() {
  return (
    <>
      <TopBar />
      <section className="page">
        <h1>Meal plan</h1>
        <section className="mealplanContainer">
          <h2>Monday</h2>
          <div className="mealplanContainer">
            <MealplanCard />
          </div>
        </section>
      </section>
      <NavBar />
    </>
  );
}
