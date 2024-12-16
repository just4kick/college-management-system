import React, { useState, useEffect } from "react";

export default function ViewDepartment() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/v1/admin/view-dept', {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();
        if (response.ok) {
          setDepartments(result.data);
          setError(null);
        } else {
          setError(result.message || "Failed to fetch departments.");
        }
      } catch (error) {
        setError("Something went wrong while fetching departments.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = departments.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          View Departments
        </h1>
        {isLoading ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            <span>Loading Data...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">#</th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    Department Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    Department ID
                  </th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    Courses
                  </th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((department, index) => (
                  <tr
                    key={department._id}
                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                  >
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                      {currentPage * rowsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                      {department.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                      {department.deptId}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                      {department.courses.join(", ")}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                      {new Date(department.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                    >
                      No departments available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {!isLoading && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(departments.length / rowsPerPage) - 1)
                )
              }
              disabled={currentPage >= Math.ceil(departments.length / rowsPerPage) - 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}