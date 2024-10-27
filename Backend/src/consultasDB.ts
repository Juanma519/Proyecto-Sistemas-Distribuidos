import {Psicologo, User} from './tipos/tipos'
import { pool } from './pool'
import { QueryResult } from 'pg'

export const psicologosUbicacion = async (ubicacion: string): Promise<Psicologo[]> => {
    const result: QueryResult = await pool.query('SELECT * FROM psicologos WHERE ubicacion = $1', [ubicacion])
    const psicologos: Psicologo[] = result.rows.map((row: any) => ({
        username: row.username,
        password: row.password,
        mail: row.mail,
        nombre: row.nombre,
        apellido: row.apellido,
        telefono: row.telefono,
        ubicacion: row.ubicacion,
        especialidad: row.especialidad,
    }));
    return psicologos
}
export const psicologosEspecialidad = async (especialidad: string): Promise<Psicologo[]> => {
    const result: QueryResult = await pool.query('SELECT * FROM psicologos WHERE especialidad = $1', [especialidad])
    const psicologos: Psicologo[] = result.rows.map((row: any) => ({
        username: row.username,
        password: row.password,
        mail: row.mail,
        nombre: row.nombre,
        apellido: row.apellido,
        telefono: row.telefono,
        ubicacion: row.ubicacion,
        especialidad: row.especialidad,
    }));
    return psicologos
}
export const psicologosUbicacionEspecialidad = async (ubicacion: string, especialidad:string): Promise<Psicologo[]> => {
    const result: QueryResult = await pool.query('SELECT * FROM psicologos WHERE ubicacion = $1 AND especialidad = $2', [ubicacion, especialidad])
    const psicologos: Psicologo[] = result.rows.map((row: any) => ({
        username: row.username,
        password: row.password,
        mail: row.mail,
        nombre: row.nombre,
        apellido: row.apellido,
        telefono: row.telefono,
        ubicacion: row.ubicacion,
        especialidad: row.especialidad,
    }));
    return psicologos
}