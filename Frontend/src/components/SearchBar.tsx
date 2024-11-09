import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [results, setResults] = useState<any[]>([]); // Estado para los resultados de la búsqueda
  const [hasSearched, setHasSearched] = useState(false); // Estado para controlar si se ha realizado una búsqueda

  // Función para limpiar los resultados
  const clearResults = () => {
    setResults([]);
    setHasSearched(false);
    setSearchTerm(''); // Opcional: limpiar el término de búsqueda
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      alert('Por favor ingrese un nombre para buscar');
      return;
    }

    setHasSearched(true); // Indicar que se ha intentado realizar una búsqueda

    try {
      // Realizar la solicitud al servidor para buscar psicólogos
      const response = await fetch(`http://localhost:5001/filtrarPsicologos?search=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.data); // Almacenar los resultados en el estado
      } else {
        alert('No se encontraron resultados');
        setResults([]);
      }
    } catch (error) {
      console.error('Error durante la búsqueda:', error);
      alert('Hubo un problema al intentar buscar');
      setResults([]);
    }
  };

  return (
      <div className="mb-8">
        {/* Barra de búsqueda */}
        <div className="relative">
          <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busque un terapeuta"
              className="w-full p-4 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>

        {/* Botón para ocultar los resultados */}
        {results.length > 0 && (
            <div className="mt-4">
              <button
                  onClick={clearResults}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Ocultar Psicólogos
              </button>
            </div>
        )}

        {/* Mostrar los resultados de la búsqueda */}
        {hasSearched && (
            <div className="space-y-4 mt-4">
              {results.length > 0 ? (
                  results.map((psicologo, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{`${psicologo.nombre} ${psicologo.apellido}`}</h3>
                          <p className="text-gray-600">Especialidad: {psicologo.especialidad}</p>
                          <p className="text-gray-600">Ubicación: {psicologo.ubicacion}</p>
                        </div>
                        <div className="mt-4">
                          <Link
                              to={`/therapist/${psicologo.id}`}
                              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                          >
                            Ver Perfil
                          </Link>
                        </div>
                      </div>
                  ))
              ) : (
                  <p className="text-gray-500">No se encontraron resultados</p>
              )}
            </div>
        )}
      </div>
  );
};

export default SearchBar;
