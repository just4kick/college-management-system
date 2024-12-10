import { Users, GraduationCap, Bell } from "lucide-react";

export const facultyControls = [
  {
    label: "Student Controls",
    icon: GraduationCap,
    items: ["viewDeptStudents", "registerStudent", "deleteStudent", "searchStudent", "viewAllStudent"],
  },
  {
    label: "Profile Controls",
    icon: Users,
    items: ["updateFacultyDetails", "changePassword", "userDetails", "updateFaceData"],
  },
  {
    label: "Notice Controls",
    icon: Bell,
    items: ["addNoticeByHOD", "removeNoticeByHOD", "viewAllNotice"],
  },
];
