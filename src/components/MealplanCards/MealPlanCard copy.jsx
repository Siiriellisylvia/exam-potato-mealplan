import "./MealPlanCard.css";
import Button from "../Button/Button";

export default function MealplanCard() {
  return (
    <section className="mealplanCardContainer">
      <article className="mealplanCard">
        <Button
          className="button-rounded material-symbols-rounded"
          text="Add"
          to="/recipes"
        />
        {/* <img
            src={recipe.image}
            alt={recipe.title}
            className="recipeCardImage"
          /> */}
        <h3>Add a meal</h3>
      </article>
    </section>
  );
}
