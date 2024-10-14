import oh5 from "../../../public/oh5.jpg";
import Image from "next/image";

export default function Testimonial() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-x-4">
        {/* Left section */}
        <div className=" order-last sm:order-first py-10 ps-6 sm:ps-40  flex flex-col justify-center items-start space-y-4  ">
          <h3 className="text-gray-500 uppercase font-medium">testimonials</h3>
          <h1 className="text-gray-800 text-4xl sm:text-5xl font-bold font-serif">
            We help to achieve
            <br />
            mutual goals.
          </h1>
        </div>

        {/* Right section */}
        <div className="">
          <Image
            src={oh5}
            alt="oh5"
            className="object-cover object-left h-full"
          />
        </div>
      </div>
    </div>
  );
}
