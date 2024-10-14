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
        <h6 className="mb-4 text-gray-900 font-bold flex items-center justify-center md:justify-start space-x-3">
          <Link href="/">Fb.</Link>
          <Link href="/">/ Ig.</Link>
          <Link href="/">/ Tw.</Link>
          <Link href="/">/ Be.</Link>
        </h6>
      </div>
    </div>
  );
}
