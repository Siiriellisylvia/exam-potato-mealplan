import Item from "./Item";
import "./CategoryAndItem.css";
export default function Category({ name, items, onItemCheck, checkedState }) {

  return (
      <div className="category-content-container">
        <div className="category-content">
      <h3>
        {name} ({items.length})
      </h3>
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            unit={item.unit}
            isChecked={checkedState[item.id] || false}
            onCheck={onItemCheck}
          />
        ))}
      </ul>
      </div>
      </div>
  );
}
