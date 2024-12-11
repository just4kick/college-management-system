import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ViewRegistrationKey() {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [message, setMessage] = useState("");

  const keysPerPage = 10;

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call to fetch data
      setTimeout(() => {
        const mockData = {
          _id: "674d1ef044023e2de69009ae",
          departmentId: "674d1180e3869d3610892892",
          facultyKeys: [
            { key: "9878343333", isActive: true, _id: "674d1ef044023e2de69009af" },
            { key: "7676676767", isActive: true, _id: "674d1ef044023e2de69009b0" },
          ],
          studentKeys: [
            { key: "1234512345", isActive: true, _id: "674d1ef044023e2de69009b1" },
            { key: "5432154321", isActive: true, _id: "674d1ef044023e2de69009b2" },
          ],
          createdAt: "2024-12-02T02:44:00.524Z",
          updatedAt: "2024-12-02T12:18:53.325Z",
        };
        setData(mockData);
        setIsRefreshing(false);
      }, 2000);
    } catch (error) {
      setMessage("Error fetching data.");
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGrantKey = async (keyType, keyId) => {
    setIsLoading(true);
    try {
      // Simulate API request to grant key
      setTimeout(() => {
        setMessage("Key granted successfully!");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setMessage("Error granting key.");
      setIsLoading(false);
    }
  };

  const handleRevokeKey = async (keyType, keyId) => {
    setIsLoading(true);
    try {
      // Simulate API request to revoke key
      setTimeout(() => {
        setMessage("Key revoked successfully!");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setMessage("Error revoking key.");
      setIsLoading(false);
    }
  };

  const filteredKeys = (keys) =>
    keys.filter((key) => key.key.includes(searchQuery));

  const paginateKeys = (keys) => {
    const startIndex = (currentPage - 1) * keysPerPage;
    const endIndex = startIndex + keysPerPage;
    return keys.slice(startIndex, endIndex);
  };

  const renderKeysTable = (keys, keyType) => (
    <div className="overflow-auto max-h-[400px] mb-6 border border-gray-300 dark:border-gray-700 shadow-lg rounded-md">
      <table className="w-full text-left bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Key</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Department ID</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Active</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginateKeys(filteredKeys(keys)).map((key) => (
            <tr key={key._id} className="border-t dark:border-gray-700">
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                {key.key}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                {data.departmentId}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                {key.isActive ? "Yes" : "No"}
              </td>
              <td className="px-4 py-2">
                <Button
                  onClick={() => handleGrantKey(keyType, key._id)}
                  className="mr-2"
                >
                  Grant
                </Button>
                <Button
                  onClick={() => handleRevokeKey(keyType, key._id)}
                  variant="destructive"
                >
                  Revoke
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-2">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-gray-900 dark:text-gray-100">
          Page {currentPage}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * keysPerPage >= keys.length}
        >
          Next
        </Button>
      </div>
    </div>
  );

  if (!data) return <p>Loading data...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-6 shadow-lg border border-gray-300 dark:border-gray-700 rounded-md">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        View Registration Keys
      </h1>

      <div className="flex justify-between w-full max-w-4xl mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search key"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full mr-4"
        />
        <Button onClick={fetchData} disabled={isRefreshing}>
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Faculty Keys
      </h2>
      {renderKeysTable(data.facultyKeys, "faculty")}

      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Student Keys
      </h2>
      {renderKeysTable(data.studentKeys, "student")}

      {isLoading && <p>Processing your request...</p>}
      {message && <p className="mt-4 text-green-500 dark:text-green-400">{message}</p>}
    </div>
  );
}
