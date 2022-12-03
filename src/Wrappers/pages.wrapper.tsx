import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { FooterComponent } from "../components/footer.component";
import { NavbarComponent } from "../components/navbar.component";
import { authContext } from "../contexts/authContext";
import { CookieUtil } from "../utils/cookie.util";
import { AuthModalComponent } from "../components/modals/auth.modal";
import { authModalContext } from "../contexts/authModalContext";
import { userService } from "../service/index.service";
import React from "react";

export const PageWrapper = (props: any) => {
  const {
    setIsAuthenticated,
    isAuthenticated,
    setStatusLoading,
    setUser,
    token,
    setToken,
  } = useContext(authContext);
  const [showModal, setShowModal] = useState(false);
  const AuthModalContextValues = {
    showModal,
    setShowModal,
  };
  useEffect(() => {
    async function getUserByToken() {
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
        <NavbarComponent />
        {props.children}
        <FooterComponent />
        <ToastContainer theme="dark" rtl />
        <AuthModalComponent show={showModal} />
      </authModalContext.Provider>
    </div>
  );
};
