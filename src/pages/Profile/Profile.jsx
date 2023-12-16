import { getAuth, signOut } from "firebase/auth";
import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import HomeRecipeCard from "../../components/RecipeCard/HomeRecipeCard";
import { useEffect, useState } from "react";
import { onSnapshot, query } from "firebase/firestore";
import { recipesRef } from "../../firebase-config";

export default function Profile(handleClick) {
  const auth = getAuth();
  const navigate = useNavigate();

  function handleAddRecipeClick() {
    navigate(`/addrecipe`);
  }

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

  function handleSignOut() {
    signOut(auth); // sign out from firebase/auth
  }

  const sliderOptions = {
    type: "slide",
    perPage: 2.2,
    perMove: 1,
    gap: "0.5rem",
    pagination: false,
    arrows: false,
    focus: "left",
    lazyLoad: "nearby",
  };

  return (
    <>
      <TopBar />
      <section className="page">
        <h1 className="header">Profile</h1>
        <section className="profile-container">
          <p className="header">Here you can see your personal cookbook, favourites and saved mealplans</p>
          <h3 className="header">All your recipes</h3>
          <Splide options={sliderOptions}>
            {recipes.map((recipe) => (
              <SplideSlide key={recipe.id} className="homeSlider">
                <HomeRecipeCard
                  recipe={recipe}
                  key={recipe.id}
                  onClick={handleClick}
                />
              </SplideSlide>
            ))}
          </Splide>
          <button
            className="button-primary profile-addrecipe"
            onClick={handleAddRecipeClick}
          >
            Add a new recipe
          </button>
        </section>
      </section>
      <div className="profile-button-container">
      <button className="button-primary profile-logout" onClick={handleSignOut}>
        Logout
      </button>
      </div>
      <NavBar />
    </>
  );
}
