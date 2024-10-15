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
exports.verificarPsicologo = exports.crearPsicologo = void 0;
const pool_1 = require("../pool");
const query1 = `INSERT into psicologos 
    (username, password, mail, nombre, apellido, telefono, especialidad, ubicacion) 
    VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8)`;
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
const query2 = "SELECT * FROM psicologos WHERE username = $1 AND password = $2";
const verificarPsicologo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const response = yield pool_1.pool.query(query2, [username, password]);
        if (response.rows.length == 0) {
            res.status(404).send("Psicologo no encontrado o contraseña incorrecta");
        }
        else {
            res.status(200).send("Psicologo validado");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error al verificar psicologo");
    }
});
exports.verificarPsicologo = verificarPsicologo;
