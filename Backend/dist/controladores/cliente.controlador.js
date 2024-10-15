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
exports.verificarCliente = exports.crearCliente = void 0;
const pool_1 = require("../pool");
//habria que laburarle el tipado
const crearCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, mail } = req.body;
    try {
        const response = yield pool_1.pool.query("INSERT INTO clientes (username, password, mail) VALUES ($1, $2, $3)", [username, password, mail]);
        console.log(response.rows);
        res.status(200).send("Usuario creado");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error al crear usuario");
    }
});
exports.crearCliente = crearCliente;
const query2 = "SELECT * FROM clientes WHERE username = $1 AND password = $2";
const verificarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const response = yield pool_1.pool.query(query2, [username, password]);
        if (response.rows.length == 1) {
            res.status(200).send("Cliente validado");
        }
        else {
            res.status(404).send("Usuario no encontrado o contraseña incorrecta");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error al verificar usuario");
    }
});
exports.verificarCliente = verificarCliente;
