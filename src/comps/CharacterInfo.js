import React from 'react';

export default function CharacterInfo({ character, episodes, handleClick }) {

    if (character.species) {
        let content;
        if (episodes.name) content = (
            <div key={episodes.id} className="episode_card" onClick={() => handleClick('epi', episodes.id)}>
                <p>{episodes.episode}  -  {episodes.name}  -  {episodes.air_date}</p>
            </div>
        )
        else content = (
            episodes.map(el => (
                <div key={el.id} className="episode_card" onClick={() => handleClick('epi', el.id)}>
                    <p>{el.episode}  -  {el.name}  -  {el.air_date}</p>
                </div>
            ))
        )

        const arr = character.location.url.split('/')
        const locationId = arr[arr.length-1]

        return (
            <div className="content_character_info" >
                <div className="character_full_card">
                    <img src={character.image} alt="avatar" />
                    <div className="char_infos">
                        <p>Name: {character.name}</p>
                        <p>Species: {character.species}</p>
                        {character.type === "" ? '' : <p>{character.type}</p>}
                        <p>Origin: {character.origin.name}</p>
                        <p>Gender: {character.gender}</p>
                        <p>Status: {character.status}</p>
                        <br />
                        <h4>Last seen in:</h4>
                        <p className='location' onClick={() => handleClick('loc', locationId)} >"{character.location.name}"</p>
                    </div>
                </div>

                <div className="episodes_card">
                    <h2>Episodes:</h2>
                    {content}
                </div>
            </div>
        );
    }
    else return ''
}
