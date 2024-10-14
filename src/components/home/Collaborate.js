import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function Collaborate() {
    return (
        <div className="bg-[#161519]">
            <div className=" mx-auto max-w-2xl  px-6 py-10 sm:px-12 sm:py-16 lg:max-w-7xl ">
                <div className="grid grid-cols-1 lg:grid-cols-2 mb-8 sm:gap-x-4">
                    <div className='space-y-2'>
                        <h3 className="text-gray-500 uppercase font-medium">let&apos;s collaborate</h3>
                        <h1 className="text-white text-3xl sm:text-5xl font-bold">
                            Send us an email,<br />
                            to discuss a new project.
                        </h1>
                    </div>
                    <div className='flex  justify-start sm:justify-end items-start'>
                        <button className="bg-blue-600  group  flex  items-center transition duration-500 hover:bg-gray-900 text-white text-base font-semibold py-2 px-3 mt-6 rounded">
                            Contact Us
                            <ArrowRightIcon className="w-8 h-6 group-hover:translate-x-2 transition duration-300" />
                        </button>
                    </div>
                </div>
                <hr />
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 sm:gap-x-4">
                    <p className="text-base font-normal sm:font-semibold text-white">
                        We&apos;re <b>a team of creatives</b> who are excited about unique ideas and help fin-tech companies to <b>create amazing identity</b> by crafting top-notch UI/UX.
                    </p>
                </div>
            </div>
        </div>
    )
}
