import React, { useEffect, useState } from "react";

const AddTutorialForm = () => {
  const [title, setTitle] = useState();
  const [users, setUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [isActive, setIsActive] = useState("");

  const [formSubmitted, setFormSubmitted] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getusers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { error, result } = await response.json();

        if (error !== undefined) {
          console.log("Users Get error:", error);
        }
        setUsers(result);
      } catch (error) {
        console.error("Users Get operation error", error);
      }
    };
    fetchData();
  }, []);

  const handleIsActiveChange = (event) => {
    setIsActive(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedUserName(event.target.value);
  };

  const handleAddTutorial = async (e) => {
    try {
      e.preventDefault();

      setFormSubmitted(true);

      let error, result;

      const selectedUser = users.find(
        (user) => user.username === selectedUserName
      );

      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "addtutorial",
          title,
          authorId: selectedUser.id,
          is_active: isActive,
        }),
      });

      ({ error, result } = await response.json());

      if (error === undefined) {
        setTimeout(async () => {
          setTitle("");
          setFormSubmitted(false);
        }, 3000);
      }

      if (error !== undefined) {
        console.log("add Tutorial error:", error);
      }
    } catch (error) {
      console.error("add Tutorial operation error", error);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info">
            <span>Tutorial Added Successfully</span>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="first-letter:card w-full bg-base-100">
          <form className="card-body ">
            <h1 className="pt-4 text-center text-3xl font-semibold">
              Add Tutorial
            </h1>
            <div>
              <label className="form-control  w-full">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="input input-bordered w-full  placeholder-gray-500"
                />
              </label>

              <select
                onChange={handleIsActiveChange}
                value={isActive || ""}
                className="mt-3 select select-bordered w-full"
              >
                <option disabled value="">
                  Is Active?
                </option>
                <option>active</option>
                <option>inactive</option>
                {isActive === "" && (
                  <option disabled style={{ display: "none" }}>
                    Is Active?
                  </option>
                )}
              </select>

              <select
                onChange={handleSelectChange}
                value={selectedUserName || ""}
                className="mt-3 select select-bordered w-full"
              >
                <option disabled value="">
                  Assign to Author?
                </option>
                {users.map((user) => (
                  <option key={user.username}>{user.username}</option>
                ))}
                {selectedUserName === "" && (
                  <option disabled style={{ display: "none" }}>
                    Assign to Author?
                  </option>
                )}
              </select>

              <div className="flex justify-end col-span-2 mt-3">
                <button
                  onClick={(e) => handleAddTutorial(e)}
                  className="btn w-24 bg-[#dc2626] text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTutorialForm;
