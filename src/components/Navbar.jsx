import React from 'react';
import { MdSearch, MdNotifications, MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-darkCard shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="What are my upcoming expenses?"
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <MdSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <MdNotifications className="text-xl text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              1
            </span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {isDarkMode ? (
              <MdLightMode className="text-xl text-gray-300" />
            ) : (
              <MdDarkMode className="text-xl text-gray-600" />
            )}
          </button>

          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">
              DA
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-200">Dhanush Ariah</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">dhanushariah@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;