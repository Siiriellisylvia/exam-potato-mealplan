import { Link } from "react-router-dom";
import Potato from "../../assets/potato-nb.webp"
import "./TopBar.css";


export default function TopBar() {
  return (
    <section className="top-bar">
    <Link className="logo-link" to="/home">
      <img src={Potato} alt="potato-logo"></img>
      <p>POTATO</p>
    </Link>
    </section>
  );
}
