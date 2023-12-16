import Item from "./Item";
import "./CategoryAndItem.css";
export default function Category({ name, items, onItemCheck, checkedState }) {

  return (
    <div className="page shopping-list-category">
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
            isChecked={checkedState[item.id] || false}
            onCheck={onItemCheck}
          />
        ))}
      </ul>
    </div>
  );
}
