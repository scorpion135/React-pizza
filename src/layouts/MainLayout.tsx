import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./../components/index";

import "./../pages/home/home.scss";

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
