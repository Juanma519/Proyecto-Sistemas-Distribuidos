import dotenv from 'dotenv';
import express from 'express';
import { esquema, resolvers } from './graphql/schema';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import http from 'http';
import indexRoutes from './rutas/index';
import { initializeChatSocket } from './chatSocket'; // Importa correctamente el módulo para WebSocket

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Configuración de middleware
app.use(cors());
app.use(express.json());
app.use(indexRoutes);

// Configuración de GraphQL
app.use('/graphql', graphqlHTTP({
    schema: esquema,
    rootValue: resolvers,
    graphiql: true,
}));

// Crear servidor HTTP y agregar Socket.io
const server = http.createServer(app);

// Configuración de WebSockets con el controlador de chat
initializeChatSocket(server); // Llama al controlador de WebSocket para configurar el chat

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
