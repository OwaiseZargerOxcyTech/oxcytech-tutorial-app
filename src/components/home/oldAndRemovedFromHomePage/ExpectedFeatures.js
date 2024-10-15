import {
  DocumentCheckIcon,
  FingerPrintIcon,
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftEllipsisIcon,
  ArrowTrendingUpIcon,
  CircleStackIcon,
} from "@heroicons/react/20/solid";

export default function ExpectedFeatures() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl mt-12 sm:mt-2 px-4 py-0 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div className="bg-white  rounded-xl py-6 sm:py-20 grid grid-cols-1 lg:grid-cols-5 gap-y-6 sm:gap-x-4">
          {/* Left section */}
          <div className="col-span-2 bg-gray-0">
            <div className=" px-6 sm:px-16 flex flex-col justify-center items-start space-y-6 ">
              <h3 className="text-gray-500 uppercase font-medium">
                functional
              </h3>

              <h1 className="text-gray-700 text-5xl font-bold pr-24">
                Expected features.
              </h1>
              <p className="text-gray-900 opacity-90  text-lg font-normal leading-6">
                Reduction in operating costs for the whole product team which
                creates amazing UI/UX.
              </p>
            </div>
          </div>

          {/* Right section */}
          <div className="col-span-3 ms-0 sm:ms-14 px-16  bg-gray-0  sm:border-l-2 sm:border-gray-200">
            <div className="flex flex-wrap justify-between sm:gap-x-24 gap-y-6 sm:gap-y-16">
              <div>
                <DocumentCheckIcon className="w-12 h-12 m-2 text-gray-600 bg-gray-200 p-2 rounded-full" />
                <p className="text-gray-900 font-bold w-20 ">
                  Location Confirmation
                </p>
              </div>
              <div>
                <FingerPrintIcon className="w-12 h-12 m-2 text-gray-600 bg-gray-200 p-2 rounded-full" />
                <p className="text-gray-900 font-bold w-28">
                  Passcode and Touch ID
                </p>
              </div>
              <div>
                <ChatBubbleBottomCenterTextIcon className="w-12 h-12 m-2 text-gray-600 bg-gray-200 p-2 rounded-full" />
                <p className="text-gray-900 font-bold w-28">Instant Alerts</p>
              </div>
              <div>
                <ChatBubbleLeftEllipsisIcon className="w-12 h-12 m-2 text-gray-600 bg-gray-200 p-2 rounded-full" />
                <p className="text-gray-900 font-bold w-28">Messages Editing</p>
              </div>
              <div>
                <ArrowTrendingUpIcon className="w-12 h-12 m-2  text-gray-600 bg-gray-200 p-2 rounded-full" />
                <p className="text-gray-900 font-bold w-28">Data Tracking</p>
              </div>
              <div>
                <CircleStackIcon className="w-12 h-12 m-2 text-gray-600 bg-gray-200 p-2 rounded-full" />
                <p className="text-gray-900 font-bold w-28">
                  Additional Storage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
