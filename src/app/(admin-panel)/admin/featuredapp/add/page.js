"use client";
import { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("/api/admin/featuredapp", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const { error, result } = await response.json();

      if (error) {
        console.log("feature app Added error:", error);
      }
      // Reset form fields
      setTitle("");
      setDescription("");
      setImage(null);
      setImageName("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setImageName(selectedFile.name);
    } else {
      setImage(null);
      setImageName("");
    }
  };

  return (
    <>
      <div className="card w-full bg-base-100 rounded-md">
        <form className="card-body" onSubmit={handleSubmit}>
          <h1 className="pt-4 text-center text-3xl font-semibold">
            Add Featured App
          </h1>

          <input
            type="text"
            id="text"
            name="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title text"
            className="mt-8 input input-bordered w-full placeholder-gray-500"
            required
          />

          <input
            type="text"
            id="text"
            name="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description text"
            className="mt-8 input input-bordered w-full placeholder-gray-500"
            required
          />

          <label
            htmlFor="image"
            className="p-2 mt-8 border border-gray-300 cursor-pointer text-gray-500 hover:text-blue-700"
          >
            <span>{imageName ? imageName : "Upload Featured app Image"}</span>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
