import React, { useState } from "react";
import { AdminSidebar } from "@/components/Dashboard/AdminComponents/AdminSidebar";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
    const [activeGroup, setActiveGroup] = useState(null);
    const [activeAction, setActiveAction] = useState("");
  
    const handleSelectGroup = (group) => {
      setActiveGroup(group);
      setActiveAction(""); // Reset action when switching groups
    };
  
    const handleActionClick = (action) => {
      setActiveAction(action);
    };
  
    const handleLogout = () => {
      alert("You have been logged out.");
    };
  
    return (
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Sidebar */}
        <AdminSidebar onSelectGroup={handleSelectGroup} onLogout={handleLogout} />
  
        {/* Main Dashboard */}
        <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-800">
          {/* Navbar */}
          <nav className="bg-gray-300 dark:bg-gray-900 p-4">
            <div className="flex gap-4">
              {activeGroup?.items.map((item) => (
                <Button
                  key={item}
                  size="lg"
                  variant="outline"
                  onClick={() => handleActionClick(item)}
                  className="text-sm text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700"
                >
                  {item}
                </Button>
              ))}
            </div>
          </nav>
  
          {/* Content Area */}
          <main className="flex-1 p-6 overflow-y-auto">
            {activeAction ? (
              <div className="p-6 bg-white dark:bg-gray-900 rounded-md shadow h-full">
                {/* TODO: Add dynamic action component rendering here */}
                <p className="text-gray-600 dark:text-gray-300">
                  Content for action <strong>{activeAction}</strong> will render here.
                </p>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                Select an action from the navbar to display its content here.
              </p>
            )}
          </main>
        </div>
      </div>
    );
  }
  
