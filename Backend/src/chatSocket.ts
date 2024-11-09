import { pool } from "./pool";
import { Server } from "socket.io";
import { Server as HttpServer } from "http";

const connectedUsers = new Map<string, string>();

export const initializeChatSocket = (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:4173",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Nuevo cliente conectado:", socket.id);

        // Escuchar cuando un usuario se identifica
        socket.on("identify", (username) => {
            connectedUsers.set(username, socket.id);
            console.log(`Usuario ${username} conectado con socket ID ${socket.id}`);
        });

        // Manejar la unión a un chat específico
        socket.on("joinChat", async ({ chatId }) => {
            socket.join(chatId);
            console.log(`Cliente ${socket.id} se unió al chat ${chatId}`);
        });

        // Manejar el envío de un mensaje
        socket.on("sendMessage", async ({ chatId, senderUsername, content }) => {
            try {
                // Guardar el mensaje en la base de datos usando `username`
                const newMessage = await pool.query(
                    "INSERT INTO mensajes (chat_id, sender, content) VALUES ($1, $2, $3) RETURNING *",
                    [chatId, senderUsername, content]
                );

                // Emitir el mensaje a todos los clientes en la sala del chat
                io.to(chatId).emit("receiveMessage", newMessage.rows[0]);

                // Obtener el receptor
                const chatInfo = await pool.query(
                    "SELECT cliente_username, psicologo_username FROM chats WHERE id = $1",
                    [chatId]
                );

                if (chatInfo.rows.length > 0) {
                    const { cliente_username, psicologo_username } = chatInfo.rows[0];
                    // Identificar el receptor basado en el `senderUsername`
                    const receiverUsername = senderUsername === cliente_username ? psicologo_username : cliente_username;

                    // Verificar si el receptor está conectado
                    const receiverSocketId = connectedUsers.get(receiverUsername);

                    // Enviar el evento solo al receptor si está conectado
                    if (receiverSocketId) {
                        // Emitir el evento "newChatCreated" y "receiveMessage" al receptor
                        io.to(receiverSocketId).emit("newChatCreated", {
                            id: chatId,
                            name: senderUsername,
                            lastMessage: content
                        });

                        // También enviar el primer mensaje al receptor para que lo vea en tiempo real
                        io.to(receiverSocketId).emit("receiveMessage", newMessage.rows[0]);
                    }
                }
            } catch (error) {
                console.error("Error al enviar el mensaje:", error);
            }
        });

        // Manejar la desconexión
        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
            // Remover el usuario desconectado usando `username`
            connectedUsers.forEach((socketId, username) => {
                if (socketId === socket.id) {
                    connectedUsers.delete(username);
                    console.log(`Usuario ${username} desconectado`);
                }
            });
        });
    });
};