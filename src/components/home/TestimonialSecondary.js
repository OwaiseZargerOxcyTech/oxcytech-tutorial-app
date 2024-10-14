import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function TestimonialSecondary() {
  return (
    <div className="mx-auto max-w-2xl mt-0 sm:mt-0 px-6 py-10 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
      <div className=" grid grid-cols-1 lg:grid-cols-5 sm:gap-x-4 space-y-4">
        <div className="col-span-2 pr-24 sm:pr-48 space-y-4">
          <h3 className="text-gray-500 uppercase font-medium">testimonials</h3>
          <h1 className="text-white text-3xl sm:text-4xl pb-4  font-bold">
            Some friends we’ve made in the process.
          </h1>
          <button className=" bg-blue-600 group  flex  items-center transition duration-500 hover:bg-gray-800 text-white text-sm font-semibold py-2 px-4 rounded">
            More Reviews
            <ArrowRightIcon className="w-6 h-4 group-hover:translate-x-2 transition duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
