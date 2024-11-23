import React, { useState } from "react";
import Input from "../../../../utils/Form/Input";
import AvatarInput from "../../../../utils/Form/AvatarInput";
import Button from "../../../../utils/Button";
import NumberInput from "../../../../utils/Form/NumberInput";
import { useUser } from "../../../../../providers/UserProvider";
import axios, { AxiosResponse } from "axios";
import { CircularLoader } from "../../../../utils/Loaders";
import OTPInput from "../../../../utils/Form/OtpInput";
import { Verified } from "@mui/icons-material";

export interface UserDetails {
  avatar: string | ArrayBuffer | null | File;
  avatarUrl: string;
  email: string;
}

const EditDetails: React.FC = () => {
  const { user } = useUser();

  const [details, setDetails] = useState<UserDetails>({
    avatar: "",
    avatarUrl: "",
    email: "",
  });

  const [creditDate, setCreditDate] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<number>(
    user ? parseInt(user.monthlyIncome?.toString() || "0") : 0
  );

  const [otp, setOtp] = useState<string>("");
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleSubmit = async () => {
    const { email, avatar } = details;
    const formData = new FormData();

    if (email !== "" && isVerified) formData.append("email", email);
    if (avatar) formData.append("avatar", avatar as File);
    if (creditDate !== "") formData.append("creditDate", creditDate);
    if (
      monthlyIncome !==
      (user ? parseInt(user.monthlyIncome?.toString() || "0") : 0)
    )
      formData.append("monthlyIncome", monthlyIncome.toString());

    try {
      const res = await axios.patch("/user/change-profile", formData, {
        withCredentials: true,
      });
      console.log(res)
    } catch (error: any) {
      console.error("Error submitting changes:", error.response?.data || error);
    }
  };

  const handleAvatarChange = (file: File, url: string) => {
    setDetails({ ...details, avatar: file, avatarUrl: url });
  };

  const sendOtp = async () => {
    try {
      setOtpLoading(true);
      const response: AxiosResponse<string> = await axios.post(
        "/auth/request-otp",
        { email: details.email },
        { withCredentials: true }
      );
      console.log(response.data);
      setShow(true);
      setError("");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Error while sending OTP.");
      } else {
        setError("An unexpected error occurred.");
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
      setIsVerified(true);
      setError("");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Error while verifying OTP.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleOTPChange = (otp: string) => {
    setOtp(otp);
  };

  return (
    <div className="px-4">
      <h1 className="text-lg font-semibold text-zinc-200 border-b-[1px] border-zinc-600 py-2">
        Edit Details
      </h1>
      <div className="p-2">
        <h3 className="text-zinc-500">Basic Details</h3>
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Email:</p>
          <div className="col-span-2">
            <Input
              value={details.email}
              type="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              className="w-full"
            />
          </div>
        </div>
        {otpLoading ? (
          <CircularLoader size={24} />
        ) : (
          <Button
            onClickFunc={sendOtp}
            label="Send OTP"
            className={`bg-zinc-900 w-full ${
              details.email === ""
                ? "opacity-50 cursor-not-allowed"
                : "hover:-translate-y-1 hover:bg-zinc-950"
            }`}
            disabled={details.email === ""}
          />
        )}
        {show && (
          <div className="flex gap-2 items-end py-4 scale-90">
            <OTPInput value={otp} onChange={handleOTPChange} />
            {!isVerified ? (
              verifyLoading ? (
                <CircularLoader size={30} />
              ) : (
                <Button
                  label="Verify"
                  className="hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950 w-full"
                  onClickFunc={verifyOtp}
                />
              )
            ) : (
              <div className="w-full p-2 rounded-md text-center">
                Verified <Verified />
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Avatar:</p>
          <div className="col-span-2">
            <AvatarInput
              avatarUrl={details.avatarUrl || ""}
              setAvatar={handleAvatarChange}
            />
          </div>
        </div>
        <h3 className="text-zinc-500">Preferences</h3>
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Set Credit Date:</p>
          <div className="col-span-2">
            <Input
              value={creditDate}
              type="text"
              onChange={(e) => setCreditDate(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Change Monthly Income:</p>
          <div className="col-span-2">
            <NumberInput
              value={monthlyIncome}
              onChange={setMonthlyIncome}
              step={100}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          label="Submit Changes"
          onClickFunc={handleSubmit}
          className={`${
            details.email === "" || isVerified
              ? "hover:-translate-y-1 hover:bg-zinc-950"
              : "opacity-50 cursor-not-allowed"
          } bg-zinc-900`}
          disabled={details.email !== "" && !isVerified}
        />
      </div>
      {error !== "" && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default EditDetails;
