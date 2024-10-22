"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

const EditCategory = () => {
  const router = useRouter();
  const { id } = useParams();
  // const [category, setCategory] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch category data on component mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch category data");
        }
        const data = await response.json();
        // setCategory(data);
        setName(data.name);
        setTitle(data.title);
        setDescription(data.description);
        setIsActive(data.isActive);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError("");

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          title,
          description,
          isActive,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      router.push("/admin/categories/all");
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
            <span>Category update successfully</span>
          </div>
        </div>
      )}

      <div>
        <div className="card w-full bg-base-100 rounded-md">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="pt-4 text-center text-3xl font-semibold">
              Edit Category
            </h1>

            <div className="mt-6">
              <label htmlFor="category" className="text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mt-6">
              <label htmlFor="category" className="text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mt-6">
              <label htmlFor="category" className="text-gray-700">
                Description
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default EditCategory;
