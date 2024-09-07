import React, { useState } from 'react';

// Define una interfaz para los datos de los estudiantes
interface Estudiante {
  Estudiante: string;
  Email: string;
  Seccion: string;
}

const ConsultaAlumnos: React.FC = () => {
  const [carnet, setCarnet] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [seccion, setSeccion] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleBuscar = async () => {
    if (carnet.trim() === '') {
      setError('Por favor, ingrese el número de carnet.');
      return;
    }

    try {
      const response = await fetch(`/estudiantes/${encodeURIComponent(carnet.trim())}`);
      const contentType = response.headers.get("content-type");

      const textData = await response.text(); // Muestra el contenido completo
      console.log('Respuesta completa de la API:', textData);

      if (contentType && contentType.includes("application/json")) {
        const data: Estudiante[] = JSON.parse(textData); // Asegura que sea un arreglo de Estudiante
        
        if (response.ok && data.length > 0) {
          const estudiante = data[0]; // Toma el primer estudiante del array
          setNombre(estudiante.Estudiante);
          setCorreo(estudiante.Email);
          setSeccion(estudiante.Seccion);
          setError('');
        } else {
          setError('Estudiante no encontrado');
        }
      } else {
        setError('La respuesta no es un JSON válido.');
        console.log('Respuesta de la API (no JSON):', textData);
      }
    } catch (error) {
      console.error('Error al conectarse con la API:', error);
      setError('Error al conectarse con la API.');
    }
  };

  const handleLimpiar = () => {
    setCarnet('');
    setNombre('');
    setCorreo('');
    setSeccion('');
    setError('');
  };

  const handleCancelar = () => {
    handleLimpiar();
  };

  return (
    <div>
      <h1>Consulta de Alumnos</h1>
      <div>
        <label>Carnet:</label>
        <input
          type="text"
          value={carnet}
          onChange={(e) => setCarnet(e.target.value)}
          placeholder="Ingrese el carnet"
        />
      </div>
      <div>
        <label>Nombres:</label>
        <input type="text" value={nombre} readOnly />
      </div>
      <div>
        <label>Correo Electrónico:</label>
        <input type="text" value={correo} readOnly />
      </div>
      <div>
        <label>Sección:</label>
        <input type="text" value={seccion} readOnly />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <button className="btn-blue" onClick={handleBuscar}>Buscar</button>
        <button className="btn-green" onClick={handleLimpiar}>Limpiar</button>
        <button className="btn-red" onClick={handleCancelar}>Cancelar</button>
      </div>
    </div>
  );
};

export default ConsultaAlumnos;
