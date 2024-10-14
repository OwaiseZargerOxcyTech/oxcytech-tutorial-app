"use client";
import { useState, useEffect } from "react";
// import { blogData } from "@/components/blog1/blogData";
import UserProfile from "@/components/blog/UserProfile";
import FollowMe from "@/components/blog/FollowMe";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import Link from "next/link";
import Navbar from "../navbar/Navbar";

const TutorialPage = () => {
  const [tutorialsData, setTutorialsData] = useState([]);

  const handleGetTutorials = async (e) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "getactivetutorials",
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("active Tutorials Get error:", error);
      }
      setTutorialsData(result);
    } catch (error) {
      console.error("active Tutorials Get operation error", error);
    }
  };

  useEffect(() => {
    handleGetTutorials();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-16 lg:max-w-7xl ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
            <div className="col-span-8">
              <div className="card w-full h-full bg-base-100 rounded-md">
                <form className="card-body">
                  <h1 className="pt-4 text-center text-3xl font-semibold">
                    Latest Tutorials
                  </h1>
                  <div className="flex flex-wrap items-baseline justify-center  space-x-2 space-y-2">
                    {tutorialsData.map((tutorial) => (
                      <div
                        key={tutorial.id}
                        className="flex justify-center items-center w-1/3 lg:w-1/6 h-28 border border-gray-300 shadow-lg"
                      >
                        <Link
                          prefetch={false}
                          href={`/tutorial/${tutorial.slug}`}
                          className="text-[#dc2626] hover:underline font-bold"
                        >
                          <h6 className="text-center">{tutorial.title}</h6>
                        </Link>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            </div>

            <div className=" col-span-4 space-y-10">
              <UserProfile />
              <FollowMe />
              <FeaturedPosts />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TutorialPage;
