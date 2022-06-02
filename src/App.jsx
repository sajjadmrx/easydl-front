
import React from "react";
import { Route, Switch, LoadingContext } from 'react-router-loading'
import './App.css';
import { AboutPage } from "./pages/about.page";
import { HelpPage } from "./pages/help.page";

import { HomePage } from './pages/home.page';
import { ReportPage } from "./pages/report.page";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} loading />
      <Route path="/help" component={HelpPage} loading />
      <Route path="/about" component={AboutPage} loading />
      <Route path="/report" component={ReportPage} loading />
    </Switch>
  );
}

export default App;
