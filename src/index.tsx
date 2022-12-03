import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import "animate.css";
// @ts-ignore
import * as serviceWorker from "./serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root") as any);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

//reportWebVitals();
serviceWorker.register();
