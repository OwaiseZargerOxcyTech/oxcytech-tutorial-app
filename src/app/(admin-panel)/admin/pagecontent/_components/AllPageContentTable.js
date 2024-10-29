"use client";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import CommonTable from "@/components/common/CommonTable";

const encryptID = (id, secretKey) => {
  return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
};

const AllPageContentTable = () => {
  const [pageContentList, setPageContentList] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [published, setPublished] = useState();
  const [slug, setSlug] = useState();

  const router = useRouter();

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
        Cell: ({ cell }) => (
          <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
            {cell.getValue()}
          </div>
        ),
      },

      {
        accessorKey: "published",
        header: "Published",
        size: 40,
        Cell: ({ cell }) => (
          <div>
            {cell.getValue() === "Y"
              ? "Yes"
              : cell.getValue() === "scheduled"
              ? "scheduled"
              : "No"}
          </div>
        ),
      },
      {
        accessorKey: "publishDate",
        header: "Published Date",
        size: 40,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue());
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          return <div>{formattedDate}</div>;
        },
      },
      {
        accessorKey: "action",
        header: "ACTIONS",
        size: 80,
        Cell: ({ row }) => (
          <div>
            <button className="mr-2">
              <EyeIcon
                onClick={() => {
                  row.original.published === "Y"
                    ? handleBlogLiveView(row)
                    : handleBlogView(row);
                }}
                className={
                  row.original.published === "Y"
                    ? "h-5 w-5 text-green-500"
                    : "h-5 w-5 text-red-500"
                }
              />
            </button>
            <button className="mr-2">
              <PencilIcon
                onClick={() => {
                  handlePageContentEdit(row);
                }}
                className="h-5 w-5 text-blue-500"
              />
            </button>
            <button>
              <TrashIcon
                onClick={() => {
                  document.getElementById("delete_modal").showModal();
                  setSelectedId(row.original.id);
                }}
                className="h-5 w-5 text-red-500"
              />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const fetchPageContent = async (e) => {
    try {
      const response = await fetch("/api/admin/pagecontent/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { error, result } = await response.json();
      console.log("Fetched Page content List:", result);
      if (error !== undefined) {
        console.log("Page content Get error:", error);
      }
      setPageContentList(result);
    } catch (error) {
      console.error("Page content Get operation error", error);
    }
  };

  useEffect(() => {
    fetchPageContent();
  }, []);

  const handleBlogLiveView = async (row) => {
    const blogSlug = row.original.slug;
    const category = row.original.categoryName.toLowerCase();
    const url = `/${category}/${blogSlug}`;

    window.open(url, "_blank");
  };

  const handleBlogView = async (row) => {
    const url = `/unpublished-blog/${row.original.id}`;

    window.open(url, "_blank");
  };

  const handlePageContentEdit = async (row) => {
    const encryptedID = encryptID(row.original.id, "thisissecret");

    const encodedID = encodeURIComponent(encryptedID);

    router.push(`/admin/pagecontent/edit?encryptedID=${encodedID}`);
  };

  const deletePageContentItem = async () => {
    try {
      const formData = new FormData();
      formData.append("selectedId", selectedId);
      const response = await fetch("/api/admin/pagecontent/delete", {
        method: "DELETE",
        body: formData,
      });

      const { error, result } = await response.json();
      console.log("Deleted Page content item:", result);

      if (error !== undefined) {
        console.log("page content item Delete error:", error);
      }
      fetchPageContent();
    } catch (error) {
      console.error("page content item Delete operation error", error);
    }
  };

  return (
    <>
      <div>
        <CommonTable columns={columns} data={pageContentList} minRows={10} />
      </div>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Page Content</h3>
          <p className="py-4">Are you sure you want to delete this Page ?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={deletePageContentItem}
                className="btn mr-4 bg-[#dc2626] hover:bg-[#dc2626] text-white"
              >
                Delete
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AllPageContentTable;
