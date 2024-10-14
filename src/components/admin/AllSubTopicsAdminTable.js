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

const AllSubTopicsAdminTable = ({ params }) => {
  const [subtopicsData, setSubTopicsData] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [published, setPublished] = useState();
  const [slug, setSlug] = useState();
  const [subTopicLiveId, setSubTopicLiveId] = useState(null);

  const { topicslug } = params;

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
              onClick={() => handleSubTopicApproval(row)}
              className="btn bg-[#dc2626] text-white hover:bg-[#dc2626]"
            >
              Approve
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
          row.original.subtopiclive_id !== undefined &&
          row.original.subtopiclive_id !== null &&
          row.original.subtopiclive_id !== "null" &&
          row.original.subtopiclive_id !== "" ? (
            <button
              onClick={() => handleSubTopicUnApproval(row)}
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
            {((row.original.subtopiclive_id !== undefined &&
              row.original.subtopiclive_id !== null &&
              row.original.subtopiclive_id !== "null" &&
              row.original.subtopiclive_id !== "") ||
              row.original.published === "Y") && (
              <button className="mr-2">
                <EyeIcon
                  onClick={() => {
                    handleSubTopicLiveView(row);
                  }}
                  className="h-5 w-5 text-red-500"
                />
              </button>
            )}
            {row.original.published === "N" && (
              <button className="mr-2">
                <EyeIcon
                  onClick={() => {
                    handleSubTopicView(row);
                  }}
                  className="h-5 w-5 text-green-500"
                />
              </button>
            )}
            <button className="mr-2">
              <PencilIcon
                onClick={() => {
                  handleSubTopicEdit(row);
                }}
                className="h-5 w-5 text-green-500"
              />
            </button>
            <button>
              <TrashIcon
                onClick={() => {
                  document.getElementById("delete_modal").showModal();
                  handleSubTopicDelete(row);
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

  const handleSubTopicApproval = async (row) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "approvesubtopic",
          selectedId: row.original.id,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("approve SubTopic error:", error);
      }
      handleGetSubTopics();
    } catch (error) {
      console.error("approve subtopic operation error", error);
    }
  };

  const handleSubTopicUnApproval = async (row) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "unapprovesubtopic",
          selectedId: row.original.id,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Unapprove subtopic error:", error);
      }
      handleGetSubTopics();
    } catch (error) {
      console.error("Unapprove subtopic operation error", error);
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
          apiName: "canceldeleterequestsubtopic",
          selectedId: row.original.id,
          published: row.original.published,
          subTopicLiveId: row.original.subtopiclive_id
            ? row.original.subtopiclive_id
            : null,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Cancel Delete Request error sub topic:", error);
      }
      handleGetSubTopics();
    } catch (error) {
      console.error("Cancel Delete Request operation error sub topic", error);
    }
  };

  const handleGetSubTopics = async (e) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "displaysubtopics",
          topicslug,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("subtopics Get error:", error);
      }
      setSubTopicsData(result);
    } catch (error) {
      console.error("subtopics Get operation error", error);
    }
  };

  useEffect(() => {
    handleGetSubTopics();
  }, []);

  const handleSubTopicView = async (row) => {
    // router.push(`/blog3/${row.original.slug}`);
    const url = `/subtopicwn/${row.original.slug}`;
    window.open(url, "_blank");
  };

  const handleSubTopicLiveView = async (row) => {
    const modifiedSlug = row.original.slug;
    const parts = modifiedSlug.split("-");

    if (parts[parts.length - 1] === "00000") {
      parts.pop();
    }

    const originalSlug = parts.join("-");

    // router.push(`/blog3/${originalSlug}`);

    const url = `/subtopicwn/${originalSlug}`;

    window.open(url, "_blank");
  };

  const handleSubTopicEdit = async (row) => {
    const encryptedID = encryptID(row.original.id, "thisissecret");

    const encodedID = encodeURIComponent(encryptedID);

    router.push(
      `/editsubtopic?encryptedID=${encodedID}&published=${row.original.published}&topicslug=${topicslug}`
    );
  };

  const handleSubTopicDelete = (row) => {
    setSelectedId(row.original.id);
    setPublished(row.original.published);
    setSlug(row.original.slug);
    setSubTopicLiveId(
      row.original.subtopiclive_id ? row.original.subtopiclive_id : null
    );
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "deletesubtopic",
          selectedId,
          published,
          slug,
          subTopicLiveId,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("subtopic Deleted error:", error);
      }
      handleGetSubTopics();
    } catch (error) {
      console.error("subtopic Delete operation error", error);
    }
  };

  return (
    <>
      <div>
        <CommonTable columns={columns} data={subtopicsData} minRows={10} />
      </div>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete SubTopic</h3>
          <p className="py-4">
            Are you sure you want to delete this subtopic ?
          </p>
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

export default AllSubTopicsAdminTable;
