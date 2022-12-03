import React, { useEffect, useState } from "react";
import { Route, Switch, LoadingContext } from "react-router-loading";
import "./App.css";
import { authContext } from "./contexts/authContext";
import { HelpPage } from "./pages/help.page";

import { HomePage } from "./pages/home.page";
import { ProfilePage } from "./pages/profile.page";
import { ReportPage } from "./pages/report.page";
import { CookieUtil } from "./utils/cookie.util";

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
      <Switch>
        <Route exact path="/" component={HomePage} loading />
        <Route path="/help" component={HelpPage} loading />
        <Route path="/report" component={ReportPage} loading />
        {/* profile Page */}
        <Route path="/profile" component={ProfilePage} loading />
      </Switch>
    </authContext.Provider>
  );
}

export default App;
