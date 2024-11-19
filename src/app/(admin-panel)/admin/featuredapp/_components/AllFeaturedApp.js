"use client";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CommonTable from "@/components/common/CommonTable";

const AllFeaturedAppTable = () => {
  const [featuredAppData, setFeaturedAppData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const columns = useMemo(
    () => [
      //   {
      //     accessorKey: "isActive",
      //     header: "Active",
      //     size: 100,
      //     Cell: ({ row }) => (
      //       <input
      //         type="checkbox"
      //         checked={row.original.isActive}
      //         onChange={() =>
      //           handleToggleActive(row.original.id, row.original.isActive)
      //         }
      //       />
      //     ),
      //   },
      {
        accessorKey: "title",
        header: "Featured App title Name",
        size: 200,
        Cell: ({ cell }) => {
          return (
            <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
              {cell.getValue()}
            </div>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
        Cell: ({ cell }) => {
          return (
            <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
              {cell.getValue()}
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        header: "ACTIONS",
        size: 100,
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button className="mr-2" onClick={() => handleEditFeaturedApp(row)}>
              <PencilIcon className="h-5 w-5 text-green-500" />
            </button>
            <button className="text-red-500" onClick={() => handleDelete(row)}>
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Fetch all footers
  const fetchFeaturedApp = async () => {
    try {
      const response = await fetch("/api/admin/featuredapp/get-all");
      if (!response.ok) {
        throw new Error("Failed to fetch featured app");
      }
      const data = await response.json();
      setFeaturedAppData(data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchFeaturedApp();
  }, []);

  const handleEditFeaturedApp = async (row) => {
    router.push(`/admin/featuredapp/edit/${row.original.id}`);
  };

  // Handle Delete Button Click
  const handleDelete = (row) => {
    setSelectedId(row.original.id);
    document.getElementById("delete_modal").showModal();
  };

  // Delete footer
  const deleteFeaturedApp = async () => {
    setFormSubmitted(true);
    try {
      const response = await fetch(`/api/admin/featuredapp/${selectedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete featuredapp");
      }

      // Refresh featuredapp
      await fetchFeaturedApp();
      setFormSubmitted(false);
      document.getElementById("delete_modal").close();
    } catch (error) {
      setError(error.message);
      setFormSubmitted(false);
    }
  };

  // Handle Toggle Active Status
  //   const handleToggleActive = async (id, currentStatus) => {
  //     try {
  //       const response = await fetch(`/api/admin/footer/${id}`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ isActive: !currentStatus }), // Toggle active status
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to update footer status");
  //       }

  //       // Refresh footers
  //       await fetchFooters();
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Operation in progress...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}

      <div>
        <CommonTable columns={columns} data={featuredAppData} minRows={10} />
      </div>

      {/* Delete Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Featured App</h3>
          <p className="py-4">
            Are you sure you want to delete this Featured App?
          </p>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="modal-action">
            <button
              onClick={deleteFeaturedApp}
              className="btn bg-[#dc2626] hover:bg-[#dc2626] text-white"
              disabled={formSubmitted}
            >
              {formSubmitted ? "Deleting..." : "Delete"}
            </button>
            <button
              className="btn"
              onClick={() => {
                setError("");
                document.getElementById("delete_modal").close();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AllFeaturedAppTable;
