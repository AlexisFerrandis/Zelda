import React from 'react';
import BackgroundMusic from '../audio/background_music/BackgroundMusic';
import BackgroundFilter from '../overworld/event/client_events/background_filter/BackgroundFilter';

export default class Progress extends React.Component  { 
    constructor(config) {
        super(config);
        
        // set initial map
        this.mapId = "NewGame";
        this.startingPlayerX = 0;
        this.startingPlayerY = 0;
        this.startingPlayerDirection = "down";
        this.saveFilekey = "Zelda_SaveFile1";
    }

    save() {
        
        window.localStorage.setItem(this.saveFilekey, JSON.stringify({
            mapId: this.mapId,
            startingPlayerX: this.startingPlayerX,
            startingPlayerY: this.startingPlayerY,
            startingPlayerDirection: this.startingPlayerDirection,
            playerState: {
                items: window.playerState.items,
                storyFlags: window.playerState.storyFlags,
                position: window.playerState.position,
                currentBackgroundMusic: window.playerState.currentBackgroundMusic,

                essentialItem: window.playerState.essentialItem,
                money: window.playerState.money,
            }
        }))
    }

    getSaveFile() {
        const file = window.localStorage.getItem(this.saveFilekey);
        return file ? JSON.parse(file) : null
    }

    load() {
        const file = this.getSaveFile();
        if (file) {
            this.mapId = file.mapId;
            this.startingPlayerX = file.startingPlayerX;
            this.startingPlayerY = file.startingPlayerY;
            this.startingPlayerDirection = file.startingPlayerDirection;
            Object.keys(file.playerState).forEach(key => {
                window.playerState[key] = file.playerState[key]
            })

            const music = file.playerState.currentBackgroundMusic.music;
            const backgroundMusic = new BackgroundMusic({
                music, 
            });
            backgroundMusic.init(document.querySelector(".game-container"));

            const backgroundFilter = new BackgroundFilter(file.playerState.backgroundFilter)
            backgroundFilter.init(document.querySelector(".game-container"))
        }
    }
};