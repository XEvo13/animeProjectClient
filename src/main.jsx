import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'
import { AuthProviderWrapper } from './context/auth.context.jsx';
//import { root } from 'postcss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <App className=""/>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
);
