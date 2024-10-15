import React from "react";
import Image from "next/image";
import PersonalClock from "../../../public/clock1.png";
import CompanyClock from "../../../public/clock2.png";

const pricing = [
  {
    image: PersonalClock,
    price: 5,
    type: "Personal",
    title: "Get the current deal without any risk and additional fees.",
    benefits: [
      {
        heading: "Unlimited updates & projects",
        status: "active",
      },
      {
        heading: "Custom permissions",
        heading: "active",
      },
      {
        heading: "Custom Infrastructure",
        heading: "inactive",
      },
    ],
  },
  {
    image: CompanyClock,
    price: 35,
    type: "Company",
    title: "Get the current deal without any risk and additional fees.",
    benefits: [
      {
        heading: "Unlimited updates & projects",
        status: "active",
      },
      {
        heading: "Custom permissions",
        heading: "active",
      },
      {
        heading: "Custom Infrastructure",
        heading: "inactive",
      },
    ],
  },
];

export default function PricingChild() {
  return (
    <>
      {pricing.map((p, ind) => (
        <div
          key={ind}
          className="space-y-4 w-full border-2 border-white sm:border-0 rounded-xl  p-6 sm-p-0 sm:w-[50%]"
        >
          <Image width={70} src={p.image} alt="personal-clock" />
          <h3 className="text-white font-bold">{p.type}</h3>
          <h1 className="text-white text-7xl font-bold">${p.price}</h1>
          <button className="bg-indigo-800 hover:bg-indigo-700 text-white text-sm font-semibold py-1 px-2 rounded">
            Monthly
          </button>
          <p className="text-gray-300 opacity-90  text-lg font-normal leading-6">
            {p.title}
          </p>
          <ul className="text-gray-300 opacity-90 checkList">
            {p.benefits.map((benefit, index) => (
              <li key={index}>{benefit.heading}</li>
            ))}
          </ul>
          <div className="space-x-2">
            <button className="bg-gray-950 hover:bg-gray-900 text-white text-lg font-semibold py-2 px-4 rounded">
              Get Started
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
