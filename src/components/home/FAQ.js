"use client";
import { useState } from "react";
import FaqAccordion from "./FaqAccordion";

const accordionData = [
  {
    id: 1,
    title: "How does the 14-day trial work?",
    description:
      "When our team provides design and digital marketing. Applied arts can include industrial design, graphic design, fashion design. The app provides design and digital marketing.",
  },
  {
    id: 2,
    title: "How do I pay for your service?",
    description:
      "When our team provides design and digital marketing. Applied arts can include industrial design, graphic design, fashion design. The app provides design and digital marketing.",
  },
  {
    id: 3,
    title: "How can I cancel my subscription?",
    description:
      "When our team provides design and digital marketing. Applied arts can include industrial design, graphic design, fashion design. The app provides design and digital marketing.",
  },
  {
    id: 4,
    title: "Can I recover an expired account?",
    description:
      "When our team provides design and digital marketing. Applied arts can include industrial design, graphic design, fashion design. The app provides design and digital marketing.",
  },
];

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl mt-0 sm:mt-0 px-4 py-0 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div className="px-2 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-5 gap-y-6 sm:gap-x-4">
          {/* Left section */}
          <div className="col-span-2 bg-gray-0">
            <div className=" px-0 mb-2 sm:px-16 flex flex-col justify-center items-start space-y-6 ">
              <h3 className="text-gray-700 uppercase font-medium -mb-4">
                {" "}
                get help (help center)
              </h3>
              <h1 className="text-white text-4xl font-bold sm:pr-24">
                Frequently asked questions.
              </h1>
            </div>
          </div>

          {/* Right section */}
          <div className="col-span-3 sm:ms-14">
            {accordionData.map((item) => {
              return (
                <FaqAccordion
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  activeId={activeId}
                  setActiveId={setActiveId}
                ></FaqAccordion>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
