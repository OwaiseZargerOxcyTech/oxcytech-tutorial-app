import Image from "next/image";
import W from "../../../public/W.png";
import Webby from "../../../public/Webby.png";
import FWA from "../../../public/FWA.png";

export default function Awards() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10 sm:px-12 sm:py-16 lg:max-w-7xl ">
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-y-10 sm:gap-x-4">
        <div>
          <h3 className="text-gray-500 uppercase font-medium pb-2">
            awards & honors
          </h3>
          <h1 className="text-gray-800 text-3xl sm:text-4xl font-bold">
            The awards won
            <br />
            by our project.
          </h1>
        </div>

        <div>
          <p className="text-gray-600  text-base font-normal leading-6 pe-24">
            When our team provides design and digital marketing. Applied arts
            can include{" "}
            <b>industrial design, graphic design, fashion design,</b> and the
            decorative arts which traditionally includes craft objects.
          </p>
        </div>

        <div className=" flex flex-wrap gap-6 sm:gap-8">
          <div className=" pe-4 space-y-2">
            <Image
              src={W}
              alt="SelectionAll"
              className="w-[150px] h-[50px] hover:scale-110 transition duration-300"
            />
            <p className="text-gray-500 text-base ">3x Website of the Day</p>
          </div>

          <div className=" pe-4 space-y-2">
            <Image
              src={W}
              alt="SelectionAll"
              className="w-[150px] h-[50px] hover:scale-110 transition duration-300"
            />
            <p className="text-gray-500 text-base ">5x Mobile of the Day</p>
          </div>

          <div className=" pe-4 space-y-2">
            <Image
              src={FWA}
              alt="SelectionAll"
              className="w-[150px] h-[50px] hover:scale-110 transition duration-300"
            />
            <p className="text-gray-500 text-base">2x Best Website</p>
          </div>

          <div className=" pe-4 space-y-2">
            <Image
              src={Webby}
              alt="SelectionAll"
              className="w-[150px] h-[50px] hover:scale-110 transition duration-300"
            />
            <p className="text-gray-500 text-base">2x Best Homepage</p>
          </div>
        </div>
      </div>
    </div>
  );
}
