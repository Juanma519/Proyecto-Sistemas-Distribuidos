export type Mail = `${string}@${string}.${string}`

export type User = { 
    username: string,
    password: string,
    mail: Mail,
}

export type Especialidad = 'Duelos' | 'Traumas' | 'Familiar' | 'Pareja' | 'Separación y Divorcio' |
'Infantil y Adolescente'

export type Psicologo = User & {
    id: number, // El id ya se agregó previamente
    nombre: string,
    apellido: string,
    telefono: string,
    especialidad: Especialidad,
    ubicacion: string,
    descripcion: string, // Agregando 'descripcion' al tipo
    reviews: number // Agregando 'reviews' para manejar las reseñas
}
