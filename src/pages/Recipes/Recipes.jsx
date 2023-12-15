import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Recipes.css";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { mealplansRef, recipesRef, usersRef } from "../../firebase-config";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryTag from "../../components/CategoryTag/CategoryTag";

export default function Recipes({ recipe, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Fetching selected recipes when component mounts
      const getUserMealPlan = async () => {
        console.log("Fetching user meal plan for user:", user.uid);

        const docRef = doc(usersRef, user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
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
      //Generate a unique ID for the meal plan
      const mealPlanId = `mealPlan${Date.now()}`;

      //structure the new mealplan data
      const newMealPlan = {
        [mealPlanId]: {
          recipes: recipesToSave,
        },
      };

      //reference to the users doc in the mealplans collection
      const userDocRef = doc(mealplansRef, user.uid);

      try {
        //first, ensure doc exists
        await setDoc(userDocRef, {}, { merge: true });
        //update the user's doc with the new mealplan
        //using updatedoc to merge the new mealplan with existing ones
        await updateDoc(userDocRef, {
          [`mealPlans.${mealPlanId}`]: newMealPlan[mealPlanId],
        });

        // setSelectedRecipes([]);
        // console.log("Mealplan created successfully");

        // await updateDoc(userDocRef, {
        //   selectedRecipes: deleteField(),
        // });

        navigate(`/mealplan/${mealPlanId}`);
      } catch (error) {
        console.log("Error creating mealplan", error);
      }
    } else {
      console.log("No user or no recipes selected");
    }
  };

  //RANDOM RECIPES FUNCTION
  const fetchRandomRecipes = async () => {
    try {
      // Adjust the limit as per your need
      const recipesQuery = query(recipesRef, limit(4));
      const querySnapshot = await getDocs(recipesQuery);
      console.log(querySnapshot.docs);

      const fetchedRecipes = querySnapshot.docs.map((doc) => doc.data());
      console.log("Fetched Recipes:", fetchedRecipes); // Log fetched recipes for debugging
      // Shuffle and select a subset if necessary
      const randomRecipes = fetchedRecipes
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      return randomRecipes;
    } catch (error) {
      console.error("Error fetching random recipes:", error);
      return [];
    }
  };

  function handleAddRecipeClick() {
    navigate(`/addrecipe`);
  }
  return (
    <>
      <TopBar />
      <section className="page">
        <h1 className="header">Hello Siiri</h1>
        <h2 className="header">Build your first meal plan</h2>
        <section className="search-filter-bar">
          <SearchBar />
          {/* <MultiFilter /> */}
        </section>
        <section className="recipe-category-tags">
          <CategoryTag tag="Vegan" />
          <CategoryTag tag="Fast" />
          <CategoryTag tag="Pumpkin" />
          <CategoryTag tag="Asian" />
        </section>

        <section className="recipesFeed">
          {recipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
              onAddToMealPlan={addRecipeToMealPlan}
              onClick={handleClick}
            />
          ))}
        </section>
      </section>

      {selectedRecipes.length > 0 ? (
        <div className="buttonContainer">
          <section className="selectedRecipes">
            {selectedRecipes.map((recipe) => (
              <div key={recipe.id} className="selectedRecipeContainer">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="selectedRecipeImage"
                />
                <button
                  className="deleteRecipeButton material-symbols-rounded"
                  onClick={() => removeRecipeFromMealPlan(recipe.id)}
                >
                  close
                </button>
              </div>
            ))}
          </section>
          <button
            className="button-primary mealplan-button"
            onClick={() => createMealPlan(selectedRecipes)}
          >
            Create mealplan
          </button>
        </div>
      ) : (
        <div className="buttonContainer decide-for-me">
          <button
            className="button-primary mealplan-button"
            onClick={async () => {
              const randomRecipes = await fetchRandomRecipes();
              createMealPlan(randomRecipes);
            }}
          >
            Decide for me
          </button>
          <button
            className="button-primary mealplan-button"
            onClick={handleAddRecipeClick}
          >
            Add recipe
          </button>
        </div>
      )}
      <NavBar />
    </>
  );
}
