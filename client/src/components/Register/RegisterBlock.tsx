import React, { useState } from "react";
import Button from "../utils/Button";
import { Google, Microsoft } from "@mui/icons-material";
import Tab1 from "./Tabs/Tab1";
import TabNavigation from "./TabNavigation/TabNavigation";
import Tab2 from "./Tabs/Tab2";
import Tab3 from "./Tabs/Tab3";
import { RegisterUser } from "../../types/UserTypes";
import axios from "axios";
import { CircularLoader } from "../utils/Loaders";
import { useNavigate } from "react-router-dom";

const renderTabs = (
  activeTab: string,
  details: RegisterUser,
  setDetails: React.Dispatch<React.SetStateAction<RegisterUser>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setDisable: React.Dispatch<React.SetStateAction<boolean>>
) => {
  switch (activeTab) {
    case "basic":
      return (
        <Tab1
          details={details}
          setDetails={setDetails}
          setError={setError}
          setDisable={setDisable}
        />
      );
    case "personal":
      return <Tab2 details={details} setDetails={setDetails} />;
    case "financial":
      return <Tab3 details={details} setDetails={setDetails} />;
  }
};

const RegisterBlock: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<RegisterUser>({
    fullname: "",
    email: "",
    avatar: null,
    avatarUrl: "",
    password: "",
    dob: "",
    gender: "male",
    monthlyIncome: "0",
    creditDate: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const registerWithGoogle = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const [disable, setDisable] = useState<boolean>(true);

  const handleNext = () => {
    if (activeTab === "basic") {
      if (details.email === "") {
        setError("Verify your email with otp");
        return;
      }
      if (details.password === "") {
        setError("Password cannot be null");
        return;
      }
      if (details.password === details.confirmPassword) {
        setError("");
        setActiveTab("personal");
      } else {
        setError("Password and Confirm password don't match");
        return;
      }
    }
    if (activeTab === "personal") {
      if (
        details.fullname === "" ||
        details.dob === "" ||
        details.gender === ""
      ) {
        setError("Enter all the details");
        return;
      } else if (!details.avatar) {
        setError("Select a display image");
        return;
      } else {
        setError("");
        setActiveTab("financial");
      }
    }
    if (activeTab === "financial") {
      if (details.monthlyIncome === "" || details.creditDate === "") {
        setError("Enter all the details");
        return;
      } else {
        registerUser();
      }
    }
  };

  const navigate = useNavigate()

  const registerUser = async () => {
    const {
      email,
      password,
      fullname,
      gender,
      dob,
      avatar,
      monthlyIncome,
      creditDate,
    } = details;
    if (!email || !password) {
      setError("Email or password is missing");
      setActiveTab("basic");
      return;
    }
    if (!fullname || !gender || !dob || !avatar) {
      setError("Provide all personal details");
      setActiveTab("personal");
      return;
    }
    if (!monthlyIncome || !creditDate) {
      setError("Provide all financial details");
      setActiveTab("financial");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", avatar as File); // Add the avatar file
      formData.append("email", email);
      formData.append("password", password);
      formData.append("fullname", fullname);
      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("monthlyIncome", monthlyIncome);
      formData.append("creditDate", creditDate);
      await axios.post("/auth/register", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate('/login')

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message || "An error occurred while registering"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (activeTab === "financial") setActiveTab("personal");
    else if (activeTab === "personal") setActiveTab("basic");
  };

  return (
    <div className="flex justify-center items-center  bg-zinc-900">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 sm:p-8 shadow-3xl max-w-xs sm:max-w-4xl w-full relative  h-[85vh] overflow-scroll">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        <div className="flex items-center">
          <div className="grid grid-cols-1 justify-center p-4 gap-2 w-2/3  ">
            <Button
              label="Register with Google"
              icon={Google}
              className="hover:-translate-y-1 text-white bg-zinc-900 hover:bg-zinc-950"
              onClickFunc={registerWithGoogle}
            />
            <Button
              label="Register with Microsoft"
              icon={Microsoft}
              className="hover:-translate-y-1 text-white bg-zinc-900 hover:bg-zinc-950"
            />
          </div>

          <div className="w-full border-l-[1px] border-zinc-500 h-[65vh]">
            <TabNavigation activeTab={activeTab} />
            {renderTabs(activeTab, details, setDetails, setError, setDisable)}
            {loading ? (
              <CircularLoader className="p-10 gap-4" label="Registering..." />
            ) : (
              <div className="grid grid-cols-2 gap-4 px-8">
                <Button
                  onClickFunc={handlePrev}
                  label="Back"
                  className={`${
                    disable
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:-translate-y-1 hover:bg-zinc-950"
                  } my-4 bg-zinc-900  mx-auto w-full`}
                  disabled={activeTab === "basic"}
                />
                <Button
                  onClickFunc={handleNext}
                  label={activeTab === "financial" ? "Register" : "Next"}
                  className={`${
                    disable
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:-translate-y-1 hover:bg-zinc-950"
                  } my-4 bg-zinc-900  mx-auto w-full`}
                  disabled={disable}
                />
              </div>
            )}
            {error !== "" && (
              <p className="text-red-500 font-thin text-md text-center">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBlock;
