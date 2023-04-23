import React, { useEffect, useState } from "react";
import { Route, Switch, LoadingContext } from "react-router-loading";
import "./App.css";
import { authContext } from "./contexts/authContext";
import { HelpPage } from "./pages/help.page";

import { HomePage } from "./pages/home.page";
import { ProfilePage } from "./pages/profile.page";
import { ReportPage } from "./pages/report.page";
import { CookieUtil } from "./utils/cookie.util";
import { SubscriptionPage } from "./pages/subscription.page";
import { PaymentCallbackPage } from "./pages/PaymentCallback.page";
import { PageWrapper } from "./Wrappers/pages.wrapper";
import { SpotifyCallbackPage } from "./pages/spotifyCallback.page";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    CookieUtil.has("token")
  );
  const [user, setUser] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [token, setToken] = useState(CookieUtil.get("token"));
  const AuthContextValues = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    statusLoading,
    setStatusLoading,
    token,
    setToken,
  };

  useEffect(() => {
    if (!token) CookieUtil.delete("token");
  }, [token]);

  return (
    <authContext.Provider value={AuthContextValues}>
      <PageWrapper>
        <Switch>
          <Route path="/profile" component={ProfilePage} loading />
          <Route path="/subscription" component={SubscriptionPage} loading />
          <Route path="/callback" component={PaymentCallbackPage} loading />
          <Route
            path="/callbacks/spotify"
            component={SpotifyCallbackPage}
            loading
          />
          <Route exact path="/" component={HomePage} loading />
          <Route path="/help" component={HelpPage} loading />
          <Route path="/report" component={ReportPage} loading />
        </Switch>
      </PageWrapper>
    </authContext.Provider>
  );
}

export default App;
