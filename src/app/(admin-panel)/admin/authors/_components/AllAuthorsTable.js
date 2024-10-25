"use client";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import CommonTable from "@/components/common/CommonTable";
import { useRouter } from "next/navigation";

const AllAuthorsTable = () => {
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

  const router = useRouter();

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
      const response = await fetch("/api/admin/get-employees", {
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

  const handleEmployeeEdit = (row) => {
    router.push(`/admin/authors/edit/${row.original.id}`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
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

export default AllAuthorsTable;
