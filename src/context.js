import React, { useState, createContext } from "react";

export const Context = createContext();

// set global context and a state that you want your application to be able to access globally !!
const UserProvider = ({ children }) => {
  const [state, setState] = useState(undefined);

  return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

export default UserProvider;
