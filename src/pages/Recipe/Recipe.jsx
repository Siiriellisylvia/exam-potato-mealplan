import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { recipesRef } from "../../firebase-config";
import TopBar from "../../components/TopBar/TopBar";
import "./Recipe.css";
import RecipeTag from "../../components/CategoryTag/RecipeTag";

export default function Recipe() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    ingredients: [{ ingredient: "", amount: "", unit: "" }],
    servingSize: "",
    steps: [{ description: "" }],
    tags: [""],
  });

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

  return (
    <div className="page recipePage">
      <TopBar />
      <h1 className="header">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />

      {recipe.tags.map((tag) => (
        <RecipeTag tag={tag} key={tag} />
      ))}

      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
          </li>
        ))}
      </ul>

      <h2>Instructions:</h2>
      <ul>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step.description}</li>
        ))}
      </ul>
    </div>
  );
}
