export default function Leads() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl mt-12 sm:mt-2 px-4 py-0 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div className="px-2 py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-5 gap-y-6 sm:gap-x-4">
          {/* Left section */}
          <div className="col-span-2 bg-gray-0">
            <div className=" px-6 sm:px-16 flex justify-center items-center space-x-16">
              <div className="bg-gray-0 space-y-2">
                <div className="flex justify-start items-center space-x-2">
                  <span className="text-gray-700 text-4xl font-bold ">35+</span>
                  <i className="bi bi-box-fill text-2xl text-gray-700"></i>
                </div>

                <p className="text-gray-900 opacity-90  text-lg font-semibold">
                  Requests per second
                </p>
              </div>
              <div className="bg-gray-0 space-y-2">
                <div className="flex justify-start items-center space-x-2">
                  <span className="text-gray-700 text-4xl font-bold ">75+</span>
                  <i className="bi bi-pentagon-half text-2xl text-gray-700"></i>
                </div>

                <p className="text-gray-900 opacity-90  text-lg font-semibold">
                  New leads per month
                </p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="col-span-3 sm:ms-14 sm:pe-16 bg-gray-0">
            <p className="text-gray-900 opacity-90  text-lg font-normal leading-7 text-justify">
              When our team provides design and digital marketing. Applied arts
              can include{" "}
              <span className="text-gray-800 font-semibold">
                industrial design, graphic design, fashion design
              </span>
              . The app provides design and digital marketing, applied arts can
              include industrial design, graphic design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
