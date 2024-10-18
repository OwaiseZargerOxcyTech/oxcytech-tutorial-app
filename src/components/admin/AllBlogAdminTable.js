"use client";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import CommonTable from "../common/CommonTable";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

const encryptID = (id, secretKey) => {
  return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
};

const AllBlogAdminTable = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [previousimage, setPreviousImage] = useState();
  const [selectedId, setSelectedId] = useState();
  const [published, setPublished] = useState();
  const [slug, setSlug] = useState();
  const [blogLiveId, setBlogLiveId] = useState(null);

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
        accessorKey: "categoryName",
        header: "category",
        size: 40,
        Cell: ({ cell }) => <div>{cell.getValue()}</div>,
      },

      {
        accessorKey: "delete_request",
        header: "Delete Request",
        size: 40,
        Cell: ({ row }) =>
          row.original.delete_request === "Y" ? (
            <button
              onClick={() => handleCancelDeleteRequest(row)}
              className="btn bg-[#dc2626] text-white hover:bg-[#dc2626]"
            >
              Cancel Request
            </button>
          ) : null,
      },
      {
        accessorKey: "approve",
        header: "APPROVAL",
        size: 80,
        Cell: ({ row }) =>
          row.original.published === "N" && row.original.description !== "" ? (
            <button
              onClick={() => handleBlogApproval(row)} // Pass scheduledAt here
              className="btn bg-[#dc2626] text-white hover:bg-[#dc2626]"
            >
              Approve
            </button>
          ) : row.original.published === "scheduled" ? (
            <button disabled className="btn bg-blue-400 text-white">
              scheduled
            </button>
          ) : null,
      },

      {
        accessorKey: "unapprove",
        header: "UNAPPROVAL",
        size: 80,
        Cell: ({ row }) =>
          row.original.published === "N" &&
          row.original.description !== "" &&
          row.original.bloglive_id !== undefined &&
          row.original.bloglive_id !== null &&
          row.original.bloglive_id !== "null" &&
          row.original.bloglive_id !== "" ? (
            <button
              onClick={() => handleBlogUnApproval(row)}
              className="btn bg-[#dc2626] text-white hover:bg-[#dc2626]"
            >
              UnApprove
            </button>
          ) : null,
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
                  handleBlogLiveView(row);
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
                  handleBlogEdit(row);
                }}
                className="h-5 w-5 text-blue-500"
              />
            </button>
            <button>
              <TrashIcon
                onClick={() => {
                  document.getElementById("delete_modal").showModal();
                  handleBlogDelete(row);
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

  const handleBlogApproval = async (row) => {
    try {
      const currentDate = new Date(); // Get the current date and time
      // Compare the scheduled time with the current time
      if (new Date(row.original.publishDate) > currentDate) {
        const response = await fetch("/api/combinedapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PUBLISHBLOGS_SECRET_TOKEN}`,
          },
          body: JSON.stringify({
            apiName: "approveblogfuture",
            selectedId: row.original.id,
          }),
        });

        const { error, result } = await response.json();

        // Notify that it will be published at the scheduled time
        if (response.ok) {
          alert(
            `Blog will be published on scheduled time: ${new Date(
              row.original.publishDate
            )}`
          );
          handleGetBlogs();
        } else {
          console.log("Approve Blog error:", error);
          alert(`Error: ${error}`);
        }
      } else {
        // Publish the blog immediately
        const response = await fetch("/api/combinedapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PUBLISHBLOGS_SECRET_TOKEN}`,
          },
          body: JSON.stringify({
            apiName: "approveblog",
            selectedId: row.original.id,
          }),
        });

        const { error, result } = await response.json();

        if (response.ok) {
          alert("Blog published successfully.");
          handleGetBlogs(); // Refresh the blog list
        } else {
          console.log("Approve Blog error:", error);
          alert(`Error: ${error}`);
        }
      }
    } catch (error) {
      console.error("Approve blog operation error", error);
    }
  };

  const handleBlogUnApproval = async (row) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "unapproveblog",
          selectedId: row.original.id,
        }),
      });

      const { error, result } = await response.json();
      console.log("API Response:", result);
      if (error !== undefined) {
        console.log("Unapprove Blog error:", error);
      }
      handleGetBlogs();
    } catch (error) {
      console.error("Unapprove blog operation error", error);
    }
  };

  const handleCancelDeleteRequest = async (row) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "canceldeleterequest",
          selectedId: row.original.id,
          published: row.original.published,
          blogLiveId: row.original.bloglive_id
            ? row.original.bloglive_id
            : null,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Cancel Delete Request error:", error);
      }
      handleGetBlogs();
    } catch (error) {
      console.error("Cancel Delete Request operation error", error);
    }
  };

  const handleGetBlogs = async (e) => {
    try {
      const response = await fetch("/api/admin/blogs/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { error, result } = await response.json();
      // console.log("Fetched Blogs Data:", result);
      if (error !== undefined) {
        console.log("Blogs Get error:", error);
      }
      setBlogsData(result);
    } catch (error) {
      console.error("Blogs Get operation error", error);
    }
  };

  useEffect(() => {
    handleGetBlogs();
  }, []);

  const handleBlogLiveView = async (row) => {
    const blogSlug = row.original.slug;
    const category = row.original.categoryName.toLowerCase();
    const url = `/${category}/${blogSlug}`;

    window.open(url, "_blank");
  };

  const handleBlogEdit = async (row) => {
    const encryptedID = encryptID(row.original.id, "thisissecret");

    const encodedID = encodeURIComponent(encryptedID);

    router.push(
      `/editblogadmin?encryptedID=${encodedID}&published=${row.original.published}`
    );
  };

  const handleBlogDelete = (row) => {
    setSelectedId(row.original.id);
    setPublished(row.original.published);
    setSlug(row.original.slug);
    setBlogLiveId(row.original.bloglive_id ? row.original.bloglive_id : null);
    setPreviousImage(row.original.image);
  };

  const confirmDelete = async () => {
    try {
      const formData = new FormData();
      formData.append("selectedId", selectedId);
      formData.append("previousimage", previousimage);
      formData.append("published", published);
      formData.append("slug", slug);
      formData.append("blogLiveId", blogLiveId);

      const response = await fetch("/api/admin/blogs/delete", {
        method: "DELETE",
        body: formData,
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Blog Deleted error:", error);
      }
      handleGetBlogs();
    } catch (error) {
      console.error("Blog Delete operation error", error);
    }
  };

  return (
    <>
      <div>
        <CommonTable columns={columns} data={blogsData} minRows={10} />
      </div>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Blog</h3>
          <p className="py-4">Are you sure you want to delete this blog ?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={confirmDelete}
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

export default AllBlogAdminTable;
