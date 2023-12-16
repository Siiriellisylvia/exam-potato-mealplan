import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import { useEffect, useState } from "react";

export default function RecipeCard({ recipe, onAddToMealPlan, isSelected, onRemoveFromMealPlan }) {
  const navigate = useNavigate();

  const [isAdded, setIsAdded] = useState(isSelected);

    useEffect(() => {
      setIsAdded(isSelected);
    }, [isSelected]);

  const handleAddClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
if (isAdded) {
  onRemoveFromMealPlan(recipe.id);
} else {
  onAddToMealPlan(recipe);
}

setIsAdded(!isAdded);
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
              onClick={handleAddClick}
            >
              {isAdded ? "check" : "add"}
            </button>
          </div>
        </div>
        <h2>{recipe.title}</h2>
      </article>
    </section>
  );
}
