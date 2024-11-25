"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FeaturedApp() {
  const [featuredApp, setFeaturedApp] = useState(null);

  useEffect(() => {
    async function fetchFeaturedApp() {
      try {
        const response = await fetch("/api/admin/featuredapp");
        const { result } = await response.json();
        setFeaturedApp(result);
      } catch (error) {
        console.error("Error fetching featured app data:", error);
      }
    }
    fetchFeaturedApp();
  }, []);

  // Generate link dynamically based on title
  const link =
    featuredApp?.title
      ?.toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "";

  return (
    <div className="space-y-4 p-4 bg-white rounded-sm shadow-md">
      <h1 className="text-gray-900 font-bold text-xl p-2 border-b-2 border-red-500">
        Featured App
      </h1>
      <div className="space-y-1">
        {featuredApp ? (
          <div className="relative flex items-start space-x-4 rounded-md border pt-2">
            <div className="relative m-2 w-16 h-16 flex-shrink-0">
              <Link prefetch={false} href={`/ft/${link}`}>
                {featuredApp.image && (
                  <Image
                    src={featuredApp.image}
                    alt={featuredApp.title}
                    width={100}
                    height={100}
                    className="object-contain rounded-md"
                  />
                )}
              </Link>
            </div>
            <div className="flex-1">
              <Link prefetch={false} href={`/ft/${link}`}>
                <h3 className="text-gray-800 text-lg font-semibold hover:text-red-600 hover:underline">
                  {featuredApp.title}
                </h3>
              </Link>
              <p className="text-xs">{featuredApp.description}</p>
            </div>
          </div>
        ) : (
          <p>Loading featured app...</p>
        )}
      </div>
    </div>
  );
}
