import { createContext } from "react";
import { ModalContext } from "../shared/interfaces/modalContext.interface";

export const authModalContext = createContext<ModalContext>({
  showModal: false,
  setShowModal: () => {},
});
