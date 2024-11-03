import { Router } from "express";
import { crearCliente, verificarCliente, listarClientes} from "../controladores/cliente.controlador";
import { crearPsicologo , verificarPsicologo, listarPsicologos} from "../controladores/psicologo.controlador";
import { loginUsuario } from "../controladores/login.controlador";

const router= Router();

export default router;
router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/crearCliente', crearCliente);
router.post('/verificarCliente', verificarCliente);
router.post('/crearPsicologo', crearPsicologo);
router.post('/verificarPsicologo', verificarPsicologo);
router.post('/login', loginUsuario);
router.get('/listarPsicologos', listarPsicologos);
router.get('/listarClientes', listarClientes);
