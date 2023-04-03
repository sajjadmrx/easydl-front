import { FunctionComponent, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FooterComponent } from "../components/footer.component";
import { NavbarComponent } from "../components/navbar.component";
import { authContext } from "../contexts/authContext";
import { CookieUtil } from "../utils/cookie.util";
import { AuthModalComponent } from "../components/modals/auth.modal";
import { authModalContext } from "../contexts/authModalContext";
import { userService } from "../service/index.service";
import React from "react";
import { AuthContext } from "../shared/interfaces/authContext.interface";
import { axiosError } from "../handlers/error.handler";

interface Props {
  children: JSX.Element;
}

export const PageWrapper = (props: Props) => {
  const {
    setIsAuthenticated,
    isAuthenticated,
    setStatusLoading,
    setUser,
    token,
    setToken,
  }: AuthContext = useContext(authContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const AuthModalContextValues = {
    showModal,
    setShowModal,
  };
  useEffect(() => {
    async function getUserByToken(): Promise<void> {
      try {
        setStatusLoading(true);
        const profile = await userService.getProfile();
        setUser(profile.data);
        setStatusLoading(false);
      } catch (error: any) {
        if (error.response.status === 401) {
          setIsAuthenticated(false);
          setToken("");
        }
        axiosError(error, toast.error);
      }
    }

    if (isAuthenticated && CookieUtil.get("token"))
      getUserByToken().then((r) => {});
    else {
      setUser({});
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div>
      <authModalContext.Provider value={AuthModalContextValues}>
        <ToastContainer theme="dark" rtl />
        <NavbarComponent />
        {props.children}
        <FooterComponent />
        <AuthModalComponent show={showModal} />
      </authModalContext.Provider>
    </div>
  );
};
