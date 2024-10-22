"use client";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CommonTable from "@/components/common/CommonTable";

const AllTutorialsTable = () => {
  const [tutorialsData, setTutorialsData] = useState([]);

  const { data: session, status } = useSession();

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
        Cell: ({ cell }) => {
          const slug = cell
            .getValue()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

          return (
            <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
              <Link
                href={`/tutorialemployee/${slug}`}
                className="text-blue-500 underline font-bold"
              >
                {cell.getValue()}
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  const handleGetTutorials = async (e) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "gettutorialsforemployee",
          employeeId: session.user.id,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Tutorials Get error for employee:", error);
      }
      setTutorialsData(result);
    } catch (error) {
      console.error("Tutorials Get operation error for employee", error);
    }
  };

  useEffect(() => {
    handleGetTutorials();
  }, []);

  return (
    <>
      <div>
        <CommonTable columns={columns} data={tutorialsData} minRows={10} />
      </div>
    </>
  );
};

export default AllTutorialsTable;
