import React from 'react';

const InputField = ({ type, placeholder, value, onChange, error }) => {
  return (
    <div className="relative mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <span className="text-sm text-red-500 absolute bottom-0 left-0">{error}</span>
      )}
    </div>
  );
};

export default InputField;
