import React from 'react';

export default function LocationInfo({ location, characters }) {

  let character;
  if (characters.name) character = (
    <div className="card">
      <img src={characters.image} alt="avatar" />
      <h4>{characters.name}</h4>
    </div>
  )
  else if(!characters.name) character = 'No resident.'
  else character = characters.map(el => (
    <div className="card">
      <img src={el.image} alt="avatar" />
      <h4>{el.name}</h4>
    </div>
  ))

  return (
    <div className='content_location_info'>
      <h2>Location: {location.name}</h2>
      <p>Type: {location.type}</p>
      <p>{location.dimension}</p>
      <br />
      <h3>Residents:</h3>
      {character}
    </div>
  );
}
