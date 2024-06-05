import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [character, setCharacter] = useState(null);
  const [characterList, setCharacterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewSingle, setViewSingle] = useState(true);
  const [characterId, setCharacterId] = useState(1);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchCharacterData = async () => {
      try {
        let response;
        if (viewSingle) {
          // Obtener detalles de un solo personaje
          response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
        } else {
          // Obtener la lista de personajes con paginación
          const url = searchQuery
            ? `https://rickandmortyapi.com/api/character/?name=${searchQuery}&page=${page}`
            : `https://rickandmortyapi.com/api/character?page=${page}`;
          response = await fetch(url);
        }

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const result = await response.json();

        if (viewSingle) {
          setCharacter(result);
        } else {
          setCharacterList(result.results);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reiniciar la página después de 3 segundos
      }
    };

    fetchCharacterData();
  }, [viewSingle, characterId, page, searchQuery, searchTrigger]);

  useEffect(() => {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    const page = params.get('page');
    if (page) {
      setPage(parseInt(page, 10));
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.replaceState({}, '', url);
  }, [page]);

  useEffect(() => {
    if (characterId > 99999) {
      window.location.reload();
    }
  }, [characterId]);

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
    const value = e.target.value;
    if (/^\d{1,5}$/.test(value)) {
      setCharacterId(value);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setSearchQuery(value);
    }
  };

  const handleSearchClick = () => {
    setSearchTrigger(!searchTrigger);
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
          <input
            className='button_superio'
            type="number"
            value={characterId}
            onChange={handleInputChange}
            placeholder="ID de personaje"
            min="1"
            max="99999"
          />
          <button className="search-button" onClick={handleSearchClick}>
            <span role="img" aria-label="search">🔍</span>
          </button>
        </div>
        <br />
        <div className="search-box">
          <input
            className='button_superio'
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar personaje por nombre"
          />
          <button className="search-button" onClick={handleSearchClick}>
            <span role="img" aria-label="search">🔍</span>
          </button>
        </div>
      </div>
      <div className={`cards_container ${characterList.length === 1 ? 'single-card' : ''}`}>
        {viewSingle ? (
          character && (
            <Card
              image={character.image}
              title={character.name}
              gender={character.gender}
              status={character.status}
            />
          )
        ) : (
          characterList.map((character) => (
            <Card
              key={character.id}
              image={character.image}
              title={character.name}
              gender={character.gender}
              status={character.status}
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
