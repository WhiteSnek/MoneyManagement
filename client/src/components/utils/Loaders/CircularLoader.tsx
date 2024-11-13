import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface CircularLoaderProps {
    className?: string;
    size?: number; 
    label?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({ className = '', size = 24, label='' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <CircularProgress style={{ color: 'white' }} size={size} />
      {label}
    </div>
  );
};

export default CircularLoader;
