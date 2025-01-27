import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import DynamicCloudPoints from "./Pages/DynamicPointCloud";
import BuildingC from "./Pages/BuildingC";
import BuildingCV2 from "./Pages/BuildingCV2";
import Portfolio from "./Pages/Portfolio";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/home" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
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
