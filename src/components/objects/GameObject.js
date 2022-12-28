import React from 'react';

import Sprite from "./Sprite";
import OverworldEvent from '../overworld/event/OverworldEvent';

import playerImg from "../../assets/graphics/characters/link_player.png";

export default class GameObject extends React.Component { 
    constructor(config) {
        super(config); 
        this.id = null;

        this.isMaounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || playerImg,
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

        this.talking = config.talking || [];
        this.retryTimeout = null;

        this.isNotHere = config.isNotHere;
        this.isNowHere = config.isNowHere;

        this.initialX = config.initialX || 0;
        this.initialY = config.initialY || 0;
    };

    mount(map) {
        this.isMaounted = true;

        // remove object on flags
        if (this.isNotHere) {
            Object.keys(window.playerState.storyFlags).forEach(key => {
                if (key === this.isNotHere) {
                    this.x = -1;
                    this.y = -1;
                }
            })
        }

        // add object on flags
        if (this.isNowHere) {
            Object.keys(window.playerState.storyFlags).forEach(key => {
                if (key === this.isNowHere) {
                    this.x = this.initialX ;
                    this.y = this.initialY ;
                } else {
                    this.x = -1;
                    this.y = -1;
                }
            })
        }

        // start behavior after n sec
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 1);
    };

    // update() {};

    async doBehaviorEvent(map) {
        // stop if cutscene
        if (this.behaviorLoop.length === 0) {
            return;
        };

        if (map.isCutscenePlaying) {
            if (this.retryTimeout) {
                clearTimeout(this.retryTimeout)
            }

            this.retryTimeout = setTimeout(() => {
                this.doBehaviorEvent(map)
            }, 1000)
            return;
        }

        // event with info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // create event instance
        const eventHandler = new OverworldEvent({ map, event: eventConfig });
        await eventHandler.init();

        // setting next event
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        };

        this.doBehaviorEvent(map);
    };
};