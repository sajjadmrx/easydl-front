import { createContext, Dispatch, SetStateAction } from "react";
import { AuthContext } from "../shared/interfaces/authContext.interface";

export const authContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  statusLoading: false,
  setStatusLoading: () => {},
  token: "",
  setToken: () => {},
});
