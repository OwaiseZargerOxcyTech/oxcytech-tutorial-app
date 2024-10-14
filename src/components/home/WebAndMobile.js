"use client";
import React, { useState } from "react";
import Accordion from "../common/Accordion";

const accordionData = [
  {
    id: 1,
    title: "Website & Mobile App Design",
    description:
      "Using year-over-year design approaches and latest techs, we will ensure that your new website will be visible, accessible, and treads lightly.",
  },
  {
    id: 2,
    title: "Motion Graphics & Animation",
    description:
      "Cepteur sint occaecat cupidatat proident, taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole.",
  },
  {
    id: 3,
    title: "User Experience",
    description:
      "Cepteur sint occaecat cupidatat proident, taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole.",
  },
];

export default function WebAndMobile() {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl mt-0 sm:mt-0 px-4 py-0 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div className="px-2 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-2 gap-y-6 sm:gap-x-4">
          {/* Left section */}
          <div className=" bg-gray-0">
            <div className="flex flex-col justify-start items-start space-y-4 sm:pr-4 ">
              <h3 className="text-gray-600 uppercase font-medium">
                capabilities
              </h3>
              <h1 className="text-gray-800 text-4xl sm:text-5xl font-bold font-serif">
                Putting our focus on changing the way of mobile UX.
              </h1>
            </div>
          </div>

          {/* Right section */}
          <div className="flex justify-center items-baseline ">
            <div className="w-full sm:w-[60%]">
              {accordionData.map((item) => {
                return (
                  <Accordion
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    activeId={activeId}
                    setActiveId={setActiveId}
                  ></Accordion>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
