import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { mealplansRef } from "../../firebase-config";
import MealplanCard from "../../components/MealplanCards/MealPlanCard";
import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Mealplan.css"; // Create a CSS file for styling if needed

export default function Mealplan({ user }) {
  const { mealPlanId } = useParams(); // Get the mealPlanId from the URL
  const [mealPlanRecipes, setMealPlanRecipes] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchMealPlan = async () => {
        const mealPlanDocRef = doc(mealplansRef, user.uid);
        const docSnap = await getDoc(mealPlanDocRef);

        if (docSnap.exists()) {
          const mealPlanData = docSnap.data().mealPlans[mealPlanId];
          if (mealPlanData) {
            console.log("Meal plan found:", mealPlanData);
            setMealPlanRecipes(mealPlanData.recipes);
          } else {
            console.log("Meal plan not found");
          }
        } else {
          console.log("No such document!");
        }
      };

      fetchMealPlan();
    }
  }, [user, mealPlanId]);

  const navigate = useNavigate();
  function openRecipe(recipeId) {
    console.log(`Navigating to recipe with id: ${recipeId}`);

    navigate(`/recipes/${recipeId}`);
  }

  return (
    <>
      <TopBar />
      <section className="page">
        <h1 className="header">Your Meal Plan</h1>
        <section className="mealplan-container">
          {mealPlanRecipes.map((recipe) => (
            <MealplanCard
              recipe={recipe}
              key={recipe.id}
              onClick={openRecipe}
            />
          ))}
        </section>
      </section>
      <section className="mealplan-button-container">
        <button className="button-primary mealplan-button">Start new</button>
        <button className="button-primary mealplan-button">
          Add all to shopping list
        </button>
      </section>
      <NavBar />
    </>
  );
}
