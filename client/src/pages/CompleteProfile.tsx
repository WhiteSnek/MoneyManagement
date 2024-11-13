import React, { useState } from "react";
import Input from "../components/utils/Form/Input";
import Button from "../components/utils/Button";
import { useNavigate } from "react-router-dom";
import Select from "../components/utils/Form/Select";
import axios from "axios";
import { CircularLoader } from "../components/utils/Loaders";

interface ProfileDetails {
  dob: string;
  password: string;
  gender: string;
  monthlyIncome: string;
  creditDate: string;
}

const CompleteProfile: React.FC = () => {
  const [details, setDetails] = useState<ProfileDetails>({
    dob: "",
    password: "",
    gender: "male",
    monthlyIncome: "",
    creditDate: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {dob, password, gender, monthlyIncome, creditDate} = details;
    if(password !== confirmPassword){
        setError("Password and confirm password must match");
        return;
    }
    if(gender === '' || dob === '' || monthlyIncome === '0' || creditDate === ''){
        setError("Enter all the fields")
        return;
    }
    try {
        setLoading(true);
        await axios.post("/user/complete-profile", details, {
          withCredentials: true,
        });
        navigate("/dashboard");
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data.message || "An error occurred while logging"
          );
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
  };

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center bg-zinc-900">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 sm:p-8 shadow-3xl max-w-xs sm:max-w-2xl w-full relative flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-4">
          Complete your profile
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 m-4 w-full max-w-xl"
        >
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              label="Password :"
              type="password"
            />
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password :"
              type="password"
            />
          </div>
          <Input
            value={details.dob}
            onChange={(e) => setDetails({ ...details, dob: e.target.value })}
            label="Date of Birth: "
            type="date"
          />
          <Select
            value={details.gender}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
            className="w-full bg-zinc-900"
            title="Gender:"
            onChange={(e) => setDetails({ ...details, gender: e.target.value })}
          />
          <Input
            value={details.monthlyIncome}
            label="Monthly Income:"
            type="text"
            inputMode="numeric"
            onChange={(e) =>
              setDetails({ ...details, monthlyIncome: e.target.value })
            }
          />
          <Input
            value={details.creditDate}
            label="Credit Date:"
            onChange={(e) =>
              setDetails({ ...details, creditDate: e.target.value })
            }
          />
          {loading ? (
            <CircularLoader className="p-10 gap-4" label="Updating Profile..." />
          ) : (
            <Button
              type="submit"
              label="Submit"
              className="hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950"
            />
          )}
        </form>
        {error !== "" && (
          <p className="text-red-500 font-thin text-md text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default CompleteProfile;
