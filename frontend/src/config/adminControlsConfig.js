import { UserCog, Briefcase, Users, GraduationCap, Key, Bell } from "lucide-react";
import CreateAdminForm from "@/components/Dashboard/Forms/CreateAdminForm";
import ChangePassword from "@/components/Dashboard/Forms/ChangePassword";
import UserDetails from "@/components/Dashboard/UserManagement/UserDetails";
import UpdateFaceData from "@/components/Dashboard/UserManagement/UpdateFaceData";
import CreateDepartment from "@/components/Dashboard/Department/CreateDepartment";
import ViewDepartments from "@/components/Dashboard/Department/ViewDepartments";
import AddCourse from "@/components/Dashboard/Department/AddCourse";
import DeleteDepartment from "@/components/Dashboard/Department/DeleteDepartment";
import RegisterFaculty from "@/components/Dashboard/Faculty/RegisterFaculty";
import DeleteFaculty from "@/components/Dashboard/Faculty/DeleteFaculty";
import SearchFaculty from "@/components/Dashboard/Faculty/SearchFaculty";
import ViewFacultyDeptWise from "@/components/Dashboard/Faculty/ViewFacultyDeptWise";
import AssignHOD from "@/components/Dashboard/Faculty/AssignHOD";
import RevokeHOD from "@/components/Dashboard/Faculty/RevokeHOD";
import RegisterStudent from "@/components/Dashboard/Student/RegisterStudent";
import DeleteStudent from "@/components/Dashboard/Student/DeleteStudent";
import SearchStudent from "@/components/Dashboard/Student/SearchStudent";
import ViewStudentDeptWise from "@/components/Dashboard/Student/ViewStudentDeptWise";
import GenerateRegistrationKey from "@/components/Dashboard/RegistrationKeys/GenerateKey";
import ViewRegistrationKey from "@/components/Dashboard/RegistrationKeys/ViewKeys";
import AddNotice from "@/components/Dashboard/Notice/AddNotice";
import ViewNotices from "@/components/Dashboard/Notice/ViewNotices";
import UpdateFacultyDetails from "@/components/Dashboard/Faculty/UpdateFacultyDetail";
import AddImages from "@/components/Dashboard/Gallery/AddImages";
import ViewImages from "@/components/Dashboard/Gallery/ViewImages";
const AdminControlConfig = {
  sidebarControls: [
    {
      label: "Admin Controls",
      icon: UserCog,
      items: [
        { label: "Create Admin", component: CreateAdminForm },
        { label: "Change Password", component: ChangePassword },
        { label: "User Details", component: UserDetails },
        { label: "Update FaceData", component: UpdateFaceData },
      ],
    },
    {
      label: "Department Controls",
      icon: Briefcase,
      items: [
        { label: "Create Department", component: CreateDepartment },
        { label: "View Departments", component: ViewDepartments },
        { label: "Add Course", component: AddCourse },
        { label: "Delete Department", component: DeleteDepartment },
      ],
    },
    {
      label: "Faculty Controls",
      icon: Users,
      items: [
        { label: "Register Faculty", component: RegisterFaculty },
        { label: "Delete Faculty", component: DeleteFaculty },
        { label: "Search Faculty", component: SearchFaculty },
        { label: "View Faculty (Dept-wise)", component: ViewFacultyDeptWise },
        { label: "Assign HOD", component: AssignHOD },
        { label: "Revoke HOD", component: RevokeHOD },
        { label: "Update Faculty Details", component: UpdateFacultyDetails },
      ],
    },
    {
      label: "Student Controls",
      icon: GraduationCap,
      items: [
        { label: "Register Student", component: RegisterStudent },
        { label: "Delete Student", component: DeleteStudent },
        { label: "Search Student", component: SearchStudent },
        { label: "View Students (Dept-wise)", component: ViewStudentDeptWise },
      ],
    },
    {
      label: "Registration Key Controls",
      icon: Key,
      items: [
        { label: "Generate Key", component: GenerateRegistrationKey },
        { label: "View Keys", component: ViewRegistrationKey },
      ],
    },
    {
      label: "Notice Controls",
      icon: Bell,
      items: [
        { label: "Add Notice", component: AddNotice },
        { label: "View Notices", component: ViewNotices },
      ],
    },
    {
      label: "Gallery Controls",
      icon: Bell,
      items: [
        { label: "Add Images", component: AddImages },
        { label: "View Images", component: ViewImages },
      ],
    },
  ],
};

export default AdminControlConfig;

