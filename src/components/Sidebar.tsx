'use client';

import { useState } from 'react';
import { Sun, Cloud, MapPin, Settings, Wind } from 'lucide-react'; // Assuming lucide-react for icons

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Weather');

  const navItems = [
    { name: 'Weather', icon: Sun },
    { name: 'Cities', icon: Cloud },
    { name: 'Map', icon: MapPin },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-20 bg-slate-800 p-4 flex flex-col items-center space-y-6 h-screen text-slate-400">
      <div className="p-2 bg-blue-500 rounded-lg text-white mb-6">
        <Wind size={24} />
      </div>
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveItem(item.name)}
            className={`p-3 rounded-lg flex flex-col items-center transition-colors duration-200 
                        ${activeItem === item.name ? 'bg-slate-700 text-white' : 'hover:bg-slate-700 hover:text-white'}`}
            aria-label={item.name}
            tabIndex={0}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
