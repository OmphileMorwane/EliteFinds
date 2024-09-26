"use client";
import React, { useState } from "react";

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative inline-block w-36"> {/* Adjusted width here */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 border border-gray-300 rounded-md py-1.5 px-2 w-full text-left text-gray-700 font-medium focus:outline-none shadow-md hover:shadow-lg transition duration-200 ease-in-out flex items-center justify-between"
      >
        <span>{selectedOption ? selectedOption.label : "Select an option"}</span>
        {/* Dropdown arrow */}
        <span className="ml-2 w-3 h-3 border-t-2 border-gray-600 transform transition-transform duration-200 ease-in-out" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}></span>
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-gray-100 border border-gray-300 mt-1 rounded-md shadow-lg w-full transition duration-150 ease-in-out">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="p-2 text-gray-800 hover:bg-green-500 hover:text-white rounded-md cursor-pointer transition duration-150 ease-in-out"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;




