import React from 'react';
import Person from '../../objects/Person';
import OverworldEvent from '../event/OverworldEvent';

import {  nextPosition, withGrid } from '../../../Utils';

import { NewGame } from "./maps/new_game/NewGame"
import { SouthHyrule } from './maps/south_hyrule/SouthHyrule';

export default class OverworldMap extends React.Component { 
    constructor(config) {
        super(config);
        
        this.overworld = null;

        this.gameObjects = {}; // live objects
        this.configObjects = config.configObjects; // config content

        this.music = config.music;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
        this.isPaused = false;
    };
    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage, 
            withGrid(14) - cameraPerson.x, 
            withGrid(8) - cameraPerson.y, 
        );
    };
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage, 
            withGrid(14) - cameraPerson.x, 
            withGrid(8) - cameraPerson.y, 
        );
    };

    isSpaceTaken(currentX, currentY, direction) {

        const { x, y } = nextPosition(currentX, currentY, direction);
        if (this.walls[`${x}, ${y}`]) {
            return true;
        }
        // check for game objects
        return Object.values(this.gameObjects).find(obj => {
            if (obj.x === x && obj.y === y) {return true};
            if (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y) {return true}
            return false
        })
    };

    mountObjects() {
        Object.keys(this.configObjects).forEach(key => {

            let obj = this.configObjects[key];
            obj.id = key;

            let instance;
            if (obj.type === "Person") {
                instance = new Person(obj)
            }
            this.gameObjects[key] = instance;
            this.gameObjects[key].id = key;
            instance.mount(this);
        });
    };

    async startCutScene(events) {
        this.isCutscenePlaying = true;

        // ignore if nothing
        const player = this.gameObjects["player"];
        const match = this.cutsceneSpaces[ `${player.x},${player.y}` ];
        let ignore = false;

        if (match && match[2] !== undefined) {
        
            Object.keys(window.playerState.storyFlags).forEach(key => {
                if (match[2].nothing && (key === match[2].nothing)) {
                    ignore = true;
                }
            })}

        // else create
        if (!ignore) {
            for (let i = 0; i < events.length; i++) {
                const eventHandler = new OverworldEvent({
                    event: events[i],
                    map: this,
                });
                const result = await eventHandler.init();
                if (result === "LOST_BATTLE") {

                    // return to nearest healing
                    const healingSpot = window.playerState.healing;
                    let x, y;
                    if (healingSpot === "MomHouseFirstFloor") {
                        x = 13;
                        y = 19;
                    } else {
                        x = 18;
                        y = 19;
                    }
                    this.startCutScene([
                        { 
                            type: "changeMap", 
                            map: healingSpot,
                            soundEffect: "run",
                            x: withGrid(x),
                            y: withGrid(y),
                            direction: 'up', 
                        },
                        { type: "healing", position: window.playerState.healing},
                    ])
                }
            }
        }
        
        this.isCutscenePlaying = false;
    }

    checkForActionCutscene() {
		const player = this.gameObjects["player"];
		const nextCoords = nextPosition(player.x, player.y, player.direction);
		const match = Object.values(this.gameObjects).find((object) => {
			return `${object.x}, ${object.y}` === `${nextCoords.x}, ${nextCoords.y}`;
		});
		if (!this.isCutscenePlaying && match && match.talking.length) {
            const relevantScenario = match.talking.find((scenario) => {
                return (scenario.required || []).every((sf) => {
                    return window.playerState.storyFlags[sf]
                })
            })

            relevantScenario && this.startCutScene(relevantScenario.events);
        };
	};

    async checkForFootstepCutscene() {
        const player = this.gameObjects["player"];
        const match = this.cutsceneSpaces[ `${player.x},${player.y}` ];

        // if required event 
        if (match && match[1] && match[1].required) {
            Object.keys(window.playerState.storyFlags).forEach(key => {
                if (key === match[1].required[0]) {
                    this.startCutScene(match[1].events);
                    return
                }
            })
        } 

        // normal event
        if (!this.isCutscenePlaying && match) {
            this.startCutScene(match[0].events);
            return
        };
    };
};



window.OverworldMaps = {
    NewGame,
    SouthHyrule,
} 