import React from "react";
import './App.css'
import { ThemeProvider } from "next-themes"; // If using next-themes for dark/light mode
import MainLayout from "@/layouts/MainLayout";  // Main Layout that includes Topbar
import DashboardLayout from "@/layouts/DashboardLayout";  // Admin/Faculty/Student dashboard layout
import Homepage from "@/pages/Homepage"; // Homepage component
import Topbar from "@/components/Topbar"; 
import Footer from "./components/Footer";
export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
    <Topbar />
      {/* MainLayout for non-dashboard pages */}
      <MainLayout>
        <Homepage />
      </MainLayout>

      {/* DashboardLayout for the admin/faculty/student dashboards */}
      <DashboardLayout>
        {/* The appropriate dashboard component goes here based on user role */}
      </DashboardLayout>
    <Footer/>
    </ThemeProvider>
  );
}
