import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddNotice() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isGlobal, setIsGlobal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call to add notice
      setTimeout(() => {
        setMessage("Notice added successfully!");
        setIsLoading(false);
        setTitle("");
        setContent("");
        setIsGlobal(false);
      }, 2000);
    } catch (error) {
      setMessage("Error adding notice.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 shadow-md rounded-md border border-gray-300 dark:border-gray-700"
      >
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Add Notice
        </h1>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">Content</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            rows="4"
            required
          ></textarea>
        </label>

        <label className="block mb-4">
          <input
            type="checkbox"
            checked={isGlobal}
            onChange={(e) => setIsGlobal(e.target.checked)}
            className="mr-2"
          />
          <span className="text-gray-700 dark:text-gray-300">Is Global</span>
        </label>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Notice"}
        </Button>

        {message && <p className="mt-4 text-green-500 dark:text-green-400">{message}</p>}
      </form>
    </div>
  );
}