// src/components/dashboard/DashboardNav.tsx
'use client';

import React from 'react';
import { Apple, Bell, Search, Settings } from 'lucide-react';
//import { NavItem } from '@/types/dashboard';
import Image from 'next/image';

// const navItems: NavItem[] = [
//   { label: 'Overview', value: 'overview' },
//   { label: 'Clients', value: 'clients' },
//   { label: 'Calendar', value: 'calendar' },
//   { label: 'Rules', value: 'rules' },
//   { label: 'Help', value: 'help' }
// ];

const DashboardNav: React.FC = () => (
  <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 group">
            {/* <Apple className="w-8 h-8 text-teal-500 transition-transform group-hover:rotate-12" /> */}
            <div className="flex-shrink-0">
            <Image
              src="/logo.png" // Make sure to add your logo to the public folder
              alt="Logo"
              width={150}
              height={150}
              className="h-12 w-auto"
            />
          </div>
            <span className="text-xl font-medium bg-gradient-to-r from-teal-500 to-emerald-400 bg-clip-text text-transparent">
              DytoClick
            </span>
          </div>
          {/* <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setSelectedTab(item.value)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  selectedTab === item.value 
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-400 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-teal-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div> */}
        </div>
        <div className="flex items-center space-x-4">
          {/* <div className="relative group">
            <input
              type="text"
              placeholder="Search clients..."
              className="w-64 pl-10 pr-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
            <Search className="w-5 h-5 text-teal-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-teal-600 transition-colors" />
          </div> */}
          <button className="p-2 rounded-full hover:bg-teal-50 transition-colors duration-300">
            <Bell className="w-5 h-5 text-teal-500" />
          </button>
          <Settings className="w-5 h-5 text-teal-500 cursor-pointer hover:rotate-90 transition-transform duration-500" />
        </div>
      </div>
    </div>
  </nav>
);

export default DashboardNav;