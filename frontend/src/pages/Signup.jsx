import React from "react";
import Menubar from "@/components/Menubar";
import SignupCard from "@/components/SignupComponents/SignupCard";
const SignupPage = ()=>{
return(
    <div>
    <Menubar/>
    <div className="flex items-center justify-center p-4">
    <SignupCard/>
    </div>
    </div>
);
}

export default SignupPage