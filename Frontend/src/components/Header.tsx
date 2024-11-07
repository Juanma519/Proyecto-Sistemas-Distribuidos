import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, MessageSquare, User, Search } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();

  // Verificar el estado de autenticación
  const userType = localStorage.getItem('userType'); // Puede ser 'cliente', 'psicologo' o null si no está autenticado
  const userId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Brain className="w-8 h-8 mr-2" />
          <span className="text-2xl font-bold">MentalNow</span>
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            {/* Mostrar solo si el usuario no está autenticado */}
            {!userType && (
              <>
                <li>
                  <Link to="/search" className="flex items-center hover:text-gray-300">
                    <Search className="w-5 h-5 mr-1" />
                    Encontrar terapeuta
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200">
                    Iniciar Sesión
                  </Link>
                </li>
              </>
            )}

            {/* Mostrar solo si el usuario está autenticado */}
            {userType && (
              <>
                <li>
                  {/* Redirigir a la página de mensajes */}
                  <Link to={`/chat/${userId}`} className="flex items-center hover:text-gray-300">
                    <MessageSquare className="w-5 h-5 mr-1" />
                    Mensajes
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="flex items-center hover:text-gray-300">
                    <Search className="w-5 h-5 mr-1" />
                    {userType === 'cliente' ? 'Encontrar terapeuta' : 'Encontrar colega'}
                  </Link>
                </li>
                <li>
                  {/* Si es psicólogo redirigir a la página de detalles con su ID */}
                  <Link
                    to={userType === 'psicologo' ? `/therapist/${userId}` : '/profile'}
                    className="flex items-center hover:text-gray-300"
                  >
                    <User className="w-5 h-5 mr-1" />
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:text-gray-300">
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
