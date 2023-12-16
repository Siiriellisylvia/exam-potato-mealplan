import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Category from "../../components/ShoppingList/Category";
import TopBar from "../../components/TopBar/TopBar";
import "./ShoppingList.css";

export default function ShoppingList() {
  const categories = [
    {
      name: "Fruits and Vegetables",
      items: [
        { id: "1", name: "Banana", quantity: "2" },
        { id: "2", name: "Apple", quantity: "3" },
      ],
    },
    {
      name: "Bakery",
      items: [
        { id: "3", name: "Bread", quantity: "2" },
        { id: "4", name: "Gifflar", quantity: "3" },
      ],
    },
  ];

  const [checkedState, setCheckedState] = useState({});

  const handleItemCheck = (isChecked, itemId) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [itemId]: isChecked,
    }));
  };

  return (
    <>
      <TopBar />
      <section className="page">
        <h1 className="header">Shopping list</h1>
        <div className="tabs">{/* ... tabs ... */}</div>
        <section className="shopping-list-container">
          {categories.map((category) => (
            <Category
              key={category.name}
              name={category.name}
              items={category.items}
              onItemCheck={handleItemCheck}
              checkedState={checkedState}
            />
          ))}
        </section>
      </section>
      <NavBar />
    </>
  );
}
