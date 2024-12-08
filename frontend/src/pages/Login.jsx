import React from "react";
import Menubar from "@/components/Menubar";
import { LoginCard } from "@/components/LoginPageComponents/LoginCard";
const LoginPage = ()=>{
return(
    <div>
    <Menubar/>
    <div className="flex items-center justify-center p-4">
    <LoginCard/>
    </div>
    
    </div>
);
}

export default LoginPage