import { useState } from "react";
import { Modal } from "react-daisyui";

export function MainModalComponent(props) {
    const isOpen = props.isOpen
    const setIsOpen = props.setIsOpen
    return (
        <Modal open={isOpen} onClickBackdrop={setIsOpen}>
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative  rounded-lg shadow dark:bg-white bg-gray-700">

                    <div className="p-6">
                        {props.children}
                    </div>
                </div>

            </div>
        </Modal>
    )
}