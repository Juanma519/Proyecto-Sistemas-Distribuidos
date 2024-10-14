import { Router } from "express";
import { crearCliente, verificarCliente } from "../controladores/cliente.controlador";
import { crearPsicologo , verificarPsicologo} from "../controladores/psicologo.controlador";

const router= Router();
export default router;
router.get('/crearCliente', crearCliente);
router.get('/verificarCliente', verificarCliente);
router.get('/crearPsicologo', crearPsicologo);
router.get('/verificarPsicologo', verificarPsicologo);
