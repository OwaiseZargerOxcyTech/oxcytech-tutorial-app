"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

const EditFooter = () => {
  const router = useRouter();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [footerLink, setFooterLink] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch footer data on component mount
  useEffect(() => {
    const fetchfooters = async () => {
      try {
        const response = await fetch(`/api/admin/footer/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }
        const data = await response.json();
        setName(data.name);
        setFooterLink(data.link);
        setIsActive(data.isActive);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchfooters();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/footer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          isActive,
          link: footerLink,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update footer");
      }

      router.push("/admin/footer/all");
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
            <span>Footer update successfully</span>
          </div>
        </div>
      )}

      <div>
        <div className="card w-full bg-base-100 rounded-md">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="pt-4 text-center text-3xl font-semibold">
              Edit Footer
            </h1>

            <div className="mt-6">
              <label htmlFor="footer" className="text-gray-700">
                Footer Name
              </label>
              <input
                type="text"
                id="footer"
                name="footer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mt-6">
              <label htmlFor="footerlink" className="text-gray-700">
                Add Footer Link
              </label>
              <input
                type="text"
                id="footerlink"
                name="footerlink"
                value={footerLink}
                onChange={(e) => setFooterLink(e.target.value)}
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

export default EditFooter;
