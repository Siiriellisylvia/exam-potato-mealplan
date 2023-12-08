import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { recipesRef } from "../../firebase-config";

export default function Recipe() {
  const { recipeId } = useParams(); // Extract recipeId from URL parameters
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    ingredients: [{ ingredient:"", amount: "", unit: "" }]
  });


useEffect(() => {
  const fetchRecipe = async () => {
    try {
      // Fetch the recipe document data from Firestore
      const recipeDocRef = doc(recipesRef, recipeId);
      const docSnapshot = await getDoc(recipeDocRef);

      if (docSnapshot.exists()) {
        // Extract the data from the document
        const recipeData = docSnapshot.data();

        // Update the state with the fetched data
        setRecipe({
          title: recipeData.title,
          image: recipeData.image,
          ingredients: recipeData.ingredients || [], // Ensure it's an array
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
  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
 <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
          </li>
        ))}
      </ul>

    </div>
  );
}
