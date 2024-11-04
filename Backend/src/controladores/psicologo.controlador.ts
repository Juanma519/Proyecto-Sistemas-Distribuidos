import { pool } from "../pool";
import { Request, Response } from "express";

// Crear Psicologo
export const crearPsicologo = async (req: Request, res: Response) => {
    const { username, password, mail, nombre, apellido, telefono, especialidad, ubicacion } = req.body;
    try {
        const response = await pool.query(
            `INSERT into psicologos (username, password, mail, nombre, apellido, telefono, especialidad, ubicacion, descripcion, reviews) 
            VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [username, password, mail, nombre, apellido, telefono, especialidad, ubicacion, 'Sin descripción', 0]
        );
        console.log(response.rows);
        res.status(201).json({
            message: "Psicólogo creado con éxito",
            data: response.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al crear psicólogo",
            error: (error as Error).message
        });
    }
};

// Verificar Psicologo
export const verificarPsicologo = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const response = await pool.query("SELECT * FROM psicologos WHERE username = $1 AND password = $2", [username, password]);
        if (response.rows.length === 0) {
            res.status(404).json({ message: "Psicólogo no encontrado o contraseña incorrecta" });
        } else {
            res.status(200).json({
                message: "Psicólogo validado",
                body: response.rows[0]
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al verificar psicólogo",
            error: (error as Error).message
        });
    }
};

// Obtener Psicologo por ID
export const obtenerPsicologoPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await pool.query("SELECT * FROM psicologos WHERE id = $1", [id]);
        if (response.rows.length === 0) {
            res.status(404).json({ message: "Psicólogo no encontrado" });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener psicólogo",
            error: (error as Error).message
        });
    }
};

// Listar Psicologos
export const listarPsicologos = async (req: Request, res: Response) => {
    try {
        const response = await pool.query("SELECT * FROM psicologos");
        res.status(200).json({
            message: "Lista de Psicólogos",
            data: response.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener la lista de psicólogos",
            error: (error as Error).message
        });
    }
};

// Filtrar Psicologos
export const filtrarPsicologo = async (req: Request, res: Response) => {
    const { search } = req.query;
    console.log("Término de búsqueda recibido:", search);

    try {
        const query = `
            SELECT * FROM psicologos 
            WHERE LOWER(nombre) LIKE LOWER($1) 
            OR LOWER(apellido) LIKE LOWER($1)
            OR CONCAT(LOWER(nombre), ' ', LOWER(apellido)) LIKE LOWER($1)
        `;
        const response = await pool.query(query, [`%${search}%`]);
        console.log("Resultados encontrados:", response.rows);

        if (response.rows.length === 0) {
            res.status(404).json({
                message: "No se encontraron psicólogos con ese nombre/apellido",
                data: []
            });
        } else {
            res.status(200).json({
                message: "Lista de Psicólogos",
                data: response.rows
            });
        }
    } catch (error) {
        console.error("Error al filtrar psicólogos:", error);
        res.status(500).json({
            message: "Error al filtrar psicólogos",
            error: (error as Error).message
        });
    }
};

// Obtener Reseñas de un Psicólogo
export const obtenerReseñas = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const response = await pool.query("SELECT * FROM reseñas WHERE id_psicologo = $1 ORDER BY fecha DESC", [id]);
        res.status(200).json({
            message: "Lista de Reseñas",
            data: response.rows
        });
    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        res.status(500).json({
            message: "Error al obtener las reseñas",
            error: (error as Error).message
        });
    }
};

// Agregar una Reseña a un Psicólogo
export const agregarReseña = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const { contenido } = req.body;

    try {
        if (!contenido) {
            res.status(400).json({ message: "Contenido de la reseña requerido" });
            return;
        }

        const response = await pool.query(
            "INSERT INTO reseñas (id_psicologo, autor, contenido, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [parseInt(id, 10), 'Usuario anónimo', contenido]
        );

        res.status(201).json({
            message: "Reseña agregada con éxito",
            data: response.rows[0]
        });
    } catch (error) {
        console.error("Error al agregar reseña:", error);
        res.status(500).json({
            message: "Error al agregar la reseña",
            error: (error as Error).message
        });
    }
};

// Listar todas las Reseñas
export const listarTodasLasReseñas = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await pool.query("SELECT * FROM reseñas ORDER BY fecha DESC");
        res.status(200).json({
            message: "Lista de todas las Reseñas",
            data: response.rows
        });
    } catch (error) {
        console.error("Error al obtener todas las reseñas:", error);
        res.status(500).json({
            message: "Error al obtener todas las reseñas",
            error: (error as Error).message
        });
    }
};


// Controlador para obtener los psicólogos con más reseñas
export const listarTopPsicologos = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = `
            SELECT p.*, COUNT(r.id) AS reseñas_count
            FROM psicologos p
            LEFT JOIN reseñas r ON p.id = r.id_psicologo
            GROUP BY p.id
            ORDER BY reseñas_count DESC
            LIMIT 5
        `;
        
        const response = await pool.query(query);
        res.status(200).json({
            message: "Lista de los 5 psicólogos con más reseñas",
            data: response.rows
        });
    } catch (error) {
        console.error("Error al obtener los mejores psicólogos:", error);
        res.status(500).json({
            message: "Error al obtener los mejores psicólogos",
            error: (error as Error).message
        });
    }
};



// Nueva función para actualizar la descripción del psicólogo
export const actualizarDescripcionPsicologo = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const { descripcion } = req.body;

    if (!descripcion) {
        res.status(400).json({ message: "La descripción es requerida." });
        return; // Asegúrate de finalizar la ejecución con un return
    }

    try {
        const response = await pool.query(
            "UPDATE psicologos SET descripcion = $1 WHERE id = $2 RETURNING *",
            [descripcion, parseInt(id, 10)]
        );

        if (response.rows.length === 0) {
            res.status(404).json({ message: "Psicólogo no encontrado." });
        } else {
            res.status(200).json({
                message: "Descripción actualizada con éxito.",
                data: response.rows[0],
            });
        }
    } catch (error) {
        console.error("Error al actualizar la descripción del psicólogo:", error);
        res.status(500).json({
            message: "Error al actualizar la descripción del psicólogo.",
            error: (error as Error).message,
        });
    }
};