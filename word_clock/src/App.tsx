import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// import Layout from "./components/Layout/Layout.jsx";
import Header from "./components/Header/Header.jsx";
import Configuration from "./components/Configuration/Configuration.jsx";
import Alarm from "./components/Alarm/Alarm.jsx";
import Settings from "./components/Settings/Settings.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";

function App() {
  return (
    <Router>
      <Header/>
      {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Configuration />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      {/* </Layout> */}
    </Router>
  );
}

export default App;
