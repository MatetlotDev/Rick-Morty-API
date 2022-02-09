import '../styles/characterInfo.scss'
import '../styles/locationInfo.scss'
import '../styles/episodeInfo.scss'

import React, { useEffect, useState } from 'react';

import CharacterInfo from './CharacterInfo';
import EpisodeInfo from './EpisodeInfo';
import LocationInfo from './LocationInfo';

import { Link } from "react-router-dom";

import { useSelector } from 'react-redux';

import { FaGithub, FaHome } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

export default function MoreInfoPage() {

    const element = useSelector(store => store.element)
    const moreInfo = useSelector(store => store.moreInfo)

    const [episodes, setEpisodes] = useState([])
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        if(moreInfo === 'char') {
            const numbers = element.episode.map(el => {
                const arr = el.split('/')
                return arr[arr.length-1]
            }).join(',');

            (async () => {
                const req = await fetch('https://rickandmortyapi.com/api/episode/' + numbers)
                const res = await req.json()
                setEpisodes(res)
            })()
        }

        else if(moreInfo === 'epi') {
            const numbers = element.characters.map(el => {
                const arr = el.split('/')
                return arr[arr.length-1]
            }).join(',');

            (async () => {
                const req = await fetch('https://rickandmortyapi.com/api/character/' + numbers)
                const res = await req.json()
                setCharacters(res)
            })()
        }

        else {
            const numbers = element.residents.map(el => {
                const arr = el.split('/')
                return arr[arr.length-1]
            }).join(',');

            (async () => {
                const req = await fetch('https://rickandmortyapi.com/api/character/' + numbers)
                const res = await req.json()
                setCharacters(res)
                console.log('requete ok')
            })()
        }
        
    }, [element])
    

    const displayContent = (f) => {
        return f()
    }


    return (
        <main>
            <div className="back">
                <nav>
                    <a href="https://github.com/MatetlotDev/Rick-Morty-API"><FaGithub color="#fff" size='40px' /></a>
                    <div className='contacts'>
                        <Link to="/"><FaHome color="#fff" size='30px' /></Link>
                        <HiMail color="#fff" size='30px' />
                        <h6>Contact</h6>
                    </div>
                </nav>

                <img className='background' src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png" alt="Rick and morty" />
            </div>

            {displayContent(() => {
                if(moreInfo === 'char') return <CharacterInfo character={element} episodes={episodes} />
                else if(moreInfo === 'epi') return <EpisodeInfo episode={element} characters={characters} />
                else return <LocationInfo location={element} characters={characters} />
            })}
            
        </main>
    );
}
