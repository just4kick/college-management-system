import React, { useState } from "react";
import {
  Users,
  Briefcase,
  GraduationCap,
  Bell,
  Key,
  UserCog,
  ChevronRight,
  Menu,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const controlGroups = [
  {
    label: "Admin Controls",
    icon: UserCog,
    items: [
      "createAdmin",
      "changeCurrentPassword",
      "logout",
      "requestForgotPassword",
      "resetPassword",
      "userDetails",
      "updateFaceData",
    ],
  },
  {
    label: "Department Controls",
    icon: Briefcase,
    items: [
      "createDepartment",
      "viewAllDepartments",
      "addCourse",
      "deleteDepartment",
      "assignHOD",
      "revokeHOD",
    ],
  },
  {
    label: "Faculty Controls",
    icon: Users,
    items: [
      "registerFaculty",
      "deleteFaculty",
      "searchFaculty",
      "viewAllFacultyDeptWise",
    ],
  },
  {
    label: "Student Controls",
    icon: GraduationCap,
    items: [
      "registerStudent",
      "deleteStudent",
      "searchStudent",
      "viewAllStudentDeptWise",
    ],
  },
  {
    label: "Registration Key Controls",
    icon: Key,
    items: [
      "generateRegistrationKey",
      "viewRegistrationKey",
      "revokeRegistrationKey",
      "grantRegistrationKey",
      "addRegistrationKey",
      "removeRegistrationKey",
    ],
  },
  {
    label: "Notice Controls",
    icon: Bell,
    items: ["addNoticeByAdmin", "removeNoticeByAdmin", "viewAllNotice"],
  },
];

export function AdminSidebar({ onSelectGroup, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeGroup, setActiveGroup] = useState(controlGroups[0]);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleGroupClick = (group) => {
    setActiveGroup(group);
    onSelectGroup(group);
  };

  const toggleProfilePanel = () => {
    setIsProfilePanelOpen(!isProfilePanelOpen);
  };

  return (
    <aside
      className={`flex flex-col transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      } bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full`}
    >
      {/* Sidebar Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="mt-4 ml-2"
      >
        {sidebarOpen ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Admin Dashboard Text */}
      {sidebarOpen && (
        <div className="text-lg font-semibold px-4 mt-6 text-center">
          Admin Dashboard
        </div>
      )}

      {/* Control Groups */}
      <ScrollArea className="flex-1 mt-4">
        <div className="p-4">
          {controlGroups.map((group) => (
            <Button
              key={group.label}
              variant="ghost"
              className={`w-full justify-start text-sm mb-2 ${
                activeGroup.label === group.label
                  ? "bg-gray-300 dark:bg-gray-800"
                  : ""
              }`}
              onClick={() => handleGroupClick(group)}
            >
              <group.icon className="h-5 w-5" />
              {sidebarOpen && <span className="ml-2">{group.label}</span>}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* User Profile Section */}
      <div className="relative p-4 mt-auto border-t border-sidebar-border">
        <div
          className="w-full flex justify-start text-sm cursor-pointer"
          onClick={toggleProfilePanel}
        >
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/logo_msit.png" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <div className="flex flex-col items-start">
              <span className="font-medium">Admin Name</span>
              <span className="text-xs text-muted-foreground">
                admin@example.com
              </span>
            </div>
          )}
        </div>

        
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-800">
        <Button
          className="w-full justify-start text-sm bg-red-600 hover:bg-red-700 text-white"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          {sidebarOpen && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
