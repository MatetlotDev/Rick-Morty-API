import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";

import '../styles/homepage.scss';

import { useDispatch } from 'react-redux';

import { FaGithub, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { BsFilterSquare } from 'react-icons/bs';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoMale, IoFemale, IoMaleFemale } from 'react-icons/io5';


export default function Homepage() {

    const dispatch = useDispatch();

    const [scrollButton, setScrollButton] = useState('none');
    const [characters, setCharacters] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [locations, setLocations] = useState([]);
    let [actualPage, setActualPage] = useState(1);
    const [activeButton, setActiveButton] = useState('char');
    const [mobileMenu, setMobileMenu] = useState('none');

    useEffect(() => {

        // make the first request to grab all the characters
        (async () => {
            const req = await fetch('https://rickandmortyapi.com/api/character');
            const res = await req.json();
            setCharacters(res); // stock them in characters state
        })();

        // listen the scroll of the window to show or not the arrow button
        window.addEventListener("scroll", () => window.pageYOffset > window.innerHeight ? setScrollButton('block') : setScrollButton('none'));

    }, []);


    // goes back to 'almost' top
    const scrollToTop = () => {
        window.scrollTo({
            top: 450,
            behavior: 'smooth'
        });
    };


    // go to bottom of the page for footer
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.clientHeight,
            behavior: 'smooth'
        });
    };


    // function that return a function, to write condition in the html 
    const genderLogo = (f) => {
        return f();
    };


    // goes to next page 
    const nextPage = async () => {
        if (activeButton === 'char') { // depending on which table it is
            const req = await fetch(characters.info.next); // make a request to have next page
            const res = await req.json();
            setCharacters(res); // refresh the characters with the new ones 
            setActualPage(actualPage += 1); // set the page to the next one
        }
        else if (activeButton === 'epi') {
            const req = await fetch(episodes.info.next);
            const res = await req.json();
            setEpisodes(res);
            setActualPage(actualPage += 1);
        }
        else {
            const req = await fetch(locations.info.next);
            const res = await req.json();
            setLocations(res);
            setActualPage(actualPage += 1);
        };
    };

    // goes to previous page
    const prevPage = async () => {
        if (activeButton === 'char') {
            const req = await fetch(characters.info.prev); // same mechanism then next page
            const res = await req.json();
            setCharacters(res);
            setActualPage(actualPage -= 1); // but in the other side
        }
        else if (activeButton === 'epi') {
            const req = await fetch(episodes.info.prev);
            const res = await req.json();
            setEpisodes(res);
            setActualPage(actualPage -= 1);
        }
        else {
            const req = await fetch(locations.info.prev);
            const res = await req.json();
            setLocations(res);
            setActualPage(actualPage -= 1);
        };
    };

    // dispatch function when redirect to moreInfo page
    const dispatchElement = (el, str) => { // takes in the object element and a string to specify what element it is
        if (str === 'char') {
            dispatch({ type: 'selectChar', char: 'char' }); // dispatch the type
            dispatch({ type: 'updateCharacter', character: el }); // dispatch the element
        }
        else if (str === 'epi') {
            dispatch({ type: 'selectEpi', epi: 'epi' });
            dispatch({ type: 'updateEpisode', episode: el });
        }
        else {
            dispatch({ type: 'selectLoc', loc: 'loc' });
            dispatch({ type: 'updateLocation', location: el });
        };
    };


    // when click on the filter 'characters', 'locations', 'episodes'
    const changeButton = async (str) => {
        if (str === 'char') { // if it's char, no need to make request
            if (characters.info.prev === null) setActualPage(1); // but check on which page it was before
            else if (characters.info.next === null) setActualPage(characters.info.pages); // if prev = null -> page 1; if next = null -> last page
            else { // if not, then take the next page in the url and remove 1 from it
                const arr = characters.info.next.split('=');
                setActualPage(parseInt(arr[arr.length - 1]) - 1);
            };
            setActiveButton('char'); // at the end set state to char
        }
        else if (str === 'epi') {
            if (episodes.length === 0) { // if it's the first time, there's no episode yet, so make a request and take them
                const req = await fetch('https://rickandmortyapi.com/api/episode');
                const res = await req.json();
                setEpisodes(res);
                setActualPage(1);
            }
            else { // same than before, check on which page it was
                if (episodes.info.prev === null) setActualPage(1);
                else if (episodes.info.next === null) setActualPage(episodes.info.pages);
                else {
                    const arr = episodes.info.next.split('=');
                    setActualPage(parseInt(arr[arr.length - 1]) - 1);
                };
            };
            setActiveButton('epi');
        }
        else {
            if (locations.length === 0) {
                const req = await fetch('https://rickandmortyapi.com/api/location');
                const res = await req.json();
                setLocations(res);
                setActualPage(1);
            }
            else {
                if (locations.info.prev === null) setActualPage(1);
                else if (locations.info.next === null) setActualPage(locations.info.pages);
                else {
                    const arr = locations.info.next.split('=');
                    setActualPage(parseInt(arr[arr.length - 1]) - 1);
                };
            };
            setActiveButton('loc');
        };
        if(mobileMenu === 'block') setMobileMenu('none');
    };



    let content = [];

    // check to see the active button and return in content what need to be shown
    if (characters.length === 0) content = ''; // for the first loading, because the request of characters is not finished yet 
    else if (activeButton === 'char') content = characters.results.map(el => (
        <Link to="moreInfo" key={el.id}>
            <div className="character_card" onClick={() => dispatchElement(el, 'char')}>
                <img src={el.image} alt="avatar" />
                <table>
                    <tbody>
                        <tr>
                            <td><h5>{el.name}</h5></td>
                            <td><h5>{el.species}</h5></td>
                            <td>
                                {genderLogo(() => {
                                    if (el.gender === 'Male') return <IoMale className='gender' color='#fff' />
                                    else if (el.gender === 'Female') return <IoFemale className='gender' color='#fff' />
                                    else if (el.gender === 'Genderless') return <IoMaleFemale className='gender' color='#fff' />
                                    else return '??'
                                })}
                            </td>
                            <td>More infos...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
        </Link>
    ));

    else if (activeButton === 'epi') content = episodes.results.map(el => (
        <Link to="moreInfo" key={el.id}>
            <div className="character_card" onClick={() => dispatchElement(el, 'epi')}>
                <table>
                    <tbody>
                        <tr>
                            <td><h5>{el.name}</h5></td>
                            <td><h5>{el.air_date}</h5></td>
                            <td><h5>{el.episode}</h5></td>
                            <td>More infos...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
        </Link>
    ));

    else if (activeButton === 'loc') content = locations.results.map(el => (
        <Link to="moreInfo" key={el.id}>
            <div className="character_card" onClick={() => dispatchElement(el, 'loc')}>
                <table>
                    <tbody>
                        <tr>
                            <td><h5>{el.name}</h5></td>
                            <td><h5>{el.type}</h5></td>
                            <td><h5>{el.dimension}</h5></td>
                            <td>More infos...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
        </Link>
    ));


    // main return 
    return (
        <main>
            <div className="back">
                <nav>
                    <a href="https://github.com/MatetlotDev/Rick-Morty-API" target="_blank" rel="noreferrer"><FaGithub color="#fff" size='40px' /></a>
                    <div className='contacts' onClick={() => scrollToBottom()}>
                        <HiMail color="#fff" size='30px' />
                        <h6>Contact</h6>
                    </div>
                </nav>

                <img className='background' src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png" alt="Rick and morty" />
                <p className='description'>Welcome to Rick & Morty Fanbase. Re-discover all the characters, locations and link them with all the episodes. </p>
                <FaArrowDown color="#fff" size='20px' />
            </div>

            <div className='toTop' onClick={scrollToTop} style={{ display: scrollButton }} ><FaArrowUp color="#fff" size='40px' /></div>

            <div className="content">
                <div className="navigation">
                    <div className="selected">
                        <div className="mobile" onClick={() => setMobileMenu('block')} >
                            <BsFilterSquare color='#101E37' size='40px' />
                        </div>
                        <div className="desktop">
                            <button
                                onClick={() => changeButton('char')}
                                style={{ background: activeButton === 'char' ? '#101E37' : '#ffffff5e', color: activeButton === 'char' ? '#fff' : '#101E37' }}>
                                Characters
                            </button>
                            <button
                                onClick={() => changeButton('epi')}
                                style={{ background: activeButton === 'epi' ? '#101E37' : '#ffffff5e', color: activeButton === 'epi' ? '#fff' : '#101E37' }}>
                                Episodes
                            </button>
                            <button
                                onClick={() => changeButton('loc')}
                                style={{ background: activeButton === 'loc' ? '#101E37' : '#ffffff5e', color: activeButton === 'loc' ? '#fff' : '#101E37' }}>
                                Locations
                            </button>
                        </div>
                    </div>
                    <div className="pages">
                        <BiChevronLeft color='#101E37' size='35px' className='prev' onClick={prevPage} />
                        <p>{actualPage}</p>
                        <BiChevronRight color='#101E37' size='35px' className='next' onClick={nextPage} />
                    </div>
                </div>

                <div className="mobile_menu" style={{display: mobileMenu}}>
                    <button
                        onClick={() => changeButton('char')}
                        style={{ background: activeButton === 'char' ? '#ffffff5e' : '#101E37', color: activeButton === 'char' ? '#101E37' : '#fff' }}>
                        Characters
                    </button>
                    <button
                        onClick={() => changeButton('epi')}
                        style={{ background: activeButton === 'epi' ? '#ffffff5e' : '#101E37', color: activeButton === 'epi' ? '#101E37' : '#fff' }}>
                        Episodes
                    </button>
                    <button
                        onClick={() => changeButton('loc')}
                        style={{ background: activeButton === 'loc' ? '#ffffff5e' : '#101E37', color: activeButton === 'loc' ? '#101E37' : '#fff' }}>
                        Locations
                    </button>
                </div>

                {content}

            </div>

            <footer>
                <div className="creator">
                    <p className='desktop'>Created by MatetlotDev</p>
                    <p className='mobile'>My</p>
                    <a href="https://github.com/MatetlotDev/Rick-Morty-API" target="_blank" rel="noreferrer"><FaGithub color="#fff" size='20px' /></a>
                </div>
                <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer"><p>With Rick and Morty API</p></a>
                <p className='contact'>Contact me on <a href="https://github.com/MatetlotDev/Rick-Morty-API" target="_blank" rel="noreferrer">Github</a></p>
            </footer>

        </main>
    );
};
