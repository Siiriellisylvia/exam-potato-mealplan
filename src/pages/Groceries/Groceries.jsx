import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";
import "./Groceries.css";

export default function Groceries() {
  return (
    <>
      <TopBar />
      <section className="page">
        <h1>Shopping list</h1>
        <p>What do you want to cook today?</p>
      </section>
      <NavBar />
    </>
  );
}
