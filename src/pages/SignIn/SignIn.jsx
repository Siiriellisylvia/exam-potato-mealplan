import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import "../Landing/Landing.css"
import Potato from "../../assets/potato-nb.webp"

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  function signIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value; // mail value from inout field in sign in form
    const password = event.target.password.value; // password value from inout field in sign in form

    // read the docs: https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user); // for test purposes: logging the authenticated user
      })
      .catch((error) => {
        let code = error.code; // saving error code in variable
        console.log(code);
        code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }
  return (
    <section className="landing">
      <section className="landing-container">
        <img src={Potato}></img>
        <h1>POTATO</h1>
        <h2>SIMPLE MEAL PLAN</h2>
        <form onSubmit={signIn} className="signin">
          <input type="email" name="mail" placeholder="Type your mail" />
          <input
            type="password"
            name="password"
            placeholder="Type your password"
          />
          <p className="text-error">{errorMessage}</p>
          <button className="button-primary button-yellow">Log in</button>
        </form>
        <p className="text-center">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </section>
    </section>
  );
}
