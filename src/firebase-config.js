// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI_iP3yFGSiRzffEPL7u47DojQ52y23Y8",
  authDomain: "exam-potato-mealplan.firebaseapp.com",
  projectId: "exam-potato-mealplan",
  storageBucket: "exam-potato-mealplan.appspot.com",
  messagingSenderId: "801295406523",
  appId: "1:801295406523:web:5c775657df75f63213209e",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export const usersRef = collection(db, "users");
export const recipesRef = collection(db, "recipes");
export const mealplansRef = collection(db, "mealplans");
export const ingredientsRef = collection(db, "ingredients");

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(firebaseApp);


// const recipesData = [
// //   {
//     image: "https://example.com/noodles.jpg",
//     ingredients: [
//       {
//         amount: "300",
//         ingredient: "Egg Noodles",
//         unit: "g",
//       },
//       {
//         amount: "1",
//         ingredient: "Bell Pepper",
//         unit: "piece",
//       },
//       {
//         amount: "2",
//         ingredient: "Spring Onions",
//         unit: "pieces",
//       },
//     ],
//     servingSize: 3,
//     steps: [
//       {
//         description: "Boil the egg noodles according to package instructions.",
//       },
//       {
//         description: "Slice the bell pepper and spring onions.",
//       },
//       {
//         description: "Stir-fry everything together until heated through.",
//       },
//     ],
//     tags: ["Quick", "Noodles"],
//     title: "Stir-Fried Noodles",
//     uid: "T9eNWHmSWuXULQ7gbJj3Itavsrp1",
//   },
// ];

// // Add recipes to Firestore
// recipesData.forEach(async (recipe) => {
//   try {
//     const docRef = await addDoc(collection(db, "recipes"), recipe);
//     console.log("Recipe added with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding recipe: ", e);
//   }
// })