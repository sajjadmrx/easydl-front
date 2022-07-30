import { createContext } from "react";
const AuthContext = createContext({
  user: {},
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  statusLoading: false,
  setStatusLoading: () => {},
  token: "",
  setToken: () => {},
});

export default AuthContext;
