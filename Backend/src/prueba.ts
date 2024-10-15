import {pool} from "./pool";
import { Psicologo } from "./tipos/tipos";

//fue para testear la conex a la bd 

const username = "pepe";
const password = "pepe";
const mail = "lo@lo.com";
const nombre = "pepe";
const apellido = "loquete";
const telefono = "123456";
const especialidad = "Duelos";
const ubicacion = "CABA";
const psicologo: Psicologo = {username, password, mail, nombre, apellido, telefono, especialidad, ubicacion};

export async function pruebaPsicologo(){
    const query = `INSERT into psicologos 
    (username, password, mail, nombre, apellido, telefono, especialidad, ubicacion) 
    VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8)`
    const value =  [psicologo.username, psicologo.password,
         psicologo.mail, psicologo.nombre, psicologo.apellido,
          psicologo.telefono, psicologo.especialidad, psicologo.ubicacion]
    
    const response = await pool.query(query,value);
}

const query2 = "SELECT * FROM psicologos WHERE username = $1 AND password = $2";
export async function validacionpruebapsicologo(){
    const value = [psicologo.username, psicologo.password];
    const response = await pool.query(query2,value);
    console.log(response.rows);
}