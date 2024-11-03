import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">MentalNow</h3>
            <p className="text-sm">Tome el control de su bienestar mental con fácil acceso al apoyo de salud mental de profesionales certificados.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Acerca</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-300">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-gray-300">Equipo</a></li>
              <li><a href="#" className="hover:text-gray-300">Prensa</a></li>
              <li><a href="#" className="hover:text-gray-300">Oportunidades laborales</a></li>
              <li><a href="#" className="hover:text-gray-300">Contactános</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><Facebook size={24} /></a>
              <a href="#" className="hover:text-gray-300"><Twitter size={24} /></a>
              <a href="#" className="hover:text-gray-300"><Linkedin size={24} /></a>
              <a href="#" className="hover:text-gray-300"><Instagram size={24} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Para Terapeutas</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-300">Únete a nuestra red</a></li>
              <li><a href="#" className="hover:text-gray-300">Recursos</a></li>
              <li><a href="#" className="hover:text-gray-300">Apoyo empresarial</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; 2024 MentalNow. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;