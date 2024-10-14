

export type Mail = `${string}@${string}.${string}`

export type User = { 
    username: string,
    password: string,
    mail: Mail,

} 
export type Especialidad = 'Duelos' | 'Traumas' | 'Familiar' | 'Pareja' | 'Separación y Divorcio' |
'Infantil y Adolescente'

export type Psicologo = User & {
    nombre: string,
    apellido: string,
    telefono: number,
    especialidad: Especialidad,
    ubicacion: string
}