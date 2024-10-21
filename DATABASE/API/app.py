# api/app.py

from flask import Flask, request, jsonify
import psycopg2
import os
from psycopg2.extras import RealDictCursor
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Configuración de la base de datos desde variables de entorno
DB_HOST = os.getenv('DB_HOST', 'db')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'MentalNow')
DB_USER = os.getenv('DB_USER', 'usuario')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'contraseña')

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn



# -------------------
# Endpoints para Clientes
# -------------------

@app.route('/clientes', methods=['GET'])
def get_clientes():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM clientes;')
    clientes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(clientes)

@app.route('/clientes', methods=['POST'])
def add_cliente():
    nuevo_cliente = request.json
    username = nuevo_cliente.get('username')
    mail = nuevo_cliente.get('mail')
    password = nuevo_cliente.get('password')

    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('INSERT INTO clientes (username, mail, password) VALUES (%s, %s, %s) RETURNING id;',
                       (username, mail, hashed_password))
        cliente_id = cursor.fetchone()[0]
        conn.commit()
    except Exception as e:
        conn.rollback()
        cursor.close()
        conn.close()
        return jsonify({'error': str(e)}), 400

    cursor.close()
    conn.close()
    return jsonify({'id': cliente_id, 'username': username, 'mail': mail}), 201

@app.route('/clientes/<int:id>', methods=['PUT'])
def update_cliente(id):
    cliente_actualizado = request.json
    username = cliente_actualizado.get('username')
    mail = cliente_actualizado.get('mail')
    password = cliente_actualizado.get('password')

    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('UPDATE clientes SET username = %s, mail = %s, password = %s WHERE id = %s;',
                       (username, mail, hashed_password, id))
        if cursor.rowcount == 0:
            conn.rollback()
            cursor.close()
            conn.close()
            return jsonify({'error': 'Cliente no encontrado'}), 404
        conn.commit()
    except Exception as e:
        conn.rollback()
        cursor.close()
        conn.close()
        return jsonify({'error': str(e)}), 400

    cursor.close()
    conn.close()
    return jsonify({'id': id, 'username': username, 'mail': mail}), 200

@app.route('/clientes/<int:id>', methods=['DELETE'])
def delete_cliente(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM clientes WHERE id = %s;', (id,))
    if cursor.rowcount == 0:
        conn.rollback()
        cursor.close()
        conn.close()
        return jsonify({'error': 'Cliente no encontrado'}), 404
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Cliente eliminado'}), 200

# -------------------
# Endpoints para Psicólogos
# -------------------

@app.route('/psicologos', methods=['GET'])
def get_psicologos():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM psicologos;')
    psicologos = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(psicologos)

@app.route('/psicologos', methods=['POST'])
def add_psicologo():
    nuevo_psicologo = request.json
    username = nuevo_psicologo.get('username')
    mail = nuevo_psicologo.get('mail')
    password = nuevo_psicologo.get('password')
    nombre = nuevo_psicologo.get('nombre')
    apellido = nuevo_psicologo.get('apellido')
    telefono = nuevo_psicologo.get('telefono')
    especialidad = nuevo_psicologo.get('especialidad')
    ubicacion = nuevo_psicologo.get('ubicacion')

    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO psicologos (username, mail, password, nombre, apellido, telefono, especialidad, ubicacion)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
        ''', (username, mail, hashed_password, nombre, apellido, telefono, especialidad, ubicacion))
        psicologo_id = cursor.fetchone()[0]
        conn.commit()
    except Exception as e:
        conn.rollback()
        cursor.close()
        conn.close()
        return jsonify({'error': str(e)}), 400

    cursor.close()
    conn.close()
    return jsonify({
        'id': psicologo_id,
        'username': username,
        'mail': mail,
        'nombre': nombre,
        'apellido': apellido,
        'telefono': telefono,
        'especialidad': especialidad,
        'ubicacion': ubicacion
    }), 201

@app.route('/psicologos/<int:id>', methods=['PUT'])
def update_psicologo(id):
    psicologo_actualizado = request.json
    username = psicologo_actualizado.get('username')
    mail = psicologo_actualizado.get('mail')
    password = psicologo_actualizado.get('password')
    nombre = psicologo_actualizado.get('nombre')
    apellido = psicologo_actualizado.get('apellido')
    telefono = psicologo_actualizado.get('telefono')
    especialidad = psicologo_actualizado.get('especialidad')
    ubicacion = psicologo_actualizado.get('ubicacion')

    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            UPDATE psicologos
            SET username = %s, mail = %s, password = %s,
                nombre = %s, apellido = %s, telefono = %s,
                especialidad = %s, ubicacion = %s
            WHERE id = %s;
        ''', (username, mail, hashed_password, nombre, apellido, telefono, especialidad, ubicacion, id))
        if cursor.rowcount == 0:
            conn.rollback()
            cursor.close()
            conn.close()
            return jsonify({'error': 'Psicólogo no encontrado'}), 404
        conn.commit()
    except Exception as e:
        conn.rollback()
        cursor.close()
        conn.close()
        return jsonify({'error': str(e)}), 400

    cursor.close()
    conn.close()
    return jsonify({
        'id': id,
        'username': username,
        'mail': mail,
        'nombre': nombre,
        'apellido': apellido,
        'telefono': telefono,
        'especialidad': especialidad,
        'ubicacion': ubicacion
    }), 200

@app.route('/psicologos/<int:id>', methods=['DELETE'])
def delete_psicologo(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM psicologos WHERE id = %s;', (id,))
    if cursor.rowcount == 0:
        conn.rollback()
        cursor.close()
        conn.close()
        return jsonify({'error': 'Psicólogo no encontrado'}), 404
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Psicólogo eliminado'}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
