"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

const EditFeaturedApp = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  //   const [isActive, setIsActive] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch footer data on component mount
  useEffect(() => {
    const fetchFeaturedApp = async () => {
      try {
        const response = await fetch(`/api/admin/featuredapp/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch featured app data");
        }
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        console.log(data);
        // setIsActive(data.isActive);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchFeaturedApp();
    }
  }, [id]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImageName(selectedFile ? selectedFile.name : ""); // Set the file name
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }
      const response = await fetch(`/api/admin/featuredapp/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update featuredapp");
      }

      router.push("/admin/featuredapp/all");
    } catch (err) {
      setError(err.message);
      setFormSubmitted(false);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Featured app update successfully</span>
          </div>
        </div>
      )}

      <div>
        <div className="card w-full bg-base-100 rounded-md">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="pt-4 text-center text-3xl font-semibold">
              Edit Featured App
            </h1>

            <label htmlFor="title" className="text-gray-700">
              Featured App Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              required
            />
            <label htmlFor="description" className="text-gray-700">
              Add Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              required
            />
            <label
              htmlFor="image"
              className="p-2 mt-2 border border-gray-300 cursor-pointer text-gray-500 hover:text-blue-700"
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
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn bg-[#dc2626] w-20 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFeaturedApp;
