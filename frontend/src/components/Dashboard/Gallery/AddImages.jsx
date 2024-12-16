import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const AddImages = () => {
  const [imageFor, setImageFor] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('imageFor', imageFor);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/gallery/add-images', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert('Images uploaded successfully!');
      setImageFor('');
      setImages([]);
    } catch (error) {
      console.error('Upload error:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[600px] max-w-full mx-auto mt-8">
      <CardHeader>
        <CardTitle>Add Images to Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="imageFor">Image For</Label>
            <Input
              id="imageFor"
              value={imageFor}
              onChange={(e) => setImageFor(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              onChange={handleImageChange}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Upload Images'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddImages;