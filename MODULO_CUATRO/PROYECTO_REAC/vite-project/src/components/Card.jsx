import React from 'react';

function Card({ image, title, gender, status }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div>
        <h2 className='nombre'>{title}</h2>
        <p className='detail'>Género: {gender}</p>
        <p className='detail'>Estado: {status}</p>
      </div>
    </div>
  );
}

export default Card;