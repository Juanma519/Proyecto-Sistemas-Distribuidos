import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const TopTherapists: React.FC = () => {
  const [psicologos, setPsicologos] = useState<Psicologo[]>([]);

  useEffect(() => {
    const fetchPsicologos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/listarPsicologos');
        setPsicologos(response.data.data);
      } catch (error) {
        console.error('Error al obtener la lista de psicólogos:', error);
      }
    };

    fetchPsicologos();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">En su área</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {psicologos.map((psicologo) => (
          <div key={psicologo.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
              alt={psicologo.nombre}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold">{psicologo.nombre} {psicologo.apellido}</h3>
              <p className="text-sm text-gray-600">{psicologo.especialidad}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-blue-500">Disponible</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600">
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTherapists;
