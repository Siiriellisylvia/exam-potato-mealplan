import { Link } from "react-router-dom";
import Potato from "../../assets/potato-nb.webp"
import "./TopBar.css";


export default function TopBar() {
  return (
    <Link className="logoLink" to="/home">
      <img src={Potato}></img>
      <p>POTATO</p>
    </Link>
  );
}
