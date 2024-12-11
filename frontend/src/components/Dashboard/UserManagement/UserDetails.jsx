import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UserDetail() {
  const [userData, setUserData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);  // Track loading state

  const mockData = {
    statusCode: 200,
    data: {
      _id: "6747e11eb5c8b29e9d9ec6a9",
      fullName: "Akash Kumar",
      email: "notforpersonalusage@gmail.com",
      phoneNumber: "9433662867",
      role: "admin",
      avatar: "http://res.cloudinary.com/cdakash/image/upload/v1732763932/ikwc6qtqzcdbl7tmjnal.jpg",
      isFaceRegistered: true,
      registrationKeys: [],
      notices: [],
      createdAt: "2024-11-28T03:18:54.467Z",
      updatedAt: "2024-12-10T10:45:30.583Z",
      __v: 0,
    },
    message: "Data fetched successfully.",
    success: true,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);  // Set loading state to true when starting to fetch data
      try {
        // Simulate fetching user data (you can replace this with your actual API call)
        setTimeout(() => {
          const result = mockData; // Simulating API response
          if (result.success && result.statusCode === 200) {
            setUserData(result.data);
            setSuccessMessage(result.message);
            setErrorMessage("");
          } else {
            setErrorMessage("Failed to fetch user data.");
            setSuccessMessage("");
          }
          setIsLoading(false);  // Set loading state to false after fetching is done
        }, 2000); // Simulating delay
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Something went wrong while fetching user data.");
        setSuccessMessage("");
        setIsLoading(false);  // Set loading state to false if there's an error
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="h-full w-full bg-white dark:bg-gray-800 p-8 shadow-md border border-gray-300 dark:border-gray-700 rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        User Details
      </h1>

      {/* Show loading message */}
      {isLoading && <p className="text-lg text-gray-600 dark:text-gray-400">Loading data...</p>}

      {/* Success or Error Message */}
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

      {/* Display User Data once it is loaded */}
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
            </div>
          </div>
          <div>
            <Label className="block text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Email:
            </Label>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {userData.email}
            </p>
          </div>
          <div>
            <Label className="block text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Phone Number:
            </Label>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {userData.phoneNumber}
            </p>
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
    </div>
  );
}
