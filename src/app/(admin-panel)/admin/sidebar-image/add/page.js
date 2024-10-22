"use client";
import { useState, useEffect } from "react";

const Page = () => {
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageName, setImageName] = useState("");
  const [error, setError] = useState(null);

  const fetchImage = async () => {
    try {
      const response = await fetch("/api/blogs/sideimage");
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const data = await response.json();
      // Additional handling of fetched data can be done here
    } catch (error) {
      console.error("Error fetching image:", error);
      setError("Error fetching image.");
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please upload an image (jpg, png, gif).");
        setImage(null);
        setImageName("");
        return;
      }
      if (file.size > maxSize) {
        alert("File size exceeds 5 MB.");
        setImage(null);
        setImageName("");
        return;
      }

      setImage(file);
      setImageName(file.name);
    } else {
      setImage(null);
      setImageName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("imageName", imageName);

    try {
      const response = await fetch("/api/blogs/sideimage", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to save image");
      }

      const result = await response.json();
      console.log("Image uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="card w-full bg-base-100 rounded-md">
        <form className="card-body" onSubmit={handleSubmit}>
          <h1 className="pt-4 text-center text-3xl font-semibold">
            Add Side Image
          </h1>

          <label
            htmlFor="image"
            className="p-2 border border-gray-300 cursor-pointer text-gray-500 hover:text-blue-700"
          >
            <span>{imageName ? imageName : "Upload Blog Image"}</span>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*" // restrict file selection to images
            />
          </label>

          {error && <div className="text-red-500">{error}</div>}

          <div className="flex justify-end mt-4">
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
