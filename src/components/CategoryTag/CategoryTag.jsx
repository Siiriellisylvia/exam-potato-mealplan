import { useState } from "react";

export default function CategoryTag({ tag }) {
  const [isSelected, setIsSelected] = useState(false);

  function selectTag() {
    setIsSelected(!isSelected);
  }

  return (
    <span
      className={`postALabel ${isSelected ? "postALabelSelected" : ""}`}
      onClick={selectTag}
    >
      {tag}
    </span>
  );
}
