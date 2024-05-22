// DataContext.jsx
import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [action, setAction] = useState(false);

  return (
    <DataContext.Provider value={{ action, setAction }}>
      {children}
    </DataContext.Provider>
  );
};