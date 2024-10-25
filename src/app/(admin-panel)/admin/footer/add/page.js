"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const [footer, setFooter] = useState("");
  const [formSubmitted, setFormSubmitted] = useState("");

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  if (!session || session.user.name !== "admin") {
    return <div>Access Denied</div>;
  }

  const handleAddFooter = async (e) => {
    e.preventDefault();
    const slug = footer
      .toLowerCase()
      .trim()
      .replace(/[.]+/g, "")
      .replace(/^[^\w]+|[^\w]+$/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const isActive = true;

    try {
      const response = await fetch("/api/admin/footer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: footer,
          isActive,
          slug,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFooter("");
      } else {
        console.error("Failed to footer");
      }
    } catch (error) {
      console.error("Error while adding footer:", error);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Footer added successfully</span>
          </div>
        </div>
      )}

      <div>
        <div className="card w-full bg-base-100 rounded-md">
          <form className="card-body" onSubmit={handleAddFooter}>
            <h1 className="pt-4 text-center text-3xl font-semibold">
              Add Footer
            </h1>

            <div className="mt-6">
              <label htmlFor="footer" className="text-gray-700">
                Add Footer
              </label>
              <input
                type="text"
                id="footer"
                name="footer"
                value={footer}
                onChange={(e) => setFooter(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

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
