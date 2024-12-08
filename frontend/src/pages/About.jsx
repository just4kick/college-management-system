import React from "react";
import Menubar from "@/components/Menubar";
import Overview from "@/components/AboutPageComponents/Overview";
import StaticImage from "@/components/StaticImage";
import MissionVission2 from "@/components/AboutPageComponents/MissionVission";
import Bog from "@/components/AboutPageComponents/Bog";
import ManageDirector from "@/components/AboutPageComponents/ManageDirector";
import Director from "@/components/AboutPageComponents/Director";
const AboutPage = ()=>{
return(
    <div>
    <Menubar/>
    <StaticImage/>
    <Overview/>
    <MissionVission2/>
    <Director/>
    <ManageDirector/>
    <Bog/>
    </div>
);
}

export default AboutPage