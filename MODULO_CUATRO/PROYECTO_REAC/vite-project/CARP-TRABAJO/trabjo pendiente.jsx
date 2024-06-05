import './App.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import CharacterCard from './components/Detail/CharacterCard';

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("");

  const rickAndMortyCharacterId = 2;

    useEffect( () => {
      fetch("https://rickandmortyapi.com/api/character/"+rickAndMortyCharacterId)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
       
        setName(result.name)
        setImage(result.image)
        setGenre(result.gender)
        setStatus(result.status)

      }
         
      );
  }, []) 


  return(
    <>
      <h1>{name}</h1>
      <CharacterCard 
        name={name}
        image={image}
        genre={genre}
        status={status}
      ></CharacterCard>
    </>
  )

}
export default App;