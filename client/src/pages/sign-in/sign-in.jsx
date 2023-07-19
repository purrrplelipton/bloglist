import {
  BrandGoogle,
  Eye,
  EyeOff,
  Square,
  SquareCheck,
} from "@assets/vectors/tabler-icons";
import { Spinner } from "@components/spinner";
import { AppContext } from "@contexts/";
import { signIn } from "@services/auth.js";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./sign-in.module.css";

const initialUser = {
  email$alias: "",
  password: "",
  rememberMe: false,
};

const SignIn = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [user, setUser] = useState(initialUser);
  const [formStates, setFormStates] = useState({ verifying: false });
  const [showPassword, setShowPassword] = useState(false);

  async function verifyDetails(event) {
    setFormStates((prv) => ({ ...prv, verifying: true }));
    event.preventDefault();

    try {
      const data = await signIn(user);
      localStorage.setItem("bloglist", JSON.stringify(data));
      setUser(initialUser);
      navigate("/");
    } catch ({ message }) {
      dispatch((prv) => ({
        ...prv,
        notifs: prv.notifs.concat({ message, color: "error", id: uuidv4() }),
      }));
    }

    setFormStates((prv) => ({ ...prv, verifying: false }));
  }

  function signInWithGoogle() {}

  return (
    <>
      <form
        className={styles.signInForm}
        action="/sign-in"
        method="post"
        onSubmit={verifyDetails}
      >
        <h1>welcome back</h1>
        <p>please enter your details.</p>
        <label htmlFor="user-id">
          <input
            type="text"
            name="username_email"
            id="user-id"
            onChange={(evt) =>
              setUser((prv) => ({ ...prv, email$alias: evt.target.value }))
            }
            value={user.email$alias}
            required={!user.email$alias.trim()}
            autoComplete={"username"}
          />
          <span>email | alias</span>
        </label>
        <label htmlFor="user-password">
          <input
            type={showPassword ? "text" : "password"}
            name="user_password"
            id="user-password"
            onChange={(evt) =>
              setUser((prv) => ({ ...prv, password: evt.target.value }))
            }
            value={user.password}
            required={!user.password.trim()}
            autoComplete={"current-password"}
          />

          <span>password</span>
          <button
            type="button"
            onClick={() => setShowPassword((prv) => !prv)}
            aria-label={showPassword ? "hide password" : "show password"}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </label>
        <label htmlFor="remember-me">
          <input
            type="checkbox"
            name="remember_me"
            id="remember-me"
            checked={user.rememberMe}
            onChange={(evt) =>
              setUser((prv) => ({ ...prv, rememberMe: evt.target.checked }))
            }
          />
          {user.rememberMe ? <SquareCheck /> : <Square />}
          <span>Remember me for 30 days</span>
        </label>
        <a
          href="/forgot-password"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.forgotPassword}
        >
          Forgot password
        </a>
        <button type="submit" disabled={formStates.verifying}>
          {formStates.verifying ? <Spinner width={18} /> : "sign in"}
        </button>
        <button
          type="button"
          onClick={signInWithGoogle}
          className={styles.googleSignIn}
        >
          <BrandGoogle />
          <span>Sign in with Google</span>
        </button>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/sign-up">sign up</Link>
      </p>
    </>
  );
};

export default SignIn;
