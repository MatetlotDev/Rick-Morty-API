import React from 'react';


export default function EpisodeInfo({ episode, characters }) {
  return (
    <div className='content_location_info'>
        <h2>Episode: {episode.episode}</h2>
        <p>Title: {episode.name}</p>
        <p>Air date: {episode.air_date}</p>
        <br />
        <h3>Characters:</h3>
        {characters.map(el => (
            <div className="card">
                <img src={el.image} alt="avatar" />
                <h4>{el.name}</h4>
            </div>
        ))}
    </div>
  );
}
