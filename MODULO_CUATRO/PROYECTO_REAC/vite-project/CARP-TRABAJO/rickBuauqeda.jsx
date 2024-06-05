import './App.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';

function App() {
  const [character, setCharacter] = useState(null);
  const [characterList, setCharacterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewSingle, setViewSingle] = useState(true);
  const [characterId, setCharacterId] = useState(1);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (viewSingle) {
      // Obtener detalles de un solo personaje
      fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then((result) => {
          setCharacter(result);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      // Obtener la lista de personajes con paginación
      const url = searchQuery
        ? `https://rickandmortyapi.com/api/character/?name=${searchQuery}&page=${page}`
        : `https://rickandmortyapi.com/api/character?page=${page}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then((data) => {
          setCharacterList(data.results);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [viewSingle, characterId, page, searchQuery]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleViewChange = () => {
    setViewSingle(!viewSingle);
  };

  const handleInputChange = (e) => {
    setCharacterId(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <button className='button_superio' onClick={handleViewChange}>
        {viewSingle ? 'Ver lista de personajes' : 'Ver un personaje específico'}
      </button>
      <div className="search-container">
        <div className="search-box">
          <input className='button_superio'
            type="number"
            value={characterId}
            onChange={handleInputChange}
            placeholder="ID de personaje"
            min="1"
          />
          <button className="search-button">
            <span role="img" aria-label="search">🔍</span>
          </button>
        </div>
        <br />
        <div className="search-box">
          <input className='button_superio'
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar personaje por nombre"
          />
          <button className="search-button">
            <span role="img" aria-label="search">🔍</span>
          </button>
        </div>
      </div>
      <div className="cards_container">
        {viewSingle ? (
          character && (
            <Card
              image={character.image}
              title={character.name}
              detail={`Status: ${character.status}`}
            />
          )
        ) : (
          characterList.map((character) => (
            <Card
              key={character.id}
              image={character.image}
              title={character.name}
              detail={`Status: ${character.status}`}
            />
          ))
        )}
      </div>
      
      {!viewSingle && (
        <div className="pagination">
          <button className='button' onClick={handlePrevious} disabled={page === 1}>
            Anterior
          </button>
          <button className='button' onClick={handleNext}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
