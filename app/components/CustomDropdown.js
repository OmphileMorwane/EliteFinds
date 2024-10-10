import React, { useState, useRef, useEffect } from 'react'; // Add this line

/**
 * CustomDropdown component for selecting options from a dropdown.
 *
 * @param {Object} props - The props for the component.
 * @param {Array} props.options - The options to display in the dropdown, each having a `value` and a `label`.
 * @param {string} props.value - The currently selected value.
 * @param {function} props.onChange - Callback function to be called when an option is selected.
 * @param {string} props.id - The unique identifier for the dropdown button.
 * @returns {JSX.Element} The rendered CustomDropdown component.
 */
const CustomDropdown = ({ options, value, onChange, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  /**
   * Handles option click event and updates the selected value.
   *
   * @param {string} optionValue - The value of the selected option.
   */
  const handleOptionClick = (optionValue) => {
    onChange(optionValue); // Call the passed onChange function
    setIsOpen(false); // Close the dropdown
  };

  // Find the currently selected option
  const selectedOption = options.find((opt) => opt.value === value);

  /**
   * Closes the dropdown if a click occurs outside of it.
   *
   * @param {MouseEvent} event - The mouse event.
   */
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-36" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 border hover:bg-gray-300 border-gray-400 rounded-md py-1.5 px-2 w-full text-left text-gray-700 font-medium focus:outline-none shadow-md hover:shadow-lg transition duration-200 ease-in-out flex items-center justify-between"
        id={id}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Display the selected option or a placeholder */}
        <span>{selectedOption ? selectedOption.label : "Select an option"}</span>
        <span
          className="ml-2 w-3 h-3 border-t-2 border-gray-600 transform transition-transform duration-200 ease-in-out"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        ></span>
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-gray-100 border border-gray-300 mt-1 rounded-md shadow-lg w-full transition duration-150 ease-in-out">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)} // Update selected option
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
