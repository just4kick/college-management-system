import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordForm({ email, role }) {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/reset-password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword,role }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert('Password reset successful');
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!email || !role) {
    return <p>Error: Missing email or role information.</p>;
  }

  return (
    <Card className="w-[400px] max-w-full overflow-hidden justify-center">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter the OTP sent to your email and set a new password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" value={email} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input type="text" value={role} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : 'Reset Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}