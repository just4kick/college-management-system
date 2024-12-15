import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import StudentControlConfig from '@/config/studentControlsConfig';

const StudentDashboardPage = ({user}) => {
  return (
    <DashboardLayout sidebarConfig={StudentControlConfig.sidebarControls} user={user}>
      <h1 className="text-2xl font-bold mb-4">Welcome to Student Dashboard</h1>
      <p>Select an option from the sidebar to get started.</p>
    </DashboardLayout>
  );
};

export default StudentDashboardPage