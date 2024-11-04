import React from 'react';
import { Heart, Users, Star, Filter, Meh, AlertCircle, Scissors, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { icon: Meh, label: 'Duelos' },
  { icon: AlertCircle, label: 'Traumas' },
  { icon: Users, label: 'Familiar' },
  { icon: Heart, label: 'Pareja' },
  { icon: Scissors, label: 'Separación y Divorcio' },
  { icon: Smile, label: 'Infantil y Adolescentes' },
  { icon: Star, label: 'Reviews' },
  { icon: Filter, label: 'Filters', link: '/search' }, // Añadido link para Filters
];

const CategoryButtons: React.FC = () => {
  return (
    <div className="space-y-4 mb-8">
      {/* Primera fila - Los primeros 6 botones en una sola fila */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.slice(0, 6).map((category, index) => (
          <button
            key={index}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <category.icon className="w-6 h-6 mr-2" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>
      {/* Segunda fila - Los últimos 2 botones que ocupan más espacio */}
      <div className="grid grid-cols-2 gap-4">
        {categories.slice(6).map((category, index) => {
          // Si el botón tiene una propiedad "link", lo hacemos con <Link>
          if (category.link) {
            return (
              <Link
                key={index}
                to={category.link}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <category.icon className="w-6 h-6 mr-2" />
                <span>{category.label}</span>
              </Link>
            );
          }

          // De lo contrario, mostramos el botón normal
          return (
            <button
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <category.icon className="w-6 h-6 mr-2" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryButtons;
