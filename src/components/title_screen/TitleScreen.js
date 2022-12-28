import React from "react";
import "./title-screen.scss";

import KeyboardMenu from "../player_inputs/KeyboardMenu";

import titleScreen from "../../assets/graphics/pictures/v3.png";
import bg from "../../assets/graphics/pictures/titlescreenbg.png";
import SceneTransition from "../overworld/event/SceneTransition";

import music from "../../assets/audio/background_music/Title.ogg";
import BackgroundMusic from "../../components/audio/background_music/BackgroundMusic";

export default class TitleScreen extends React.Component {
    
	constructor({ progress }) {
		super(progress);
		this.progress = progress;
	}

	getOptions(resolve) {
		const saveFile = this.progress.getSaveFile();
		
		return [
			{
				label: "Nouvelle partie",
				description: "Start a new adventure",
				handler: () => {
					this.close();
					resolve();
				},
			},
			saveFile
				? {
						label: "Continuer",
						description: "Resume the game",
						handler: () => {
							this.close();
							resolve(saveFile);
						},
				}
				: null,
		].filter((v) => v);
	}

	createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("title-screen");
		this.element.innerHTML = `
            <img src=${bg} class="title-screen_bg" alt="background" />
            <img src=${titleScreen} class="title-screen_logo" alt="title" />
        `;
	}

	close() {
		const sceneTransition = new SceneTransition();
		sceneTransition.init(document.querySelector(".game-container"), () => {
			sceneTransition.fadeOut();
			this.keyboardMenu.end();
			this.element.remove();
		});
	}

	async init(container) {
		return new Promise((resolve) => {
			this.createElement();
			container.appendChild(this.element);

			// initial music
			const backgroundMusic = new BackgroundMusic({
				music,
			});
			backgroundMusic.init(document.querySelector(".game-container"));

			this.keyboardMenu = new KeyboardMenu();
			this.keyboardMenu.init(this.element);
			this.keyboardMenu.setOptions(this.getOptions(resolve));
		});
	}
}
