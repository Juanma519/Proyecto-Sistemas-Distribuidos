"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.esquema = void 0;
const { buildSchema } = require('graphql');
const psicologos = [
    {
        username: "Psicologo1",
        password: "123",
        mail: "pedrito@gmail.com",
        nombre: "Pedro",
        apellido: "Perez",
        telefono: "123456",
        ubicacion: "CABA",
        especialidad: "Duelos",
    },
    {
        username: "Psicologo2",
        password: "456",
        mail: "jaun@gmail.com",
        nombre: "Juan",
        apellido: "Gomez",
        telefono: "789456",
        ubicacion: "GBA",
        especialidad: "Familiar",
    },
    {
        username: "Psicologo3",
        password: "789",
        mail: "fa@gmail.com",
        nombre: "Fernando",
        apellido: "Alvarez",
        telefono: "123789",
        ubicacion: "CABA",
        especialidad: "Familiar",
    },
    {
        username: "Psicologo4",
        password: "101112",
        mail: 'este@gmail.com',
        nombre: "Esteban",
        apellido: "Gonzalez",
        telefono: "456789",
        ubicacion: "GBA",
        especialidad: "Familiar",
    }
];
exports.esquema = buildSchema(`
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
        filtroPsicologo(especialidad: String , ubicacion: String): [Psicologo]
    }
    `);
exports.resolvers = {
    filtroPsicologo: (args) => {
        const { especialidad, ubicacion } = args;
        if (ubicacion && especialidad) {
            return psicologos.filter(psicologo => psicologo.ubicacion === ubicacion && psicologo.especialidad === especialidad);
        }
        if (especialidad) {
            return psicologos.filter(psicologo => psicologo.especialidad === especialidad);
        }
        if (ubicacion) {
            return psicologos.filter(psicologo => psicologo.ubicacion === ubicacion);
        }
    }
};
