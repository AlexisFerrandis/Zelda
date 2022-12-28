import React from 'react';

import "./pause-menu.scss"

import { wait } from '../../../Utils';
import KeyboardMenu from '../../player_inputs/KeyboardMenu';
import KeyPressListener from '../../player_inputs/KeyPressListener';
import TextMessage from "../../text/TextMessage"
import SoundEffect from "../../audio/sound_effect/SoundEffect"


import savedSound from "../../../assets/audio/sound_effect/overworld/savegame.ogg"
import openMenuSound from "../../../assets/audio/sound_effect/overworld/menuopen.ogg"
import closeMenuSound from "../../../assets/audio/sound_effect/overworld/menuclose.ogg"

// DONT TAKE OFF THIS !!! SEEMS NEEDED SOMEWHERE ELSE 
import PlayerState from '../../state/PlayerState';

export default class PauseMenu extends React.Component { 
    constructor({onComplete, progress}) {
        super(onComplete);
		this.progress = progress;

        this.onComplete = onComplete
    }

    getOptions(pageKey) {
		if (pageKey === "root") {
			return [
				{
					label: "Sauvegarder",
					description: "Sauvegarder votre progression.",
					handler: () => {
						this.progress.save();
						const message = new TextMessage({
							text: "Sauvegarde... Ne pas éteindre l'appareil...",
							onComplete: () => {
								this.close()
								const music = savedSound;
								const savedSoundEffect = new SoundEffect({
								music, 
								});
								savedSoundEffect.init(document.querySelector(".game-container"));
							},
						});
						message.init(document.querySelector(".game-container"));
						message.done()
					},
				},
				{
					label: "Retour",
					description: "Ferme le menu.",
					handler: () => {
						this.close();
					},
				},
			];
		}
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("pause-menu");
        document.querySelector(".hud").style.display = "block";
    }
    
    close() {
		this.esc?.unbind();
		this.keyboardMenu.end();
		this.element.remove();
		this.onComplete();
		document.querySelector(".hud").style.display = "none";

		const music = closeMenuSound;
		const closeMenuSoundEffect = new SoundEffect({
			music, 
		});
		closeMenuSoundEffect.init(document.querySelector(".game-container"));
	}

    async init(container) {
		this.createElement();
		this.keyboardMenu = new KeyboardMenu({
			descriptionContainer: container,
		});
		this.keyboardMenu.init(this.element);
		this.keyboardMenu.setOptions(this.getOptions("root"));

		container.appendChild(this.element);

		const music = openMenuSound;
		const openMenuSoundEffect = new SoundEffect({
			music, 
			});
		openMenuSoundEffect.init(document.querySelector(".game-container"));

		wait(200);
		this.esc = new KeyPressListener("Escape", () => {
			this.close();
		});
	}
};