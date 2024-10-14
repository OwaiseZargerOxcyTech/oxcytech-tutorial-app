"use client";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import CommonTable from "../common/CommonTable";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const AllEmployeeTable = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [username, setUsername] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authorDetail, setauthorDetail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [formSubmitted, setFormSubmitted] = useState();
  const [empBlogCount, setEmpBlogCount] = useState();
  const [image, setImage] = useState(null);
  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "Username",
        size: 150,
        Cell: ({ cell }) => (
          <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
            {cell.getValue()}
          </div>
        ),
      },
      {
        accessorKey: "authorName",
        header: "authorName",
        size: 150,
        Cell: ({ cell }) => (
          <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
            {cell.getValue()}
          </div>
        ),
      },

      {
        accessorKey: "email",
        header: "Email",
        size: 150,
        Cell: ({ cell }) => (
          <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
            {cell.getValue()}
          </div>
        ),
      },

      {
        accessorKey: "action",
        header: "ACTIONS",
        size: 80,
        Cell: ({ row }) => (
          <div>
            <button className="mr-2">
              <PencilIcon
                onClick={() => {
                  document.getElementById("update_modal").showModal();
                  handleEmployeeEdit(row);
                }}
                className="h-5 w-5 text-green-500"
              />
            </button>
            <button>
              <TrashIcon
                onClick={() => {
                  handleEmployeeDelete(row);
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

  const handleGetEmployees = async (e) => {
    try {
      const response = await fetch("/api/getemployees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Employees Get error:", error);
      }
      setEmployeesData(result);
    } catch (error) {
      console.error("Employees Get operation error", error);
    }
  };

  useEffect(() => {
    handleGetEmployees();
  }, []);

  const handleEmployeeEdit = async (row) => {
    setSelectedId(row.original.id);
    setUsername(row.original.username);
    setAuthorName(row.original.authorName);
    setEmail(row.original.email);
    setauthorDetail(row.original.authorDetail);
    setImage(null);
    // console.log("selectedID : ", selectedId, "Type of selectedId: ", typeof selectedId); 

  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleEmployeeUpdate = async (e) => {
    try {
      e.preventDefault();

      setFormSubmitted(true);

      setTimeout(async () => {
        if (password !== confirmpassword) {
          const updateDialog = document.getElementById("update_modal");
          if (updateDialog) {
            updateDialog.close();
          }
          setFormSubmitted(false);
          return;
        }

        const formData = new FormData(); // Create a FormData object
        formData.append("apiName", "updateemployee");
        formData.append("selectedId", selectedId);
        formData.append("username", username);
        formData.append("authorName", authorName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("authorDetail", authorDetail);
        if (image) {
          formData.append("image", image); // Append the image file if available
        }

        const response = await fetch("/api/combinedapi", {
          method: "POST",
          body: formData,
        });

        const { error, result } = await response.json();

        if (error !== undefined) {
          console.log("Employee Updated error:", error);
        }
        handleGetEmployees();
        const updateDialog = document.getElementById("update_modal");
        if (updateDialog) {
          updateDialog.close();
        }
        setFormSubmitted(false);
      }, 1000);
    } catch (error) {
      console.error("Employee Update operation error", error);
    }
  };

  const handleEmployeeDelete = async (row) => {
    setSelectedId(row.original.id);

    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "getblogcountforemp",
          selectedId: row.original.id,
        }),
      });

      const { error, result } = await response.json();

      setEmpBlogCount(result);
      setTimeout(
        () => document.getElementById("delete_modal").showModal(),
        500
      );

      if (error !== undefined) {
        console.log("Blog Count for Employee error:", error);
      }
    } catch (error) {
      console.error("employee blog count operation error", error);
    }
  };

  const deleteEmployee = async () => {
    try {
      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiName: "deleteemployee", selectedId }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Delete Employee error:", error);
      }
      handleGetEmployees();
    } catch (error) {
      console.error("employee delete operation error", error);
    }
  };

  return (
    <>
      {formSubmitted && password !== confirmpassword && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Password and Confirm Password does not match</span>
          </div>
        </div>
      )}
      <div>
        <CommonTable columns={columns} data={employeesData} minRows={10} />
      </div>
      <dialog id="update_modal" className="modal">
        <div className="modal-box w-12/12 max-w-6xl md:w-6/12 md:max-w-md">
          <h3 className="font-bold text-lg">Update Author</h3>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full placeholder-gray-500"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Author Name</span>
            </div>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="input input-bordered w-full placeholder-gray-500"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full placeholder-gray-500"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">New Password</span>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full placeholder-gray-500"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Confirm New Password</span>
            </div>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full placeholder-gray-500"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Upload Image</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input input-bordered w-full placeholder-gray-500"
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text font-bold ">Detail of Author</span>
            </div>
            <textarea
              id="detail"
              name="detail"
              value={authorDetail}
              onChange={(e) => setauthorDetail(e.target.value)}
              className="textarea textarea-bordered placeholder-gray-500"
              placeholder="Author detial"
              required
            ></textarea>
          </label>

          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={handleEmployeeUpdate}
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
          <h3 className="font-bold text-lg">Block Employee</h3>
          {empBlogCount > 0 ? (
            <p className="py-4">
              {empBlogCount} blogs are assigned to employee, please reassign to
              other employee or admin
            </p>
          ) : (
            <p className="py-4">
              Are you sure you want to delete this employee ?
            </p>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={deleteEmployee}
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

export default AllEmployeeTable;
