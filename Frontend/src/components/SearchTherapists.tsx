import React, { useState, useEffect } from 'react';
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
  const [psicologos, setPsicologos] = useState<PsicologoData[]>([]);

  // Endpoint con el puerto correcto
  const endpoint = 'http://localhost:5001/graphql';

  const fetchPsicologos = async () => {
    console.log("Ejecutando fetchPsicologos..."); // Verifica si esta línea se muestra en la consola

    const query = gql`
      query {
        filtroPsicologo(especialidad: "Pareja", ubicacion: "CABA") {
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

    try {
      const data = await request<FiltroPsicologoResponse>(endpoint, query);
      console.log("Datos recibidos:", data); // Muestra los datos recibidos en la consola

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
      console.error('Error al obtener psicólogos:', error); // Muestra el error en caso de fallo
    }
  };

  // Función de prueba de conexión para verificar la comunicación con el backend
  const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:5001/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              filtroPsicologo(especialidad: "Pareja", ubicacion: "CABA") {
                username
                mail
                nombre
                apellido
                telefono
                especialidad
                ubicacion
              }
            }
          `
        }),
      });
      const result = await response.json();
      console.log("Respuesta de prueba de conexión:", result);
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  // Llama a testConnection al montar el componente para verificar la conexión
  useEffect(() => {
    testConnection();
  }, []);

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sección de filtros */}
        <div className="my-6">
          <h2 className="text-2xl font-semibold mb-4">Buscar Psicólogos</h2>
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
