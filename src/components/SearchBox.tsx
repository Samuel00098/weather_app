'use client';

import { useState, FormEvent } from 'react';

interface SearchBoxProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

const SearchBox = ({ onSearch, isLoading }: SearchBoxProps) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Search for cities"
        className="w-full p-3 bg-slate-800 text-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
        disabled={isLoading}
        aria-label="Search for cities"
      />
      {/* The button is removed as the image implies search on input change or enter, handled by form onSubmit */}
    </form>
  );

};

export default SearchBox;
