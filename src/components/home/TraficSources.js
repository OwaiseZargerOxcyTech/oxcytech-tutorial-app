import Image from "next/image";

export default function TraficSources({ textContent, image }) {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl mt-12 sm:mt-2 px-4 py-0 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div className="bg-gray-0 sm:py-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left section */}
          <div className="bg-gray-0 px-0 sm:px-16 py-4">
            <Image src={image} className="" alt="iphoneMockup" />
          </div>

          {/* Right section */}
          <div className="bg-gray-0  px-2 sm:px-16 flex flex-col justify-center items-start space-y-3 sm:space-y-6 ">
            <h3 className="text-gray-500 uppercase font-medium">
              trafic sources
            </h3>

            <h1 className="text-gray-700 text-3xl sm:text-5xl font-bold pr-0 sm:pr-24">
              {textContent.mainHeading}
            </h1>
            <p className="text-gray-900 opacity-90  text-lg font-normal leading-6">
              <span className="text-gray-800 font-bold">
                {" "}
                {textContent.boldParaText}{" "}
              </span>
              {textContent.remainingParaText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
