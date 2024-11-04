import { pool } from "../pool";
import { Request, Response } from "express";

// Crear Psicologo
export const crearPsicologo = async (req: Request, res: Response) => {
    const { username, password, mail, nombre, apellido, telefono, especialidad, ubicacion } = req.body;
    try {
        const response = await pool.query(
            `INSERT into psicologos (username, password, mail, nombre, apellido, telefono, especialidad, ubicacion) 
            VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8)`,
            [username, password, mail, nombre, apellido, telefono, especialidad, ubicacion]
        );
        console.log(response.rows);
        res.status(200).send("Psicologo creado");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear psicologo");
    }
};

// Verificar Psicologo
export const verificarPsicologo = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const response = await pool.query("SELECT * FROM psicologos WHERE username = $1 AND password = $2", [username, password]);
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

// Listar Psicologos (Restaurado)
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

// Filtrar Psicologos
export const filtrarPsicologo = async (req: Request, res: Response) => {
    const { search } = req.query; // Obtener el término de búsqueda desde la query string
    console.log("Término de búsqueda recibido:", search); // Log para verificar el término recibido

    try {
        const query = `
            SELECT * FROM psicologos 
            WHERE LOWER(nombre) LIKE LOWER($1) 
            OR LOWER(apellido) LIKE LOWER($1)
            OR CONCAT(LOWER(nombre), ' ', LOWER(apellido)) LIKE LOWER($1)
        `;
        const response = await pool.query(query, [`%${search}%`]); // Buscar coincidencias parciales
        console.log("Resultados encontrados:", response.rows); // Log para verificar los resultados encontrados

        if (response.rows.length === 0) {
            res.status(404).json({
                message: "No se encontraron psicólogos con ese nombre/apellido",
                data: []
            });
        } else {
            res.status(200).json({
                "message": "Lista de Psicólogos",
                "data": response.rows
            });
        }
    } catch (error) {
        console.error("Error al filtrar psicólogos:", error); // Log del error
        res.status(500).send("Error al filtrar psicólogos");
    }
};
