import Link from "next/link";
import React from "react";

export default function Copyright() {
  return (
    <div>
      <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center ">
          © 2024 All rights reserved.
          <Link
            href="/"
            className="hover:text-red-600 mx-1 font-bold text-gray-900 hover:underline "
          >
            | Privacy & Cookie Policy
          </Link>
          <Link
            href="/"
            className="hover:text-red-600 font-bold text-gray-900 hover:underline "
          >
            | Terms of Service
          </Link>
        </span>
      </div>
    </div>
  );
}
