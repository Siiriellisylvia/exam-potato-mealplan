import "./RecipeCard.css";

export default function RecipeCard({ recipe }) {

  return (
    <section className="recipeCardContainer">
      <article className="recipeCard">
        <div className="recipeImageContainer">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="recipeCardImage"
          />
        </div>
        <section className="recipeCardRight">
          <p className="recipeCardBoldTitle">{recipe.title}</p>
        </section>
      </article>
    </section>
  );
}
