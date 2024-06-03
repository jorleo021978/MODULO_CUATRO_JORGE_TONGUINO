//copia App.jsx 
import './App.css'
import Card from './components/Card';
//import image from './assets/perro.jpg'
import { useEffect, useState } from 'react';

function App() {

  const [pokemon, setPokemos] = useState()

  const pokemonCharacterId = 0;

  useEffect( () => {
    {
      fetch("https://pokeapi.co/api/v2/pokemon/"+pokemonCharacterId)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setPokemos(result)
      });
    }
  }, []) 
  console.log(pokemon)

  return (
      <>
        {pokemon && (
          <div className='cards_container'>
            <Card image={pokemon.sprites.front_default} title={pokemon.name} detail={pokemon.abilities[0].ability.name}/>     
            {/*<Card image={image} title='Mi perro' detail='Come crquetas'/>*/}                  
          </div>
        )} 
      </>    
  )
}

export default App;