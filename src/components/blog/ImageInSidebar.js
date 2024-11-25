import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ImageInSidebar() {
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  // Fetch the image URL from the backend when the component mounts
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("/api/blogs/sideimage");
        const data = await response.json();
        const altName = data.result.altText;
        const link = data.result.link;
        setAltText(altName);
        setLink(link);
        if (response.ok && data.result.imageUrl) {
          setImageUrl(data.result.imageUrl);
        } else {
          setError("Image not found or response not okay");
        }
      } catch (error) {
        setError("Failed to fetch image");
        console.error("Failed to fetch image:", error);
      }
    };

    fetchImage();
  }, []);
  return (
    <div>
      {imageUrl && (
        <Link prefetch={false} href={`/ft/${link}`}>
          <Image
            src={imageUrl}
            alt={altText}
            width={300}
            height={300}
            className="w-full h-auto rounded-md shadow"
            crossOrigin="anonymous"
          />
        </Link>
      )}
    </div>
  );
}

export default ImageInSidebar;
