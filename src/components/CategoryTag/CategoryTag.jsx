// import { useState } from "react";
import "./CategoryTag.css";

export default function CategoryTag({ tag, selected, onClick }) {
  // const [isSelected, setIsSelected] = useState(false);

  // function selectTag() {
  //   setIsSelected(!isSelected);
  // }

  return (
    <span
      className={`categoryTag ${selected ? "categoryTagSelected" : ""}`}
      onClick={() => onClick(tag)}
    >
      {tag}
    </span>
  );
}
