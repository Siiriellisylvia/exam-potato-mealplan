import { useEffect, useState } from "react";
import placeholderImage from "../../assets/placeholder-image.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { recipesRef, storage } from "../../firebase-config";
import Counter from "../Counter/Counter";
import "./RecipeForm.css";
import CategoryTag from "../CategoryTag/CategoryTag";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditRecipe() {

  const navigate = useNavigate();
  const { recipeId } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [servingSize, setServingSize] = useState(2); // Set initial serving size
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [savedIngredients, setSavedIngredients] = useState([]); // New state for saved ingredients
  const [savedSteps, setSavedSteps] = useState([]); // New state for saved steps
  const [currentStep, setCurrentStep] = useState(1); // New state for current step
  const [description, setDescription] = useState(""); // New state for description
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeDocRef = doc(recipesRef, recipeId);
      const docSnapshot = await getDoc(recipeDocRef);

      if (docSnapshot.exists()) {
        const recipeData = docSnapshot.data();
        setTitle(recipeData.title);
        setImage(recipeData.image);
        setServingSize(recipeData.servingSize);
        setSavedIngredients(recipeData.ingredients);
        setSavedSteps(recipeData.steps);
      } else {
        console.log("recipe not found");
      }
    };

    fetchRecipe();
  }, [recipeId]);

  /**
   * handleImageChange is called every time the user chooses an image in the fire system.
   * The event is fired by the input file field in the form
   */
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size <= 2000000) {
      // image file size must be below 1MB
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
      id: new Date().getTime(),
      amount: amount,
      unit: unit,
      ingredient: ingredient,
    };

    console.log("id", newIngredient.id);
    console.log("Adding Ingredient:", newIngredient);

    setSavedIngredients((prevIngredients) => {
      const updatedIngredients = Array.isArray(prevIngredients)
        ? [...prevIngredients, newIngredient]
        : [newIngredient];

      console.log("UpdatedIngredients array:", updatedIngredients);

      return updatedIngredients;
    });

    setAmount("");
    setUnit("");
    setIngredient("");
  };

  const handleDeleteIngredient = (id) => {
    setSavedIngredients((savedIngredients) => {
      console.log("Deleting Ingredient with ID:", id);
      console.log("SavedIngredients Before Deletion:", savedIngredients);

      const updatedIngredients = savedIngredients.filter(
        (newIngredient) => newIngredient.id !== id
      );

      console.log("UpdatedIngredients After Deletion:", updatedIngredients);
      console.log("SavedIngredients After Deletion:", savedIngredients);

      return updatedIngredients;
    });
  };

  const handleAddStep = () => {
    const newStep = {
      description: description,
    };

    setSavedSteps([...savedSteps, newStep]);
    setCurrentStep((prevStep) => prevStep + 1); // Increment the step number
    setDescription("");
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = [...savedSteps];
    updatedSteps.splice(index, 1);
    setSavedSteps(updatedSteps);
  };

const updateRecipe = async (updatedRecipeData) => {
  try {
    const recipeDocRef = doc(recipesRef, recipeId);
    await updateDoc(recipeDocRef, updatedRecipeData);
    console.log("Recipe updated successfully!");
    navigate(`/recipes/${recipeId}`);
  } catch (error) {
    console.log("Error updating recipe:", error);
  }
  };

  const handleCancel = () => {
    navigate(`/recipes/${recipeId}`);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Form Submitted with Data:", {
      title,
      image,
      servingSize,
      ingredients: savedIngredients,
      steps: savedSteps,
      tags: getChosenTags(),
    });

    const formData = {
      // create a new objebt to hold the value from states / input fields
      title: title,
      image: image,
      servingSize: servingSize,
      ingredients: savedIngredients, // Use the saved ingredients here
      steps: savedSteps, // Use the saved steps here
      tags: getChosenTags(),
    };

    const validForm =
      formData.title &&
      formData.image &&
      formData.servingSize &&
      formData.ingredients &&
      formData.steps; // will return false if one of the properties doesn't have a value
    
      if (validForm) {
      const updatedRecipeData = {
        title,
        image,
        servingSize,
        ingredients: savedIngredients,
        steps: savedSteps,
        tags: getChosenTags(),
      };

      if (imageFile) {
      formData.image = await handleUploadImage(); // call handleUploadImage to upload the image to firebase storage and get the download URL
    }
      // if all fields/ properties are filled, then call saveRecipe
      updateRecipe(updatedRecipeData);
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

  function getChosenTags() {
    const chosenTags = [];
    // Find all label elements with the "tagLabel" class and the "selected" class.
    const selectedTagElements = document.querySelectorAll(
      ".categoryTag.categoryTagSelected"
    );

    // Extract the values of the selected labels and add them to the chosenTags array.
    selectedTagElements.forEach((tagElement) => {
      chosenTags.push(tagElement.textContent);
    });

    return chosenTags;
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
        <ul style={{ display: savedIngredients.length > 0 ? "block" : "none" }}>
          {savedIngredients.map((newIngredient) => (
            <li key={newIngredient.id} className="ingredient-list">
              <section>
                <section className="amountAndUnit">
                  {newIngredient.amount}
                  <span style={{ marginLeft: "5px" }}></span>
                  {newIngredient.unit}
                </section>
                {newIngredient.ingredient}
              </section>
              <div
                className="button-primary material-symbols-rounded"
                type="button"
                onClick={() => {
                  handleDeleteIngredient(newIngredient.id);
                }}
              >
                Delete
              </div>
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
            onChange={(e) => setUnit(e.target.value.toLowerCase())}
          />
          <input
            type="text"
            placeholder="Ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value.toLowerCase())}
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

      <label>
        Instructions
        <ul style={{ display: savedSteps.length > 0 ? "block" : "none" }}>
          {savedSteps.map((savedStep, index) => (
            <li key={index} className="steps-list">
              <section>
                <div className="button-rounded">{index + 1}</div>
                <div className="step-description">{savedStep.description}</div>
              </section>

              <div
                className="button-primary material-symbols-rounded"
                type="button"
                onClick={() => handleDeleteStep(index)}
              >
                Delete
              </div>
            </li>
          ))}
        </ul>
        <div className="step-fields">
          <input
            type="text"
            placeholder="Write a step description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="button-primary button-add"
          type="button"
          onClick={handleAddStep}
        >
          <i className="material-symbols-rounded">add</i>
          Add new step
        </button>
      </label>

      {/*--------------Tags Choice ---------------*/}
      <>
        <li className="chooseTagRow">
          Cooking time:
          <CategoryTag tag="Fast" />
          <CategoryTag tag="Normal" />
          <CategoryTag tag="Slow" />
        </li>

        <li className="chooseTagRow">
          Type of protein:
          <CategoryTag tag="Vegan" />
          <CategoryTag tag="Vegetarian" />
          <CategoryTag tag="Chicken" />
          <CategoryTag tag="Beef" />
          <CategoryTag tag="Pork" />
          <CategoryTag tag="Chicken" />
        </li>
      </>
      <p className="text-error">{errorMessage}</p>
      <button className="button-primary" type="submit">
        Update recipe
      </button>
      <button className="button-outline" type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
