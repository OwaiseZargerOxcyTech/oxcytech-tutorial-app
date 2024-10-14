"use client";
import React from "react";

export default function AdminNavbar() {
  return (
    <div className="w-full bg-white fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between px-2 sm:px-0">
          <h1 className="text-gray-700 hover:text-blue-500 text-2xl font-bold ml-4 md:ml-0 cursor-pointer">
            Main
          </h1>
        </div>
      </div>
    </div>
  );
}
