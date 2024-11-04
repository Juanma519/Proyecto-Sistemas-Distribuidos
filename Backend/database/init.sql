-- db/init.sql

-- Tabla de Clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    mail VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL
);

-- Tabla de Psicólogos
CREATE TABLE psicologos (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    mail VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    especialidad VARCHAR(30) NOT NULL,
    ubicacion VARCHAR(30) NOT NULL,
    descripcion TEXT DEFAULT 'Sin descripción',
    reviews INTEGER DEFAULT 0
);

-- Tabla de Reseñas
CREATE TABLE reseñas (
    id SERIAL PRIMARY KEY,
    id_psicologo INTEGER REFERENCES psicologos(id) ON DELETE CASCADE,
    autor VARCHAR(30) NOT NULL, -- Podría ser el nombre del cliente, pero para simplificar usamos un autor anónimo por ahora
    contenido TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO clientes (username, mail, password) VALUES
('Joaquin Heredero', 'jheredero@example.com','1234'),
('Juan Lolo', 'Onetto@example.com', '1234');

INSERT INTO psicologos (username, mail, password, nombre, apellido, telefono, especialidad, ubicacion, descripcion, reviews) VALUES
('JuanLolo', 'messi@gmail.com', '1234', 'Juan', 'Lolo', '1234567890', 'Pareja', 'CABA', 'Sin descripción', 0);
