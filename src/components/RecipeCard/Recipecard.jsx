import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import Button from "../Button/Button";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  function openRecipe() {
    navigate(`/recipes/${recipe.id}`);
  }

  return (
    <section className="recipeCardContainer">
      <article className="recipeCard" onClick={openRecipe}>
        <div className="cardImageContainer">
          <img src={recipe.image} alt={recipe.title} />
          <div className="overlay">
            <Button
              className="button-rounded material-symbols-rounded"
              text="Add"
            />
          </div>
        </div>
        <h2>{recipe.title}</h2>
      </article>
    </section>
  );
}
