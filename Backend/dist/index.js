"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    let psicologo = {
        username: 'Juan123',
        password: '1234',
        mail: 'juanito@gmail.com',
        nombre: 'Juan',
        apellido: 'Perez',
        telefono: 123456789,
        especialidad: 'Duelos',
        ubicacion: 'Malvin'
    };
    res.status(200).send(psicologo.especialidad);
});
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
});
//para runear primero hay que hace npm run build y luego npm start
