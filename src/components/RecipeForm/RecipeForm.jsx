import { useEffect, useState } from "react";
import placeholderImage from "../../assets/placeholder-image.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase-config";
import Counter from "../Counter/Counter";
import "./RecipeForm.css";

export default function RecipeForm({ saveRecipe, recipe }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [servingSize, setServingSize] = useState(2); // Set initial serving size
  const [ingredients, setIngredients] = useState([]);
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [ingredient, setIngredient] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (recipe?.title && recipe?.image && recipe?.servingSize && recipe?.ingredients) {
      // if recipe, set the states with values from the recipe object
      // The recipe object is a prop, passed from Recipes
      setTitle(recipe.title);
      setImage(recipe.image);
      setServingSize(recipe.servingSize);
      setIngredients(recipe.ingredients);

    }
  }, [recipe]); // useEffect is called every time recipe changes.

  /**
   * handleImageChange is called every time the user chooses an image in the fire system.
   * The event is fired by the input file field in the form
   */
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      setImageFile(file); // set the imageFile state with the file object
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // reset errorMessage state
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      setErrorMessage("The image file is too big!");
    }
  }

  const handleAddIngredient = () => {
  const newIngredient = {
    amount: amount,
    unit: unit,
    ingredient: ingredient
  };

  setIngredients([...ingredients, newIngredient]);

    setAmount("");
    setUnit("");
    setIngredient("");
    };


  async function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      // create a new objebt to hold the value from states / input fields
      title: title,
      image: image,
      servingSize: servingSize,
      ingredients: ingredients,
    };

    if (imageFile) {
      formData.image = await handleUploadImage(); // call handleUploadImage to upload the image to firebase storage and get the download URL
    }

    const validForm = formData.title && formData.image && formData.servingSize && formData.ingredients; // will return false if one of the properties doesn't have a value
    if (validForm) {
      // if all fields/ properties are filled, then call savePost
      saveRecipe(formData);
    } else {
      // if not, set errorMessage state.
      setErrorMessage("Please, fill in all fields.");
    }
  }

  async function handleUploadImage() {
    const storageRef = ref(storage, imageFile.name); // create a reference to the file in firebase storage
    await uploadBytes(storageRef, imageFile); // upload the image file to firebase storage
    const downloadURL = await getDownloadURL(storageRef); // Get the download URL
    return downloadURL;
  }

  return (
    <form onSubmit={handleSubmit} className="addRecipe">
      <label>
        <input
          type="file"
          className="file-input"
          accept="image/*"
          onChange={handleImageChange}
        />
        <img
          className="image-preview"
          src={image}
          alt="Choose"
          onError={(event) => (event.target.src = placeholderImage)}
        />
      </label>
      <label>
        Recipe name
        <input
          type="text"
          value={title}
          placeholder="Type a title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Serving size
        <Counter value={servingSize} onChange={setServingSize} />
      </label>

      <label>
        Ingredients
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
            onChange={(e) => setUnit(e.target.value.toLowerCase)}
          />
          <input
            type="text"
            placeholder="Ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value.toLowerCase)}
          />
          <button className="button-primary" type="button">
            Delete
          </button>
        </div>
        <button className="button-primary" type="button" onClick={handleAddIngredient}>
          Add new ingredient
        </button>
      </label>
      <p className="text-error">{errorMessage}</p>
      <button className="button-primary" type="submit">
        Save
      </button>
    </form>
  );
}
