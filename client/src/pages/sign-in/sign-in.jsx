import {
  BrandGoogle,
  Eye,
  EyeOff,
  Square,
  SquareCheck,
} from "@assets/vectors/tabler-icons";
import Loader from "@components/loader";
import { verify } from "@services/auth";
import { appendNotification, setUser } from "@store/reducers/global";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./sign-in.module.css";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    email$alias: "",
    password: "",
    rememberMe: false,
  });
  const [verifying, setVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function verifyDetails(event) {
    event.preventDefault();
    setVerifying(true);
    try {
      const id = await verify(details);
      dispatch(setUser(id));
      dispatch(
        appendNotification({
          message: "Sign in successful",
          color: "success",
          id: uuidv4(),
        })
      );
      setDetails((prv) => ({
        ...prv,
        email$alias: "",
        password: "",
        rememberMe: false,
      }));
      navigate("/", { replace: true });
    } catch (error) {
      dispatch(
        appendNotification({
          message: error.message,
          color: "error",
          id: uuidv4(),
        })
      );
    }
    setVerifying(false);
  }

  function signInWithGoogle() {}

  const signInVariants = {
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
      variants={signInVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
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
              setDetails((prv) => ({ ...prv, email$alias: evt.target.value }))
            }
            value={details.email$alias}
            required={!details.email$alias.trim()}
            autoComplete="off"
          />
          <span>email | alias</span>
        </label>
        <label htmlFor="user-password">
          <input
            type={showPassword ? "text" : "password"}
            name="user_password"
            id="user-password"
            onChange={(evt) =>
              setDetails((prv) => ({ ...prv, password: evt.target.value }))
            }
            value={details.password}
            required={!details.password.trim()}
            autoComplete="off"
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
            checked={details.rememberMe}
            onChange={(evt) =>
              setDetails((prv) => ({ ...prv, rememberMe: evt.target.checked }))
            }
          />
          {details.rememberMe ? <SquareCheck /> : <Square />}
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
        <button type="submit" disabled={verifying}>
          {verifying ? <Loader width={18} /> : "sign in"}
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
    </main>
  );
};

export default SignIn;
