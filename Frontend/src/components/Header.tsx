import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Brain className="w-8 h-8 mr-2" />
          <span className="text-2xl font-bold">MentalNow</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/search" className="hover:text-gray-300">Find a therapist</Link></li>
            <li><Link to="#" className="hover:text-gray-300">Help</Link></li>
            <li><Link to="/login" className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200">Log In</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;