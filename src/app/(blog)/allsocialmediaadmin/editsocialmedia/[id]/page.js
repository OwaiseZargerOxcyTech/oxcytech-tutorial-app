"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

const EditSocialmedia = () => {
  const router = useRouter();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch social media account data on component mount
  useEffect(() => {
    const fetchaccount = async () => {
      try {
        const response = await fetch(`/api/socialmedia/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch account data");
        }
        const data = await response.json();
        setName(data.name);
        setLink(data.link);
        setIcon(data.icon);
        setIsActive(data.isActive);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchaccount();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError("");

    try {
      const response = await fetch(`/api/socialmedia/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          link,
          icon,
          isActive,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update account");
      }

      router.push("/allsocialmediaadmin");
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
            <span>Account update successfully</span>
          </div>
        </div>
      )}

      <div>
        <div className="card w-full bg-base-100 rounded-md">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="pt-4 text-center text-3xl font-semibold">
              Edit Social Media Account
            </h1>

            <div className="mt-6">
              <label htmlFor="socialmedia" className="text-gray-700">
                Social Media Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <p>you can add Icon names : instagram, facebook, twitter, linkedin, youtube.</p>
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

export default EditSocialmedia;
