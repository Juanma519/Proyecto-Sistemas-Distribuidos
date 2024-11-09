// rutas/index.js
import { Router } from "express";
import { crearCliente, verificarCliente, listarClientes } from "../controladores/cliente.controlador";
import { crearPsicologo, verificarPsicologo, listarPsicologos, filtrarPsicologo, obtenerPsicologoPorId, obtenerReseñas, agregarReseña, listarTodasLasReseñas, listarTopPsicologos, actualizarDescripcionPsicologo } from "../controladores/psicologo.controlador";
import { loginUsuario } from "../controladores/login.controlador";
import { crearChat, obtenerMensajes, obtenerChats } from "../controladores/chat.controlador"; // Importar el controlador de chat

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
router.get('/filtrarPsicologos', filtrarPsicologo); // Ruta para filtrar psicólogos
router.get('/psicologo/:id', obtenerPsicologoPorId); // Ruta para obtener psicólogo por ID
router.put("/psicologo/:id", actualizarDescripcionPsicologo); // Nueva ruta para actualizar la descripción del psicólogo

// Rutas para reseñas de psicólogos
router.get('/psicologo/:id/reviews', obtenerReseñas); // Ruta para obtener todas las reseñas de un psicólogo
router.post('/psicologo/:id/review', agregarReseña); // Ruta para agregar una nueva reseña a un psicólogo
router.get('/topPsicologos', listarTopPsicologos);

// Ruta para obtener todas las reseñas de todos los psicólogos
router.get('/listarReseñas', listarTodasLasReseñas);

// Ruta para el login
router.post('/login', loginUsuario);

// Ruta para crear un chat entre cliente y psicólogo
router.post('/createChat', crearChat);

// Ruta para obtener todos los chats de un usuario
router.get('/obtenerChats', obtenerChats);

// Ruta para obtener todos los mensajes de un chat
router.get('/obtenerMensajes/:chatId', obtenerMensajes);
