import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Recipes.css";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { mealplansRef, recipesRef, usersRef } from "../../firebase-config";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryTag from "../../components/CategoryTag/CategoryTag";

export default function Recipes({ recipe, user}) {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      // Fetching selected recipes when component mounts
      const getUserMealPlan = async () => {
        console.log("Fetching user meal plan for user:", user.uid);

        const docRef = doc(usersRef, user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserName(docSnap.data().name); // Set the user's name

          console.log(
            "Fetched selected recipes:",
            docSnap.data().selectedRecipes
          );

          setSelectedRecipes(docSnap.data().selectedRecipes || []);
        } else {
          console.log("No such document!");
        }
      };

      getUserMealPlan();
    }
  }, [user]); // Dependency on userId to refetch when the user changes

  const updateFirestoreSelectedRecipes = async (newSelectedRecipes) => {
    if (user) {
      console.log(
        "Updating Firestore with new selected recipes:",
        newSelectedRecipes
      );

      const userDocRef = doc(usersRef, user.uid);
      await setDoc(
        userDocRef,
        { selectedRecipes: newSelectedRecipes },
        { merge: true }
      );
    }
  };

  const addRecipeToMealPlan = (recipeToAdd) => {
    const isRecipeAlreadySelected = selectedRecipes.some(
      (recipe) => recipe.id === recipeToAdd.id
    );

    if (!isRecipeAlreadySelected) {
      if (selectedRecipes.length < 7) {
        const newSelectedRecipes = [...selectedRecipes, recipeToAdd];
        setSelectedRecipes(newSelectedRecipes);
        updateFirestoreSelectedRecipes(newSelectedRecipes);
      } else {
        alert("You can add up to 7 recipes to your mealplan.");
      }
    } else {
      alert("This recipe is already in your mealplan.");
    }
  };

  const removeRecipeFromMealPlan = (recipeId) => {
    const newSelectedRecipes = selectedRecipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    setSelectedRecipes(newSelectedRecipes);
    updateFirestoreSelectedRecipes(newSelectedRecipes);
  };

  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    const q = query(recipesRef);
    const unsubscribe = onSnapshot(q, (data) => {
      const recipesData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesData);
    });
    return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
  }, []);

  function handleClick() {
    navigate(`/recipes/${recipe.id}`);
  }

const createMealPlan = async (recipesToSave) => {
  if (user && recipesToSave.length > 0) {
    try {
      const userMealPlanDocRef = doc(mealplansRef, user.uid);
      const userMealPlanDoc = await getDoc(userMealPlanDocRef);

      // Generate a unique ID for the meal plan
      const mealPlanId = `mealPlan${Date.now()}`;
      // const newMealPlan = {
      //   [mealPlanId]: {
      //     recipes: recipesToSave,
      //   },
      // };

      if (
        !userMealPlanDoc.exists() ||
        (userMealPlanDoc.exists() &&
          Object.keys(userMealPlanDoc.data().mealPlans || {}).length === 0)
      ) {
        // If the user does not have a meal plan document, create a new one
        console.log("Creating new meal plan document for user:", user.uid);
        await setDoc(userMealPlanDocRef, {
          mealPlans: {
            [mealPlanId]: {
              recipes: recipesToSave,
            },
          },
        });
      } else {
        // If the user already has meal plans, prevent creation of a new one
        alert(
          "You already have a meal plan. Please update it instead of creating a new one."
        );
        return; // Exit the function
      }

      // Then, delete the selectedRecipes array
      const userDocRef = doc(usersRef, user.uid);
      await updateDoc(userDocRef, {
        selectedRecipes: deleteField(),
      });

      console.log("Meal plan created and selectedRecipes deleted successfully");
      navigate(`/mealplan/${mealPlanId}`);
      console.log("Navigating to meal plan page with ID:", mealPlanId);
    } catch (error) {
      console.error(
        "Error creating mealplan or deleting selectedRecipes",
        error
      );
    }
  } else {
    console.log("No user or no recipes selected");
  }
};

  //-------RANDOM RECIPES FUNCTION----------//

  const fetchRandomRecipes = async () => {
    try {
      // Fetch all document IDs from the recipes collection
      const recipesQuery = query(recipesRef);
      const querySnapshot = await getDocs(recipesQuery);
      const allRecipeIds = querySnapshot.docs.map((doc) => doc.id);

      // Randomly select a few IDs (e.g., 4)
      const selectedIds = allRecipeIds
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      // Fetch complete data for these selected IDs
      const selectedRecipesPromises = selectedIds.map((id) => {
        const recipeDocRef = doc(recipesRef, id);
        return getDoc(recipeDocRef);
      });
      const selectedRecipesDocs = await Promise.all(selectedRecipesPromises);
      const selectedRecipes = selectedRecipesDocs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return selectedRecipes;
    } catch (error) {
      console.error("Error fetching random recipes:", error);
      return [];
    }
  };

  //-------ADD RECIPE BUTTON----------//

  function handleAddRecipeClick() {
    navigate(`/addrecipe`);
  }

  //------------------search filter bar------------------//
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) => {
    const titleMatch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const ingredientMatch = recipe.ingredients.some((ingredientObj) =>
      ingredientObj.ingredient.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return titleMatch || ingredientMatch;
  });

  return (
    <>
      <section className="page recipes-page" aria-label="Recipes Page">
        <TopBar />
        <h1 className="header">Hi {userName}!</h1>
        <h2>What's for dinner?</h2>
        <p className="header">Start your meal plan by selecting recipes</p>
        <section className="search-filter-bar" aria-label="Search Recipes">
          <SearchBar
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            placeholder="Search recipes.."
            aria-label="Search Recipes"
          />
          {/* <MultiFilter /> */}
        </section>
        <section
          className="recipe-category-tags"
          aria-label="Recipe Categories"
        >
          <CategoryTag tag="Vegan" />
          <CategoryTag tag="Fast" />
          <CategoryTag tag="Pumpkin" />
          <CategoryTag tag="Asian" />
        </section>

        <section className="recipesFeed" aria-label="Recipe feed">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
              onAddToMealPlan={addRecipeToMealPlan}
              onClick={handleClick}
              isSelected={selectedRecipes.some((r) => r.id === recipe.id)}
              onRemoveFromMealPlan={removeRecipeFromMealPlan}
              aria-label={`Recipe: ${recipe.title}`}
            />
          ))}
        </section>
      </section>

      {selectedRecipes.length > 0 ? (
        <div className="buttonContainer" aria-label="Selected Recipes">
          <section className="selectedRecipes">
            {selectedRecipes.map((recipe) => (
              <div key={recipe.id} className="selectedRecipeContainer">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="selectedRecipeImage"
                  aria-label={`Image of ${recipe.title}`}
                />
                <button
                  className="deleteRecipeButton material-symbols-rounded"
                  onClick={() => removeRecipeFromMealPlan(recipe.id)}
                  aria-label={`Remove ${recipe.title} from meal plan`}
                >
                  close
                </button>
              </div>
            ))}
          </section>
          <button
            className="button-primary mealplan-button"
            onClick={() => createMealPlan(selectedRecipes)}
            aria-label="Create Meal Plan"
          >
            Create mealplan
          </button>
        </div>
      ) : (
        <div
          className="buttonContainer decide-for-me"
          aria-label="create a random mealplan button"
        >
          <button
            className="button-primary mealplan-button"
            onClick={async () => {
              const randomRecipes = await fetchRandomRecipes();
              createMealPlan(randomRecipes);
            }}
            aria-label="Decide Meal Plan for Me"
          >
            Decide for me
          </button>
          <button
            className="button-primary mealplan-button"
            onClick={handleAddRecipeClick}
            aria-label="Add New Recipe"
          >
            Add recipe
          </button>
        </div>
      )}
      <NavBar />
    </>
  );
}
