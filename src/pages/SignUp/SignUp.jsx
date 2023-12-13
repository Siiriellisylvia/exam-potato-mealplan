import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { usersRef } from "../../firebase-config";
import "../Landing/Landing.css";
import Potato from "../../assets/potato-nb.webp"; 


export default function SignUp() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();

  function handleSignUp(event) {
    event.preventDefault();
    const mail = event.target.mail.value; // mail value from inout field in sign in form
    const password = event.target.password.value; // password value from inout field in sign in form

    // read the docs: https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Created and signed in
        const user = userCredential.user;
        createUser(user.uid); // create user in firestore
      })
      .catch((error) => {
        let code = error.code; // saving error code in variable
        console.log(code);
        code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  function createUser(id) {
    const docRef = doc(usersRef, id); // create reference to the user in firestore
    setDoc(docRef, { name }); // set/update the user in firestore with the values from userToUpdate/values from input fields
  }

  return (
    <section className="landing">
      <section className="landing-container">
        <img src={Potato}></img>
        <h1>POTATO</h1>
        <h2>SIMPLE MEAL PLAN</h2>
      </section>
      <form onSubmit={handleSignUp} className="signin">
        <h2>Sign Up</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          placeholder="Type your name"
        />
        <input type="email" name="mail" placeholder="Type your mail" />
        <input
          type="password"
          name="password"
          placeholder="Type your password"
        />
        <p className="text-error">{errorMessage}</p>
        <button className="button-primary button-yellow">Sign Up</button>
      </form>
      <p className="text-center">
        Already have an account? <Link to="/signin">Login</Link>
      </p>
    </section>
  );
}
