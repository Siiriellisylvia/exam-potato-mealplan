import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <section className="page">
        <h1>Hey you!</h1>
        <p>What do you want to cook today?</p>
      </section>
      <NavBar />
      </>
  );
}
