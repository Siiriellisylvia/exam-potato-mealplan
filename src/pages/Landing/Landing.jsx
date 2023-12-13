import { Link } from "react-router-dom";
import Potato from "../../assets/potato-nb.webp";
import "./Landing.css";

export default function Landing() {
  return (
    <section className="landing">
      <section className="landing-container">
        <img src={Potato}></img>
        <h1>POTATO</h1>
        <h2>SIMPLE MEAL PLAN</h2>
        <section className="landing-buttons">
        <Link to="/signin" className="button-primary button-yellow">
          Login
        </Link>
        <Link to="/signup" className="button-primary button-outline">
          Sign up
        </Link>
        </section>
      </section>
    </section>
  );
}
