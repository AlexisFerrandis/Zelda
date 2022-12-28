import React from 'react';
import "./background-filter.scss"

export default class BackgroundFilter extends React.Component { 
    constructor(config) {
        super(config);

        this.element = null;
	}

	createElement() {

		// remove old one 
        const playing = document.querySelectorAll('.background-filter');
        if (playing) {
            for (let i = 0; i < playing.length; i ++) {
                setTimeout(() => {
                    playing[i].remove();
                },500)
            }
        }

		this.element = document.createElement("div");
		this.element.classList.add("background-filter");
		this.element.classList.add(`background-filter__${this.props}`);


	}
    
	init(container) {

        this.createElement();
		container.appendChild(this.element);
	}
};