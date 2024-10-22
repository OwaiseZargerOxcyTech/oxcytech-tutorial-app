"use client";
import SideNav from "@/components/sidebar/SideNav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AllSubTopicsEmployeeTable from "@/components/employee/AllSubTopicsEmployeeTable";

export default function SlugPage({ params }) {
  const [userId, setUserId] = useState();
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { topicslug } = params;

  const [tutorialData, setTutorialData] = useState({});

  const { data: session, status } = useSession();

  const router = useRouter();

  const handleGetTutorial = async (e) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "gettutorial",
          topicslug,
        }),
      });

      const { error, result } = await response.json();

      setTutorialData(result);

      if (error !== undefined) {
        console.log("Tutorial Get error:", error);
      }
    } catch (error) {
      console.error("Tutorial Get operation error", error);
    } finally {
      setLoadingComplete(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (topicslug) {
          await handleGetTutorial();
        }
      } catch (error) {
        console.error("Error fetching tutorial data:", error);
      }
    }
    fetchData();
  }, [topicslug]); // Add slug as dependency to rerun effect when slug changes

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    setUserId(session?.user?.id);
  }, [session, status]);

  if (status === "loading" || !loadingComplete) {
    return <div></div>;
  }

  const canAccessContent = tutorialData.author_id == session?.user?.id;

  if (!canAccessContent) {
    return <div>Access Denied</div>;
  }

  const handleAddSubTopic = () => {
    router.push(`/addsubtopic?topicslug=${topicslug}`);
  };
  return (
    <>
      <div className=" px-6 py-10 sm:px-8 sm:py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
          <div className=" col-span-3 space-y-10">
            <SideNav />
          </div>

          <div className="col-span-9">
            <button
              onClick={handleAddSubTopic}
              className="btn mr-4 bg-[#dc2626] hover:bg-[#dc2626] text-white px-2 py-1 mb-2"
            >
              Add Sub Topic
            </button>
            <AllSubTopicsEmployeeTable params={params} />
          </div>
        </div>
      </div>
    </>
  );
}
