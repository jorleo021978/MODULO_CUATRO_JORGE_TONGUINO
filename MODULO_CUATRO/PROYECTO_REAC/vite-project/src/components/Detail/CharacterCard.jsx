import React from 'react';
import Image from '../Image';
import Title from '../Title';
import Detail from './Detail';

  function CharacterCard(props) {
    return (
      <div>
        <Title title={props.name}/>
        <Image url={props.image} />
        <Detail 
          genre={props.genre} 
          status={props.status} 
        />
      </div>
    );
  }

  export default CharacterCard;