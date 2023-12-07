import { useEffect, useState } from "react";
import "../../components/RecipeForm/RecipeForm.css";

export default function RemoveIngredient({ recipe }) {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [savedIngredients, setSavedIngredients] = useState([]); // New state for saved ingredients
  

  useEffect(() => {
    if (
      recipe?.ingredients
    ) {

      setSavedIngredients(recipe.ingredients);
    }
  }, [recipe]); // useEffect is called every time recipe changes.

const handleAddIngredient = () => {
  const newIngredient = {
    amount: amount,
    unit: unit,
    ingredient: ingredient,
  };

  setSavedIngredients((prevIngredients) => {
    console.log("Before adding ingredient:", prevIngredients);

    const updatedIngredients = [...prevIngredients, newIngredient];

    console.log("After adding ingredient:", updatedIngredients);

    return updatedIngredients;
  });
  
  setAmount("");
  setUnit("");
  setIngredient("");
};

const handleDeleteIngredient = (index) => {
  console.log("Before deletion:", savedIngredients);

  setSavedIngredients((prevIngredients) => {
    const updatedIngredients = [...prevIngredients];
    updatedIngredients.splice(index, 1);

    console.log("After deletion:", updatedIngredients);

    return updatedIngredients;
  });
};


  return (
    <form className="addRecipe">
      <label>
        Ingredients
        <ul style={{ display: savedIngredients.length > 0 ? "block" : "none" }}>
          {savedIngredients.map((savedIngredient, index) => (
            <li key={index} className="ingredient-list">
              {savedIngredient.amount} {savedIngredient.unit}
              {savedIngredient.ingredient}
              <button
                className="button-primary material-symbols-rounded"
                type="button"
                onClick={() => handleDeleteIngredient(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="ingredient-fields">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </div>
        <button
          className="button-primary button-add"
          type="button"
          onClick={handleAddIngredient}
        >
          <i className="material-symbols-rounded">add</i>
          Add new ingredient
        </button>
      </label>
    
    </form>
  );
}
