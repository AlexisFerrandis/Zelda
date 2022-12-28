import React from 'react';

import stairs from "../../../assets/audio/sound_effect/stairs.ogg"
import doors from "../../../assets/audio/sound_effect/doors.ogg"
import mimikyuScream from "../../../assets/audio/sound_effect/mimikyuscream.ogg"
import getpkmn from "../../../assets/audio/sound_effect/getpkmn.ogg"
import run from "../../../assets/audio/sound_effect/run.ogg"
import roar from "../../../assets/audio/sound_effect/roar.ogg"

export default class SoundEffect extends React.Component { 
    constructor(song) {
        super(song);

        this.song = song;
        this.audio = new Audio(this.song.music)
    }

    createElement() {

        let soundEffect = this.song.music;

        if (soundEffect === "stairs") {
            soundEffect = stairs
        }
        if (soundEffect === "doors") {
            soundEffect = doors
        }
        if (soundEffect === "mimikyuScream") {
            soundEffect = mimikyuScream
        }
        if (soundEffect === "getpkmn") {
            soundEffect = getpkmn
        }
        if (soundEffect === "run") {
            soundEffect = run
        }
        if (soundEffect === "roar") {
            soundEffect = roar
        }

        this.element = document.createElement("div");
        this.element.innerHTML= (`
        <audio src=${soundEffect} autoplay ></audio>
        `)
        setTimeout(() => {
            this.close()
        }, 7000) // to do fct duration

    }

    close( ) {
            this.element.remove()
    }

    pause() {
        this.audio.pause();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
};