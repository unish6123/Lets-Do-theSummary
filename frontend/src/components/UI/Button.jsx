import React from 'react';

const Button = ({ type, onClick, children, isLoading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 cursor-pointer rounded-md text-white font-semibold transition-all ${
        isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
      }`}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
