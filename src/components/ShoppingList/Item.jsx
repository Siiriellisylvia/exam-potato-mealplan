import "./CategoryAndItem.css";

export default function Item({ id, name, unit, quantity, isChecked, onCheck }) {
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
      <div className="item-name-and-quantity">
        <span className="name">{name}</span>
        <div className="quantity-and-unit">
          <span className="quantity">{quantity}</span>
          <span className="unit">{unit}</span>
        </div>
      </div>
    </li>
  );
}
