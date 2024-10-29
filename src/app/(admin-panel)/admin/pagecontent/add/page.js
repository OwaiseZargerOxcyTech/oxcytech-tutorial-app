"use client";
import React, { useState, useEffect } from "react";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DynamicSunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState("N");
  const [publishDate, setPublishDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  // Fetch users on component mount
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/admin/get-all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { error, result } = await response.json();

      if (error) {
        console.log("Users Get error:", error);
      } else {
        setUsers(result);
      }
    } catch (error) {
      console.error("Users Get operation error", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Determine if user is admin or author
  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      if (session.user.name === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        setSelectedUserName(session.user.username); // Automatically assign to self
      }
    }
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  const handleSelectChange = (event) => {
    setSelectedUserName(event.target.value);
  };

  const handleAddPage = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      setTimeout(async () => {
        //   // If admin, find the selected user
        //   // If author, assign to self
        const selectedUser = isAdmin
          ? users.find((user) => user.username === selectedUserName)
          : session.user; // Assign to self

        if (!selectedUser) {
          // Added check for selectedUser
          console.log("Invalid user type or no user selected.");
          setFormSubmitted(false);
          return;
        }

        if (!(publishDate instanceof Date) || isNaN(publishDate)) {
          console.error("Invalid publish date");
          setFormSubmitted(false);
          return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("content", content);
        formData.append("published", published);
        formData.append("publishDate", publishDate.toISOString());
        formData.append("authorId", selectedUser.id);

        const response = await fetch("/api/admin/pagecontent/add", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const { error, result } = await response.json();
        if (error) {
          console.log("Page content Add error:", error);
        }

        // Reset form fields
        setTitle("");
        setDescription("");
        setContent("");
        setSelectedUserName(isAdmin ? "" : session.user.username);
        setFormSubmitted(false);
      }, 1500);
    } catch (error) {
      console.error("Page condition addition operation error", error);
      setFormSubmitted(false);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Page content added successfully</span>
          </div>
        </div>
      )}
      <div className="card w-full bg-base-100 rounded-md">
        <form className="card-body" onSubmit={handleAddPage}>
          <h1 className="pt-4 text-center text-3xl font-semibold">
            Add Page Content
          </h1>

          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page Title"
            className="mt-8 input input-bordered w-full placeholder-gray-500"
            required
          />

          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered placeholder-gray-500"
            placeholder="Meta Description"
            required
          ></textarea>

          <DynamicSunEditor
            onChange={setContent}
            setContents={content}
            placeholder="Page Content"
            className="text-black"
            height="300px"
            setOptions={{
              height: "100%",
              buttonList: [
                ["undo", "redo"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["removeFormat"],
                ["outdent", "indent"],
                ["fullScreen", "showBlocks", "codeView"],
                ["preview", "print"],
                ["link", "image", "video"],
                ["font", "fontSize", "formatBlock", "align", "list", "table"],
                ["fontColor", "hiliteColor", "horizontalRule"],
              ],
              font: ["Arial", "Courier New"],
              fontColor: "red",
              backgroundColor: "red",
            }}
          />

          {isAdmin && (
            <select
              onChange={handleSelectChange}
              value={selectedUserName || ""}
              className="select select-bordered w-full"
              required
            >
              <option disabled value="">
                Assign to author?
              </option>
              {users.map((user) => (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          )}

          <label className="mt-2 border border-gray-300 p-2 text-sm rounded-md  w-full ">
            Publish Now
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-[#dc2626] w-20 text-white"
              disabled={formSubmitted}
            >
              {formSubmitted ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPage;
