import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-bold">Logo</h1>
        <button onClick={handleToggle} className="text-2xl">
          {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
      </div>
      {isOpen && (
        <div className="px-4 py-3">
          <ul>
            <li>
              <a href="#" className="block py-2">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2">About</a>
            </li>
            <li>
              <a href="#" className="block py-2">Services</a>
            </li>
            <li>
              <a href="#" className="block py-2">Contact</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenuButton;