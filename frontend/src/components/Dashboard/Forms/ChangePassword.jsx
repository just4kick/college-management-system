import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePassword() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
      setError("All fields are required!");
      setIsLoading(false); 
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New passwords do not match!");
      setIsLoading(false); 
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long!");
      setIsLoading(false); 
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
        credentials:'include',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccessMessage("Password changed successfully!");
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Card className="w-[400px] max-w-full overflow-hidden justify-center mx-auto">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your account password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              id="oldPassword"
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              value={passwordData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm new password"
              value={passwordData.confirmNewPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Change Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}