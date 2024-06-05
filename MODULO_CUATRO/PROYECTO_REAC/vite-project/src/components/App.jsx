import './App.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import CharacterCard from './components/Detail/CharacterCard';

function App() {
  const [Title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("");

  const rickAndMortyCharacterId = 40;

    useEffect( () => {
      fetch("https://rickandmortyapi.com/api/character/"+rickAndMortyCharacterId)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.name)
       
        
        setImage(result.image)
        setGenre(result.gender)
        setStatus(result.status)
        setTitle(result.name)

      }
         
      );
  }, []) 


  return(
    <>
      <CharacterCard 
        image={image}
        title={name}
        genre={genre}
        status={status}
      ></CharacterCard>
    </>
  )

}
export default App;