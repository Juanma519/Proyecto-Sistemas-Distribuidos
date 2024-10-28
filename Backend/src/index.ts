import dotenv from 'dotenv'
import express from 'express'
import {Psicologo, User} from './tipos/tipos'
import indexRoutes from './rutas/index'
import { esquema, resolvers } from './graphql/schema';
import { graphqlHTTP } from 'express-graphql'; // ES6
import cors from 'cors';

dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json())
app.use(indexRoutes)
app.use('/graphql', graphqlHTTP({
    schema: esquema,
    rootValue: resolvers,
    graphiql: true,
   
}));
  
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})

//para ejecutar docker : docker-compose up --build

