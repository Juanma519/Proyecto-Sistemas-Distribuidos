import React from 'react';
import { Brain, Heart, Users, ClipboardList, Star, Filter, Briefcase, HelpCircle } from 'lucide-react';

const categories = [
  { icon: Brain, label: 'Psychologists' },
  { icon: Heart, label: 'Therapists' },
  { icon: Users, label: 'Counselors' },
  { icon: ClipboardList, label: 'Assessments' },
  { icon: Star, label: 'Reviews' },
  { icon: Filter, label: 'Filters' },
  { icon: Briefcase, label: 'Specialties' },
  { icon: HelpCircle, label: 'juati puto' },
];

const CategoryButtons: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {categories.map((category, index) => (
        <button
          key={index}
          className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <category.icon className="w-6 h-6 mr-2" />
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;