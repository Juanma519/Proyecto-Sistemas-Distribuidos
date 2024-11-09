import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [userType, setUserType] = useState<'client' | 'psychologist'>('client');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Campos adicionales para psicólogo
    nombre: '',
    apellido: '',
    telefono: '',
    especialidad: '',
    ubicacion: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleUserTypeChange = (type: 'client' | 'psychologist') => {
    setUserType(type);
    // Reiniciar datos del formulario al cambiar el tipo de usuario
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      nombre: '',
      apellido: '',
      telefono: '',
      especialidad: '',
      ubicacion: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const commonPayload = {
      username: formData.username,
      password: formData.password,
      mail: formData.email,
    };

    try {
      let response;
      if (userType === 'client') {
        response = await fetch('http://localhost:5001/crearCliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commonPayload),
        });
      } else {
        // Para psicólogo, incluir campos adicionales
        const psychologistPayload = {
          ...commonPayload,
          nombre: formData.nombre,
          apellido: formData.apellido,
          telefono: formData.telefono,
          especialidad: formData.especialidad,
          ubicacion: formData.ubicacion,
        };

        response = await fetch('http://localhost:5001/crearPsicologo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(psychologistPayload),
        });
      }

      if (response.ok) {
        alert('Usuario creado con éxito');

        // Realizar inicio de sesión automático después del registro
        const loginResponse = await fetch('http://localhost:5001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mail: formData.email, password: formData.password }),
        });

        if (loginResponse.ok) {
          const data = await loginResponse.json();
          // Guardar datos de sesión en localStorage
          localStorage.setItem('userType', data.tipo);
          localStorage.setItem('userId', data.body.id); // Almacena el ID del usuario
          localStorage.setItem('username', data.body.username); // Almacena el username del usuario
          localStorage.setItem('userData', JSON.stringify(data.body));

          // Redirigir al usuario al dashboard principal
          navigate('/');
        } else {
          alert('Registro exitoso, pero hubo un problema al iniciar sesión automáticamente.');
        }
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al conectarse al servidor');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Crear una Cuenta</h2>
      <div className="flex justify-center mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${userType === 'client' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleUserTypeChange('client')}
        >
          Cliente
        </button>
        <button
          className={`px-4 py-2 rounded ${userType === 'psychologist' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleUserTypeChange('psychologist')}
        >
          Psicólogo
        </button>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Campos comunes */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Usuario
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Contraseña */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Confirmar Contraseña */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirmar Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="******************"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Campos adicionales para psicólogo */}
        {userType === 'psychologist' && (
          <>
            {/* Nombre */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Apellido */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                Apellido
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="apellido"
                type="text"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Teléfono */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                Teléfono
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="telefono"
                type="tel"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Especialidad */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="especialidad">
                Especialidad
              </label>
              <select
                id="especialidad"
                value={formData.especialidad}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Selecciona una especialidad
                </option>
                <option value="Duelos">Duelos</option>
                <option value="Traumas">Traumas</option>
                <option value="Familiar">Familiar</option>
                <option value="Pareja">Pareja</option>
                <option value="Separación y Divorcio">Separación y Divorcio</option>
                <option value="Infantil y Adolescente">Infantil y Adolescente</option>
              </select>
            </div>
            {/* Ubicación */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ubicacion">
                Ubicación
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ubicacion"
                type="text"
                placeholder="Ubicación"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}
        {/* Botón de enviar */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrarse
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/login"
          >
            ¿Ya tienes una cuenta?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

