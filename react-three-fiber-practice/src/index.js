import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import DynamicCloudPoints from "./DynamicPointCloud";
import BuildingC from "./BuildingC";
import BuildingCV2 from "./BuildingCV2";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<App />} />
            <Route path="/dynamic-cloud-points" element={<DynamicCloudPoints />} />
            <Route path="/buildingc" element={<BuildingC />} />
            <Route path="/buildingc-v2" element={<BuildingCV2 />} />
        </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
