import React from "react";
import Topbar from "@/components/Topbar"; // Topbar component visible for everyone
import { Children } from "react";

const MainLayout = ({ children }) => {
  return (
    <div>
      
      <main>{children}</main> {/* Render specific content here (like Homepage) */}
    </div>
  );
};

export default MainLayout;
