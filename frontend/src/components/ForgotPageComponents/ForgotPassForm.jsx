import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ForgotPassForm({ onOtpRequested }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/request-forgot-pass`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert('OTP sent successfully');
      onOtpRequested(email, role);
    } catch (error) {
      console.error('Error requesting OTP:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px] max-w-full overflow-hidden justify-center ">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email and select your role to receive an OTP.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRequestOtp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role-select">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : 'Request OTP'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}