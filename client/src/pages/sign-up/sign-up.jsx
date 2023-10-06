import { Eye, EyeOff, Square, SquareCheck } from "@assets/vectors/tabler-icons";
import Loader from "@components/loader";
import usersApi from "@services/users";
import { appendNotification } from "@store/reducers/global";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./sign-up.module.css";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    event.preventDefault();
    setFormStates((prv) => ({ ...prv, creating: true }));
    try {
      await usersApi.post(user);
      setUser({});
      dispatch(
        appendNotification({
          message: "Account created successfully",
          color: "success",
          id: uuidv4(),
        })
      );
      navigate("/sign-in", { replace: true });
    } catch (error) {
      dispatch(
        appendNotification({
          message: error.message,
          color: "error",
          id: uuidv4(),
        })
      );
    }

    setFormStates((prv) => ({ ...prv, creating: false }));
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
    <main
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
          {formStates.creating ? <Loader width={18} /> : "Sign Up"}
        </button>
      </form>
      <p className={styles.signInRedirect}>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </main>
  );
};

export default SignUp;
