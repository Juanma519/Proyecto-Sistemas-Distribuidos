import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Psicologo {
  id: number;
  username: string;
  mail: string;
  nombre: string;
  apellido: string;
  telefono: string;
  especialidad: string;
  ubicacion: string;
  reseñas_count: number;
}

const TopTherapists: React.FC = () => {
  const [psicologos, setPsicologos] = useState<Psicologo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopPsicologos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/topPsicologos');
        setPsicologos(response.data.data);
      } catch (error) {
        console.error('Error al obtener la lista de psicólogos:', error);
      }
    };

    fetchTopPsicologos();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Profesionales destacados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"> {/* Cambiar flex a grid para distribuir mejor */}
        {psicologos.map((psicologo) => (
          <div key={psicologo.id} className="bg-white rounded-lg shadow-md overflow-hidden w-full"> {/* Cambiar el ancho para ocupar todo */}
            <img
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
              alt={psicologo.nombre}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold">{psicologo.nombre} {psicologo.apellido}</h3>
              <p className="text-sm text-gray-600">{psicologo.especialidad}</p>
              <div className="mt-2 flex justify-between items-center">
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600"
                  onClick={() => navigate(`/therapist/${psicologo.id}`)}
                >
                  Ver Perfil
                </button>
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



