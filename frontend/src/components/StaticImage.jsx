"use client";

import React from "react";

const StaticImage = () => {
  return (
    <div
      className="relative w-full h-80"
      style={{
        backgroundImage: "url('/b.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.7,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div> 
    </div>
  );
};

export default StaticImage;
