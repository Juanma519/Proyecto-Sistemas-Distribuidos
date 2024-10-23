"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controlador_1 = require("../controladores/cliente.controlador");
const psicologo_controlador_1 = require("../controladores/psicologo.controlador");
const router = (0, express_1.Router)();
exports.default = router;
router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.post('/crearCliente', cliente_controlador_1.crearCliente);
router.get('/verificarCliente', cliente_controlador_1.verificarCliente);
router.post('/crearPsicologo', psicologo_controlador_1.crearPsicologo);
router.get('/verificarPsicologo', psicologo_controlador_1.verificarPsicologo);
