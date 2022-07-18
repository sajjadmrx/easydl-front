import { createContext } from "react";

export const FormContext = createContext({
    inputValue: "",
    setinputSValue: () => { },
    loading: false,
    setLoading: () => { }
})