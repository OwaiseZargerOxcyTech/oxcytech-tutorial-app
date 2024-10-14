"use client";
import { useState } from "react";
import Image from "next/image";
import PlayVideoImage from "../../../public/playVideo.webp";
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

export default function PlayVideo() {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="bg-[#161519]">
      <div className="bg-gray-200 grid grid-cols-1 lg:grid-cols-5">
        <div className="bg-[#161519] col-span-3 py-16 -mt-2 sm:mt-0">
          <Image src={PlayVideoImage} alt="about2" />
        </div>
        <div className="bg-white col-span-2 flex justify-center items-center px-4 sm:px-0 py-10 sm:py-0">
          <div className="w-full sm:w-[80%] space-y-8">
            <div className="flex items-center justify-start space-x-2">
              <button className="w-[70px] h-[70px] -ms-2 sm:ms-0 bg-gray-900 hover:bg-blue-700 shadow-md hover:shadow-lg rounded-full flex justify-center items-center scale-75 sm:scale-100 ">
                <i className="bi bi-play-fill text-4xl text-white"></i>
              </button>
              <h3 className="text-gray-700 font-bold">Play Video</h3>
            </div>

            <h1 className="text-gray-800 text-4xl font-bold">
              We work in the fields of <br />
              UI/UX design and art <br />
              direction.
            </h1>

            <div>
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
