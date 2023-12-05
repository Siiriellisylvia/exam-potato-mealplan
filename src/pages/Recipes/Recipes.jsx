import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Recipes.css";
import Button from "../../components/Button/Button";
import RecipeCard from "../../components/RecipeCard/Recipecard";
import { useEffect, useState } from "react";
import { onSnapshot, query } from "firebase/firestore";
import { recipesRef } from "../../firebase-config";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

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


  return (
    <>
      <TopBar />
      <section className="page">
        <h1>Recipes</h1>
        <p>Cool</p>

        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
        <div className="buttonContainer">
          <Button text="Add recipe" to="/addrecipe" />
        </div>
      </section>
      <NavBar />
    </>
  );
}
