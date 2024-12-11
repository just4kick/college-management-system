import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ViewNotices() {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [message, setMessage] = useState("");

  const noticesPerPage = 10;

  // Mock data for notices
  const mockNotices = [
    { id: 1, title: "Notice 1", content: "https://example.com/1", isGlobal: true, deptID: "HR" },
    { id: 2, title: "Notice 2", content: "https://example.com/2", isGlobal: false, deptID: "Finance" },
    { id: 3, title: "Notice 3", content: "https://example.com/3", isGlobal: true, deptID: "IT" },
    { id: 4, title: "Notice 4", content: "https://example.com/4", isGlobal: false, deptID: "Sales" },
    { id: 5, title: "Notice 5", content: "https://example.com/5", isGlobal: true, deptID: "Marketing" },
    { id: 6, title: "Notice 6", content: "https://example.com/6", isGlobal: false, deptID: "HR" },
    { id: 7, title: "Notice 7", content: "https://example.com/7", isGlobal: true, deptID: "Finance" },
    { id: 8, title: "Notice 8", content: "https://example.com/8", isGlobal: false, deptID: "IT" },
    { id: 9, title: "Notice 9", content: "https://example.com/9", isGlobal: true, deptID: "Sales" },
    { id: 10, title: "Notice 10", content: "https://example.com/10", isGlobal: false, deptID: "Marketing" },
    { id: 11, title: "Notice 11", content: "https://example.com/11", isGlobal: true, deptID: "HR" },
    { id: 12, title: "Notice 12", content: "https://example.com/12", isGlobal: false, deptID: "Finance" },
    // Add more mock data as needed
  ];

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call to fetch data
      setTimeout(() => {
        setData(mockNotices);
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

  // Handle remove notice
  const handleRemove = async (id) => {
    setIsLoading(true);
    try {
      // Simulate API request to remove notice
      setTimeout(() => {
        setData(data.filter((notice) => notice.id !== id));
        setMessage("Notice removed successfully!");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setMessage("Error removing notice.");
      setIsLoading(false);
    }
  };

  const filteredNotices = data ? data.filter(
    (notice) => 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const paginateNotices = (notices) => {
    const startIndex = (currentPage - 1) * noticesPerPage;
    const endIndex = startIndex + noticesPerPage;
    return notices.slice(startIndex, endIndex);
  };

  const renderNoticesTable = () => (
    <div className="overflow-auto max-h-[400px] mb-6 border border-gray-300 dark:border-gray-700 shadow-lg rounded-md">
      <table className="w-full text-left bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Title</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Content</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Global</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">DeptID</th>
            <th className="px-4 py-2 text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginateNotices(filteredNotices).map((notice) => (
            <tr key={notice.id} className="border-t dark:border-gray-700">
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{notice.title}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                <a href={notice.content} target="_blank" rel="noopener noreferrer">
                  View Content
                </a>
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{notice.isGlobal ? "Yes" : "No"}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{notice.deptID}</td>
              <td className="px-4 py-2">
                <Button
                  onClick={() => handleRemove(notice.id)}
                  variant="destructive"
                >
                  Remove
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
          disabled={currentPage * noticesPerPage >= filteredNotices.length}
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
        View Notices
      </h1>

      <div className="flex justify-between w-full max-w-4xl mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or content"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full mr-4"
        />
        <Button onClick={fetchData} disabled={isRefreshing}>
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Notices
      </h2>
      {renderNoticesTable()}

      {isLoading && <p>Processing your request...</p>}
      {message && <p className="mt-4 text-green-500 dark:text-green-400">{message}</p>}
    </div>
  );
}
