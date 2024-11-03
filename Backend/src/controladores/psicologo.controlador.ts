import { pool } from "../pool";
import { Request, Response } from "express";
import { User } from "../tipos/tipos";
import { QueryResult } from "pg";

const query1 = `INSERT into psicologos 
    (username, password, mail, nombre, apellido, telefono, especialidad, ubicacion) 
    VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8)`;

export const crearPsicologo = async (req: Request, res: Response) => {
    const { username, password, mail, nombre, apellido, telefono, especialidad, ubicacion } = req.body;
    try {
        const response = await pool.query(query1, [username, password, mail, nombre, apellido, telefono, especialidad, ubicacion]);
        console.log(response.rows);
        res.status(200).send("Psicologo creado");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear psicologo");
    }
};

// Modificación en verificarPsicologo para usar el mail en lugar del username
const query2 = "SELECT * FROM psicologos WHERE mail = $1 AND password = $2";
export const verificarPsicologo = async (req: Request, res: Response) => {
    const { mail, password } = req.body;
    try {
        const response = await pool.query(query2, [mail, password]);
        if (response.rows.length === 0) {
            res.status(404).send("Psicologo no encontrado o contraseña incorrecta");
        } else {
            res.status(200).json({
                "message": "Psicologo validado",
                "body": response.rows[0]
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al verificar psicologo");
    }
};

// Función para actualizar datos del psicólogo
export const updatePsicologo = async (req: Request, res: Response) => {
    const { username, password, mail, nombre, apellido, telefono, especialidad, ubicacion } = req.body;
    try {
        const response = await pool.query(
            "UPDATE psicologos SET password = $2, mail = $3, nombre = $4, apellido = $5, telefono = $6, especialidad = $7, ubicacion = $8 WHERE username = $1",
            [username, password, mail, nombre, apellido, telefono, especialidad, ubicacion]
        );
        console.log(response.rows);
        res.status(200).send("Psicologo actualizado");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar psicologo");
    }
};

// Nueva función para listar todos los psicólogos
export const listarPsicologos = async (req: Request, res: Response) => {
    try {
        const response = await pool.query("SELECT * FROM psicologos");
        res.status(200).json({
            "message": "Lista de Psicólogos",
            "data": response.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener la lista de psicólogos");
    }
};

// Función vacía que se dejó sin implementar
export const filtrarPsicologo = async (req: Request, res: Response) => {
    // Aquí se puede agregar la lógica para filtrar psicólogos según algún criterio si lo necesitas en el futuro
};
