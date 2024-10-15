import { Router } from "express";
import { crearCliente, verificarCliente } from "../controladores/cliente.controlador";
import { crearPsicologo , verificarPsicologo} from "../controladores/psicologo.controlador";

const router= Router();

export default router;
router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/crearCliente', crearCliente);
router.get('/verificarCliente', verificarCliente);
router.post('/crearPsicologo', crearPsicologo);
router.get('/verificarPsicologo', verificarPsicologo);
