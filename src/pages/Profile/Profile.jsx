import { getAuth, signOut } from "firebase/auth";
import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  function handleAddRecipeClick() {
    navigate(`/addrecipe`);
  }

  function handleSignOut() {
    signOut(auth); // sign out from firebase/auth
  }

  return (
    <>
      <TopBar />
      <section className="page">
        <h1>Profile</h1>
        <p>Here you can add recipes and manage your account</p>
        <button className="button-primary" onClick={handleAddRecipeClick}>
          Add recipe
        </button>
        <button className="button-primary" onClick={handleSignOut}>
          Logout
        </button>
      </section>
      <NavBar />
    </>
  );
}
