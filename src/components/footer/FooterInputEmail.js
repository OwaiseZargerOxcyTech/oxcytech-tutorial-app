export default function FooterInputEmail() {
  return (
    <div className="flex flex-wrap items-stretch ">
      <input type="text" className="m-0 -mr-0.5 block bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm w-[1px] min-w-0 flex-auto rounded-l border-0  bg-clip-padding px-3 py-3  outline-none placeholder-gray-500  focus:ring-0 " placeholder="Email address" />
      <button className="z-[2] inline-block rounded-r bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold  px-6 pb-2 pt-2.5 leading-normal  focus:z-[3] focus:bg-primary-600 focus:shadow-lg  focus:ring-0 active:bg-gray-700  " type="button">
        Sign UP
      </button>

      <div className="block w-full mt-4">
        <div className="flex items-center gap-x-3 space-y-4">
          <label htmlFor="agree" className=" text-gray-500 text-xs ">
            <input id="agree" name="agree" type="checkbox" className="h-4 w-4 mr-2 rounded border-gray-300 text-red-600 focus:ring-red-600" />
            I’m okay with getting emails and having that activity tracked to improve my experience.
          </label>
        </div>
      </div>
    </div>
  );
}
