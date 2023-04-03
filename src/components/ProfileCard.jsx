import React from 'react';

const ProfileCard = () => {
  return (
    <div className="flex items-center justify-center m-2">
      <div className="bg-white shadow-lg rounded-lg w-80">
        <div className="bg-gray-300 h-64 rounded-t-lg flex items-center justify-center">
          <img src="https://source.unsplash.com/random/400x400" className="rounded-full w-48 h-48 object-cover" alt="profile" />
        </div>
        <div className="p-4 flex items-center flex-col">
          <h1 className="text-gray-900 font-bold text-2xl">John Doe</h1>
          <p className="text-gray-600 text-sm mt-2">Frontend Developer</p>
          <div className="mt-3">
            <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Follow</a>
            <a href="#" className="bg-white border-gray-900 border ml-2 text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Message</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;