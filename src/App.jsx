import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import "./App.css";
import SignUp from "./pages/SignUp/SignUp";
import Mealplan from "./pages/Mealplan/Mealplan";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import Recipes from "./pages/Recipes/Recipes";
import Recipe from "./pages/Recipe/Recipe";
import AddRecipe from "./pages/AddRecipe/AddRecipe";
import AddIngredients from "./pages/Playground/AddIngredients";
import { mealplansRef } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import EditRecipe from "./pages/EditRecipe/EditRecipe";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
// import { AuthProvider } from "./AuthContext";
// import Todo from "./pages/Playground/Todo";

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [currentUser, setCurrentUser] = useState(null); // New state for the user
  const [currentMealPlanId, setCurrentMealPlanId] = useState(null);
  const location = useLocation(); // Get the current location

  // Handle user authentication
  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //user authenticated - signed in
        setIsAuth(true); //set isAuth to true
        localStorage.setItem("isAuth", true); //save isAuth to local storage
        console.log(user);
        setCurrentUser(user); // Set the user object

        //fetch user mealplan data
        const userDocRef = doc(mealplansRef, user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists() && docSnap.data().mealPlans) {
          const mealPlans = docSnap.data().mealPlans;
          const mealPlanIds = Object.keys(mealPlans);
          if (mealPlanIds.length > 0) {
            const latestMealPlanId = mealPlanIds[mealPlanIds.length - 1]; //Get the latest meal plan
            setCurrentMealPlanId(latestMealPlanId);
          }
        }
      } else {
        // User not authenticated - signed out
        setIsAuth(false); // Set isAuth to false
        localStorage.removeItem("isAuth"); // Remove isAuth from local storage
        setCurrentUser(null); // Reset the user object
        setCurrentMealPlanId(null);
      }
    });
    //  return () => unsubscribe();
  }, []);

  // private routes including nav bar
  const privateRoutes = (
    <>
      <NavBar location={location} />
      {/* Pass location to Nav component */}
      <Routes>
        <Route
          path="/"
          element={
            currentMealPlanId ? (
              <Navigate to={`/mealplan/${currentMealPlanId}`} />
            ) : (
              <Recipes user={currentUser} />
            )
          }
        />

        <Route
          path="/mealplan/:mealPlanId"
          element={<Mealplan user={currentUser} />}
        />
        <Route path="/groceries" element={<ShoppingList/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/editrecipe/:recipeId" element={<EditRecipe />} />
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
      <Route path="/signin" element={<SignIn />} />

      {/* <Route path="/login" element={<LogIn />} /> */}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  // return private routes if the user is authenticated, otherwise return public routes
  return (
    // <AuthProvider>
    <main>{isAuth ? privateRoutes : publicRoutes}</main>
    // </AuthProvider>
  );
}
