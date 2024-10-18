import React from 'react';
import { UserCheck, Users, Calendar, BarChart } from 'lucide-react';

const therapyItems = [
  {
    icon: UserCheck,
    title: 'Find a Therapist',
    description: 'Discover your perfect match',
  },
  {
    icon: Users,
    title: 'Detailed Therapist Profiles',
    description: 'Filter Results',
  },
  {
    icon: Calendar,
    title: 'Book Appointments',
    description: 'Connect with Professionals',
  },
  {
    icon: BarChart,
    title: 'Mental Health Assessment',
    description: 'Therapist Match Finder',
  },
];

const ThisWeekInTherapy: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">This week in Therapy</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {therapyItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <item.icon className="w-8 h-8 mb-2 text-blue-500" />
            <h3 className="font-bold mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThisWeekInTherapy;