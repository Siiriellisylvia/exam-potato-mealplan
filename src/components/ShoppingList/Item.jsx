import "./CategoryAndItem.css";

export default function Item({ id, name, quantity, isChecked, onCheck }) {
  // Toggle the checked state when the icon is clicked
  const handleIconClick = () => {
    onCheck(!isChecked, id);
  };
  const itemClass = isChecked ? "item strikethrough grey-out" : "item";

  return (
    <li className={itemClass}>
      <span onClick={handleIconClick} className="material-symbols-rounded icon">
        {isChecked ? "check_circle" : "radio_button_unchecked"}
      </span>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
    </li>
  );
}
