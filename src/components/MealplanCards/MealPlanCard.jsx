import "./MealPlanCard.css";

export default function MealplanCard({ recipe, onClick}) {
  return (
    <article className="mealplan-card" onClick={() => onClick(recipe.id)}>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="mealplan-card-image"
      />
      <section className="mealplan-card-info">
        <h3>{recipe.title}</h3>
        <section className="mealplan-card-info-icons">
          <button className="button-primary button-square material-symbols-rounded">
            edit
          </button>
          <button className="button-primary button-square material-symbols-rounded">
            list_alt_add
          </button>
        </section>
      </section>
    </article>
  );
}
