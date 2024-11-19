"use client";
import { useSession } from "next-auth/react";
import AllFeaturedAppTable from "../_components/AllFeaturedApp";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "admin") {
    return <div>Access Denied</div>;
  }
  return (
    <div>
      <button
        className="p-2 bg-red-500 rounded-md shadow-md mb-2 text-white"
        onClick={() => router.push("/admin/featuredapp/add")}
      >
        Add Featured App
      </button>
      <AllFeaturedAppTable />
    </div>
  );
}
