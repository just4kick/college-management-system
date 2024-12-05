import React from "react";
import { Children } from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <main>{children}</main> {/* Render dashboard content here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
