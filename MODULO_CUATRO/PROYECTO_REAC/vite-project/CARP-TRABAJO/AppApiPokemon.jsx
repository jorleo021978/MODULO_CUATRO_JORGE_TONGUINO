import './App.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewSingle, setViewSingle] = useState(true); 
  const [pokemonCharacterId, setPokemonCharacterId] = useState(12); 
  const [offset, setOffset] = useState(0); 
  const limit = 20; 

  useEffect(() => {
    if (viewSingle) {
      // Obtener detalles de un solo Pokémon
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonCharacterId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then((result) => {
          setPokemon(result);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      // Obtener la lista de los primeros 20 Pokémon con paginación
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then((data) => {
          const promises = data.results.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json())
          );
          return Promise.all(promises);
        })
        .then((pokemonData) => {
          setPokemonList(pokemonData);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [viewSingle, pokemonCharacterId, offset]);

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
    setPokemonCharacterId(e.target.value);
  };

  const handlePrevious = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };
  return (
    <div>
      <button className='button_superio' onClick={handleViewChange}>
        {viewSingle ? 'Ver los primeros 20 Pokémon' : 'Ver un Pokémon específico'}
      </button>
      {viewSingle && (
        <div>
          <input
            type="number"
            value={pokemonCharacterId}
            onChange={handleInputChange}
            placeholder="ID de Pokémon"
            min="1"
          />
        </div>
      )}
      <div className="cards_container">
        {viewSingle ? (
          pokemon && (
            <Card
              image={pokemon.sprites.front_default}
              title={pokemon.name}
              detail={pokemon.abilities[0].ability.name}
            />
          )
        ) : (
          pokemonList.map((pokemon) => (
            <Card
              key={pokemon.id}
              image={pokemon.sprites.front_default}
              title={pokemon.name}
              detail={pokemon.abilities[0]?.ability.name || 'No abilities'}
            />
          ))
        )}
      </div>
      {!viewSingle && (
        <div className="pagination">
          <br/>
          <button className='button' onClick={handlePrevious} disabled={offset === 0}>
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
