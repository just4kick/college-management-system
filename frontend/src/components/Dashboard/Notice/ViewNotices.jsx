import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ViewNotices() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  const noticesPerPage = 10;

  // Extract role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("user");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.role);
    }
  }, []);

  // Fetch notices based on role
  const fetchData = async () => {
    setIsRefreshing(true);
    setIsLoading(true);
    try {
      const endpoint = role === "admin" ? "view-notice" : "view-notice-hod";
      const response = await fetch(`http://localhost:8000/api/v1/${role}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setData(result.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setMessage("An error occurred while fetching the data.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (role) {
      fetchData();
    }
  }, [role]);

  // Filter notices based on search query
  const filteredNotices = data.filter(notice =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRemove = async (id) => {
    setIsLoading(true);
    try {
      const endpoint = role === "admin" ? "remove-notice" : "remove-notice-hod";
      const response = await fetch(`http://localhost:8000/api/v1/${role}/${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setMessage("Notice removed successfully!");
      fetchData();
    } catch (err) {
      console.error("Error removing notice:", err);
      setMessage("An error occurred while removing the notice.");
    } finally {
      setIsLoading(false);
    }
  };

  const globalNotices = currentNotices.filter(notice => notice.isGlobal);
  const departmentNotices = currentNotices.filter(notice => !notice.isGlobal);

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <Card className="w-full max-w-6xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle>VIEW NOTICES</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search Notices
              </label>
              <Input
                type="text"
                id="search"
                name="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on new search
                }}
                placeholder="Enter search query"
              />
            </div>
          </div>
          {message && <p className="mt-4 text-red-500 dark:text-red-400">{message}</p>}
          {isLoading ? (
            <div className="flex justify-center items-center mt-6">
              <Spinner className="w-10 h-10 animate-spin" />
            </div>
          ) : (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Global Notices</h2>
              {globalNotices.length > 0 ? (
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr>
                      <th className="py-2 border-b border-gray-300 dark:border-gray-700">Title</th>
                      <th className="py-2 border-b border-gray-300 dark:border-gray-700">Content</th>
                      <th className="py-2 border-b border-gray-300 dark:border-gray-700">Created By</th>
                      <th className="py-2 border-b border-gray-300 dark:border-gray-700">Created At</th>
                      {role !== "student" && <th className="py-2 border-b border-gray-300 dark:border-gray-700">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {globalNotices.map((notice) => (
                      <tr key={notice._id} className="border-b border-gray-300 dark:border-gray-700">
                        <td className="p-4">{notice.title}</td>
                        <td className="py-2">
                          <a href={notice.link || `/notices/${notice._id}`} className="text-blue-500 hover:underline">
                            {notice.content}
                          </a>
                        </td>
                        <td className="py-2">{notice.createdBy ? notice.createdBy.fullName : "N/A"}</td>
                        <td className="py-2">{new Date(notice.createdAt).toLocaleString()}</td>
                        {role === "admin" && (
                          <td className="py-2">
                            <Button
                              onClick={() => handleRemove(notice._id)}
                              className="px-4 py-2 bg-red-500 text-white rounded"
                              disabled={isLoading}
                            >
                              {isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : "Remove"}
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 mt-2">No global notices found.</p>
              )}
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-6 mb-2">Department Notices</h2>
              {departmentNotices.length > 0 ? (
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr>
                      <th className="py-2 border-b border-gray-300 dark:border-gray-700">Title</th>
                      <th className="py-2 border-b border-gray-300 dark:border-gray-700">Content</th>
                      <th className="py-2 border-b border-gray-300 dark:border-gray-700">Created By</th>
                      <th className="py-2 border-b border-gray-300 dark:border-gray-700">Created At</th>
                      {role !== "student" && <th className="py-2 border-b border-gray-300 dark:border-gray-700">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {departmentNotices.map((notice) => (
                      <tr key={notice._id} className="border-b border-gray-300 dark:border-gray-700">
                        <td className="p-4">{notice.title}</td>
                        <td className="py-2">
                          <a href={notice.link || `/notices/${notice._id}`} className="text-blue-500 hover:underline">
                            {notice.content}
                          </a>
                        </td>
                        <td className="py-2">{notice.createdBy ? notice.createdBy.fullName : "N/A"}</td>
                        <td className="py-2">{new Date(notice.createdAt).toLocaleString()}</td>
                        {role !== "student" && (
                          <td className="py-2">
                            <Button
                              onClick={() => handleRemove(notice._id)}
                              className="px-4 py-2 bg-red-500 text-white rounded"
                              disabled={isLoading}
                            >
                              {isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : "Remove"}
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 mt-2">No department notices found.</p>
              )}
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  Previous
                </Button>
                <span className="text-gray-700 dark:text-gray-300">Page {currentPage}</span>
                <Button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredNotices.length / noticesPerPage)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}