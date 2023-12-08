import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import { useEffect, useState } from "react";
import { onSnapshot, query } from "firebase/firestore";
import { recipesRef} from "../../firebase-config";
import "./Home.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import HomeRecipeCard from "../../components/RecipeCard/HomeRecipeCard";

export default function Home(handleClick) {

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
        <h1 className="header">Hey Siiri!</h1>
        <h3 className="header">What do you want to cook today?</h3>
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
        </section>
      <NavBar />
    </>
  );
}
