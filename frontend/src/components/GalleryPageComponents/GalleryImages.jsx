import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const GalleryImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/gallery/global-images');
        const data = await response.json();
        if (response.ok) {
          setImages(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Global Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {images.map((image) => (
              <div key={image._id} className="flex-grow">
                <img src={image.imageURL} alt={image.imageFor} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryImages;