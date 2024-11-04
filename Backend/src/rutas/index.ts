import { Router } from "express";
import { crearCliente, verificarCliente, listarClientes } from "../controladores/cliente.controlador";
import { crearPsicologo, verificarPsicologo, listarPsicologos, filtrarPsicologo } from "../controladores/psicologo.controlador"; 
import { loginUsuario } from "../controladores/login.controlador";

const router = Router();

export default router;

// Ruta de bienvenida
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Rutas para clientes
router.post('/crearCliente', crearCliente);
router.post('/verificarCliente', verificarCliente);
router.get('/listarClientes', listarClientes);

// Rutas para psicólogos
router.post('/crearPsicologo', crearPsicologo);
router.post('/verificarPsicologo', verificarPsicologo);
router.get('/listarPsicologos', listarPsicologos);
router.get('/filtrarPsicologos', filtrarPsicologo); // Nueva ruta para filtrar psicólogos

// Ruta para el login
router.post('/login', loginUsuario);
