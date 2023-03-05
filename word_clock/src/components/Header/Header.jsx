import React from "react";
import Sidebar from "./Sidebar.jsx";
import './Header.css';

export default function Header() {
  return (
    <header>
      <div className="header" id="outer-container">
        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        <div id="page-wrap">
        <center><h1 className="headline">Word Clock</h1></center>
        </div>
      </div>
    </header>
  );
}
