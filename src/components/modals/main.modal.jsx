import { useState } from "react";
import { Modal } from "react-daisyui";

export function MainModalComponent(props) {
  const isOpen = props.isOpen;
  const setIsOpen = props.setIsOpen;
  return (
    <Modal open={isOpen} onClickBackdrop={setIsOpen}>
      <div className="p-6">{props.children}</div>
    </Modal>
  );
}
