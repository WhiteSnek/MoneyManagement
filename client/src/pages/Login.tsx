import React, { useState } from 'react';
import Input from '../components/utils/Form/Input';
import Button from '../components/utils/Button';
import { Google, Microsoft } from '@mui/icons-material';

interface LoginCredentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [details, setDetails] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details.password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Proceed with login logic
      console.log('Form submitted', details);
    }
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
            className="hover:-translate-y-1 border-2 border-zinc-500 hover:border-zinc-700"
          />
          <Button
            label="Sign in with Microsoft"
            icon={Microsoft}
            className="hover:-translate-y-1 border-2 border-zinc-500 hover:border-zinc-700"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border-t-[1px] border-zinc-500 m-4 w-full max-w-sm">
          <Input
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            label="Email :"
            type="email"
          />
          <Input
            value={details.password}
            onChange={(e) => setDetails({ ...details, password: e.target.value })}
            label="Password :"
            type="password"
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password :"
            type="password"
          />
          
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <Button
            type="submit"
            label="Login"
            className="hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
