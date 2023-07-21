import React, { Fragment, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Notification from "./components/notif/notif";
import { Spinner } from "./components/spinner";
import { isAllowed } from "./services/auth";

const SignUp = lazy(() => import("./pages/sign-up/sign-up"));
const SignIn = lazy(() => import("./pages/sign-in/sign-in"));
const Home = lazy(() => import("./pages/home/home"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<Spinner text={"Hold on a sec"} width={40} />}>
        <Routes>
          <Route
            path="/sign-up"
            element={isAllowed() ? <Navigate to="/" replace /> : <SignUp />}
          />
          <Route
            path="/sign-in"
            element={isAllowed() ? <Navigate to="/" replace /> : <SignIn />}
          />
          <Route
            path="/"
            element={
              isAllowed() ? <Home /> : <Navigate to="/sign-in" replace />
            }
          />
        </Routes>
      </Suspense>
      <Notification />
    </Fragment>
  );
}

export default App;
