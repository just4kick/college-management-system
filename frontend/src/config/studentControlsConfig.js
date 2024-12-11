import { UserCog } from "lucide-react";
import ChangePassword from "@/components/Dashboard/Forms/ChangePassword";
import UserDetails from "@/components/Dashboard/UserManagement/UserDetails";
import UpdateFaceData from "@/components/Dashboard/UserManagement/UpdateFaceData";
import RegisterStudent from "@/components/Dashboard/Student/RegisterStudent";
import UpdateStudentDetail from "@/components/Dashboard/Student/UpdateStudentDetail";
const StudentControlConfig = {
  sidebarControls: [
    {
      label: "Student Personal Controls",
      icon: UserCog,
      items: [
        { label: "Self-Register", component: RegisterStudent },
        { label: "Change Password", component: ChangePassword },
        { label: "User Details", component: UserDetails },
        { label: "Update Face Data", component: UpdateFaceData },
        { label: "Update Details", component: UpdateStudentDetail },
      ],
    },
  ],
};

export default StudentControlConfig;
