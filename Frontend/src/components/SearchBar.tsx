import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Search for a therapist..."
        className="w-full p-4 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
        Search
      </button>
    </div>
  );
};

export default SearchBar;