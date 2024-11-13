import React, { useState } from "react";
import { RegisterUser } from "../../../types/UserTypes";
import Input from "../../utils/Form/Input";
import OTPInput from "../../utils/Form/OtpInput";
import Button from "../../utils/Button";
import axios, { AxiosResponse } from "axios";
import { checkPasswordStrength } from "../../../utilityFunctions";
import { Verified } from "@mui/icons-material";
import { CircularLoader } from "../../utils/Loaders";

interface Tab1Props {
  details: RegisterUser;
  setDetails: React.Dispatch<React.SetStateAction<RegisterUser>>;
  setError: React.Dispatch<React.SetStateAction<string>>
  setDisable: React.Dispatch<React.SetStateAction<boolean>>
}

const Tab1: React.FC<Tab1Props> = ({ details, setDetails, setError, setDisable }) => {
  const [otp, setOtp] = useState<string>("");
  const handleOTPChange = (otp: string) => {
    setOtp(otp);
  };
  const [otpLoading, setOtpLoading] = useState<boolean>(false)
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const sendOtp = async () => {
    if (details.email === '') {
      setError('Please enter an email.');
      return;
    }
  
    try {
      setOtpLoading(true);  
      const response: AxiosResponse<string> = await axios.post(
        "/auth/request-otp",
        { email: details.email },
        { withCredentials: true }
      );
      console.log(response.data);
      setShow(true);
      setError('');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'An error occurred while sending OTP');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setOtpLoading(false);  
    }
  };
  

  const verifyOtp = async () => {
    try {
      setVerifyLoading(true);  
      const response: AxiosResponse<string> = await axios.post(
        "/auth/verify-otp",
        { email: details.email, otp },
        { withCredentials: true }
      );
      console.log(response.data);
      setIsVerified(true)
      setError('')
      setDisable(false)
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'An error occurred while verifying OTP');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setVerifyLoading(false);  
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setDetails({ ...details, password: newPassword });
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = e.target.value;
    setDetails({ ...details, confirmPassword });
  };

  return (
    <div className="w-full px-6">
      <h1 className="text-xl font-bold pb-4">Basic Details</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              value={details.email}
              label="Email:"
              type="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
          </div>
          {otpLoading ?<CircularLoader size={24} /> :<Button
            onClickFunc={sendOtp}
            label="Send OTP"
            className="hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950"
          />}
        </div>
        {show && (
          <div className="flex gap-2 items-end">
            <OTPInput value={otp} onChange={handleOTPChange} />
            {!isVerified ? (verifyLoading ? <CircularLoader size={30} /> :<Button
              label="Verify"
              className="hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950 w-full"
              onClickFunc={verifyOtp}
            />) : <div className="w-full p-2 rounded-md text-center">Verified <Verified /></div>}
          </div>
        )}
        <Input
          value={details.password}
          label="Password:"
          type="password"
          onChange={handlePasswordChange}
        />
        {details.password && (
          <p
            className={`text-sm mt-2 ${
              passwordStrength === "weak"
                ? "text-red-500"
                : passwordStrength === "medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            Password strength: {passwordStrength}
          </p>
        )}
        <Input
          value={details.confirmPassword}
          label="Confirm Password:"
          type="password"
          onChange={handleConfirmPasswordChange}
        />
      </div>
    </div>
  );
};

export default Tab1;
