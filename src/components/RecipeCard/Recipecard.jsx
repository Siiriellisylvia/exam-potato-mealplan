import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  function openRecipe() {
    navigate(`/recipes/${recipe.id}`);
  }

  return (
    <section className="recipeCardContainer">
      <article className="recipeCard" onClick={openRecipe}>
        <img src={recipe.image} alt={recipe.title} />
        <h2>{recipe.title}</h2>
      </article>
    </section>
  );
}
