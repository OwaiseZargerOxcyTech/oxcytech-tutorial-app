"use client";
import { useSession } from "next-auth/react";
import AllBlogsTable from "../_components/AllBlogsTable";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div></div>;
  }
  console.log(session);

  if (!session || session.user.name !== "employee") {
    return <div>Access Denied</div>;
  }
  //merge conflict
  return (
    <div>
      <button
        className="p-2 bg-red-500 rounded-md shadow-md mb-2 text-white"
        onClick={() => router.push("/admin/blogs/add")}
      >
        Add Blogs
      </button>
      <AllBlogsTable />
    </div>
  );
}
