import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Homepage from "@/pages/Homepage";
import About from "@/pages/About";
import Departments from "@/pages/Departments";
import Gallery from "@/pages/Gallery";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import Team from "@/pages/Team";
import AdminDashboard from "@/pages/AdminDashboard";
import FacultyDashboard from "@/pages/FacultyDashboard";
import StudentDashboard from "@/pages/StudentDashboard";
import Footer from "@/components/Footer";
import Topbar from "./components/Topbar";
import './App.css'
export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Router>
        <Topbar />
        <Routes>
          {/* MainLayout Routes */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Homepage />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/departments"
            element={
              <MainLayout>
                <Departments />
              </MainLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <MainLayout>
                <Gallery />
              </MainLayout>
            }
          />
          <Route
            path="/login"
            element={
              <MainLayout>
                <LoginPage />
              </MainLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <MainLayout>
                <SignupPage />
              </MainLayout>
            }
          />
          <Route
            path="/team"
            element={
              <MainLayout>
                <Team />
              </MainLayout>
            }
          />

          {/* DashboardLayout Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/faculty/dashboard"
            element={
              <DashboardLayout>
                <FacultyDashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <DashboardLayout>
                <StudentDashboard />
              </DashboardLayout>
            }
          />
        </Routes>
        <Footer />
        
      </Router>
    </ThemeProvider>
  );
}
