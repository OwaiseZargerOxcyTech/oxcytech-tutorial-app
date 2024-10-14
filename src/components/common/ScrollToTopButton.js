"use client";
import React, { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    //show/hide the button based on scroll position
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    // Add event listener to track scrolling
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds a smooth scrolling effect
    });
  };

  return (
    <button
      className={`${
        isVisible ? "block" : "hidden"
      } shadow-lg fixed z-50 bottom-32 -right-10 sm:bottom-40 sm:-right-4  bg-gray-100 hover:bg-gray-200 text-gray-900 hover:text-blue-600 font-semibold py-1 px-4 rounded-xl -rotate-90`}
      onClick={scrollToTop}
      title="Scroll to Top"
    >
      <div> ------ Scroll to top</div>
    </button>
  );
}
