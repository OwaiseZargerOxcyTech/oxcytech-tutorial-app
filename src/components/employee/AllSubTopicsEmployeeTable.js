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

const AllSubTopicsEmployeeTable = ({ params }) => {
  const [subtopicsData, setSubTopicsData] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [published, setPublished] = useState();
  const [subTopicLiveId, setSubTopicLiveId] = useState(null);

  const { topicslug } = params;

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
    setSubTopicLiveId(
      row.original.subtopiclive_id ? row.original.subtopiclive_id : null
    );
  };

  const requestForDelete = async () => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "requestfordeletesubtopic",
          selectedId,
          published,
          subTopicLiveId,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("subtutorial request for delete error:", error);
      }
      handleGetSubTopics();
    } catch (error) {
      console.error("subtutorial request for delete operation error", error);
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
            Are you sure you want to send delete request for this subtopic ?
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

export default AllSubTopicsEmployeeTable;
