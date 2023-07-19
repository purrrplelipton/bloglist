import PropTypes from "prop-types";
import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notifs: [{ message: "you have been warned.", color: "error", id: uuidv4() }],
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useState(AppContext);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = { children: PropTypes.node.isRequired };
