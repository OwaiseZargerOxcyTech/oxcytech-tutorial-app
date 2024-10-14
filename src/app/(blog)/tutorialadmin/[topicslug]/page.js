"use client";
import SideNav from "@/components/sidebar/SideNav";
import { useSession } from "next-auth/react";
import AllSubTopicsAdminTable from "@/components/admin/AllSubTopicsAdminTable";
import { useRouter } from "next/navigation";

export default function SlugPage({ params }) {
  const { topicslug } = params;

  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "admin") {
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
            <AllSubTopicsAdminTable params={params} />
          </div>
        </div>
      </div>
    </>
  );
}
