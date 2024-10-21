"use client";
import { useState, useEffect } from "react";

const Page = () => {
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Fetch the image from the server
  const fetchImage = async () => {
    try {
      const response = await fetch("/api/sideimage");
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
        return response.json();

    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("/api/sideimage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save image");
      }

      return response.json()
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="card w-full bg-base-100 rounded-md">
        <form className="card-body" onSubmit={handleSubmit}>
          <h1 className="pt-4 text-center text-3xl font-semibold">
            Add Logo Image
          </h1>

          <label
            htmlFor="image"
            className="p-2 border border-gray-300 cursor-pointer text-gray-500 hover:text-blue-700"
          >
            <span>Upload Blog Image</span>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
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
