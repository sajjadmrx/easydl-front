import { useContext, useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { AuthStore } from "../../store/auth.store";
import React from "react";

export function GoogleButtonComponent(props: any) {
  const responseGoogle = props.responseGoogle;
  // @ts-ignore
  return (
    <GoogleOAuthProvider clientId={AuthStore.google.clientId}>
      <GoogleLogin onSuccess={responseGoogle} size="medium"></GoogleLogin>
    </GoogleOAuthProvider>
  );
}
