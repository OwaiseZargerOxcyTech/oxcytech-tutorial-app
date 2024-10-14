import appStore from "../../../public/appstore.webp";
import iphoneMockup from "../../../public/iPhoneMockup.png";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="mx-auto max-w-2xl  px-4 py-24 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left section */}
        <div className="space-y-6 sm:space-y-10 px-2 sm:px-8 py-4">
          <div className="flex items-center justify-start space-x-2">
            <button className="w-[70px] h-[70px] -ms-2 sm:ms-0 bg-gray-900 hover:bg-blue-700 shadow-md hover:shadow-lg rounded-full flex justify-center items-center scale-75 sm:scale-100 ">
              <i className="bi bi-play-fill text-4xl text-white"></i>
            </button>
            <h3 className="text-purple-900 font-medium">Play Promo</h3>
          </div>

          <h1 className="text-purple-950 text-6xl font-bold">
            Get more, <br />
            make less
          </h1>
          <p className="text-purple-900 opacity-90  text-lg font-normal leading-7">
            A mobile data tracking experience for your online business budegt.
          </p>
          <div className="space-y-2">
            <p className="text-purple-900 opacity-90  text-lg font-normal leading-6">
              Available now
            </p>
            <Image
              src={appStore}
              alt="app store"
              className="w-48 h-auto hover:shadow-xl cursor-pointer"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="hidden sm:block col-span-2">
          <div className=" bg-gray-0 relative  flex justify-center ">
            <div className="bg-red-100 absolute z-10 w-full sm:w-[70%]  min-h-full">
              &nbsp;
            </div>
            <Image
              src={iphoneMockup}
              className="bsolute z-30 w-[90%] hover:translate-x-8 ease-in-out transition duration-700"
              alt="iphoneMockup"
            />
            <div
              className="dotted-border absolute z-20 top-20 end-5 "
              style={{
                height: "200px",
                width: "200px",
              }}
            >
              <div
                className="dotted-border"
                style={{
                  height: "150px",
                  width: "150px",
                }}
              >
                <div
                  className="dotted-border"
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                >
                  <div
                    className="dotted-border"
                    style={{
                      height: "50px",
                      width: "50px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
