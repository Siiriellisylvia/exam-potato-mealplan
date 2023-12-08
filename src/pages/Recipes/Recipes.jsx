import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Recipes.css";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { onSnapshot, query } from "firebase/firestore";
import { recipesRef } from "../../firebase-config";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useNavigate } from "react-router-dom";
import SearchAndFilter from "../../components/SearchFilter/SearchFilter";

export default function Recipes( recipe) {
      const navigate = useNavigate();

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

      function handleClick() {
        navigate(`/recipes/${recipe.id}`);
      }


  return (
    <>
      <TopBar />
      <section className="page">
        <h1 className="header">Recipes</h1>
        <SearchAndFilter />
        <section className="recipesFeed">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} onClick={handleClick}/>
        ))}
        </section>
        <div className="buttonContainer">
          <Button text="Add recipe" to="/addrecipe" />
        </div>
      </section>
      <NavBar />
    </>
  );
}
