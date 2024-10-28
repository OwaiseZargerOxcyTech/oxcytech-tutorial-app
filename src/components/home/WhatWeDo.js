import React from "react";
import SelectionAll from "../../../public/SelectionAll.png";
import ChatDots from "../../../public/ChatDots.png";
import CirclesThreePlus from "../../../public/CirclesThreePlus.png";
import FigmaLogo from "../../../public/FigmaLogo.png";
import Image from "next/image";

export default function WhatWeDo() {
  return (
    <div className="mx-auto max-w-2xl  px-6 py-0 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
      <div className="py-10 sm:py-10 grid grid-cols-1 lg:grid-cols-2 gap-y-6 sm:gap-x-4">
        {/* Left section */}
        <div className="flex flex-col justify-start items-start space-y-4 sm:pr-36 ">
          <h3 className="text-gray-500 uppercase font-medium">what we do</h3>
          <h1 className="text-white text-4xl sm:text-5xl font-bold font-serif">
            Does more then ever platform to achieve goal stages.
          </h1>
        </div>

        {/* Right section */}
        <div className=" space-y-10 ">
          <p className="text-white  text-lg font-normal leading-6">
            Our clients describe us as a product team which creates amazing
            UI/UX experiences, by crafting top-notch user experience.
          </p>
          <div className="flex flex-wrap justify-between  gap-y-10 ">
            <div className="sm:w-1/2 pe-4 space-y-2">
              <Image
                src={SelectionAll}
                alt="SelectionAll"
                className="w-8 h-8"
              />
              <p className="text-white text-lg font-bold  ">Data Tracking</p>
              <p className="text-gray-400 opacity-90   text-base font-normal leading-6">
                We help digital companies to volume their self-interest.
              </p>
            </div>
            <div className="sm:w-1/2 pe-4 space-y-2">
              <Image src={ChatDots} alt="SelectionAll" className="w-8 h-8" />
              <p className="text-white text-lg font-bold ">Press Releases</p>
              <p className="text-gray-400 opacity-90   text-base font-normal leading-6">
                Strategy is a forward-looking plan for your brand&apos;s
                behavior.
              </p>
            </div>
            <div className="sm:w-1/2 pe-4 space-y-2">
              <Image
                src={CirclesThreePlus}
                alt="SelectionAll"
                className="w-8 h-8"
              />
              <p className="text-white text-lg font-bold ">Financial Audit</p>
              <p className="text-gray-400 opacity-90 text-base font-normal leading-6">
                Audits help your company to have the unique plan for your brand.
              </p>
            </div>
            <div className="sm:w-1/2 pe-4 space-y-2">
              <Image src={FigmaLogo} alt="SelectionAll" className="w-6 h-8" />
              <p className="text-white text-lg font-bold ">
                Website/App Design
              </p>
              <p className="text-gray-400 opacity-90 text-base font-normal leading-6">
                UI/UX design gives the appearance above your brand&apos;s
                behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
