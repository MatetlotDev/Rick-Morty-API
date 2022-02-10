import React from 'react';

export default function LocationInfo({ location, characters, handleClick }) {

  // check to see if the element is a location
  if (location.dimension) {
    let character;
    // then check if there's one or more, same than CharacterInfo.js
    if (characters.name) character = (
      <div className="card" onClick={() => handleClick('char', characters.id)}>
        <img src={characters.image} alt="avatar" />
        <h4>{characters.name}</h4>
      </div>
    )
    else character = characters.map(el => (
      <div className="card" onClick={() => handleClick('char', el.id)}>
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
  else return ''
}
