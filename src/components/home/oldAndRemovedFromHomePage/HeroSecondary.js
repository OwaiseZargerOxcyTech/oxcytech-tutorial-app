import Image from "next/image";
import TeamImage from "../../../public/Team.webp";

export default function HeroSecondary() {
  return (
    <div className="mx-auto max-w-2xl  lg:max-w-7xl lg:px-8">
      <div className=" grid grid-cols-1 lg:grid-cols-5">
        {/* Left section */}
        <div className=" lg:col-span-3 lg:min-h-screen">
          <Image
            src={TeamImage}
            alt="team-image"
            className="object-cover object-center h-screen lg:h-full"
          />
        </div>

        {/* Right section */}
        <div className=" lg:col-span-2">
          <div className="relative flex items-center justify-center  h-full">
            <div className="absolute  sm:z-10   sm:-start-60 w-[750px] h-full  rounded-full bg-[#D90A2C] opacity-50"></div>
            <div className="absolute start-10 end-10 bottom-24   md:start-20 md:end-0 md:bottom-24 lg:-start-20 lg:end-0 lg:bottom-24  z-20  space-y-6 sm:space-y-6 ">
              <div className="flex items-center justify-start space-x-2">
                <button className="w-[70px] h-[70px] -ms-2 sm:ms-0 bg-gray-900 hover:bg-blue-700 shadow-md hover:shadow-lg rounded-full flex justify-center items-center scale-75 sm:scale-100 ">
                  <i className="bi bi-play-fill text-4xl text-white"></i>
                </button>
              </div>

              <h1 className="text-white text-3xl sm:text-7xl font-bold font-serif  ">
                Retiro de liderazgo para mujeres en diseño.
              </h1>
              <p className="text-white opacity-90  text-lg font-bold leading-7">
                With unique business ideas and the
                <br />
                passionate people behind.
              </p>
              <button className="bg-gray-800 hover:bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
