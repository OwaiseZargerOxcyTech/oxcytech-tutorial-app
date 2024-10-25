import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 animate-pulse">
      {/* 70% section with horizontal cards */}
      <div className="w-full lg:w-2/3 space-y-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4"
          >
            {/* Image shimmer */}
            <div className="h-40 lg:h-32 bg-gray-300 rounded-md w-full lg:w-1/3"></div>

            {/* Content shimmer */}
            <div className="flex flex-col space-y-2 w-full lg:w-2/3">
              <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded-md w-full"></div>
              <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
            </div>
          </div>
        ))}
      </div>

      {/* 30% section with vertical cards */}
      <div className="w-full lg:w-1/3 space-y-6">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 space-y-4"
          >
            {/* Image shimmer */}
            <div className="h-64 bg-gray-300 rounded-md w-full"></div>

            {/* Content shimmer */}
            <div className="flex flex-col space-y-2">
              <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
