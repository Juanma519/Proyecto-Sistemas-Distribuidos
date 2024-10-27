import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">MentalNow</h3>
            <p className="text-sm">Take control of your mental well-being with easy access to mental health support from certified professionals.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Team</a></li>
              <li><a href="#" className="hover:text-gray-300">Press</a></li>
              <li><a href="#" className="hover:text-gray-300">Careers</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><Facebook size={24} /></a>
              <a href="#" className="hover:text-gray-300"><Twitter size={24} /></a>
              <a href="#" className="hover:text-gray-300"><Linkedin size={24} /></a>
              <a href="#" className="hover:text-gray-300"><Instagram size={24} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">For Therapists</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-300">Join Our Network</a></li>
              <li><a href="#" className="hover:text-gray-300">Therapist Login</a></li>
              <li><a href="#" className="hover:text-gray-300">Resources</a></li>
              <li><a href="#" className="hover:text-gray-300">Business Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; 2023 MentalNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;