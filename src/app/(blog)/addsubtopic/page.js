"use client";
import { useState, Suspense } from "react";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import SideNav from "@/components/sidebar/SideNav";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const DynamicSunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const AddSubTopic = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState("N");
  const [preference, setPreference] = useState("");
  const [formSubmitted, setFormSubmitted] = useState();

  const { data: session, status } = useSession();

  const searchParams = useSearchParams();

  if (status === "loading") {
    return <div></div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  const handlePreferenceChange = (event) => {
    setPreference(event.target.value);
  };

  const handleAddSubTopic = async (e) => {
    try {
      e.preventDefault();
      setFormSubmitted(true);

      setTimeout(async () => {
        setPublished("N");

        const topicslug = searchParams.get("topicslug");

        const response = await fetch("/api/combinedapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiName: "addsubtopic",
            title,
            desc,
            content,
            published,
            topicslug,
            preference,
          }),
        });

        const { error, result } = await response.json();

        if (error !== undefined) {
          console.log("Subtopic Added error:", error);
        }
        setTitle("");
        setDesc("");
        setContent("");
        if (session.user.name === "admin") {
          window.location.href = `/tutorialadmin/${topicslug}`;
        } else {
          window.location.href = `/tutorialemployee/${topicslug}`;
        }
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("SubTopic addition operation error", error);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>SubTopic created successfully</span>
          </div>
        </div>
      )}
      <div className=" px-6 py-10 sm:px-8 sm:py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-x-10">
          <div className=" col-span-3 space-y-10">
            <SideNav />
          </div>

          <div className="col-span-9">
            <div className="card w-full bg-base-100 rounded-md">
              <form className="card-body">
                <h1 className="pt-4 text-center text-3xl font-semibold">
                  Add Subtopic Details
                </h1>

                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="SubTopic Title"
                  className="mt-8 input input-bordered w-full placeholder-gray-500"
                />

                <textarea
                  type="text"
                  id="desc"
                  name="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="textarea textarea-bordered placeholder-gray-500"
                  placeholder="Meta Description"
                ></textarea>

                <DynamicSunEditor
                  onChange={setContent}
                  setContents={content}
                  placeholder="SubTopic Content"
                  className="text-black"
                  height="300px"
                  setOptions={{
                    height: "100%", // Use px unit for height
                    buttonList: [
                      ["undo", "redo"],
                      [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                      ],
                      ["removeFormat"],
                      ["outdent", "indent"],
                      ["fullScreen", "showBlocks", "codeView"],
                      ["preview", "print"],
                      ["link", "image", "video"],
                      [
                        "font",
                        "fontSize",
                        "formatBlock",
                        "align",
                        "list",
                        "table",
                      ],
                      ["fontColor", "hiliteColor", "horizontalRule"],
                    ],
                    font: ["Arial", "Courier New"], // Example: specify fonts
                    fontColor: "red", // Set font color
                    backgroundColor: "red", // Set background color
                  }}
                />

                <select
                  onChange={handlePreferenceChange}
                  value={preference || ""}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    preference?
                  </option>
                  {[...Array(50).keys()].map((index) => (
                    <option key={index + 1}>{index + 1}</option>
                  ))}
                  {preference === "" && (
                    <option disabled style={{ display: "none" }}>
                      preference?
                    </option>
                  )}
                </select>

                <div className="flex justify-end">
                  <button
                    onClick={handleAddSubTopic}
                    className="btn bg-[#dc2626] w-20 text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddSubTopic />
    </Suspense>
  );
}
