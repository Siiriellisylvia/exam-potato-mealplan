// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

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