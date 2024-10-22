"use client";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";

const DynamicSunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const decryptID = (encryptedID, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedID, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const EditSubTopic = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [subTopic, setSubTopic] = useState();
  const [subTopicLiveId, setSubTopicLiveId] = useState(null);
  const [preference, setPreference] = useState("");

  const { data: session, status } = useSession();

  const searchParams = useSearchParams();

  useEffect(() => {
    const getSubTutorialData = async () => {
      try {
        const encryptedID = searchParams.get("encryptedID");

        const subTopicID = decryptID(encryptedID, "thisissecret");

        const published = searchParams.get("published");

        const response = await fetch("/api/combinedapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiName: "fetchsubtopic",
            subTopicID,
            published,
          }),
        });

        const { error, result } = await response.json();

        if (error !== undefined) {
          console.log("subtopic fetchingerror:", error);
        }
        setSubTopic(result);
      } catch (error) {
        console.error("fetch subtopic operation error", error);
      }
    };

    getSubTutorialData();
  }, []);

  useEffect(() => {
    if (subTopic) {
      setTitle(subTopic.title);
      setDesc(subTopic.description);
      setContent(subTopic.content);
      setSlug(subTopic.slug);
      setSelectedId(subTopic.id);
      setPreference(subTopic.preference);
      setSubTopicLiveId(
        subTopic.subtopiclive_id ? subTopic.subtopiclive_id : null
      );
    }
  }, [subTopic]);

  if (status === "loading") {
    return <div></div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  const handlePreferenceChange = (event) => {
    setPreference(event.target.value);
  };

  const handleSubTopicUpdate = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("/api/combinedapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiName: "updatesubtopic",
          title,
          desc,
          content,
          slug,
          selectedId,
          published: searchParams.get("published"),
          subTopicLiveId,
          preference,
          topicslug: searchParams.get("topicslug"),
        }),
      });

      const { error, result } = await response.json();

      if (error !== undefined) {
        console.log("Subtopic Updated error:", error);
      }
      if (session.user.name === "admin") {
        window.location.href = `/tutorialadmin/${searchParams.get(
          "topicslug"
        )}`;
      } else {
        window.location.href = `/tutorialemployee/${searchParams.get(
          "topicslug"
        )}`;
      }
    } catch (error) {
      console.error("SubTopic Update operation error", error);
    }
  };

  return (
    <>
      <div className="card w-full bg-base-100 rounded-md">
        <form className="card-body">
          <h1 className="pt-4 text-center text-3xl font-semibold">
            Edit Sub Topic Details
          </h1>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full placeholder-gray-500"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Meta Description</span>
            </div>
            <textarea
              type="text"
              id="desc"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="textarea textarea-bordered placeholder-gray-500"
              placeholder="Meta Description"
            ></textarea>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">SubTopic Content</span>
            </div>
          </label>

          <DynamicSunEditor
            onChange={setContent}
            setContents={content}
            placeholder="Blog Content"
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
                ["font", "fontSize", "formatBlock", "align", "list", "table"],
                ["fontColor", "hiliteColor", "horizontalRule"],
              ],
              font: ["Arial", "Courier New"], // Example: specify fonts
              fontColor: "red", // Set font color
              backgroundColor: "red", // Set background color
            }}
          />

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Is Featured Post?</span>
            </div>
          </label>

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
              onClick={handleSubTopicUpdate}
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditSubTopic />
    </Suspense>
  );
}
