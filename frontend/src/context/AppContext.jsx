import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvided = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
