import PricingChild from "./PricingChild";

export default function Pricing() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl mt-12 sm:mt-0 px-4 sm:px-6 py-6 sm:py-14 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-4 sm:gap-x-4">
          {/* Left section */}
          <div className="col-span-2 bg-gray-0">
            <div className=" px-0 mb-2 sm:px-16 flex flex-col justify-center items-start space-y-6 ">
              <h3 className="text-gray-700 uppercase font-medium -mb-4">
                no hidden fees
              </h3>

              <h1 className="text-white text-5xl font-bold sm:pr-24">
                Simple pricing.
              </h1>
              <p className="text-gray-300 opacity-90  text-lg font-normal leading-6">
                Offer valid on January 5, 2022 for a limited time only.
              </p>
            </div>
          </div>

          {/* Right section */}
          <div className="col-span-3 flex flex-col sm:flex-row sm:ms-14 sm:pe-16 bg-gray-0 space-y-14 sm:space-y-0 sm:space-x-4">
            <PricingChild />
          </div>
        </div>
      </div>
    </div>
  );
}
