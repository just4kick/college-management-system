import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ChangePassword() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
      setError("All fields are required!");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New passwords do not match!");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("New password must be at least 8 characters long!");
      return;
    }

    console.log("Password change request submitted:", passwordData);
    setSuccessMessage("Password changed successfully!");
    setError("");
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <div className="h-full w-full bg-white dark:bg-gray-800 p-6 shadow-md">
      <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Change Password
      </h1>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="oldPassword">Old Password</Label>
          <Input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handleChange}
            placeholder="Enter old password"
            required
          />
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />
        </div>
        <div>
          <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
          <Input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Change Password
        </Button>
      </form>
    </div>
  );
}
