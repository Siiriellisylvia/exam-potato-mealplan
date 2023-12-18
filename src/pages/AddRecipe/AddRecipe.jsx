import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import { addDoc} from "firebase/firestore";
import { recipesRef } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Header from "../../components/Header/Header";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
export default function AddRecipe() {

    const navigate = useNavigate();
    const auth = getAuth();

    async function createRecipe(newRecipe) {
        newRecipe.uid = auth.currentUser.uid; // uid of auth user / signed in user
        await addDoc(recipesRef, newRecipe); // add new doc - new recipe object

        navigate("/");
    }

    return (
      <>
        <TopBar />
        <section className="page addrecipe">
          <Header title="Add Recipe" />
          <RecipeForm saveRecipe={createRecipe} />
          {/* <Todo saveRecipe={createRecipe}/> */}
        </section>
        <NavBar />
      </>
    );
}
