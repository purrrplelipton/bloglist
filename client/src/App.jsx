import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "./components/loader";
import { Notif } from "./components/notif";
import { authorized } from "./services/auth";

const SignUp = lazy(() => import("./pages/sign-up/sign-up"));
const SignIn = lazy(() => import("./pages/sign-in/sign-in"));
const Home = lazy(() => import("./pages/home/home"));

function App() {
  const location = useLocation();

  return (
    <>
      <Suspense fallback={<Loader text={"Hold on a sec"} width={40} />}>
        <Routes location={location} key={location}>
          <Route
            path="/sign-up"
            element={authorized() ? <Navigate to="/" replace /> : <SignUp />}
          />
          <Route
            path="/sign-in"
            element={authorized() ? <Navigate to="/" replace /> : <SignIn />}
          />
          <Route
            path="/"
            element={
              authorized() ? <Home /> : <Navigate to="/sign-in" replace />
            }
          />
        </Routes>
      </Suspense>
      <Notif />
    </>
  );
}

export default App;
