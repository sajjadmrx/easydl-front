import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { FooterComponent } from "../components/footer.component";
import { NavbarComponent } from "../components/navbar.component";
import AuthContext from "../contexts/auth.context";
import axios from 'axios'
import { CookieUtil } from "../utils/cookie.util";
import { AuthModalComponent } from "../components/modals/auth.modal";
import { AuthModalContext } from "../contexts/authModal.context";
import { userService } from "../service/index.service";
export function PageWrapper(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(CookieUtil.has('token'));
    const [user, setUser] = useState({});
    const [statusLoading, setStatusLoading] = useState(true);
    const [token, setToken] = useState(CookieUtil.get('token'));
    const [showModal, setShowModal] = useState(false);
    const AuthContextValues = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        statusLoading,
        setStatusLoading,
        token,
        setToken
    }
    const AuthModalContextValues = {
        showModal,
        setShowModal
    }
    useEffect(() => {
        async function getUsetWithToken() {
            setStatusLoading(true)
            const profile = await userService.getProfile()
            console.log('profile', profile)
            setUser(profile)
            setStatusLoading(false)
        }
        if (isAuthenticated)
            getUsetWithToken();
        else {
            setUser({})
        }
    }, [isAuthenticated]);


    return (
        <div>
            <AuthContext.Provider value={AuthContextValues} >
                <AuthModalContext.Provider value={AuthModalContextValues}>
                    <NavbarComponent />
                    {props.children}
                    <FooterComponent />
                    <ToastContainer theme='dark' />
                    <AuthModalComponent show={showModal} />
                </AuthModalContext.Provider>
            </AuthContext.Provider>
        </div>
    )
}