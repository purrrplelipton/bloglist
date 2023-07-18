import { Eye, EyeOff, Square, SquareCheck } from "@assets/vectors/tabler-icons";
import { Spinner } from "@components/spinner";
import { createUser } from "@services/user.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./sign-up.module.css";

const SignUp = () => {
  const [user, setUser] = useState({
    name: { first: "", last: "" },
    email: "",
    password: "",
  });

  const [formStates, setFormStates] = useState({
    showPassword: false,
    termsOfServiceAccepted: false,
    creating: false,
  });

  async function submitDetails(event) {
    setFormStates((prv) => ({ ...prv, creating: true }));
    event.preventDefault();

    try {
      await createUser(user);
      setUser((prv) => ({
        ...prv,
        name: { ...prv.name, first: "", last: "" },
        email: "",
        password: "",
      }));
    } catch ({ message }) {
      console.error(message);
    }

    setFormStates((prv) => ({ ...prv, creating: false }));
  }

  return (
    <>
      <form
        className={styles.signUpForm}
        action="/sign-up"
        method="post"
        onSubmit={submitDetails}
      >
        <section className={styles.nameSection}>
          <label htmlFor="user-firstname">
            <input
              type="text"
              name="firstname-user"
              id="user-firstname"
              value={user.name.first}
              onChange={(e) =>
                setUser((prv) => ({
                  ...prv,
                  name: { ...prv.name, first: e.target.value },
                }))
              }
              required={!user.name.first.trim()}
              autoComplete="given-name"
            />
            <span>First Name</span>
          </label>
          <label htmlFor="user-lastname">
            <input
              type="text"
              name="lastname-field"
              id="user-lastname"
              value={user.name.last}
              onChange={(e) =>
                setUser((prv) => ({
                  ...prv,
                  name: { ...prv.name, last: e.target.value },
                }))
              }
              required={!user.name.last.trim()}
              autoComplete="family-name"
            />
            <span>Last Name</span>
          </label>
        </section>
        <label htmlFor="user-email">
          <input
            type="email"
            name="email-input"
            id="user-email"
            value={user.email}
            onChange={(e) =>
              setUser((prv) => ({ ...prv, email: e.target.value }))
            }
            required={!user.email.trim()}
            autoComplete="username"
          />
          <span>Email</span>
        </label>
        <label htmlFor="user-password">
          <input
            type={formStates.showPassword ? "text" : "password"}
            name="password-input"
            id="user-password"
            value={user.password}
            onChange={(e) =>
              setUser((prv) => ({ ...prv, password: e.target.value }))
            }
            required={!user.password.trim()}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() =>
              setFormStates((prv) => ({
                ...prv,
                showPassword: !prv.showPassword,
              }))
            }
            aria-label={
              formStates.showPassword ? "hide password" : "show password"
            }
            className={styles.showPasswordToggle}
          >
            {formStates.showPassword ? <EyeOff /> : <Eye />}
          </button>
          <span>Password</span>
        </label>
        <label htmlFor="terms-of-service">
          <input
            type="checkbox"
            name="terms_of_service"
            id="terms-of-service"
            checked={formStates.termsOfServiceAccepted}
            onChange={(evt) =>
              setFormStates((prv) => ({
                ...prv,
                termsOfServiceAccepted: evt.target.checked,
              }))
            }
          />
          {formStates.termsOfServiceAccepted ? <SquareCheck /> : <Square />}
          <span>I agree to the Tobi Terms of Service</span>
        </label>
        <button type="submit" disabled={!formStates.termsOfServiceAccepted}>
          {formStates.creating ? <Spinner width={18} /> : "Sign Up"}
        </button>
      </form>
      <p className={styles.signInRedirect}>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </>
  );
};

export default SignUp;
