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
        console.log(response);
        res.status(200).send("Usuario creado");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear usuario");
    }
}

export const verificarCliente = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const response = await pool.query(
            "SELECT * FROM clientes WHERE username = $1 AND password = $2",
            [username, password]
        );
        if (response.rows.length == 0) {
            res.status(404).send("Usuario no encontrado o contraseña incorrecta");
        if (response.rows.length != 0) {
            res.status(200).send(response); 
        }
    }
        } catch (error) {
        console.log(error);
        res.status(500).send("Error al verificar usuario");
    }
}