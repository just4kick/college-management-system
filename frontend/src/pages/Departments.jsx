import React from "react";
import Menubar from "@/components/Menubar";
import ComputerScience from "@/components/DepartmentPageComponents/ComputerScience";
import Btech from "@/components/DepartmentPageComponents/Btech";
import BuisnessAdmin from "@/components/DepartmentPageComponents/BusinessAdmin";
const DepartmentPage = ()=>{
return(
    <div>
    <Menubar/>
    <ComputerScience/>
    <Btech/>
    <BuisnessAdmin/>
    </div>
);
}

export default DepartmentPage