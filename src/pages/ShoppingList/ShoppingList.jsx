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
        { id: "1", name: "Banana", quantity: "2", unit: "pcs" },
        { id: "2", name: "Apple", quantity: "3", unit: "pcs" },
      ],
    },
    {
      name: "Bakery",
      items: [
        { id: "3", name: "Bread", quantity: "2", unit: "pcs" },
        { id: "4", name: "Gifflar", quantity: "3", unit: "pcs" },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState("ingredients"); // ["All", "Fruits and Vegetables", "Bakery"
  const [checkedState, setCheckedState] = useState({});

  const handleItemCheck = (isChecked, itemId) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [itemId]: isChecked,
    }));
  };

  return (
    <>
      <section className="page" aria-label="Shopping List Page">
        <TopBar />

        <h1 className="header">Shopping list</h1>
        <div className="tabs" role="tablist" aria-label="Shopping List Tabs">
          <button
            onClick={() => setActiveTab("ingredients")}
            className={activeTab === "ingredients" ? "active" : ""}
            role="tab"
            aria-selected={activeTab === "ingredients"}
            aria-controls="ingredients-tab"
          >
            Ingredients
          </button>
          <button
            onClick={() => setActiveTab("recipes")}
            className={activeTab === "recipes" ? "active" : ""}
            role="tab"
            aria-selected={activeTab === "recipes"}
            aria-controls="recipes-tab"
          >
            Recipes
          </button>
        </div>
        
        <section
          className="shopping-list-container"
          aria-label="Shopping List Content"
        >
          {activeTab === "ingredients" &&
            categories.map((category) => (
              <Category
                key={category.name}
                name={category.name}
                items={category.items}
                unit={category.unit}
                onItemCheck={handleItemCheck}
                checkedState={checkedState}
              />
            ))}
          {activeTab === "recipes" && (
            <div>
              The recipes that user has added to shopping list are shown here
            </div>
          )}
        </section>
      </section>
      <NavBar />
    </>
  );
}
