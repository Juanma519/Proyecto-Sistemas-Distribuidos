import React, { useState } from 'react';
import { Heart, Users, Filter, Meh, AlertCircle, Scissors, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import { request, gql } from 'graphql-request';

interface Psicologo {
  id: number;
  username: string;
  mail: string;
  nombre: string;
  apellido: string;
  telefono: string;
  especialidad: string;
  ubicacion: string;
}

interface FiltroPsicologoResponse {
  filtroPsicologo: Psicologo[];
}

interface PsicologoData {
  id: number;
  name: string;
  especialidad: string;
  ubicacion: string;
  telefono: string;
  email: string;
}

const categories = [
  { icon: Meh, label: 'Duelos', specialty: 'Duelos' },
  { icon: AlertCircle, label: 'Traumas', specialty: 'Traumas' },
  { icon: Users, label: 'Familiar', specialty: 'Familiar' },
  { icon: Heart, label: 'Pareja', specialty: 'Pareja' },
  { icon: Scissors, label: 'Separación y Divorcio', specialty: 'Separación y Divorcio' },
  { icon: Smile, label: 'Infantil y Adolescentes', specialty: 'Infantil y Adolescente' },
  { icon: Filter, label: 'Filtros', link: '/search' }, // Añadido link para Filters
];

const CategoryButtons: React.FC = () => {
  const [psicologos, setPsicologos] = useState<PsicologoData[]>([]);

  const endpoint = 'http://localhost:5001/graphql';

  const fetchPsicologos = async (especialidad: string) => {
    const query = gql`
      query ($especialidad: String) {
        filtroPsicologo(especialidad: $especialidad) {
          id
          username
          mail
          nombre
          apellido
          telefono
          especialidad
          ubicacion
        }
      }
    `;

    const variables = {
      especialidad,
    };

    try {
      const data = await request<FiltroPsicologoResponse>(endpoint, query, variables);
      const psicologosData: PsicologoData[] = data.filtroPsicologo.map((psicologo) => ({
        id: psicologo.id,
        name: `${psicologo.nombre} ${psicologo.apellido}`,
        especialidad: psicologo.especialidad,
        ubicacion: psicologo.ubicacion,
        telefono: psicologo.telefono,
        email: psicologo.mail,
      }));

      setPsicologos(psicologosData);
    } catch (error) {
      console.error('Error al obtener psicólogos:', error);
    }
  };

  // Función para limpiar los resultados
  const clearResults = () => {
    setPsicologos([]);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Primera fila - Los primeros 6 botones en una sola fila */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.slice(0, 6).map((category, index) => (
          <button
            key={index}
            onClick={() => fetchPsicologos(category.specialty!)}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <category.icon className="w-6 h-6 mr-2" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>
      {/* Segunda fila - El último botón que ocupa más espacio */}
      <div className="grid grid-cols-1 gap-4">
        {categories.slice(6).map((category, index) => {
          if (category.link) {
            return (
              <Link
                key={index}
                to={category.link ?? '/search'} // Asegurar que 'to' siempre tenga un valor predeterminado
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <category.icon className="w-6 h-6 mr-2" />
                <span>{category.label}</span>
              </Link>
            );
          }

          // Si no hay enlace, mostramos el botón y llamamos a fetchPsicologos
          return (
            <button
              key={index}
              onClick={() => fetchPsicologos(category.specialty!)}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <category.icon className="w-6 h-6 mr-2" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Botón para limpiar los resultados */}
      {psicologos.length > 0 && (
        <div className="mt-4">
          <button
            onClick={clearResults}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Ocultar Psicólogos
          </button>
        </div>
      )}

      {/* Resultados de la búsqueda */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Resultados de la búsqueda</h2>
      </div>

      {/* Lista de psicólogos */}
      <div className="space-y-6">
        {psicologos.length > 0 ? (
          psicologos.map((psicologo) => (
            <div key={psicologo.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex">
                <img
                  src="https://via.placeholder.com/150"
                  alt={psicologo.name}
                  className="w-32 h-32 object-cover rounded-lg mr-6"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{psicologo.name}</h3>
                  <p className="text-sm text-gray-600">{psicologo.ubicacion}</p>
                  <p className="text-sm text-gray-600">
                    {psicologo.email} • {psicologo.telefono}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm">
                      <strong>Especialidad:</strong> {psicologo.especialidad}
                    </p>
                  </div>
                  {/* Botón Ver Perfil */}
                  <div className="mt-4">
                    <Link
                      to={`/therapist/${psicologo.id}`} // Ahora usamos el ID numérico aquí
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Ver Perfil
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No se encontraron psicólogos para los filtros aplicados.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryButtons;
