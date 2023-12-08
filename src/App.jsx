import { Routes, Route, Navigate, useLocation} from "react-router-dom";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import "./App.css";
import SignUp from "./pages/SignUp/SignUp";
import Mealplan from "./pages/Mealplan/Mealplan";
import Groceries from "./pages/Groceries/Groceries";
import { useEffect, useState } from "react";
import {getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import Recipes from "./pages/Recipes/Recipes";
import Recipe from "./pages/Recipe/Recipe";
import AddRecipe from "./pages/AddRecipe/AddRecipe";
import AddIngredients from "./pages/Playground/AddIngredients";
// import Todo from "./pages/Playground/Todo";

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const location = useLocation(); // Get the current location

    // Handle user authentication
    useEffect(() => {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (
          user
        ) {
          //user authenticated - signed in
          setIsAuth(true); //set isAuth to true
          localStorage.setItem("isAuth", true); //save isAuth to local storage
          console.log(user);
        } else {
          // User not authenticated - signed out
          setIsAuth(false); // Set isAuth to false
          localStorage.removeItem("isAuth"); // Remove isAuth from local storage
        }
      });
    }, []);


      // private routes including nav bar
  const privateRoutes = (
    <>
      <NavBar location={location} />
      {/* Pass location to Nav component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mealplan" element={<Mealplan />} />
        <Route path="/groceries" element={<Groceries />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="recipes/:recipeId" element={<Recipe />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        <Route path="/playground" element={<AddIngredients />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );

    // public route, no nav bar
  const publicRoutes = (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn/>} />

      {/* <Route path="/login" element={<LogIn />} /> */}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  // return private routes if the user is authenticated, otherwise return public routes
  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}

export default App;
