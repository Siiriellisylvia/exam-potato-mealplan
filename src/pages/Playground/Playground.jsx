import { useState } from "react";
import "./Playground.css";

export default function Playground() {
 const [fruitItems, setFruitItems] = useState(['apple', 'banana', 'kiwi']);
const [newFruitItem, setNewFruitItem] = useState('');

//handle drag start
const onDragStart = (e, index) => {
  e.dataTransfer.setData("text/plain", index);
}

    // handle drag over
  const onDragOver = (e) => {
    e.preventDefault();
  };

    // handle drop
  const onDrop = (e, newIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const newFruitItems = [...fruitItems];
    const [draggedItem] = newFruitItems.splice(draggedIndex, 1);
    newFruitItems.splice(newIndex, 0, draggedItem);
    setFruitItems(newFruitItems);
  };

  const handleNameChange = (e) => {
    setNewFruitItem(e.target.value);
  };

  const handleAddItem = () => {
    if (newFruitItem) {
      setFruitItems([...fruitItems, newFruitItem]);
      setNewFruitItem("");
    }
  }


 return (
    <div className="app">
      <h2>Fruit List</h2>

      <div className="input-group">
        <div className="list-sort">
          {fruitItems.map((item, index) => (
              <div key={index} className="list-item" 
                draggable
                onDragStart={(e) => onDragStart(e,index)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index)}
                >
                <i className="material-symbols-rounded ">drag_indicator</i>
                <h3>{item}</h3>
            </div>
          ))}

            <div className="input-group">
          <input
            type="text"
            name="fruitName"
            placeholder="e.g Banana"
            onChange={handleNameChange}
          />
          <button className="btn" onClick={handleAddItem}>Add item</button>

          </div>
        </div>
      </div>
    </div>
  );
}
