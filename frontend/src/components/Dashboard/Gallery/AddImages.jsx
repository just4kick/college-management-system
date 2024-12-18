import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const AddImages = () => {
  const [imageFor, setImageFor] = useState('');
  const [images, setImages] = useState([]);
  const [isGlobal, setIsGlobal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('imageFor', imageFor);
    formData.append('isGlobal', isGlobal);
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

      // Handle success
      setImageFor('');
      setImages([]);
      setIsGlobal(false);
      setIsLoading(false);
      alert('Images added successfully!');
    } catch (error) {
      // Handle error
      setIsLoading(false);
      alert('Error adding images: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <Card className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 shadow-md rounded-md border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle>ADD IMAGES</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="imageFor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image For
              </Label>
              <Input
                type="text"
                id="imageFor"
                name="imageFor"
                value={imageFor}
                onChange={(e) => setImageFor(e.target.value)}
                placeholder="Enter department or global"
                required
              />
            </div>
            <div>
              <Label htmlFor="images" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Upload Images
              </Label>
              <Input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleImageChange}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isGlobal"
                name="isGlobal"
                checked={isGlobal}
                onChange={(e) => setIsGlobal(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="isGlobal" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Global Image
              </Label>
            </div>
            <Button type="submit" className="w-full mt-6 flex items-center justify-center" disabled={isLoading}>
              {isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : "Add Images"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddImages;