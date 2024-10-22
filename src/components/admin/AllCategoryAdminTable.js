"use client";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import CommonTable from "../common/CommonTable";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AllCategoryAdminTable = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const columns = useMemo(
    () => [
      {
        accessorKey: "isActive",
        header: "Active",
        size: 100,
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.original.isActive}
            onChange={() =>
              handleToggleActive(row.original.id, row.original.isActive)
            }
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Category Name",
        size: 200,
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
              <Link href={`/categoryadmin/${slug}`} className="text-black-500 ">
                {cell.getValue()}
              </Link>
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
            <button className="mr-2" onClick={() => handleEditCategory(row)}>
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

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategoriesData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditCategory = async (row) => {
    router.push(`/admin/categories/edit/${row.original.id}`);
  };

  // Handle Delete Button Click
  const handleDelete = (row) => {
    setSelectedId(row.original.id);
    document.getElementById("delete_modal").showModal();
  };

  // Handle Toggle Active Status
  const handleToggleActive = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }), // Toggle active status
      });

      if (!response.ok) {
        throw new Error("Failed to update category status");
      }

      // Refresh categories
      await fetchCategories();
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete Category
  const deleteCategory = async () => {
    setFormSubmitted(true);
    try {
      const response = await fetch(`/api/categories/${selectedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      // Refresh categories
      await fetchCategories();
      setFormSubmitted(false);
      document.getElementById("delete_modal").close();
    } catch (error) {
      setError(error.message);
      setFormSubmitted(false);
    }
  };

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
        <CommonTable columns={columns} data={categoriesData} minRows={10} />
      </div>

      {/* Delete Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Category</h3>
          <p className="py-4">Are you sure you want to delete this category?</p>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="modal-action">
            <button
              onClick={deleteCategory}
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

export default AllCategoryAdminTable;
