import React from './App.css';
import student from '../src';

function App() {
  return (
    <div>
      <h1>Artista/Cantante Favorito</h1>
      <img src={student} alt="Foto pelicula" />
      <p>
        Breve  descripción de la pelicula.
        Puedes incluir detalles como su nombre, género, logros, etc.
      </p>
    </div>
  );
}

export default App;