"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState();

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "admin") {
    return <div>Access Denied</div>;
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImageName(selectedFile ? selectedFile.name : ""); // Set the file name
  };

  const handleAddFavicon = async (e) => {
    try {
      e.preventDefault();
      setFormSubmitted(true);

      setTimeout(async () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("apiName", "addfavicon");

        const response = await fetch("/api/combinedapi", {
          method: "POST",
          body: formData,
        });

        const { error, result } = await response.json();

        if (error !== undefined) {
          console.log("Favicon Added error:", error);
        }
        setImage("");
        setImageName("");
        window.location.href = "/allblogadmin";
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Favicon addition operation error", error);
    }
  };
  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Favicon updated successfully</span>
          </div>
        </div>
      )}

      <div className="card w-full bg-base-100 rounded-md">
        <form className="card-body">
          <h1 className="pt-4 text-center text-3xl font-semibold">
            Add Favicon
          </h1>

          <label
            htmlFor="image"
            className="mt-6 p-2 border border-gray-300 cursor-pointer text-gray-500 hover:text-blue-700"
          >
            <span>{imageName ? imageName : "Upload Favicon Image"}</span>
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
              onSubmit={handleAddFavicon}
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

export default Page;
