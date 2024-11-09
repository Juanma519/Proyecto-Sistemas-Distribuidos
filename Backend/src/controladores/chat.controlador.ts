import { Request, Response } from "express";
import { pool } from "../pool";

// Función para crear un nuevo chat entre un cliente y un psicólogo
export const crearChat = async (req: Request, res: Response): Promise<void> => {
    const { clienteUsername, psicologoId } = req.body;

    try {
        // Obtener el cliente ID y el nombre de usuario del psicólogo
        const clienteResult = await pool.query(
            "SELECT id, username FROM clientes WHERE username = $1",
            [clienteUsername]
        );

        if (clienteResult.rows.length === 0) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }

        const clienteId = clienteResult.rows[0].id;

        // Obtener el nombre de usuario del psicólogo
        const psicologoResult = await pool.query(
            "SELECT id, username, nombre, apellido FROM psicologos WHERE id = $1",
            [psicologoId]
        );

        if (psicologoResult.rows.length === 0) {
            res.status(404).json({ error: "Psicólogo no encontrado" });
            return;
        }

        const psicologoUsername = psicologoResult.rows[0].username;

        // Verificar si ya existe un chat entre este cliente y el psicólogo
        const result = await pool.query(
            "SELECT id FROM chats WHERE cliente_id = $1 AND psicologo_id = $2",
            [clienteId, psicologoId]
        );

        if (result.rows.length > 0) {
            // Si el chat ya existe, devolver el ID del chat existente
            res.status(200).json({ chatId: result.rows[0].id });
            return;
        }

        // Crear un nuevo chat si no existe
        const newChat = await pool.query(
            "INSERT INTO chats (cliente_id, psicologo_id, cliente_username, psicologo_username, last_message) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [clienteId, psicologoId, clienteUsername, psicologoUsername, ""]
        );

        const chatId = newChat.rows[0].id;

        // Enviar respuesta con el ID del nuevo chat
        res.status(201).json({ chatId });

        // Notificar a ambos usuarios de la creación del nuevo chat
        const io = req.app.get("io");
        if (io) {
            // Notificar al cliente
            io.to(clienteUsername).emit("newChatCreated", {
                id: chatId,
                name: `${psicologoResult.rows[0].nombre} ${psicologoResult.rows[0].apellido}`,
                lastMessage: ""
            });

            // Notificar al psicólogo
            io.to(psicologoUsername).emit("newChatCreated", {
                id: chatId,
                name: clienteUsername,
                lastMessage: ""
            });
        }

    } catch (error) {
        console.error("Error al crear el chat:", error);
        res.status(500).json({ error: "Error al crear el chat" });
    }
};

// Función para obtener todos los mensajes de un chat específico
export const obtenerMensajes = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
        const result = await pool.query(
            "SELECT id, sender, content, timestamp FROM mensajes WHERE chat_id = $1 ORDER BY timestamp ASC",
            [chatId]
        );

        res.status(200).json({ mensajes: result.rows });
    } catch (error) {
        console.error("Error al obtener los mensajes:", error);
        res.status(500).json({ error: "Error al obtener los mensajes" });
    }
};

// Función para obtener todos los chats del usuario (cliente o psicólogo)
export const obtenerChats = async (req: Request, res: Response): Promise<void> => {
    const username = req.query.username as string;
    const userType = req.query.userType as string;

    try {
        let result;
        if (userType === "cliente") {
            // Si el usuario es un cliente, se devuelve el username del psicólogo con el que tiene el chat
            result = await pool.query(
                "SELECT chats.id, chats.psicologo_id, p.username AS psicologo_username, p.nombre AS psicologo_nombre, p.apellido AS psicologo_apellido, chats.last_message FROM chats INNER JOIN psicologos p ON chats.psicologo_id = p.id WHERE chats.cliente_id = (SELECT id FROM clientes WHERE username = $1)",
                [username]
            );
        } else if (userType === "psicologo") {
            // Si el usuario es un psicólogo, se devuelve el username del cliente con el que tiene el chat
            result = await pool.query(
                "SELECT chats.id, chats.cliente_id, c.username AS cliente_username, chats.last_message FROM chats INNER JOIN clientes c ON chats.cliente_id = c.id WHERE chats.psicologo_id = (SELECT id FROM psicologos WHERE username = $1)",
                [username]
            );
        } else {
            res.status(400).json({ error: "Tipo de usuario inválido" });
            return;
        }

        // Generar el nombre que será mostrado en el frontend
        const chats = result.rows.map((row) => ({
            id: row.id,
            name: userType === "cliente" ? `${row.psicologo_nombre} ${row.psicologo_apellido}` : row.cliente_username,
            lastMessage: row.last_message,
        }));

        res.status(200).json({ chats });
    } catch (error) {
        console.error("Error al obtener los chats:", error);
        res.status(500).json({ error: "Error al obtener los chats" });
    }
};
