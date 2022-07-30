import { createContext } from "react";

export const FormContext = createContext({
  inputValue: "",
  setinputValue: () => {},
  loading: false,
  setLoading: () => {},
});
