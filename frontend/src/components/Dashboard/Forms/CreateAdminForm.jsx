import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateAdminForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [avatar, setAvatar] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);
    formData.append('role', role);
    if (avatar) formData.append('avatar', avatar);
    if (cameraImage) formData.append('cameraImage', cameraImage);

    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/create-Admin', {
        method: 'POST',
        body: formData,
        credentials:'include'
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccessMessage("Admin created successfully!");
      // Optionally reset form or redirect
    } catch (error) {
      console.error('Error creating admin:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px] max-w-full overflow-hidden justify-center mx-auto">
      <CardHeader>
        <CardTitle>Create Admin</CardTitle>
        <CardDescription>Fill in the details to create a new admin.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatar">Upload Avatar</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cameraImage">Upload Camera Image</Label>
            <Input
              id="cameraImage"
              type="file"
              accept="image/*"
              onChange={(e) => setCameraImage(e.target.files[0])}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : 'Create Admin'}
          </Button>
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        </form>
      </CardContent>
    </Card>
  );
}