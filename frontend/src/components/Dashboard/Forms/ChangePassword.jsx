import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a Spinner component

export default function ChangePassword() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
      setError("All fields are required!");
      setIsLoading(false); // Stop loading
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New passwords do not match!");
      setIsLoading(false); // Stop loading
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("New password must be at least 8 characters long!");
      setIsLoading(false); // Stop loading
      return;
    }

    // Simulate API request
    setTimeout(() => {
      console.log("Password change request submitted:", passwordData);
      setSuccessMessage("Password changed successfully!");
      setError("");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsLoading(false); // Stop loading after success
    }, 2000); // Simulate API delay
  };

  return (
    <div className="h-screen flex justify-center items-start bg-gray-100 dark:bg-gray-900 pt-6">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Spinner className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
