import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
// import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from './components/Dashboard';
import IndividualPage from './components/IndividualPage';
import PageNotFound from "./components/PageNotFound";
import GroupPage from "./components/GroupPage";
import ReportPage from "./components/ReportPage";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
        </Route>
        <Route path="individual" element={<IndividualPage />} />
        <Route path="group" element={<GroupPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
