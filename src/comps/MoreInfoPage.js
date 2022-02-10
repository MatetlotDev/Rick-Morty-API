import '../styles/characterInfo.scss';
import '../styles/locationInfo.scss';

import React, { useEffect, useState } from 'react';

import CharacterInfo from './CharacterInfo';
import EpisodeInfo from './EpisodeInfo';
import LocationInfo from './LocationInfo';

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { FaGithub, FaArrowLeft } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

export default function MoreInfoPage() {

    const element = useSelector(store => store.element); // take the element from the store
    const moreInfo = useSelector(store => store.moreInfo); // take the string selected from the store 'char', 'epi' or 'loc'

    const dispatch = useDispatch();

    const [episodes, setEpisodes] = useState([]);
    const [characters, setCharacters] = useState([]);


    // every time the element change
    useEffect(() => {
        // check which kind of element it is
        if (moreInfo === 'char') {
            // get all the numbers from the episodes url to make one big string and make a request for all of these
            const numbers = element.episode.map(el => {
                const arr = el.split('/');
                return arr[arr.length - 1];
            }).join(',');

            // make the request to have all the informations about the episodes
            (async () => {
                const req = await fetch('https://rickandmortyapi.com/api/episode/' + numbers);
                const res = await req.json();
                setEpisodes(res);
            })()
        }

        // same mechanism for the others
        else if (moreInfo === 'epi') {
            const numbers = element.characters.map(el => {
                const arr = el.split('/');
                return arr[arr.length - 1];
            }).join(',');

            (async () => {
                const req = await fetch('https://rickandmortyapi.com/api/character/' + numbers);
                const res = await req.json();
                setCharacters(res);
            })();

        }

        else {
            const numbers = element.residents.map(el => {
                const arr = el.split('/');
                return arr[arr.length - 1];
            }).join(',');

            (async () => {
                const req = await fetch('https://rickandmortyapi.com/api/character/' + numbers);
                const res = await req.json();
                setCharacters(res);
            })();
        };

    }, [element]);


    // same than gender Function on homepage.js
    const displayContent = (f) => {
        return f();
    };


    // every time we click on an episode, location or character in moreInfoPage, we don't redirect, but just change the content of it
    const changeContent = async (str, id) => { // triggered every time we click on something
        if (str === 'epi') {
            const req = await fetch(`https://rickandmortyapi.com/api/episode/${id}`); // make a request by id to have that element 
            const res = await req.json();
            dispatch({ type: 'selectEpi', epi: 'epi' }); // then change moreInfo to the good one
            dispatch({ type: 'updateEpisode', episode: res }); // and finally update the element and trigger the useEffect
        }
        else if (str === 'char') {
            const req = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const res = await req.json();
            dispatch({ type: 'selectChar', char: 'char' });
            dispatch({ type: 'updateCharacter', character: res });
        }
        else {
            const req = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
            const res = await req.json();
            dispatch({ type: 'selectLoc', loc: 'loc' });
            dispatch({ type: 'updateLocation', location: res });
        };
    };


    // go to bottom of the page for footer
    const scrollToBottom = () => {
        window.scrollTo({
            top: 10000,
            behavior: 'smooth'
        });
    };


    return (
        <main>
            <div className="back">
                <nav>
                    <a href="https://github.com/MatetlotDev/Rick-Morty-API"><FaGithub color="#fff" size='40px' /></a>
                    <div className='contacts' onClick={scrollToBottom}>
                        <HiMail color="#fff" size='30px' />
                        <h6>Contact</h6>
                    </div>
                </nav>

                <img className='background' src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png" alt="Rick and morty" />
            </div>

            <Link to='/'>
                <FaArrowLeft style={{ position: 'absolute', top: '15vh', left: '5vw', cursor: 'pointer' }} color="#fff" size='40px' />
            </Link>

            {displayContent(() => {
                // watch moreInfo to see what to show, every component takes the changeContent function and it's content
                if (moreInfo === 'char') return <CharacterInfo handleClick={changeContent} character={element} episodes={episodes} />
                else if (moreInfo === 'epi') return <EpisodeInfo handleClick={changeContent} episode={element} characters={characters} />
                else return <LocationInfo handleClick={changeContent} location={element} characters={characters} />
            })}


            <footer>
                <div className="creator">
                    <p>Created by MatetlotDev</p>
                    <a href="https://github.com/MatetlotDev/Rick-Morty-API"><FaGithub color="#fff" size='20px' /></a>
                </div>
                <a href="https://rickandmortyapi.com/"><p>With Rick and Morty API</p></a>
                <p>Contact me on <a href="https://github.com/MatetlotDev/Rick-Morty-API">Github</a></p>
            </footer>

        </main>
    );
}
