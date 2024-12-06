import React from "react";
import Menubar from "@/components/Menubar";
import { FullWidthCarousel } from "@/components/HompageComponents/FullWidthCarousel";
import { NoticeImageCalendar } from "@/components/HompageComponents/NoticeImageCalendar";
import MissionVision from "@/components/HompageComponents/MissionVision";
import InfoCards from "@/components/HompageComponents/InfoCards";
import DeptCards from "@/components/HompageComponents/DeptCards";
import ClubCards from "@/components/HompageComponents/ClubCards";
const Homepage = () => {
  return (
    <div>
      <Menubar/>
      <FullWidthCarousel />
      <NoticeImageCalendar />
      <MissionVision/>
      <InfoCards/>
      <DeptCards/>
      <ClubCards/>
    </div>
  );
};

export default Homepage;
