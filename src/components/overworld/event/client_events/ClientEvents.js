import React from 'react';
import "./client-events.scss"

export default class ClientEvents extends React.Component { 
    constructor(config) {
        super(config);

        this.element = null;
	}


	createElement() {

        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return true});
            return images;
        }
        const storyImg = importAll(require.context('../../../../assets/graphics/story', false, /\.(gif|png|jpe?g|svg)$/));

		this.element = document.createElement("div");
		this.element.classList.add("client-events");
        const scene = `
			<div class="${this.props}-container">
                <img src=${storyImg[`${this.props}.gif`]} class=${this.props} alt=${this.props} />
			</div>
        `
        this.element.innerHTML += scene;
	}

	init(container) {
		this.createElement();
		container.appendChild(this.element);
	}
}