import '../styles/homepage.scss'

import React, { useEffect, useState } from 'react'

import { Link } from "react-router-dom";

import { FaGithub, FaHome } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { IoMale, IoFemale, IoMaleFemale } from 'react-icons/io5'

import { useDispatch } from 'react-redux'

export default function Homepage() {

    const dispatch = useDispatch();

    const [characters, setCharacters] = useState([])
    const [episodes, setEpisodes] = useState([])
    const [locations, setLocations] = useState([])
    let [actualPage, setActualPage] = useState(1)
    const [activeButton, setActiveButton] = useState('char')

    useEffect(() => {
        (async () => {
            const req = await fetch('https://rickandmortyapi.com/api/character')
            const res = await req.json()
            setCharacters(res)
        })()
    }, [])


    const genderLogo = (f) => {
        return f();
    }

    const nextPage = async () => {
        if (activeButton === 'char') {
            const req = await fetch(characters.info.next)
            const res = await req.json()
            setCharacters(res)
            setActualPage(actualPage += 1)
        }
        else if (activeButton === 'epi') {
            const req = await fetch(episodes.info.next)
            const res = await req.json()
            setEpisodes(res)
            setActualPage(actualPage += 1)
        }
        else {
            const req = await fetch(locations.info.next)
            const res = await req.json()
            setLocations(res)
            setActualPage(actualPage += 1)
        }
    }

    const prevPage = async () => {
        if (activeButton === 'char') {
            const req = await fetch(characters.info.prev)
            const res = await req.json()
            setCharacters(res)
            setActualPage(actualPage -= 1)
        }
        else if (activeButton === 'epi') {
            const req = await fetch(episodes.info.prev)
            const res = await req.json()
            setEpisodes(res)
            setActualPage(actualPage -= 1)
        }
        else {
            const req = await fetch(locations.info.prev)
            const res = await req.json()
            setLocations(res)
            setActualPage(actualPage -= 1)
        }
    }

    const dispatchElement = (el, str) => {
        if(str === 'char') {
            dispatch({ type: 'updateCharacter', character: el })
            dispatch({ type: 'char' })
        }
        else if(str === 'epi') {
            dispatch({ type: 'updateEpisode', episode: el })
            dispatch({ type: 'epi' })
        }
        else {
            dispatch({ type: 'updateLocation', location: el })
            dispatch({ type: 'loc' })
        }
    }


    
    const changeButton = async (str) => {
        if (str === 'char') {
            if (characters.info.prev === null) setActualPage(1)
            else if (characters.info.next === null) setActualPage(characters.info.pages)
            else {
                const arr = characters.info.next.split('')
                setActualPage(parseInt(arr[arr.length - 1]) -1)
            }
            setActiveButton('char')
        }
        else if (str === 'epi') {
            if (episodes.length === 0) {
                const req = await fetch('https://rickandmortyapi.com/api/episode')
                const res = await req.json()
                setEpisodes(res)
                setActualPage(1)
            }
            else {
                if (episodes.info.prev === null) setActualPage(1)
                else if (episodes.info.next === null) setActualPage(episodes.info.pages)
                else {
                    const arr = episodes.info.next.split('')
                    setActualPage(parseInt(arr[arr.length - 1]) - 1)
                }
            }
            setActiveButton('epi')
        }
        else {
            if (locations.length === 0) {
                const req = await fetch('https://rickandmortyapi.com/api/location')
                const res = await req.json()
                setLocations(res)
                setActualPage(1)
            }
            else {
                if (locations.info.prev === null) setActualPage(1)
                else if (locations.info.next === null) setActualPage(locations.info.pages)
                else {
                    const arr = locations.info.next.split('')
                    setActualPage(parseInt(arr[arr.length - 1]) - 1)
                }
            }
            setActiveButton('loc')
        }
    }


    let content = []

    if(characters.length === 0) content = ''
    else if (activeButton === 'char') content = characters.results.map(el => (
        <Link to="moreInfo">
            <div key={el.id} className="character_card" onClick={() => dispatchElement(el, 'char')}>
                <table>
                    <tr>
                        <td><img src={el.image} alt="avatar" /></td>
                        <td><h5>{el.name}</h5></td>
                        <td><h5>{el.species}</h5></td>
                        <td>
                            {genderLogo(() => {
                                if (el.gender === 'Male') return <IoMale color='#fff' size='45px' />
                                else if (el.gender === 'Female') return <IoFemale color='#fff' size='45px' />
                                else if (el.gender === 'Genderless') return <IoMaleFemale color='#fff' size='45px' />
                                else return '??'
                            })}
                        </td>
                        <td>More infos...</td>
                    </tr>
                </table>
            </div>
            <hr />
        </Link>
    ))

    else if (activeButton === 'epi') content = episodes.results.map(el => (
        <Link to="moreInfo">
            <div key={el.id} className="character_card" onClick={() => dispatchElement(el, 'epi')}>
                <table>
                    <tr>
                        <td><h5>{el.name}</h5></td>
                        <td><h5>{el.air_date}</h5></td>
                        <td><h5>{el.episode}</h5></td>
                        <td>More infos...</td>
                    </tr>
                </table>
            </div>
            <hr />
        </Link>
    ))

    else if (activeButton === 'loc') content = locations.results.map(el => (
        <Link to="moreInfo">
            <div key={el.id} className="character_card" onClick={() => dispatchElement(el, 'loc')}>
                <table>
                    <tr>
                        <td><h5>{el.name}</h5></td>
                        <td><h5>{el.type}</h5></td>
                        <td><h5>{el.dimension}</h5></td>
                        <td>More infos...</td>
                    </tr>
                </table>
            </div>
            <hr />
        </Link>
    ))

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
                <p className='description'>Welcome to Rick & Morty Fanbase. Re-discover all the characters, locations and link them with all the episodes. </p>
            </div>

            <div className="content">
                <div className="navigation">
                    <div className="selected">
                        <button onClick={() => changeButton('char')} style={{ background: activeButton === 'char' ? '#101E37' : '#ffffff5e' }}>Characters</button>
                        <button onClick={() => changeButton('epi')} style={{ background: activeButton === 'epi' ? '#101E37' : '#ffffff5e' }}>Episodes</button>
                        <button onClick={() => changeButton('loc')} style={{ background: activeButton === 'loc' ? '#101E37' : '#ffffff5e' }}>Locations</button>
                    </div>
                    <div className="pages">
                        <BiChevronLeft color='#fff' size='35px' className='prev' onClick={prevPage} />
                        <p>{actualPage}</p>
                        <BiChevronRight color='#fff' size='35px' className='next' onClick={nextPage} />
                    </div>
                </div>

                {content}

            </div>

        </main>
    );
}
