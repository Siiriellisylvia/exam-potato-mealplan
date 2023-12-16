import { useNavigate } from "react-router-dom";

export default function Header({title}) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigates to the previous page
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
