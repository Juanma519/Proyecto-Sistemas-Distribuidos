import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

interface GetPsicologoResponse {
    getPsicologo: Psicologo | null;
}

const PerfilPsicologo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [psicologo, setPsicologo] = useState<Psicologo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const endpoint = 'http://localhost:5001/graphql';

    useEffect(() => {
        const fetchPsicologo = async () => {
            const query = gql`
                query GetPsicologo($username: String!) {
                    getPsicologo(username: $username) {
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
                username: id,
            };
            try {
                const data = await request<GetPsicologoResponse>(endpoint, query, variables);
                setPsicologo(data.getPsicologo);
            } catch (error) {
                console.error('Error al obtener el psicólogo:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPsicologo();
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!psicologo) {
        return <div>No se encontró el psicólogo.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-4">
                {psicologo.nombre} {psicologo.apellido}
            </h1>
            <p className="text-lg mb-2">
                <strong>Email:</strong> {psicologo.mail}
            </p>
            <p className="text-lg mb-2">
                <strong>Teléfono:</strong> {psicologo.telefono}
            </p>
            <p className="text-lg mb-2">
                <strong>Especialidad:</strong> {psicologo.especialidad}
            </p>
            <p className="text-lg mb-2">
                <strong>Ubicación:</strong> {psicologo.ubicacion}
            </p>
            {/* Agrega más detalles si es necesario */}
        </div>
    );
};

export default PerfilPsicologo;
