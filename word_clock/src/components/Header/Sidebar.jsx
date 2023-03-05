import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default (_props) => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/configuration">
        Configuraiton
      </a>
      <a className="menu-item" href="/alarm">
        Alarm
      </a>
      <a className="menu-item" href="/settings">
        Settings
      </a>
    </Menu>
  );
};
