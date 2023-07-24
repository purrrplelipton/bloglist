import { Eye, EyeOff, Square, SquareCheck } from "@assets/vectors/tabler-icons";
import { Spinner } from "@components/spinner";
import { AppContext } from "@contexts/";
import { createUser } from "@services/user.js";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./sign-up.module.css";

const initialUser = {
  name: { first: "", last: "" },
  email: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [user, setUser] = useState(initialUser);

  const [formStates, setFormStates] = useState({
    showPassword: false,
    termsOfServiceAccepted: false,
    creating: false,
  });

  function submitDetails(event) {
    setFormStates((prv) => ({ ...prv, creating: true }));
    event.preventDefault();

    createUser(user)
      .then(() => {
        setUser(initialUser);
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.concat({
            message: "Account created successfully",
            color: "success",
            id: uuidv4(),
          }),
        }));
        navigate("/", { replace: true });
      })
      .catch(({ message }) =>
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.concat({ message, color: "error", id: uuidv4() }),
        }))
      )
      .finally(() => setFormStates((prv) => ({ ...prv, creating: false })));
  }

  const signUpVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "-100%",
      opacity: 0,
    },
  };

  return (
    <motion.main
      variants={signUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
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
    </motion.main>
  );
};

export default SignUp;
