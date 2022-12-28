import React from 'react';

export default class PlayerState extends React.Component { 
    constructor() {
        super()

        this.items = [
            { itemId: "POTION", instanceId: "item1", },
        ];
        this.storyFlags = {};
        this.position = "";
        this.currentBackgroundMusic = "";

        this.essentialItem = {
        };
        this.money = 42;
    };

    addEssentialItem(id) {
        this.essentialItem[id] = true;
    }

};

window.playerState = new PlayerState();