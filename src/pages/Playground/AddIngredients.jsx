import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const ingredientsSnapshot = await getDocs(collection(db, "ingredients"));
      const fetchedIngredients = ingredientsSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        units: doc.data().units, // Assuming units is an array in the ingredient document
      }));

      setIngredients(fetchedIngredients);
    };

    fetchIngredients();
  }, []);

  const fetchUnitsForIngredient = async (ingredientId) => {
    const ingredientDocRef = doc(db, "ingredients", ingredientId);
    const ingredientDoc = await getDoc(ingredientDocRef);

    if (ingredientDoc.exists()) {
      const ingredientData = ingredientDoc.data();
      // Assuming units is an array in the ingredient document
      return ingredientData.units || [];
    }

    return [];
  };

  const handleIngredientChange = async (ingredientId) => {
    setSelectedIngredient(ingredientId);
    const units = await fetchUnitsForIngredient(ingredientId);
    // Set units for the selected ingredient
    setUnits(units);
  };

  return (
    <form>
      {/* Ingredient Dropdown */}
      <label>
        Select Ingredient:
        <select
          value={selectedIngredient}
          onChange={(e) => handleIngredientChange(e.target.value)}
        >
          <option value="" disabled>
            Select an ingredient
          </option>
          {ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </select>
      </label>

      {/* Unit Dropdown */}
      <label>
        Select Unit:
        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
        >
          <option value="" disabled>
            Select a unit
          </option>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </label>

      {/* Other form fields and buttons */}
    </form>
  );
};

export default RecipeForm;
