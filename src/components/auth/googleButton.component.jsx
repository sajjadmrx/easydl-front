import { useContext, useEffect, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { AuthStore } from '../../store/auth.store';

export function GoogleButtonComponent(props) {
    const responseGoogle = props.responseGoogle;
    return (
        <GoogleOAuthProvider ider clientId={AuthStore.google.clientId} >
            <GoogleLogin
                onSuccess={responseGoogle}
                size="medium"
                onError={onFailure} ></GoogleLogin>
        </GoogleOAuthProvider>
    )

}



function onFailure(response) {
}