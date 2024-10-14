import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function Career() {
    return (
        <div className="bg-[#111013] w-full">
            <div className=" mx-auto max-w-2xl  px-4 py-10 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                <div className=" grid grid-cols-1 lg:grid-cols-2 mb-6 sm:gap-x-4">
                    <div className='pr-24 sm:pr-16 space-y-2'>
                        <h3 className="text-gray-500 uppercase font-medium">careers</h3>
                        <h1 className="text-white text-3xl sm:text-5xl font-bold">
                            Join our team to create
                            the best digital
                            solutions.
                        </h1>
                    </div>
                    <div className='flex  justify-start sm:justify-end items-start'>
                        <button className="bg-blue-700 group  flex  items-center transition duration-500 hover:bg-gray-800 text-white text-lg font-semibold py-2 px-3 mt-6 rounded">
                            See Open Positions
                            <ArrowRightIcon className="w-8 h-6 group-hover:translate-x-2 transition duration-300" />
                        </button>
                    </div>
                </div>
                <hr />
                <div className="mt-6  grid grid-cols-1 lg:grid-cols-2 sm:gap-x-4">
                    <p className="text-base font-normal sm:font-semibold text-white">
                        We’re a team of creatives who are excited about unique ideas and help fin-tech companies to create amazing identity by crafting top-notch UI/UX.
                    </p>
                </div>
            </div>
        </div>
    )
}
