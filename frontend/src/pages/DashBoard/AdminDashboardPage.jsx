import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import AdminControlConfig from '@/config/adminControlsConfig';

const AdminDashboardPage = ({user}) => {

  return (
    <DashboardLayout sidebarConfig={AdminControlConfig.sidebarControls} user={user}>
      <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <p>Select an option from the sidebar to get started.</p>
    </DashboardLayout>
  );
};


export default AdminDashboardPage;

