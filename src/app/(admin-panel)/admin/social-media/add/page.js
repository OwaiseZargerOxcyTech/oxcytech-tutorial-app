"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const [socialmedia, setSocialmedia] = useState("");
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState("");
  const [formSubmitted, setFormSubmitted] = useState("");

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "admin") {
    return <div>Access Denied</div>;
  }

  const handleAddSocialMedia = async (e) => {
    e.preventDefault();

    const isActive = true;

    try {
      const response = await fetch("/api/socialmedia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: socialmedia,
          link,
          icon,
          isActive,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setSocialmedia("");
        setLink("");
        setIcon("");
      } else {
        console.error("Failed to add account");
      }
    } catch (error) {
      console.error("Error while adding account:", error);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Account added successfully</span>
          </div>
        </div>
      )}

      <div>
        <div className="card w-full bg-base-100 rounded-md">
          <form className="card-body" onSubmit={handleAddSocialMedia}>
            <h1 className="pt-4 text-center text-3xl font-semibold">
              Add Social Media Account
            </h1>

            <div className="mt-6">
              <label htmlFor="socialmedia" className="text-gray-700">
                Add Social Media Name
              </label>
              <input
                type="text"
                id="socialmedia"
                name="socialmedia"
                value={socialmedia}
                onChange={(e) => setSocialmedia(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mt-6">
              <label htmlFor="link" className="text-gray-700">
                Add Account Link
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mt-6">
              <label htmlFor="icon" className="text-gray-700">
                Add Icon Name
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <p>
              you can add Icon names : instagram, facebook, twitter, linkedin,
              youtube.
            </p>

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

export default Page;
