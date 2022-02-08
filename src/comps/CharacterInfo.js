import React from 'react';

export default function CharacterInfo({ character, episodes }) {
    return (
        <div className="content_character_info">
            <div className="character_full_card">
                <img src={character.image} alt="avatar" />
                <div className="char_infos">
                    <p>Name: {character.name}</p>
                    <p>Species: {character.species}</p>
                    {character.type.lenght === 0 ? '' : <p>{character.type}</p>}
                    <p>Origin: {character.origin.name}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Status: {character.status}</p>
                    <br />
                    <h4>Last seen in:</h4>
                    <p className='location'>"{character.location.name}"</p>
                </div>
            </div>

            <div className="episodes_card">
                <h2>Episodes:</h2>
                {episodes.map(el => (
                    <div key={el.id} className="episode_card" onClick={() => ''}>
                        <p>{el.episode}  -  {el.name}  -  {el.air_date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
