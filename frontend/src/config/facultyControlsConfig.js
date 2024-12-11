import {
  UserCog,
  Briefcase,
  Users,
  GraduationCap,
  Key,
  Bell,
} from "lucide-react";
import ChangePassword from "@/components/Dashboard/Forms/ChangePassword";
import UserDetails from "@/components/Dashboard/UserManagement/UserDetails";
import UpdateFaceData from "@/components/Dashboard/UserManagement/UpdateFaceData";
import RegisterStudent from "@/components/Dashboard/Student/RegisterStudent";
import DeleteStudent from "@/components/Dashboard/Student/DeleteStudent";
import SearchStudent from "@/components/Dashboard/Student/SearchStudent";
import ViewStudentDeptWise from "@/components/Dashboard/Student/ViewStudentDeptWise";
import AddNotice from "@/components/Dashboard/Notice/AddNotice";
import ViewNotices from "@/components/Dashboard/Notice/ViewNotices";
import RegisterFaculty from "@/components/Dashboard/Faculty/RegisterFaculty";
import DeleteFaculty from "@/components/Dashboard/Faculty/DeleteFaculty";
import SearchFaculty from "@/components/Dashboard/Faculty/SearchFaculty";
import ViewFacultyDeptWise from "@/components/Dashboard/Faculty/ViewFacultyDeptWise";
import UpdateFacultyDetails from "@/components/Dashboard/Faculty/UpdateFacultyDetail";
const FacultyControlConfig = {
  sidebarControls: [
    {
      label: "Faculty Personal Controls",
      icon: UserCog,
      items: [
        { label: "Change Password", component: ChangePassword },
        { label: "User Details", component: UserDetails },
        { label: "Update Face Data", component: UpdateFaceData },
        { label: "Update Faculty Details", component: UpdateFacultyDetails }
      ],
    },
    {
      label: "Student Management",
      icon: GraduationCap,
      items: [
        { label: "Register Student", component: RegisterStudent },
        { label: "Delete Student", component: DeleteStudent },
        { label: "Search Student", component: SearchStudent },
        { label: "View Students (Dept-wise)", component: ViewStudentDeptWise },
      ],
    },
    {
      label: "Notice Management",
      icon: Bell,
      items: [
        { label: "Add Notice", component: AddNotice },
        { label: "View Notices", component: ViewNotices },
      ],
    },
    {
      label: "HOD Specific Controls",
      icon: Users,
      items: [
        { label: "Register Faculty", component: RegisterFaculty },
        { label: "Delete Faculty", component: DeleteFaculty },
        { label: "Search Faculty", component: SearchFaculty },
        { label: "View Faculty (Dept-wise)", component: ViewFacultyDeptWise },
      ],
    },
  ],
};

export default FacultyControlConfig;
