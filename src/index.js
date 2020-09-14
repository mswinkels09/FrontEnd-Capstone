import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Capstone } from "./components/Capstone";
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Capstone />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
