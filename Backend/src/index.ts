import dotenv from 'dotenv'
import express from 'express'
import {Psicologo, User} from './tipos/tipos'
import indexRoutes from './rutas/index'
import { pruebaPsicologo, validacionpruebapsicologo } from './prueba';


dotenv.config();
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(indexRoutes)

  
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})

//para runear primero hay que hace npm run build y luego npm start
//o en vez de npm start, npm run dev 