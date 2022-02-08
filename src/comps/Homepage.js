import '../styles/homepage.scss'

import React, { useEffect, useState } from 'react'

import { Link } from "react-router-dom";

import { FaGithub } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { BiChevronLeft, BiChevronDown, BiChevronRight } from 'react-icons/bi'
import { IoMale, IoFemale, IoMaleFemale } from 'react-icons/io5'

import { useDispatch } from 'react-redux'

export default function Homepage() {

    const dispatch = useDispatch();

    const [characters, setCharacters] = useState([])
    const [info, setInfo] = useState({})
    let [actualPage, setActualPage] = useState(1)

    useEffect(() => {
        (async () => {
            const req = await fetch('https://rickandmortyapi.com/api/character')
            const res = await req.json()
            setInfo(res.info)
            setCharacters(res.results)
        })()
    }, [])


    const genderLogo = (f) => {
        return f();
    }

    const nextPage = async () => {
        const req = await fetch(info.next)
        const res = await req.json()
        setInfo(res.info)
        setCharacters(res.results)
        setActualPage(actualPage += 1)
    }

    const prevPage = async () => {
        const req = await fetch(info.prev)
        const res = await req.json()
        setInfo(res.info)
        setCharacters(res.results)
        setActualPage(actualPage -= 1)
    }

    const dispatchCharacter = (el) => {
        dispatch({ type: 'updateCharacter', character: el })
        dispatch({ type: 'character'})
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
                <p className='description'>Welcome to Rick & Morty Fanbase. Re-discover all the characters, locations and link them with all the episodes. </p>
            </div>

            <div className="content">
                <div className="navigation">
                    <div className="selected">
                        <BiChevronDown color='#fff' size='35px' />
                        Characters
                    </div>
                    <div className="pages">
                        <BiChevronLeft color='#fff' size='35px' className='prev' onClick={prevPage} />
                        <p>{actualPage}</p>
                        <BiChevronRight color='#fff' size='35px' className='next' onClick={nextPage} />
                    </div>
                </div>

                {characters.map(el => (
                    <Link to="characterInfo">
                        <div key={el.id} className="character_card" onClick={() => dispatchCharacter(el)}>
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
                ))}

            </div>

        </main>
    );
}
