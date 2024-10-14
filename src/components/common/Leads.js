export default function Leads({ data }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10 sm:px-12 sm:py-16 lg:max-w-7xl ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 sm:gap-x-4">
        <div className="flex flex-col sm:flex-row  justify-start items-center space-y-10 sm:space-y-0 sm:space-x-16 py-6 sm:py-10">
          {data.map((item, index) => (
            <div key={index} className="bg-gray-0 space-y-2">
              <div className="flex justify-start items-center space-x-2">
                <i className={`bi ${item.icon} text-2xl text-red-600`}></i>
                <span className="text-gray-700 text-4xl font-bold ">
                  {item.count}+
                </span>
              </div>

              <p className="text-gray-900 opacity-90  text-lg font-semibold">
                {item.title}
              </p>

              <p className="text-gray-700 opacity-90  text-base font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
