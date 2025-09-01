'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  Filter, 
  MessageSquarePlus, 
  Settings, 
  User,
  ChevronDown,
  BarChart3,
  Table,
  LayoutGrid,
  Bug,
  FileText
} from 'lucide-react';

import { Dropdown } from '../assets/Dropdown';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [selectedView, setSelectedView] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // View options for the first dropdown
  const viewOptions = [
    {
      value: 'chart',
      label: 'Chart View',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      value: 'table',
      label: 'Table View',
      icon: <Table className="h-4 w-4" />
    },
    {
      value: 'card',
      label: 'Card View',
      icon: <LayoutGrid className="h-4 w-4" />
    }
  ];

  // Report options for the second dropdown
  const reportOptions = [
    {
      value: 'bug',
      label: 'BUG',
      icon: <Bug className="h-4 w-4" />
    },
    {
      value: 'test-case',
      label: 'Test Case',
      icon: <FileText className="h-4 w-4" />
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-100 via-sky-50 to-blue-100 backdrop-blur-md border-b border-blue-200/30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-blue-100/50 transition-colors duration-200"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div>
                <Menu className='h-6 w-6 text-black' />
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
            >
              Resolution Pro
            </motion.h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <motion.div 
              className={`relative w-full transition-all duration-300 ${
                searchFocus ? 'transform scale-105' : ''
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors duration-200 ${
                  searchFocus ? 'text-blue-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                className="block w-[500px] pl-10 pr-3 py-2.5 border border-blue-200/50 rounded-full bg-white/70 backdrop-blur-sm placeholder-gray-500 focus:outline-none"
              />
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* View Options Dropdown */}
            <div className="relative group">
              <Dropdown
                options={viewOptions}
                placeholder="View Options"
                value={selectedView}
                onChange={setSelectedView}
                size="sm"
                className="w-40"
              />
            </div>

            {/* Report Options Dropdown */}
            <div className="relative group">
              <Dropdown
                options={reportOptions}
                placeholder="Report Options"
                value={selectedReport}
                onChange={setSelectedReport}
                size="sm"
                className="w-40"
              />
            </div>

            {/* Action Buttons */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <MessageSquarePlus className="h-4 w-4" />
              <span>Add Comment</span>
            </motion.button>

            {/* Settings & Profile */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200"
            >
              <Settings className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200"
            >
              <User className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-3">
                
                {/* Mobile Search */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2.5 border border-blue-200/50 rounded-lg bg-white/70 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                  />
                </motion.div>

                {/* Mobile Navigation Items */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  
                  {/* View Options Mobile */}
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm font-medium text-gray-900 border-b border-blue-200/30">
                      View Options
                    </div>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 rounded-lg transition-colors duration-150">
                      <BarChart3 className="h-4 w-4" />
                      <span>Chart View</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 rounded-lg transition-colors duration-150">
                      <Table className="h-4 w-4" />
                      <span>Table View</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 rounded-lg transition-colors duration-150">
                      <LayoutGrid className="h-4 w-4" />
                      <span>Card View</span>
                    </a>
                  </div>

                  {/* Report Options Mobile */}
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm font-medium text-gray-900 border-b border-blue-200/30">
                      Report Options
                    </div>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 rounded-lg transition-colors duration-150">
                      <Bug className="h-4 w-4" />
                      <span>BUG</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 rounded-lg transition-colors duration-150">
                      <FileText className="h-4 w-4" />
                      <span>Test Case</span>
                    </a>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="pt-2 space-y-2">
                    <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors duration-200">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-sm">
                      <MessageSquarePlus className="h-4 w-4" />
                      <span>Add Comment</span>
                    </button>
                    
                    <div className="flex items-center justify-center space-x-4 pt-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors duration-200">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors duration-200">
                        <User className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}