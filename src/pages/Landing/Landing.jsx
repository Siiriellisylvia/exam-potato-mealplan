import { Link } from "react-router-dom";
import Potato from "../../assets/potato-nb.webp"
import "./Landing.css";

export default function Landing() {
  return (
    <>
      <section className="landing">
        <img src={Potato}></img>
        <h1>POTATO</h1>
        <h2>SIMPLE MEAL PLAN</h2>
        <Link className="button" to="/home">
          Yes please
        </Link>
      </section>
    </>
  );
}
