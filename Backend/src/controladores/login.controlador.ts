import { pool } from "../pool";
import { Request, Response } from "express";

export const loginUsuario = async (req: Request, res: Response) => {
    const { mail, password } = req.body;

    try {
        // Primero verificamos si el usuario es un cliente
        let response = await pool.query("SELECT id, username FROM clientes WHERE mail = $1 AND password = $2", [mail, password]);
        
        if (response.rows.length === 1) {
            res.status(200).json({
                "message": "Cliente validado",
                "tipo": "cliente",
                "body": response.rows[0] // Contiene id y username
            });
            return;
        }

        // Si no es cliente, verificamos si es psicólogo
        response = await pool.query("SELECT id, username FROM psicologos WHERE mail = $1 AND password = $2", [mail, password]);
        
        if (response.rows.length === 1) {
            res.status(200).json({
                "message": "Psicólogo validado",
                "tipo": "psicologo",
                "body": response.rows[0] // Contiene id y username
            });
            return;
        }

        // Si no se encuentra en ninguna de las dos tablas, retornamos un error
        res.status(404).send("Usuario no encontrado o contraseña incorrecta");

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al verificar usuario");
    }
};
