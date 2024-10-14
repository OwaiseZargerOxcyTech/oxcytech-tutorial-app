"use client";
import AllBlogAdminTable from "@/components/admin/AllBlogAdminTable";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "admin") {
    return <div>Access Denied</div>;
  }
  return (
    <div>
      <AllBlogAdminTable />
    </div>
  );
}
