import { createContext } from "react";
import { AuthContext } from "../shared/interfaces/authContext.interface";
export const authContext = createContext<AuthContext>({
  user: {},
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  statusLoading: false,
  setStatusLoading: () => {},
  token: "",
  setToken: () => {},
});
