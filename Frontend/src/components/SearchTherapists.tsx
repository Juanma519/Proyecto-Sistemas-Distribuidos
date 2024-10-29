import React, { useState } from 'react';
import { request, gql } from 'graphql-request';

interface Psicologo {
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
  id: string;
  name: string;
  especialidad: string;
  ubicacion: string;
  telefono: string;
  email: string;
}

const BuscarPsicologos: React.FC = () => {
  const [especialidad, setEspecialidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [psicologos, setPsicologos] = useState<PsicologoData[]>([]);

  const endpoint = 'http://localhost:5001/graphql';

  const fetchPsicologos = async () => {
    const query = gql`
      query ($especialidad: String, $ubicacion: String!) {
        filtroPsicologo(especialidad: $especialidad, ubicacion: $ubicacion) {
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

    // Si la especialidad está en blanco, la enviamos como `null` para que no se aplique el filtro en el backend.
    const variables = {
      especialidad: especialidad || null,
      ubicacion,
    };

    try {
      const data = await request<FiltroPsicologoResponse>(endpoint, query, variables);
      const psicologosData: PsicologoData[] = data.filtroPsicologo.map((psicologo) => ({
        id: psicologo.username,
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

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sección de filtros */}
        <div className="my-6">
          <h2 className="text-2xl font-semibold mb-4">Buscar Psicólogos</h2>

          {/* Selector de Especialidad */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Especialidad</label>
            <select
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="">-- Sin filtro de especialidad --</option> {/* Opción en blanco */}
              <option value="Duelos">Duelos</option>
              <option value="Traumas">Traumas</option>
              <option value="Familiar">Familiar</option>
              <option value="Pareja">Pareja</option>
              <option value="Separación y Divorcio">Separación y Divorcio</option>
              <option value="Infantil y Adolescente">Infantil y Adolescente</option>
            </select>
          </div>

          {/* Campo de entrada para la ubicación */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ubicación</label>
            <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Ingresa la ubicación"
            />
          </div>

          {/* Botón de búsqueda */}
          <div className="mt-4">
            <button
                onClick={fetchPsicologos}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Buscar
            </button>
          </div>
        </div>

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
                          src="URL_DE_IMAGEN_POR_DEFECTO"
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
                      </div>
                    </div>
                  </div>
              ))
          ) : (
              <p className="text-gray-500">No se encontraron psicólogos para los filtros aplicados.</p>
          )}
        </div>
      </div>
  );
};

export default BuscarPsicologos;
