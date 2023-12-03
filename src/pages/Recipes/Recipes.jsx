import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Recipes.css";
import Button from "../../components/Button/Button";
export default function Recipes() {

  return (
    <>
      <TopBar />
      <section className="page">
        <h1>Profile</h1>
        <p>Cool</p>
        <div className="buttonContainer">
          <Button text="Add recipe" Link="/addrecipe"/>
        </div>
      </section>
      <NavBar />
    </>
  );
}
