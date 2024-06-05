import React from 'react';
import Title from './Title';
import Image from './Image';
import Details from './Details';

  function CharacterCard(props) {
    return (
      <div>
        <h1>hola</h1>
        <Title title={props.name}/>
        <Image url={props.image} />
        <Details 
          genre={props.genre} 
          status={props.status} 
        />
      </div>
    );
  }

  export default CharacterCard;