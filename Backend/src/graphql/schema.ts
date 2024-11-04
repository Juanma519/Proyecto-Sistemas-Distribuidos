import { GraphQLSchema } from 'graphql';
import { Psicologo } from '../tipos/tipos';
import {
    psicologosUbicacion,
    psicologosEspecialidad,
    psicologosUbicacionEspecialidad,
    obtenerTodosLosPsicologos,
    getPsicologoById // Asegúrate de importar `getPsicologoById` aquí.
} from '../consultasDB';
const { buildSchema } = require('graphql');

// Esquema GraphQL actualizado
export const esquema: GraphQLSchema = buildSchema(`
    type Psicologo {
        id: ID!
        username: String!
        password: String!
        mail: String!
        nombre: String!
        apellido: String!
        telefono: String!
        especialidad: String!
        ubicacion: String!
        descripcion: String!
        reviews: Int
    }
    type Query {
        filtroPsicologo(especialidad: String, ubicacion: String): [Psicologo]
        getPsicologo(id: ID!): Psicologo
    }
`);

// Actualización de los resolvers
export const resolvers = {
    filtroPsicologo: async (args: { especialidad?: string; ubicacion?: string }) => {
        const { especialidad, ubicacion } = args;
        try {
            if (ubicacion && especialidad) {
                return await psicologosUbicacionEspecialidad(ubicacion, especialidad);
            }
            if (especialidad) {
                return await psicologosEspecialidad(especialidad);
            }
            if (ubicacion) {
                return await psicologosUbicacion(ubicacion);
            }
            // Si no se proporcionan argumentos, devuelve todos los psicólogos
            return await obtenerTodosLosPsicologos();
        } catch (error) {
            console.error("Error en filtroPsicologo:", error);
            throw new Error("No se pudo filtrar a los psicólogos");
        }
    },
    getPsicologo: async (args: { id: string }) => {
        try {
            // Utiliza `getPsicologoById` en lugar de `getPsicologoByUsername`
            const psicologo = await getPsicologoById(parseInt(args.id));
            if (!psicologo) {
                throw new Error("Psicólogo no encontrado");
            }
            return psicologo;
        } catch (error) {
            console.error("Error en getPsicologo:", error);
            throw new Error("No se pudo obtener al psicólogo");
        }
    },
};



