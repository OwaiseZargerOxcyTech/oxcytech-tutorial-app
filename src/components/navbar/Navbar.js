"use client";
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [activeCategories, setActiveCategories] = useState([]);
  const [logoText, setLogoText] = useState("");

  useEffect(() => {
    const currentItem = activeCategories.find((item) => item.href === pathname);
    if (currentItem) {
      // Reset current status
      activeCategories.forEach((item) => (item.current = false));
      currentItem.current = true;
    }
  }, [pathname, activeCategories]);

  useEffect(() => {
    // Fetch all categories and filter active ones
    const fetchActiveCategories = async () => {
      try {
        const response = await fetch("/api/admin/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        const activeCats = data
          .filter((cat) => cat.isActive)
          .map((cat) => ({
            label: cat.name,
            href: `/${cat.slug}`, // Adjust the href as needed
            current: false,
          }));
        setActiveCategories(activeCats);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchActiveCategories();
  }, []);

  useEffect(() => {
    const fetchLogoText = async () => {
      try {
        const response = await fetch("/api/admin/nav-logo");
        if (!response.ok) {
          throw new Error("Failed to fetch logo text");
        }
        const data = await response.json();
        setLogoText(data.text); // Set the logo text to the fetched text
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchLogoText();
  }, []);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleSignOut = () => {
    localStorage.removeItem("session");
    window.location.href = "/";
  };

  return (
    <div className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Disclosure as="nav">
          {({ open: disclosureOpen }) => (
            <div>
              <div className="h-20 flex items-center justify-between px-2 sm:px-0">
                <div className="flex items-center flex-shrink-0 ">
                  {/* Mobile menu button */}
                  <div className="flex md:hidden">
                    <Disclosure.Button
                      className="relative inline-flex items-center justify-center rounded-full font-bold bg-gray-200 p-4 text-gray-900 hover:bg-gray-100 hover:text-gray-900 border-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={toggleMenu}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-7 w-7"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars2Icon
                          className="block h-7 w-7"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>

                  <Link
                    href="/"
                    className="text-gray-700 text-2xl font-bold ml-4 md:ml-0 cursor-pointer"
                  >
                    {logoText}
                  </Link>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="hidden md:flex items-center">
                    {/* Ensure this flex container aligns items in the center */}
                    <div className="ml-10 mt-5 flex items-center space-x-4">
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {activeCategories.map((item, index) => (
                          <li
                            key={index}
                            style={{
                              display: "inline-block",
                              marginRight: "30px",
                              verticalAlign: "middle",
                              alignItems: "center", // Ensure alignment is centered
                            }}
                          >
                            <Link href={item.href}>
                              <b>{item.label}</b>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Navbar */}
              <MobileNavbar
                navigationItems={activeCategories}
                open={open}
                toggleMenu={toggleMenu}
              />
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
