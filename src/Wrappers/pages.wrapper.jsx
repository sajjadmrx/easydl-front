import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { FooterComponent } from "../components/footer.component";
import { NavbarComponent } from "../components/navbar.component";
import AuthContext from "../contexts/auth.context";
import axios from 'axios'
import { CookieUtil } from "../utils/cookie.util";
export function PageWrapper(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(CookieUtil.has('token'));
    const [user, setUser] = useState({});
    const [statusLoading, setStatusLoading] = useState(true);
    const [token, setToken] = useState(CookieUtil.get('token'));
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
    useEffect(() => {
        async function getUsetWithToken() {
            setStatusLoading(true)
            setTimeout(async () => {
                const result = await axios.get('https://api.github.com/users/sajjadmrx')
                const userFetched = result.data
                const user = {
                    avatar: userFetched.avatar_url,
                    name: userFetched.name,
                }
                setUser(user)
                setStatusLoading(false)
            }, 3000)
        }
        if (isAuthenticated)
            getUsetWithToken();
    }, [isAuthenticated]);
    return (
        <div>
            <AuthContext.Provider value={AuthContextValues} >
                <NavbarComponent />
                {props.children}
                <FooterComponent />
                <ToastContainer theme='dark' />
            </AuthContext.Provider>
        </div>
    )
}