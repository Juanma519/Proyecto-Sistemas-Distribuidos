"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filtrarPsicologo = exports.updatePsicologo = exports.verificarPsicologo = exports.crearPsicologo = void 0;
const pool_1 = require("../pool");

// Consulta SQL para crear un psicólogo (Corregido)
const query1 = `INSERT INTO psicologos 
    (username, password, mail, nombre, apellido, telefono, especialidad, ubicacion) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

const crearPsicologo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, mail, nombre, apellido, telefono, especialidad, ubicacion } = req.body;
    try {
        const response = yield pool_1.pool.query(query1, [username, password, mail, nombre, apellido, telefono, especialidad, ubicacion]);
        console.log(response.rows);
        res.status(200).send("Psicologo creado");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error al crear psicologo");
    }
});
exports.crearPsicologo = crearPsicologo;

// Consulta SQL para verificar un psicólogo
const query2 = "SELECT * FROM psicologos WHERE username = $1 AND password = $2";

const verificarPsicologo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const response = yield pool_1.pool.query(query2, [username, password]);
        if (response.rows.length == 0) {
            res.status(404).send("Psicologo no encontrado o contraseña incorrecta");
        }
        else {
            res.status(200).json({
                "message": "Psicologo validado",
                "body": response.rows[0]
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error al verificar psicologo");
    }
});
exports.verificarPsicologo = verificarPsicologo;

// Consulta SQL para actualizar un psicólogo
const updatePsicologo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, mail, nombre, apellido, telefono, especialidad, ubicacion } = req.body;
    try {
        const response = yield pool_1.pool.query("UPDATE psicologos SET password = $2, mail = $3, nombre = $4, apellido = $5, telefono = $6, especialidad = $7, ubicacion = $8 WHERE username = $1", [username, password, mail, nombre, apellido, telefono, especialidad, ubicacion]);
        console.log(response.rows);
        res.status(200).send("Psicologo actualizado");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar psicologo");
    }
});
exports.updatePsicologo = updatePsicologo;

// Consulta SQL para filtrar psicólogos por nombre y apellido
const filtrarPsicologo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query; // Obtener el término de búsqueda desde la query string
    console.log("Término de búsqueda recibido:", search); // Log para verificar el término recibido

    try {
        const query = `
            SELECT * FROM psicologos 
            WHERE LOWER(nombre) LIKE LOWER($1) 
            OR LOWER(apellido) LIKE LOWER($1)
            OR CONCAT(LOWER(nombre), ' ', LOWER(apellido)) LIKE LOWER($1)
        `;
        const response = yield pool_1.pool.query(query, [`%${search}%`]); // Buscar coincidencias parciales
        console.log("Resultados encontrados:", response.rows); // Log para verificar los resultados encontrados

        if (response.rows.length === 0) {
            res.status(404).json({
                message: "No se encontraron psicólogos con ese nombre/apellido",
                data: []
            });
        } else {
            res.status(200).json({
                "message": "Lista de Psicólogos",
                "data": response.rows
            });
        }
    }
    catch (error) {
        console.error("Error al filtrar psicólogos:", error); // Log del error
        res.status(500).send("Error al filtrar psicólogos");
    }
});
exports.filtrarPsicologo = filtrarPsicologo;
