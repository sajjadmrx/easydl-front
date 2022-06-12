import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import 'animate.css';
import * as serviceWorker from './serviceWorker'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


reportWebVitals();
// serviceWorker.register()