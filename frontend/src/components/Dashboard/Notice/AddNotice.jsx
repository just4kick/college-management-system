import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddNotice() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isGlobal, setIsGlobal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  // Extract role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("user");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.role);
      if (parsedRole.role === "admin") {
        setIsGlobal(true);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = role === "admin" ? "add-notice" : "add-notice-hod";
      const response = await fetch(`http://localhost:8000/api/v1/${role}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, content, isGlobal }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setMessage("Notice added successfully!");
      setTitle("");
      setContent("");
      setIsGlobal(role === "admin");
    } catch (error) {
      setMessage("Error adding notice.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <Card className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 shadow-md rounded-md border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle>ADD NOTICE</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notice title"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content
              </label>
              <Textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter notice content"
                required
              />
            </div>
            {role === "admin" && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isGlobal"
                  name="isGlobal"
                  checked={isGlobal}
                  onChange={(e) => setIsGlobal(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isGlobal" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Global Notice
                </label>
              </div>
            )}
            <Button type="submit" className="w-full mt-6 flex items-center justify-center" disabled={isLoading}>
              {isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : "Add Notice"}
            </Button>
          </form>
          {message && <p className="mt-4 text-green-500 dark:text-green-400">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}