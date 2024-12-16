import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateField, setUpdateField] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const localData = localStorage.getItem('user')
  const user = JSON.parse(localData)
  const role = user.role;
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/v1/${role}/user-detail`, {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();
        if (result.success && result.statusCode === 200) {
          setUserData(result.data);
          setSuccessMessage(result.message);
          setErrorMessage("");
        } else {
          setErrorMessage("Failed to fetch user data.");
          setSuccessMessage("");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Something went wrong while fetching user data.");
        setSuccessMessage("");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [role]);

  const handleUpdate = (field) => {
    setUpdateField(field);
    setUpdateValue(userData[field]);
    setIsDialogOpen(true);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData();
    formData.append(updateField, updateValue);

    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/update-details`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccessMessage("User details updated successfully!");
      setUserData((prev) => ({ ...prev, [updateField]: updateValue }));
      setIsDialogOpen(false);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="h-full w-full bg-white dark:bg-gray-800 p-8 shadow-md border border-gray-300 dark:border-gray-700 rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        User Details
      </h1>

      {isLoading && <p className="text-lg text-gray-600 dark:text-gray-400">Loading data...</p>}

      {successMessage && (
        <div className="text-green-600 text-lg font-medium mb-6">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="text-red-600 text-lg font-medium mb-6">
          {errorMessage}
        </div>
      )}

      {userData && !isLoading ? (
        <div className="space-y-8">
          <div className="flex items-center space-x-6">
            <img
              src={userData.avatar}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full shadow-lg"
            />
            <div className="flex-1">
              <Label className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {userData.fullName}
              </Label>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                Role: <span className="font-medium">{userData.role}</span>
              </p>
              <Button onClick={() => handleUpdate("fullName")}>Update Name</Button>
            </div>
          </div>
          <div>
            <Label className="block text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Email:
            </Label>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {userData.email}
            </p>
            <Button onClick={() => handleUpdate("email")}>Update Email</Button>
          </div>
          <div>
            <Label className="block text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Phone Number:
            </Label>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {userData.phoneNumber}
            </p>
            <Button onClick={() => handleUpdate("phoneNumber")}>Update Phone Number</Button>
          </div>
          <div>
            <Label className="block text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Face Registered:
            </Label>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {userData.isFaceRegistered ? "Yes" : "No"}
            </p>
          </div>
        </div>
      ) : (
        !isLoading && <p className="text-lg text-gray-600 dark:text-gray-400">No user data available.</p>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update {updateField}</DialogTitle>
            <DialogDescription>
              Please enter the new {updateField}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitUpdate}>
            <Input
              type="text"
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              required
            />
            <DialogFooter>
              <Button type="submit" className="mt-4" disabled={isUpdating}>
                {isUpdating ? <Spinner /> : `Change ${updateField}`}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}