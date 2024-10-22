"use client";
import { useSession } from "next-auth/react";
import AllAuthorsTable from "../_components/AllAuthorsTable";

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
      <AllAuthorsTable />
    </div>
  );
}
