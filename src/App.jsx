
import React from "react";
import { Route, Switch, LoadingContext } from 'react-router-loading'
import './App.css';
import { AboutPage } from "./pages/about.page";
import { HelpPage } from "./pages/help.page";

import { HomePage } from './pages/home.page';

function App() {
  return (
    // <Router>
    //   <Switch>
    //     <Route path="/about"> <AboutPage /> </Route>
    //     <Route path="/help"> <HelpPage /></Route>
    //     <Route path="/"> <HomePage /> </Route>
    //   </Switch>
    // </Router>
    // <Switch>
    //   <Route exact path="/" component={HomePage} loading />
    //   <Route path="/help" component={HelpPage} loading />
    //   <Route path="/about" component={AboutPage} loading />
    // </Switch>
    <small>You are running this application in <b>{process.env.REACT_APP_API_URL}</b> mode.</small>

  );
}

export default App;
