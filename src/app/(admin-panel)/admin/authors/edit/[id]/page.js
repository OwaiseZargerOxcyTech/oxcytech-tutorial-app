"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditAuthor = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const [author, setAuthor] = useState({
    username: "",
    authorName: "",
    email: "",
    password: "",
    authorDetail: "",
    image: null,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (id) {
      const fetchAuthor = async () => {
        const response = await fetch(`/api/getemployees/${id}`);

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          console.error(
            "Failed to fetch author:",
            response.status,
            response.statusText
          );
          return;
        }

        const data = await response.json();
        setAuthor(data);
      };

      fetchAuthor();
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAuthor((prev) => ({ ...prev, image: file }));
      setImageName(file.name); // Set the image name for display
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      setFormSubmitted(true);

      const formData = new FormData();
      formData.append("apiName", "updateemployee");
      formData.append("selectedId", id); // Use the id from params
      formData.append("username", author.username);
      formData.append("authorName", author.authorName);
      formData.append("email", author.email);
      formData.append("password", author.password);
      formData.append("authorDetail", author.authorDetail);
      if (author.image) {
        formData.append("image", author.image);
      }

      const response = await fetch("/api/combinedapi", {
        method: "POST",
        body: formData,
      });

      const { error } = await response.json();

      if (error) {
        setToastMessage("Error updating author.");
        console.log("Update Author error:", error);
      } else {
        setToastMessage("Author updated successfully.");
        setTimeout(() => {
          router.push("/admin/authors/all"); // Redirect after successful update
        }, 3000);
      }

      setFormSubmitted(false);
    } catch (error) {
      console.error("Employee Update operation error", error);
      setToastMessage("An error occurred while updating.");
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="card w-full bg-base-100">
          <form className="card-body" onSubmit={handleUpdate}>
            <h1 className="pt-4 text-center text-3xl font-semibold">
              Edit Author
            </h1>
            <div>
              <label className="form-control w-full">
                <div className="label ">
                  <span className="label-text font-bold ">UserName</span>
                </div>
                <input
                  type="text"
                  value={author.username}
                  onChange={(e) =>
                    setAuthor({ ...author, username: e.target.value })
                  }
                  placeholder="johndoe"
                  className="input input-bordered w-full placeholder-gray-500"
                />
              </label>
              <label className="form-control w-full">
                <div className="label ">
                  <span className="label-text font-bold ">Name of Author</span>
                </div>
                <input
                  type="text"
                  value={author.authorName}
                  onChange={(e) =>
                    setAuthor({ ...author, authorName: e.target.value })
                  }
                  placeholder="John Deo"
                  className="input input-bordered w-full placeholder-gray-500"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Email</span>
                </div>
                <input
                  type="email"
                  value={author.email}
                  onChange={(e) =>
                    setAuthor({ ...author, email: e.target.value })
                  }
                  placeholder="johndoe@gmail.com"
                  className="input input-bordered w-full placeholder-gray-500"
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-bold ">New Password</span>
                </div>
                <input
                  type="password"
                  value={author.password}
                  onChange={(e) =>
                    setAuthor({ ...author, password: e.target.value })
                  }
                  placeholder="new password"
                  className="input input-bordered w-full placeholder-gray-500"
                />
              </label>
              <div className="label">
                <span className="label-text font-bold ">Upload Image</span>
              </div>
              <label
                htmlFor="image"
                className="p-2 border form-control w-full border-gray-300 cursor-pointer text-gray-500 hover:text-blue-700"
              >
                <span>{imageName ? imageName : "Upload Author Image"}</span>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden mt-2 "
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-bold ">
                    Detail of Author
                  </span>
                </div>
                <textarea
                  value={author.authorDetail}
                  onChange={(e) =>
                    setAuthor({ ...author, authorDetail: e.target.value })
                  }
                  className="textarea textarea-bordered placeholder-gray-500"
                  placeholder="Author detail"
                  required
                ></textarea>
              </label>
              <div className="flex justify-end col-span-2 mt-3">
                <button
                  type="submit"
                  className="btn w-24 bg-[#dc2626] text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAuthor;
