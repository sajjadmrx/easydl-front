import React, { useContext, useEffect, useState } from "react";
import {} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleButtonComponent } from "../auth/googleButton.component";
import { authModalContext } from "../../contexts/authModalContext";
import { authContext } from "../../contexts/authContext";
import { authService, userService } from "../../service/index.service";
import { CookieUtil } from "../../utils/cookie.util";
import { Button, Modal } from "react-daisyui";
import { AxiosError } from "axios";
import { axiosError } from "../../handlers/error.handler";
import { toast } from "react-toastify";
import ms from "ms";
{
  /* <GoogleButtonComponent responseGoogle={(response) => responseGoogle(response, authContext, setProcessing, setShowModal)} /> */
}
export function AuthModalComponent(props: any) {
  const show = props.show;
  const { setShowModal, showModal } = useContext(authModalContext);
  const authContextData = useContext(authContext);
  const [processing, setProcessing] = useState(1);
  const [errorState, setErrorState] = useState("");
  useEffect(() => {
    if (errorState) {
      toast.error(errorState);
    }
  }, [errorState]);
  function toggleVisible() {
    setShowModal(!showModal);
  }

  return (
    <Modal open={showModal} onClickBackdrop={toggleVisible}>
      <div className="  rounded-lg ">
        <div className="p-6">
          <p className="text-sm font-normal">
            وارد حساب کاربری بشید و بدون محدودیت دانلود کنید
          </p>
          <ul className="my-4 space-y-3">
            <li>
              <div className="flex items-center">
                {processing == 1 ? (
                  <GoogleButtonComponent
                    responseGoogle={(response: any) =>
                      responseGoogle(
                        response,
                        authContextData,
                        setProcessing,
                        setShowModal,
                        setErrorState
                      )
                    }
                  />
                ) : (
                  <Button className="loading" disabled></Button>
                )}
              </div>
            </li>
          </ul>
          <div>
            <a
              href="javascript:;"
              onClick={toggleVisible}
              className="inline-flex items-center text-xs font-normal hover:underline"
            >
              <FontAwesomeIcon icon={["fas", "times"]} className="mr-2" />
              <span>بستن</span>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

async function responseGoogle(
  response: any,
  authContext: any,
  setProcessing: any,
  setShowModal: any,
  setErrorState: any
) {
  try {
    const credential = response.credential;
    if (credential) {
      setProcessing(2);
      const result = await authService.sendGoogleToken(credential);
      const expireDate = new Date(new Date().getTime() + ms("9d"));
      // @ts-ignore
      CookieUtil.set("token", result.data, expireDate);
      setShowModal(false);
      setProcessing("auth");
      authContext.setIsAuthenticated(true);
    }
    return "OK";
  } catch (error) {
    axiosError(error, setErrorState);
  } finally {
    setProcessing(1);
  }
}
