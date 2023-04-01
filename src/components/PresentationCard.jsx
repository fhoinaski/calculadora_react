import React from 'react';

const PresentationCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        className="w-full h-56 object-cover object-center"
        src="https://source.unsplash.com/random/800x800"
        alt="Profile"
      />
      <div className="p-4">
        <h3 className="text-2xl font-bold mb-2">John Doe</h3>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel elit sit amet felis
          eleifend ultrices. Nullam in porttitor neque, id congue magna.
        </p>
      </div>
      <div className="bg-gray-100 p-4">
        <span className="text-indigo-600 font-bold uppercase mr-2">Skills:</span>
        <span className="text-gray-700 text-sm">React, Tailwind CSS, Node., MongoDB</span>
      </div>
    </div>
  );
};

export default PresentationCard;