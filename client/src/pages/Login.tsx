import React, { useState } from "react";
import Input from "../components/utils/Form/Input";
import Button from "../components/utils/Button";
import { Google, Microsoft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularLoader } from "../components/utils/Loaders";

interface LoginCredentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [details, setDetails] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (details.email === "" || details.password === "") {
      setError("Email and password cannot be null");
    }
    try {
      setLoading(true);
      const response = await axios.post("/auth/login", details, {
        withCredentials: true,
      });
      console.log(response.data);
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

  const loginWithGoogle = async () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="flex justify-center items-center bg-zinc-900">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 sm:p-8 shadow-3xl max-w-xs sm:max-w-2xl w-full relative flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-1 justify-center p-4 gap-2 w-2/3">
          <Button
            label="Sign in with Google"
            icon={Google}
            className="hover:-translate-y-1 text-white bg-zinc-900 hover:bg-zinc-950"
            onClickFunc={loginWithGoogle}
          />
          <Button
            label="Sign in with Microsoft"
            icon={Microsoft}
            className="hover:-translate-y-1 text-white bg-zinc-900 hover:bg-zinc-950"
          />
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 border-t-[1px] border-zinc-500 m-4 w-full max-w-sm"
        >
          <Input
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            label="Email :"
            type="email"
          />
          <Input
            value={details.password}
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            label="Password :"
            type="password"
          />
          {loading ? (
            <CircularLoader className="p-10 gap-4" label="Signing you in..." />
          ) : (
            <Button
              type="submit"
              label="Login"
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

export default Login;
