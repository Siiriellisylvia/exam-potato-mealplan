import { getAuth, signOut } from "firebase/auth";
import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Profile.css";

export default function Profile() {
        const auth = getAuth();

            function handleSignOut() {
              signOut(auth); // sign out from firebase/auth
            }
  return (
    <>
      <TopBar />
      <section className="page">
        <h1>Profile</h1>
        <p>Cool</p>
        <button className="btn-outline" onClick={handleSignOut}>
          Sign Out
        </button>
      </section>
      <NavBar />
    </>
  );
}
