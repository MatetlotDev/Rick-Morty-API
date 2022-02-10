import React from 'react';


export default function EpisodeInfo({ episode, characters, handleClick }) {

    // check to if the element is an episode 
    if (episode.air_date) return (
        <div className='content_location_info'>
            <h2>Episode: {episode.episode}</h2>
            <p>Title: {episode.name}</p>
            <p>Air date: {episode.air_date}</p>
            <br />
            <h3>Characters:</h3>
            {characters.map(el => (
                <div key={el.id} className="card" onClick={() => handleClick('char', el.id)}>
                    <img src={el.image} alt="avatar" />
                    <h4>{el.name}</h4>
                </div>
            ))}
        </div>
    );
    else return ''
}
