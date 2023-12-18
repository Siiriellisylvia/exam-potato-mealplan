import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { mealplansRef } from "../../firebase-config";
import MealplanCard from "../../components/MealplanCards/MealPlanCard";
import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Mealplan.css"; // Create a CSS file for styling if needed
import MealplanModal from "../../components/DeleteConfirmationModal/MealplanModal";

export default function Mealplan({ user, recipe, setCurrentMealPlanId }) {
  const { mealPlanId } = useParams(); // Get the mealPlanId from the URL
  const [mealPlanRecipes, setMealPlanRecipes] = useState([]);

  // Fetch the meal plan from the database
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
  }, [user, mealPlanId, recipe]);

  // // Function to delete the meal plan
  // const deleteMealPlan = async () => {
  //   if (window.confirm("Are you sure you want to delete this meal plan?")) {
  //     const mealPlanDocRef = doc(mealplansRef, user.uid);

  //     await updateDoc(mealPlanDocRef, {
  //       [`mealPlans.${mealPlanId}`]: deleteField(), // Use deleteField to remove a specific field
  //     });

  //     navigate("/"); // Navigate to another page after deletion
  //   }
  // };

  //--------confirmation modal--------//

  //-----------------delete confirmation modal-----------------//
  const [isModalOpen, setIsModalOpen] = useState(false);

  // function to show modal
  const showDeleteModal = () => {
    setIsModalOpen(true);
  };

  // function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // function to confirm deletion
  const confirmDeletion = async () => {
    closeModal();
    try {
      const mealPlanDocRef = doc(mealplansRef, user.uid);
      await updateDoc(mealPlanDocRef, {
        [`mealPlans.${mealPlanId}`]: deleteField(), // Use deleteField to remove a specific field
      });
      console.log("Meal plan deleted successfully");
      setCurrentMealPlanId(null); // Reset the current meal plan ID

      navigate("/"); // Navigate to the main page
    } catch (error) {
      console.error("Error deleting meal plan:", error);
    }
  };

  //--------open recipe--------//

  const navigate = useNavigate();
  function openRecipe(recipeId) {
    console.log(`Navigating to recipe with id: ${recipeId}`);

    navigate(`/recipes/${recipeId}`);
  }

  //-----add ingredients to shopping list-----//

  function addIngredientsToShoppingList() {
    console.log("Adding ingredients to shopping list");
    navigate("/shoppinglist");
  }

  return (
    <>
      <section className="page mealplan-page">
        <TopBar />
        <MealplanModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDeletion}
        />
        <h1 className="header">Your meal plan</h1>
        <p>Add recipes to your shopping list and get cooking!</p>
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
        <button
          className="button-primary mealplan-button"
          onClick={showDeleteModal}
        >
          Start new
        </button>
        <button
          className="button-primary mealplan-button"
          onClick={addIngredientsToShoppingList}
        >
          Add all to shopping list
        </button>
      </section>
      <NavBar />
    </>
  );
}
