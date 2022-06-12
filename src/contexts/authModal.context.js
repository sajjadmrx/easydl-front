import { createContext } from "react";

export const AuthModalContext = createContext({
    showModal: false,
    setShowModal: () => { },
})