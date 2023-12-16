import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function RecipeHeader({title}) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <section className="header-container">
      <i type="button" className="material-symbols-rounded" onClick={goBack}>
        arrow_back_ios_new
      </i>
      <h1>{title}</h1>
    </section>
  );
}
