import React, { useState } from 'react';
import Menubar from '@/components/Menubar';
import ForgotPassForm from '@/components/ForgotPageComponents/ForgotPassForm';
import ResetPasswordForm from '@/components/ForgotPageComponents/ResetPasswordForm';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // Step 1: ForgotPassForm, Step 2: ResetPasswordForm
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // Callback function to handle when OTP is requested successfully
  const handleOtpRequested = (emailInput, roleInput) => {
    setEmail(emailInput);
    setRole(roleInput);
    setStep(2); // Move to the next step
  };

  return (
    <div>
      <Menubar />
      <div className="flex justify-center items-start min-h-screen pt-6">
        {step === 1 && <ForgotPassForm onOtpRequested={handleOtpRequested} />}
        {step === 2 && <ResetPasswordForm email={email} role={role} />}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;