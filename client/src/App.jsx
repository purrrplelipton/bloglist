import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Spinner } from "./components/spinner";
import { isAllowed } from "./services/auth";

const SignUp = lazy(() =>
  import("./pages").then((module) => ({ default: module.SignUp }))
);
const SignIn = lazy(() =>
  import("./pages").then((module) => ({ default: module.SignIn }))
);
const Blogs = lazy(() =>
  import("./pages").then((module) => ({ default: module.Blogs }))
);

function App() {
  return (
    <Suspense fallback={<Spinner width={40} />}>
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
          element={isAllowed() ? <Blogs /> : <Navigate to="/sign-in" replace />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
