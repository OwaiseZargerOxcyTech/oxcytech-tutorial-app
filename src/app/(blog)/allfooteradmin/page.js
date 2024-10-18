"use client";
import { useSession } from "next-auth/react";
import AllFooterAdminTable from "@/components/admin/AllFooterAdminTable";

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
      <AllFooterAdminTable />
    </div>
  );
}