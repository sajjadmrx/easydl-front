import {useContext, useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import {FooterComponent} from "../components/footer.component";
import {NavbarComponent} from "../components/navbar.component";
import AuthContext from "../contexts/auth.context";
import {CookieUtil} from "../utils/cookie.util";
import {AuthModalComponent} from "../components/modals/auth.modal";
import {AuthModalContext} from "../contexts/authModal.context";
import {userService} from "../service/index.service";

export function PageWrapper(props) {
    const {setIsAuthenticated, isAuthenticated, setStatusLoading, setUser, token, setToken} = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false);
    const AuthModalContextValues = {
        showModal,
        setShowModal
    }
    useEffect(() => {
        async function getUserByToken() {
            try {
                setStatusLoading(true)
                const profile = await userService.getProfile()
                setUser(profile)
                setStatusLoading(false)
            } catch (error) {
                if (error.response.status === 401) {
                    setIsAuthenticated(false)
                    setToken('')
                }
            }
        }

        if (isAuthenticated && CookieUtil.get('token'))
            getUserByToken().then(r => {
            });
        else {
            setUser({})
        }

    }, [isAuthenticated]);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true)
        }
    }, [])
    return (
        <div>
            <AuthModalContext.Provider value={AuthModalContextValues}>
                <NavbarComponent/>
                {props.children}
                <FooterComponent/>
                <ToastContainer theme='dark'/>
                <AuthModalComponent show={showModal}/>
            </AuthModalContext.Provider>
        </div>
    )
}