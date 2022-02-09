import '../styles/characterInfo.scss'
import '../styles/locationInfo.scss'

import React, { useEffect, useState } from 'react';

import CharacterInfo from './CharacterInfo';
import EpisodeInfo from './EpisodeInfo';
import LocationInfo from './LocationInfo';

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { FaGithub, FaArrowLeft } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

export default function MoreInfoPage() {

    const element = useSelector(store => store.element)
    const moreInfo = useSelector(store => store.moreInfo)

    const dispatch = useDispatch()

    const [episodes, setEpisodes] = useState([])
    const [characters, setCharacters] = useState([])


    useEffect(() => {
        console.log('element update', element, moreInfo)
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
            })()

        }
        
    }, [element])
    

    const displayContent = (f) => {
        return f()
    }


    const changeContent = async (str, id) => {
        console.log(str, id)
        if(str === 'epi') {
            const req = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
            const res = await req.json()
            dispatch({type: 'selectEpi', epi: 'epi'})
            dispatch({type: 'updateEpisode', episode: res})
        }
        else if(str === 'char') {
            console.log('before')
            const req = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
            const res = await req.json()
            dispatch({type: 'selectChar', char: 'char'})
            dispatch({type: 'updateCharacter', character: res})
            console.log('end dispatch')
        }
        else {
            const req = await fetch(`https://rickandmortyapi.com/api/location/${id}`)
            const res = await req.json()
            dispatch({type: 'selectLoc', loc: 'loc'})
            dispatch({type: 'updateLocation', location: res})
        }
    }


    return (
        <main>
            <div className="back">
                <nav>
                    <a href="https://github.com/MatetlotDev/Rick-Morty-API"><FaGithub color="#fff" size='40px' /></a>
                    <div className='contacts'>
                        <HiMail color="#fff" size='30px' />
                        <h6>Contact</h6>
                    </div>
                </nav>

                <img className='background' src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png" alt="Rick and morty" />
            </div>

            <Link to='/'>
                <FaArrowLeft style={{position: 'absolute', top: '15vh', left: '10vw', cursor: 'pointer'}} color="#fff" size='40px' />
            </Link>

            {displayContent(() => {
                if(moreInfo === 'char') return <CharacterInfo handleClick={changeContent} character={element} episodes={episodes} />
                else if(moreInfo === 'epi') return <EpisodeInfo handleClick={changeContent} episode={element} characters={characters} />
                else return <LocationInfo handleClick={changeContent} location={element} characters={characters} />
            })}
            
        </main>
    );
}
