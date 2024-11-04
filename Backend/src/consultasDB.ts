import { Psicologo } from './tipos/tipos';
import { pool } from './pool';
import { QueryResult } from 'pg';

// Función para mapear el resultado a un objeto Psicologo
const mapRowToPsicologo = (row: any): Psicologo => ({
    id: row.id,
    username: row.username,
    password: row.password,
    mail: row.mail,
    nombre: row.nombre,
    apellido: row.apellido,
    telefono: row.telefono,
    ubicacion: row.ubicacion,
    especialidad: row.especialidad,
    descripcion: row.descripcion,
    reviews: row.reviews
});

// Obtener psicólogos por ubicación
export const psicologosUbicacion = async (ubicacion: string): Promise<Psicologo[]> => {
    const result: QueryResult = await pool.query('SELECT * FROM psicologos WHERE ubicacion = $1', [ubicacion]);
    return result.rows.map(mapRowToPsicologo);
};

// Obtener psicólogos por especialidad
export const psicologosEspecialidad = async (especialidad: string): Promise<Psicologo[]> => {
    const result: QueryResult = await pool.query('SELECT * FROM psicologos WHERE especialidad = $1', [especialidad]);
    return result.rows.map(mapRowToPsicologo);
};

// Obtener psicólogos por ubicación y especialidad
export const psicologosUbicacionEspecialidad = async (ubicacion: string, especialidad: string): Promise<Psicologo[]> => {
    const result: QueryResult = await pool.query('SELECT * FROM psicologos WHERE ubicacion = $1 AND especialidad = $2', [ubicacion, especialidad]);
    return result.rows.map(mapRowToPsicologo);
};

// Obtener un psicólogo por id
export const getPsicologoById = async (id: number): Promise<Psicologo | null> => {
    const result: QueryResult = await pool.query('SELECT * FROM psicologos WHERE id = $1', [id]);
    if (result.rows.length > 0) {
        return mapRowToPsicologo(result.rows[0]);
    } else {
        return null;
    }
};

// Obtener todos los psicólogos
export const obtenerTodosLosPsicologos = async (): Promise<Psicologo[]> => {
    const result: QueryResult = await pool.query('SELECT * FROM psicologos');
    return result.rows.map(mapRowToPsicologo);
};

// Obtener un psicólogo por username
export const getPsicologoByUsername = async (username: string): Promise<Psicologo | null> => {
    const result: QueryResult = await pool.query('SELECT * FROM psicologos WHERE username = $1', [username]);
    if (result.rows.length > 0) {
        return mapRowToPsicologo(result.rows[0]);
    } else {
        return null;
    }
};

// Obtener todas las reseñas de un psicólogo
export const obtenerReseñasPorPsicologo = async (idPsicologo: number): Promise<any[]> => {
    const result: QueryResult = await pool.query('SELECT * FROM reseñas WHERE id_psicologo = $1 ORDER BY fecha DESC', [idPsicologo]);
    return result.rows;
};

// Agregar una reseña a un psicólogo
export const agregarReseña = async (idPsicologo: number, contenido: string, autor: string = 'Usuario anónimo'): Promise<any> => {
    const result: QueryResult = await pool.query(
        'INSERT INTO reseñas (id_psicologo, autor, contenido, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [idPsicologo, autor, contenido]
    );
    return result.rows[0];
};
