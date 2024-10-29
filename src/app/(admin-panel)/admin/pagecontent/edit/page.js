"use client";
import { useState, Suspense, useEffect } from "react";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

const DynamicSunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const decryptID = (encryptedID, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedID, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [authorId, setAuthorId] = useState();
  const [selectedId, setSelectedId] = useState("");
  const [publishDate, setPublishDate] = useState(new Date());
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [pageContentItemData, setPageContentItemData] = useState(false);

  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const getPageContentItemData = async () => {
    try {
      const encryptedID = searchParams.get("encryptedID");

      const pageContentItemID = decryptID(encryptedID, "thisissecret");

      const response = await fetch("/api/admin/pagecontent/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pageContentItemID }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("page content item data fetchingerror:", error);
      }
      setPageContentItemData(result);
    } catch (error) {
      console.error("fetch page content item data operation error", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/admin/get-all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Users Get error:", error);
      }
      setUsers(result);
    } catch (error) {
      console.error("Users Get operation error", error);
    }
  };
  useEffect(() => {
    getPageContentItemData();
    fetchUserData();
  }, []);

  useEffect(() => {
    if (pageContentItemData && users.length > 0) {
      setTitle(pageContentItemData.title);
      setDescription(pageContentItemData.description);
      setContent(pageContentItemData.content);
      setSelectedId(pageContentItemData.id);
      setAuthorId(pageContentItemData.author_id);

      const user = users.find(
        (user) => user.id === pageContentItemData.author_id
      );

      if (user) {
        setSelectedUserName(user.username);
      }
    }
  }, [pageContentItemData, users]);

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

  const handleAuthorChange = (event) => {
    setSelectedUserName(event.target.value);
    const user = users.find((user) => user.username === event.target.value);
    if (user) {
      setAuthorId(user.id);
    }
  };

  const handlePageContentItemDataUpdate = async (e) => {
    try {
      e.preventDefault();

      const publishDateValue = publishType === "now" ? new Date() : publishDate;
      if (!(publishDateValue instanceof Date) || isNaN(publishDateValue)) {
        console.error("Invalid publish date");
        setFormSubmitted(false);
        return;
      }

      const category = categories.find(
        (category) => category.id === selectedCategory
      );
      const categoryName = category ? category.name : "";

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }
      formData.append("selectedId", selectedId);
      formData.append("published", searchParams.get("published"));
      formData.append("publishDate", publishDateValue.toISOString());
      formData.append("author_id", authorId);
      formData.append("blogLiveId", blogLiveId);
      formData.append("featuredpost", featuredPost);
      formData.append("categoryId", selectedCategory);
      formData.append("categoryName", categoryName);

      const response = await fetch("/api/admin/blogs/update", {
        method: "PUT",
        body: formData,
      });

      const { error, result } = await response.json();
      console.log(result);

      if (error !== undefined) {
        console.log("Blog Updated error:", error);
      } else {
        router.push("/admin/blogs/all");
      }
      setFormSubmitted(false);
    } catch (error) {
      console.error("Blog Update operation error", error);
      setFormSubmitted(false);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Page content Updated successfully</span>
          </div>
        </div>
      )}
      <div className="card w-full bg-base-100 rounded-md">
        <form className="card-body" onSubmit={handlePageContentItemDataUpdate}>
          <h1 className="pt-4 text-center text-3xl font-semibold">
            Edit Page Content
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
              onChange={handleAuthorChange}
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBlog />
    </Suspense>
  );
}
