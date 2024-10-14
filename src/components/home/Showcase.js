import Image from "next/image";
import oh2 from "../../../public/oh2.jpg";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function Showcase() {
  return (
    <div className="relative flex justify-center items-center">
      <Image
        src={oh2}
        alt="team-image"
        className="object-cover object-left h-full"
      />
      <div className="py-20 ps-10 sm:ps-40  absolute z-20  flex flex-col justify-start items-start space-y-4 sm:pr-48 ">
        <h3 className="text-gray-300 uppercase font-medium">showcase</h3>
        <h1 className="text-white text-4xl sm:text-5xl font-bold font-serif">
          Our most recent digital and strategy projects.
        </h1>
        <button className="bg-gray-900 flex  items-center transition duration-500 hover:bg-blue-600 text-white text-lg font-semibold py-2 px-3 mt-6 rounded">
          View Projects
          <ArrowRightIcon className="w-8 h-6 group-hover:translate-x-2 transition duration-300" />
        </button>
      </div>
    </div>
  );
}
