"use client";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import CommonTable from "../common/CommonTable";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const AllTutorialAdminTable = () => {
  const [tutorialsData, setTutorialsData] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [users, setUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [authorId, setAuthorId] = useState();
  const [isActive, setIsActive] = useState("");
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
                href={`/tutorialadmin/${slug}`}
                className="text-blue-500 underline font-bold"
              >
                {cell.getValue()}
              </Link>
            </div>
          );
        },
      },

      {
        accessorKey: "is_active",
        header: "Is Active?",
        size: 150,
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
        size: 80,
        Cell: ({ row }) => (
          <div>
            <button className="mr-2">
              <PencilIcon
                onClick={async () => {
                  document.getElementById("update_modal").showModal();
                  try {
                    const response = await fetch("/api/getusers", {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
                    const { error, result: usersData } = await response.json();
                    if (error !== undefined) {
                      console.log("Users Get error:", error);
                      return;
                    }
                    setUsers(usersData);
                    handleTutorialEdit(row, usersData);
                  } catch (error) {
                    console.error("Error fetching users:", error);
                  }
                }}
                className="h-5 w-5 text-green-500"
              />
            </button>
            <button>
              <TrashIcon
                onClick={() => {
                  document.getElementById("delete_modal").showModal();
                  handleTutorialDelete(row);
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

  const handleGetTutorials = async (e) => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "gettutorials",
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Tutorials Get error:", error);
      }
      setTutorialsData(result);
    } catch (error) {
      console.error("Tutorials Get operation error", error);
    }
  };

  useEffect(() => {
    handleGetTutorials();
  }, []);

  const handleIsActiveChange = (event) => {
    setIsActive(event.target.value);
  };

  const handleTutorialEdit = async (row, users) => {
    setSelectedId(row.original.id);
    setTitle(row.original.title);
    setAuthorId(row.original.author_id);
    setIsActive(row.original.is_active);

    const user = users.find((user) => user.id === row.original.author_id);

    if (user) {
      setSelectedUserName(user.username);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedUserName(event.target.value);
    const user = users.find((user) => user.username === event.target.value);
    if (user) {
      setAuthorId(user.id);
    }
  };

  const handleTutorialUpdate = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "updatetutorial",
          selectedId,
          title,
          authorId,
          is_active: isActive,
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Tutorial Updated error:", error);
      }
      handleGetTutorials();
      const updateDialog = document.getElementById("update_modal");
      if (updateDialog) {
        updateDialog.close();
      }
    } catch (error) {
      console.error("Tutorial Update operation error", error);
    }
  };

  const handleTutorialDelete = (row) => {
    setSelectedId(row.original.id);
  };

  const deleteTutorial = async () => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiName: "deletetutorial", selectedId }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Delete Tutorial error:", error);
      }
      handleGetTutorials();
    } catch (error) {
      console.error("Tutorial delete operation error", error);
    }
  };

  return (
    <>
      <div>
        <CommonTable columns={columns} data={tutorialsData} minRows={10} />
      </div>
      <dialog id="update_modal" className="modal">
        <div className="modal-box w-12/12 max-w-6xl md:w-6/12 md:max-w-md">
          <h3 className="font-bold text-lg">Update Tutorial</h3>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full placeholder-gray-500"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Is Active?</span>
            </div>
          </label>

          <select
            onChange={handleIsActiveChange}
            value={isActive || ""}
            className="select select-bordered w-full"
          >
            <option disabled value="">
              Is Active?
            </option>
            <option>active</option>
            <option>inactive</option>
            {isActive === "" && (
              <option disabled style={{ display: "none" }}>
                Is Active?
              </option>
            )}
          </select>

          <select
            onChange={handleSelectChange}
            value={selectedUserName || ""}
            className="mt-6 select select-bordered w-full"
          >
            <option disabled value="">
              Assign to Author?
            </option>
            {users.map((user) => (
              <option key={user.username}>{user.username}</option>
            ))}
            {selectedUserName === "" && (
              <option disabled style={{ display: "none" }}>
                Assign to Author?
              </option>
            )}
          </select>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={handleTutorialUpdate}
                className="btn mr-4 bg-[#dc2626] hover:bg-[#dc2626] text-white"
              >
                Save
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Tutorial</h3>
          <p className="py-4">
            Are you sure you want to delete this tutorial ?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={deleteTutorial}
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

export default AllTutorialAdminTable;
