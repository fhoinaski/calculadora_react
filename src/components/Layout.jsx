import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4 flex flex-col md:flex-row md:items-center md:justify-center min-h-screen space-y-4 md:space-y-0 md:space-x-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
