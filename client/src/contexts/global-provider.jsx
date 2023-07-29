import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../services";

const initialState = {
  user: null,
  notifs: [],
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useState(initialState);

  useEffect(() => {
    const bloggerzon = localStorage.getItem("bloggerzon");
    if (bloggerzon) {
      const { id, token } = JSON.parse(bloggerzon);
      dispatch((prv) => ({ ...prv, user: id }));
      setToken(token);
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = { children: PropTypes.node.isRequired };
