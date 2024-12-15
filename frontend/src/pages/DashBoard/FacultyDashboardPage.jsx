import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import FacultyControlConfig from '@/config/facultyControlsConfig';

const FacultyDashboardPage = ({user}) => {
  

  return (
    <DashboardLayout sidebarConfig={FacultyControlConfig.sidebarControls} user={user}>
      <h1 className="text-2xl font-bold mb-4">Welcome to Faculty Dashboard</h1>
      <p>Select an option from the sidebar to get started.</p>
    </DashboardLayout>
  );
};

export default FacultyDashboardPage