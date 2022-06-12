import { GoogleLogin } from 'react-google-login'
import { AuthStore } from '../../store/auth.store';
import { infoStore } from '../../store/info.store';
export function GoogleButtonComponent(props) {


    window.addEventListener("message", ({ data }) => {
        try {
            responseGoogle(JSON.parse(data));
        } catch (error) {

        }
    })

    return (
        <GoogleLogin
            clientId={AuthStore.google.clientId}
            buttonText="ورود با گوگل"
            scope="profile email"
            cookiePolicy={'single_host_origin'}
            className="w-full max-w-xs"
            theme='dark'
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#4285f4',
                borderRadius: '16px',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginTop: '1rem',
                marginBottom: '1rem',
                cursor: 'pointer',
            }}

        ></GoogleLogin>
    )
}
function responseGoogle(response) {
    if (response.method == "fireIdpEvent" && response.params && response.params.type == "authResult") {
        const { authResult } = response.params;
        const { id_token, login_hint } = authResult;
        console.log('idToken:', id_token, 'login_hint: ', login_hint);
    }
}
function onFailure(response) {
    console.log('error', response);
}