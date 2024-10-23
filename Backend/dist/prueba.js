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
exports.pruebaPsicologo = pruebaPsicologo;
exports.validacionpruebapsicologo = validacionpruebapsicologo;
const pool_1 = require("./pool");
//fue para testear la conex a la bd 
const username = "pepe";
const password = "pepe";
const mail = "lo@lo.com";
const nombre = "pepe";
const apellido = "loquete";
const telefono = "123456";
const especialidad = "Duelos";
const ubicacion = "CABA";
const psicologo = { username, password, mail, nombre, apellido, telefono, especialidad, ubicacion };
function pruebaPsicologo() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `INSERT into psicologos 
    (username, password, mail, nombre, apellido, telefono, especialidad, ubicacion) 
    VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8)`;
        const value = [psicologo.username, psicologo.password,
            psicologo.mail, psicologo.nombre, psicologo.apellido,
            psicologo.telefono, psicologo.especialidad, psicologo.ubicacion];
        const response = yield pool_1.pool.query(query, value);
    });
}
const query2 = "SELECT * FROM psicologos WHERE username = $1 AND password = $2";
function validacionpruebapsicologo() {
    return __awaiter(this, void 0, void 0, function* () {
        const value = [psicologo.username, psicologo.password];
        const response = yield pool_1.pool.query(query2, value);
        console.log(response.rows);
    });
}
