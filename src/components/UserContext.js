// UserContext.js
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores user info
  const [token, setToken] = useState(null); // stores auth token

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    console.log("User logged in:", userData);
    
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
