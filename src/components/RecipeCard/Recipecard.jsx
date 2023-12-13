import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

export default function RecipeCard({ recipe, onAddToMealPlan }) {
  const navigate = useNavigate();

  const handleAddClick = (e) => {
    e.stopPropagation(); // Prevents the openRecipe from being triggered
    e.preventDefault();
    onAddToMealPlan(recipe);
  };

  function openRecipe() {
    navigate(`/recipes/${recipe.id}`);
  }

  return (
    <section className="recipeCardContainer">
      <article className="recipeCard" onClick={openRecipe}>
        <div className="cardImageContainer">
          <img src={recipe.image} alt={recipe.title} />
          <div className="overlay">
            <button
              className="button-primary button-rounded material-symbols-rounded"
              onClick={handleAddClick}>Add</button>
          </div>
        </div>
        <h2>{recipe.title}</h2>
      </article>
    </section>
  );
}
