import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function SidePage() {
  const [imageUrl, setImageUrl] = useState('');


  // Fetch the image URL from the backend when the component mounts
  useEffect(() => {
    const fetchImage = async () => {
        try {
            const response = await fetch('/api/sideimage');
            const data = await response.json();

            if (response.ok && data.image) {
                setImageUrl(data.image);
            } else {
                setError('Image not found or response not okay');
            }
        } catch (error) {
            setError('Failed to fetch image');
            console.error('Failed to fetch image:', error);
        } 
    };

    fetchImage();
}, []);
  return (
    <div> 
      <Image
            src={imageUrl}
            alt="Side Image"
            width={500} 
            height={500} 
            className="w-full h-auto rounded-md shadow"
            crossOrigin="anonymous"
          />
    </div>
  );
}

export default SidePage;
