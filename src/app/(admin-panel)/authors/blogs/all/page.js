"use client";
import { useSession } from "next-auth/react";
import AllBlogsTable from "../_components/AllBlogsTable";

export default function Page() {
  const { data: session, status } = useSession();

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
      <AllBlogsTable />
    </div>
  );
}
