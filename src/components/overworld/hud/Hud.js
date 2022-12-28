import React from 'react';
import "./hud.scss"

export default class Hud extends React.Component { 
    constructor() {
        super();
        this.scoreboards = [];
    }

    update() {
		console.log("update");
	}

	createElement() {
		if (this.element) {
			this.element.remove();
			this.scoreboards = [];
		}

		this.element = document.createElement("div");
		this.element.classList.add("hud");

        // const {playerState} = window;
        this.update()
	}

	init(container) {
		this.createElement();
		container.appendChild(this.element);
        document.addEventListener("PlayerStateUpdated", () => {
			this.update();
		});
	}
};