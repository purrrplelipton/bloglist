import PropTypes from "prop-types";
import React, { createContext, useState } from "react";

const initialState = {
  notifs: [],
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useState(initialState);
  console.log(state.notifs);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = { children: PropTypes.node.isRequired };
