"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AllSubTopicsTutorialTable from "../_components/AllSubTopicsTutorialTable";

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
    router.push(`/admin/tutorials/${topicslug}/addsubtopic/`);
  };
  return (
    <>
      <button
        onClick={handleAddSubTopic}
        className="btn mr-4 bg-[#dc2626] hover:bg-[#dc2626] text-white px-2 py-1 mb-2"
      >
        Add Sub Topic
      </button>
      <AllSubTopicsTutorialTable params={params} />
    </>
  );
}
