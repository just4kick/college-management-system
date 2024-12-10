import { GraduationCap, User } from "lucide-react";

export const studentControls = [
  {
    label: "Registration & Profile",
    icon: User,
    items: [
      "selfRegisterStudent",  // Endpoint for self-registration
      "updatePersonalDetails",  // Endpoint for updating personal details
      "updateFaceData",  // Endpoint for updating face data
    ],
  },
  {
    label: "Login & Security",
    icon: GraduationCap,
    items: [
      "loginRequestOtp",  // Endpoint for OTP request
      "loginVerifyOtp",  // Endpoint for OTP verification
      "faceRecognitionLogin",  // Endpoint for face recognition login
      "changeCurrentPassword",  // Endpoint to change the password
      "logout",  // Endpoint to logout
      "requestForgotPassword",  // Endpoint to request forgot password
      "resetPassword",  // Endpoint to reset password
    ],
  },
  {
    label: "Student Information",
    icon: GraduationCap,
    items: [
      "userDetails",  // Endpoint to fetch user details
    ],
  },
];
