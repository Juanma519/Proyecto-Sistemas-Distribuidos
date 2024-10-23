import {pool} from "../pool";
import { Request, Response } from "express";
import { User } from "../tipos/tipos";
import { QueryResult } from "pg";
//habria que laburarle el tipado
export const crearCliente = async (req: Request, res: Response) => {
    const { username, password, mail } = req.body;
    try {
        const response = await pool.query(
            "INSERT INTO clientes (username, password, mail) VALUES ($1, $2, $3)",
            [username, password, mail]
        );
        console.log(response.rows);
        res.status(200).send("Usuario creado");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
const query2 = "SELECT * FROM clientes WHERE username = $1 AND password = $2";

export const verificarCliente = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const response = await pool.query(query2, [username, password]
        );
        if (response.rows.length == 1) {
            res.status(200).send("Cliente validado");
        } else{
            res.status(404).send("Usuario no encontrado o contraseña incorrecta");
        }
        
        } catch (error) {
        console.log(error);
        res.status(500).send("Error al verificar usuario");
    }
}