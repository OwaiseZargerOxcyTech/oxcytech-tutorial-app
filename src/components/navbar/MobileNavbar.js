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
      className={`md:hidden block bg-gray-100 fixed w-full top-20 overflow-y-auto bottom-0 py-6 duration-500 ${
        open ? "left-0" : "left-[-100%]"
      }`}
    >
      {navigationItems.map((item, index) => (
        <div key={index}>
          <Link href={item.href} onClick={toggleMenu}>
            <h1
              className={`${
                item.current || isActive(item.href)
                  ? "text-indigo-600"
                  : "text-gray-700"
              } py-2 pl-7 flex justify-between items-center md:pr-0 pr-5 hover:bg-indigo-500 hover:text-white font-bold`}
            >
              {item.label}
            </h1>
          </Link>
        </div>
      ))}
    </div>
  );
}
