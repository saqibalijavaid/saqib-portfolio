import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavigationDrawer from './NavigationDrawer';
import Footer from './Footer';

const Layout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleMenu = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Sidebar isOpen={isDrawerOpen} toggleMenu={toggleMenu} />

      <NavigationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="pl-16 md:pl-20 min-h-screen flex flex-col transition-colors duration-300">
        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
