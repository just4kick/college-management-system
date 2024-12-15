import React from "react";
import Menubar from "@/components/Menubar";
import { LoginCard } from "@/components/LoginPageComponents/LoginCard";
const LoginPage = ({setUser})=>{
return(
    <div>
    <Menubar/>
    <div className="flex items-center justify-center p-4">
    <LoginCard setUser={setUser}/>
    </div>
    </div>
);
}

export default LoginPage