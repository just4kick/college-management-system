import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ViewImages = () => {
  const [globalImages, setGlobalImages] = useState([]);
  const [deptImages, setDeptImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const globalResponse = await fetch('http://localhost:8000/api/v1/gallery/global-images');
        const globalData = await globalResponse.json();
        if (globalResponse.ok) {
          setGlobalImages(globalData.data);
        } else {
          console.error(globalData.message);
        }

        const deptResponse = await fetch('http://localhost:8000/api/v1/gallery/dept-images');
        const deptData = await deptResponse.json();
        if (deptResponse.ok) {
          setDeptImages(deptData.data);
        } else {
          console.error(deptData.message);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    setDeleteLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await fetch(`http://localhost:8000/api/v1/gallery/remove-image/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setGlobalImages((prev) => prev.filter((image) => image._id !== id));
      setDeptImages((prev) => prev.filter((image) => image._id !== id));
      setDeleteSuccess((prev) => ({ ...prev, [id]: true }));
    } catch (error) {
      console.error('Delete error:', error);
      alert(error.message);
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Global Images</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image URL</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {globalImages.map((image) => (
                <TableRow key={image._id}>
                  <TableCell>
                    <a href={image.imageURL} target="_blank" rel="noopener noreferrer">
                      {image.imageURL}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(image._id)}
                      disabled={deleteLoading[image._id]}
                    >
                      {deleteLoading[image._id] ? <Spinner /> : 'Delete'}
                    </Button>
                    {deleteSuccess[image._id] && <span className="text-green-500 ml-2">Deleted</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Department Images</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image URL</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deptImages.map((image) => (
                <TableRow key={image._id}>
                  <TableCell>
                    <a href={image.imageURL} target="_blank" rel="noopener noreferrer">
                      {image.imageURL}
                    </a>
                  </TableCell>
                  <TableCell>{image.imageFor}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(image._id)}
                      disabled={deleteLoading[image._id]}
                    >
                      {deleteLoading[image._id] ? <Spinner /> : 'Delete'}
                    </Button>
                    {deleteSuccess[image._id] && <span className="text-green-500 ml-2">Deleted</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewImages;