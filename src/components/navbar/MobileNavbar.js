import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MobileNavbar({ navigationItems, open, toggleMenu }) {
  const pathname = usePathname();

  useEffect(() => {
    const currentItem = navigationItems.find((item) => item.href === pathname);
    if (currentItem) {
      navigationItems.forEach((item) => (item.current = false));
      currentItem.current = true;
    }
  }, [pathname]);

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div
      className={`md:hidden block fixed w-full top-20 bottom-0 py-6 duration-500 bg-white transition-all transform ${
        open ? "left-0 opacity-100" : "left-[-100%] opacity-0"
      }`}
      style={{ transitionProperty: "left, opacity" }}
    >
      {navigationItems.map((item, index) => (
        <div
          key={index}
          className="px-4 py-2 transform transition-transform duration-300 hover:scale-105"
        >
          <Link href={item.href} onClick={toggleMenu}>
            <h1
              className={`${
                item.current || isActive(item.href)
                  ? "text-blue-400"
                  : "text-black"
              } text-4xl font-semibold bg-opacity-50 bg-gray-200 rounded-md p-2 hover:bg-opacity-80`}
            >
              {item.label}
            </h1>
          </Link>
        </div>
      ))}
    </div>
  );
}
