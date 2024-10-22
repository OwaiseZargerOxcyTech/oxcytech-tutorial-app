"use client";
import { useSession } from "next-auth/react";
import AllTutorialsTable from "../_components/AllTutorialsTable";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "employee") {
    return <div>Access Denied</div>;
  }
  return (
    <div>
      <AllTutorialsTable />
    </div>
  );
}
