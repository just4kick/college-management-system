import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const ViewKeys = () => {
  const [keys, setKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const keysPerPage = 10;

  useEffect(() => {
    handleFetchKeys();
  }, []);

  const handleFetchKeys = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/view-keys', {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Flatten the keys from the response
      const flattenedKeys = data.data.flatMap(dept => [
        ...dept.facultyKeys.map(key => ({ ...key, role: 'faculty', deptId: dept.departmentId })),
        ...dept.studentKeys.map(key => ({ ...key, role: 'student', deptId: dept.departmentId }))
      ]);

      setKeys(flattenedKeys);
    } catch (error) {
      setMessage("Error fetching keys.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrantKey = async (keyType, keyId) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/grant-keys', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchKey: keyId, role: keyType.toLowerCase() }),
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("Key granted successfully!");
      handleFetchKeys();
    } catch (error) {
      setMessage("Error granting key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeKey = async (keyType, keyId) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/revoke-keys', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchKey: keyId, role: keyType.toLowerCase() }),
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("Key revoked successfully!");
      handleFetchKeys();
    } catch (error) {
      setMessage("Error revoking key.");
    } finally {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>View Registration Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Search keys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          {message && <p className="mb-4">{message}</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginateKeys(filteredKeys(keys)).map((key) => (
                <TableRow key={key._id}>
                  <TableCell>{key.key}</TableCell>
                  <TableCell>{key.role}</TableCell>
                  <TableCell>{key.isActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <Button
                      variant="success"
                      onClick={() => handleGrantKey(key.role, key.key)}
                      disabled={isLoading}
                      className="bg-green-500 text-white"
                    >
                      {isLoading ? <Spinner /> : 'Grant'}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleRevokeKey(key.role, key.key)}
                      disabled={isLoading}
                      className="ml-2"
                    >
                      {isLoading ? <Spinner /> : 'Revoke'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewKeys;