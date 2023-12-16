import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { recipesRef } from "../../firebase-config";
import TopBar from "../../components/TopBar/TopBar";
import "./Recipe.css";
import RecipeTag from "../../components/CategoryTag/RecipeTag";
import Header from "../../components/Header/Header";

export default function Recipe() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    ingredients: [{ ingredient: "", amount: "", unit: ""}],
    servingSize: "",
    steps: [{ description: "" }],
    tags: [""],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeDocRef = doc(recipesRef, recipeId);
        const docSnapshot = await getDoc(recipeDocRef);

        if (docSnapshot.exists()) {
          const recipeData = docSnapshot.data();

          console.log("Fetched Ingredients:", recipeData.ingredients);
          console.log("Fetched Steps:", recipeData.steps);
          console.log("Fetched Tags:", recipeData.tags);

          setRecipe({
            title: recipeData.title,
            image: recipeData.image,
            ingredients: recipeData.ingredients || [],
            steps: recipeData.steps,
            tags: recipeData.tags,
          });
        } else {
          console.log("Recipe not found");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  console.log("Recipe State:", recipe);

  //-----------------horizontal kebab menu-----------------//

  const [showDropdown, setShowDropdown] = useState(false);

  // toggle dropdown visibility

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //function to handle edit
  const handleEdit = () => {
    navigate(`/editrecipe/${recipeId}`);
  };

const handleDelete = async () => {
  try {
    const recipeDocRef = doc(recipesRef, recipeId);
    await deleteDoc(recipeDocRef);
    console.log("Recipe deleted successfully");
    navigate("/recipes");
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
};

  return (
    <div className="page recipePage">
      <TopBar />
      <Header title={recipe.title} />
      <div className="recipe-image-container">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <button onClick={toggleDropdown} className="material-symbols-rounded recipe-kebab-icon">
          more_horiz
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      {recipe.tags.map((tag) => (
        <RecipeTag tag={tag} key={tag} />
      ))}

      <section className="mealplan-card-info-icons">

        <button className="button-primary button-square material-symbols-rounded">
          list_alt_add
        </button>
        <button className="button-primary button-square material-symbols-rounded">
          add
        </button>
      </section>
      <h2>Ingredients:</h2>
      <ul className="recipe-ingredients-list">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="recipe-ingredient-list">
            <section>
              <section className="recipe-amountAndUnit">
                {ingredient.amount} {ingredient.unit}
                <span style={{ marginLeft: "5px" }}></span>
              </section>
              {ingredient.ingredient}
            </section>
          </li>
        ))}
      </ul>

      <h2>Instructions:</h2>
      <ul className="recipe-steps-container">
        {recipe.steps.map((step, index) => (
          <li key={index} className="recipe-step-description-container">
            <div className="button-rounded">{index + 1}</div>
            {step.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
