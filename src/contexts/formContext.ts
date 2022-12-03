import { createContext } from "react";
import { FormContext } from "../shared/interfaces/FormContext.interface";

export const formContext = createContext<FormContext>({
  inputValue: "",
  setInputValue: () => {},
  loading: false,
  setLoading: () => {},
});
