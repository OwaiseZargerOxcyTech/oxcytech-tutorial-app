"use client";
import { useState, Suspense, useEffect } from "react";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import DatePicker from "react-datepicker";

const DynamicSunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const decryptID = (encryptedID, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedID, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [authorId, setAuthorId] = useState();
  const [selectedId, setSelectedId] = useState("");
  const [blog, setBlog] = useState();
  const [blogLiveId, setBlogLiveId] = useState(null);
  const [featuredPost, setFeaturedPost] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [publishType, setPublishType] = useState("now");
  const [publishDate, setPublishDate] = useState(new Date());
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const router = useRouter();

  const getBlogData = async () => {
    try {
      const encryptedID = searchParams.get("encryptedID");

      const blogID = decryptID(encryptedID, "thisissecret");

      const published = searchParams.get("published");

      const response = await fetch("/api/admin/blogs/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogID, published }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Blog fetchingerror:", error);
      }
      setBlog(result);
    } catch (error) {
      console.error("fetch blog operation error", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/getusers", {
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
    getBlogData();
    fetchUserData();
  }, []);

  useEffect(() => {
    if (blog && users.length > 0) {
      setTitle(blog.title);
      setDesc(blog.description);
      setContent(blog.content);
      setImageName(blog.imageName);
      setImage(blog.image);
      setSelectedId(blog.id);
      setAuthorId(blog.author_id);
      setBlogLiveId(blog.bloglive_id ? blog.bloglive_id : null);
      setFeaturedPost(blog.featuredpost);
      setSelectedCategory(blog.category_id);

      const user = users.find((user) => user.id === blog.author_id);

      if (user) {
        setSelectedUserName(user.username);
      }
    }
  }, [blog, users]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data); // Make sure to use the same state for both
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "admin") {
    return <div>Access Denied</div>;
  }

  const handleFeaturedPostChange = (event) => {
    setFeaturedPost(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePublishTypeChange = (e) => {
    setPublishType(e.target.value);
  };

  const handleAuthorChange = (event) => {
    setSelectedUserName(event.target.value);
    const user = users.find((user) => user.username === event.target.value);
    if (user) {
      setAuthorId(user.id);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImageName(selectedFile ? selectedFile.name : ""); // Set the file name
  };

  const handleBlogUpdate = async (e) => {
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
      formData.append("image", image);
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
        router.push("/allblogadmin");
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
            <span>Blog Updated Successfully</span>
          </div>
        </div>
      )}
      <div className="card w-full bg-base-100 rounded-md">
        <form className="card-body" onSubmit={handleBlogUpdate}>
          <h1 className="pt-4 text-center text-3xl font-semibold">
            Edit Blog Details
          </h1>
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
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Meta Description</span>
            </div>
            <textarea
              type="text"
              id="description" // Changed from 'desc'
              name="description" // Changed from 'desc'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="textarea textarea-bordered placeholder-gray-500"
              placeholder="Meta Description"
              required
            ></textarea>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Blog Content</span>
            </div>
          </label>

          <DynamicSunEditor
            onChange={setContent}
            setContents={content}
            placeholder="Blog Content"
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
          <div className="mt-6">
            <label
              htmlFor="image"
              className="p-2 border border-gray-300 cursor-pointer text-gray-500 hover:text-blue-700"
            >
              <span>{imageName ? imageName : "Upload New Blog Image"}</span>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Is Featured Post?</span>
            </div>
          </label>

          <select
            onChange={handleFeaturedPostChange}
            value={featuredPost || ""}
            className="select select-bordered w-full"
            required
          >
            <option disabled value="">
              Featured post?
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select
            onChange={handleAuthorChange}
            value={selectedUserName || ""}
            className="mt-6 select select-bordered w-full"
            required
          >
            <option disabled value="">
              Assign to author?
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
          <select
            onChange={handleCategoryChange}
            value={selectedCategory || ""}
            className="select select-bordered w-full"
            required
          >
            <option disabled value="">
              Add category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={publishType}
            onChange={handlePublishTypeChange}
            className="mt-2 select select-bordered w-full"
          >
            <option value="now">Publish Now</option>
            <option value="date">Select Date</option>
          </select>

          {publishType === "date" && (
            <DatePicker
              selected={publishDate}
              onChange={(date) => setPublishDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Time"
              className="mt-4 input input-bordered w-full max-w-xs"
              minDate={new Date()}
            />
          )}

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
