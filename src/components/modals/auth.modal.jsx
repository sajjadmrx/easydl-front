
import React, { useContext } from "react";
import { } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleButtonComponent } from "../auth/googleButton.component";
import { AuthModalContext } from "../../contexts/authModal.context";
export function AuthModalComponent(props) {
    const show = props.show;
    const { setShowModal } = useContext(AuthModalContext)
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" style={{ display: show ? "block" : "none" }} >

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">

                <div className="fixed z-10 inset-0 overflow-y-auto">

                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

                        <div className="relative bg-gray-600 rounded-lg  overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">

                            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-right">
                                        <h3 className="text-lg leading-6 font-medium text-gray-100" id="modal-title"></h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-300">
                                                وارد کاربری بشید و بدون محدودیت دانلود کنید
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <hr>
                            </hr>
                            <div className="bg-gray-800 text-white p-6">
                                <GoogleButtonComponent />
                                <div className="mt-3 text-center">
                                    <a href="#" className="text-sm leading-5 font-medium text-gray-100" onClick={() => setShowModal(false)}>
                                        <FontAwesomeIcon icon={['fas', 'times']} />
                                        <span className="ml-2">بعدا</span>
                                    </a>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}