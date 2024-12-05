import React from "react";
import Topbar from "@/components/Topbar"; // Topbar component visible for everyone
import Menubar from "@/components/Menubar"; // Sidebar component visible only in Dashboard
import { Children } from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Menubar /> {/* Sidebar only visible in Dashboard layout */}
        <main>{children}</main> {/* Render dashboard content here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
