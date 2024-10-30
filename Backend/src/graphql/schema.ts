
import { GraphQLSchema } from 'graphql'
import {Psicologo, User} from '../tipos/tipos'
import { pool } from '../pool'
import { QueryResult } from 'pg'
import {
    psicologosUbicacion,
    psicologosEspecialidad,
    psicologosUbicacionEspecialidad,
    obtenerTodosLosPsicologos, getPsicologoByUsername
} from '../consultasDB'
const {buildSchema} = require('graphql')

// Esquema GraphQL actualizado
export const esquema: GraphQLSchema = buildSchema(`
    type Psicologo {
        username: String!
        password: String!
        mail: String!
        nombre: String!
        apellido: String!
        telefono: String!
        especialidad: String!
        ubicacion: String!
    }
    type Query {
        filtroPsicologo(especialidad: String, ubicacion: String): [Psicologo]
        getPsicologo(username: String!): Psicologo
    }
`);

export const resolvers = {
    filtroPsicologo: async (args: { especialidad?: string; ubicacion?: string }) => {
        const { especialidad, ubicacion } = args;
        if (ubicacion && especialidad) {
            return psicologosUbicacionEspecialidad(ubicacion, especialidad);
        }
        if (especialidad) {
            return psicologosEspecialidad(especialidad);
        }
        if (ubicacion) {
            return psicologosUbicacion(ubicacion);
        }
        // Si no se proporcionan argumentos, devuelve todos los psicólogos
        return obtenerTodosLosPsicologos();
    },
    getPsicologo: async ({ username }: { username: string }) => {
        return getPsicologoByUsername(username);
    },
};


