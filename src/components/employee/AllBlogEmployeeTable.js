"use client";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import CommonTable from "../common/CommonTable";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

const encryptID = (id, secretKey) => {
  return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
};

const AllBlogEmployeeTable = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [previousimage, setPreviousImage] = useState();
  const [selectedId, setSelectedId] = useState();
  const [published, setPublished] = useState();
  const [blogLiveId, setBlogLiveId] = useState(null);

  const { data: session, status } = useSession();

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
        Cell: ({ cell }) => <div>{cell.getValue() === "Y" ? "Yes" : "No"}</div>,
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
            {((row.original.bloglive_id !== undefined &&
              row.original.bloglive_id !== null &&
              row.original.bloglive_id !== "null" &&
              row.original.bloglive_id !== "") ||
              row.original.published === "Y") && (
              <button className="mr-2">
                <EyeIcon
                  onClick={() => {
                    handleBlogLiveView(row);
                  }}
                  className="h-5 w-5 text-red-500"
                />
              </button>
            )}
            {row.original.published === "N" && (
              <button className="mr-2">
                <EyeIcon
                  onClick={() => {
                    handleBlogView(row);
                  }}
                  className="h-5 w-5 text-green-500"
                />
              </button>
            )}
            <button className="mr-2">
              <PencilIcon
                onClick={() => {
                  handleBlogEdit(row);
                }}
                className="h-5 w-5 text-green-500"
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

  const handleGetBlogs = async (e) => {
    try {
      const response = await fetch("/api/getblogsforemployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId: session.user.id }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Blogs Get error:", error);
      }
      setBlogsData(result);
      console.log(result);
    } catch (error) {
      console.error("Blogs Get operation error", error);
    }
  };

  useEffect(() => {
    handleGetBlogs();
  }, []);

  const handleBlogView = async (row) => {
    // router.push(`/blog3/${row.original.slug}`);
    const url = `/blogwn/${row.original.slug}`;
    window.open(url, "_blank");
  };

  const handleBlogLiveView = async (row) => {
    const modifiedSlug = row.original.slug;
    const parts = modifiedSlug.split("-");

    if (parts[parts.length - 1] === "00000") {
      parts.pop();
    }

    const originalSlug = parts.join("-");

    // router.push(`/blog3/${originalSlug}`);

    const url = `/blogwn/${originalSlug}`;

    window.open(url, "_blank");
  };

  const handleBlogEdit = async (row) => {
    const encryptedID = encryptID(row.original.id, "thisissecret");

    const encodedID = encodeURIComponent(encryptedID);

    router.push(
      `/editblogemployee?encryptedID=${encodedID}&published=${row.original.published}`
    );
  };

  const handleBlogDelete = (row) => {
    setSelectedId(row.original.id);
    setPublished(row.original.published);
    setBlogLiveId(row.original.bloglive_id ? row.original.bloglive_id : null);
  };

  const requestForDelete = async () => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "requestfordelete",
          selectedId,
          published,
          blogLiveId,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Blog request for delete error:", error);
      }
      handleGetBlogs();
    } catch (error) {
      console.error("blog request for delete operation error", error);
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
          <p className="py-4">
            Are you sure you want to send delete request for this blog ?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={requestForDelete}
                className="btn mr-4 bg-[#dc2626] hover:bg-[#dc2626] text-white"
              >
                Send
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AllBlogEmployeeTable;
