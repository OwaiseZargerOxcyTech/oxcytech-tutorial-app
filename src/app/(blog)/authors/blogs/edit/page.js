"use client";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
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
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [slug, setSlug] = useState("");
  const [imageName, setImageName] = useState("");
  const [authorId, setAuthorId] = useState();
  const [previousimage, setPreviousImage] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [blog, setBlog] = useState();
  const [blogLiveId, setBlogLiveId] = useState(null);
  const [featuredPost, setFeaturedPost] = useState("");

  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
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

    getBlogData();
  }, []);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDesc(blog.description);
      setContent(blog.content);
      setImage(blog.image);
      setSlug(blog.slug);
      setImageName("");
      setPreviousImage(blog.image);
      setSelectedId(blog.id);
      setAuthorId(blog.author_id);
      setBlogLiveId(blog.bloglive_id ? blog.bloglive_id : null);
      setFeaturedPost(blog.featuredpost);
    }
  }, [blog]);

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "employee") {
    return <div>Access Denied</div>;
  }

  const handleFeaturedPostChange = (event) => {
    setFeaturedPost(event.target.value);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImageName(selectedFile ? selectedFile.name : ""); // Set the file name
  };

  const handleBlogUpdate = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("slug", slug);
      formData.append("selectedId", selectedId);
      formData.append("previousimage", previousimage);
      formData.append("published", searchParams.get("published"));
      formData.append("author_id", authorId);
      formData.append("blogLiveId", blogLiveId);
      formData.append("featuredPost", featuredPost);

      const response = await fetch("/api/admin/blogs/update", {
        method: "PUT",
        body: formData,
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Blog Updated error:", error);
      }
      router.push("/authors/blogs/all");
    } catch (error) {
      console.error("Blog Update operation error", error);
    }
  };

  return (
    <>
      <div className="card w-full bg-base-100 rounded-md">
        <form className="card-body">
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
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Meta Description</span>
            </div>
            <textarea
              type="text"
              id="desc"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="textarea textarea-bordered placeholder-gray-500"
              placeholder="Meta Description"
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
              height: "100%", // Use px unit for height
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
              font: ["Arial", "Courier New"], // Example: specify fonts
              fontColor: "red", // Set font color
              backgroundColor: "red", // Set background color
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
          >
            <option disabled value="">
              featured post?
            </option>
            <option>yes</option>
            <option>no</option>
            {featuredPost === "" && (
              <option disabled style={{ display: "none" }}>
                featured post?
              </option>
            )}
          </select>

          <div className="flex justify-end">
            <button
              onClick={handleBlogUpdate}
              className="btn bg-[#dc2626] w-20 text-white"
            >
              Save
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
