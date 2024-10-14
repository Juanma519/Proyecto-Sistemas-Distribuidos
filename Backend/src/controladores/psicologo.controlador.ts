import {pool} from "../pool";
import { Request, Response } from "express";
import { User } from "../tipos/tipos";
import { QueryResult } from "pg";

export const crearPsicologo = async (req: Request, res: Response) => {
    const { username, password, mail, nombre, apellido, telefono, especialidad, ubicacion } = req.body;
    try {
        const response = await pool.query(
            "INSERT INTO psicologos (username, password, mail, nombre, apellido, telefono, especialidad, ubicacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [username, password, mail, nombre, apellido, telefono, especialidad, ubicacion]
        );
        console.log(response);
        res.status(200).send("Psicologo creado");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear psicologo");
    }
}

export const verificarPsicologo = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const response = await pool.query(
            "SELECT * FROM psicologos WHERE username = $1 AND password = $2",
            [username, password]
        );
        if (response.rows.length == 0) {
            res.status(404).send("Psicologo no encontrado o contraseña incorrecta");
        }
        if (response.rows.length != 0) {   
            res.status(200).send(response); 
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al verificar psicologo");
    }
}