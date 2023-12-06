import { useState } from "react";
import "./CategoryTag.css";

export default function CategoryTag({ tag }) {
  const [isSelected, setIsSelected] = useState(false);

  function selectTag() {
    setIsSelected(!isSelected);
  }

  return (
    <span
      className={`categoryTag ${isSelected ? "categoryTagSelected" : ""}`}
      onClick={selectTag}
    >
      {tag}
    </span>
  );
}
