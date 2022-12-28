import {  useEffect, useState } from 'react';
import './game-launcher.scss'


import star from "./../../assets/graphics/pictures/star.png"
import logo from "./../../assets/graphics/pictures/logo.png"
import SoundEffect from '../audio/sound_effect/SoundEffect';

import music from "../../assets/audio/sound_effect/turtlepillow.ogg"

const GameLauncher = () => {
    const [gameLauncher, setGameLauncher] = useState(true);
    setTimeout(() => {
        setGameLauncher(false);
    }, 5) // 5900


    useEffect(() => {
        const soundEffect = new SoundEffect({
            music, 
        });
        setTimeout(() => {
            soundEffect.init(document.querySelector(".game-launcher"));
        }, 777)
    }, [])

    return (
        <>
            {gameLauncher && (
                <div className="game-launcher">
                    <h1>Turtle Pillow</h1>
                    <h4>PRESENTS</h4>
                    <div className='launcher-dom'>
                        <img src={star} alt="star" className='star one'/>
                        <img src={star} alt="star" className='star two'/>
                        <img src={star} alt="star" className='star three'/>
                        <img src={logo} alt="logo" className='logo'/>
                    </div>
                </div>
            )}
        </>
    );
}
export default GameLauncher;
