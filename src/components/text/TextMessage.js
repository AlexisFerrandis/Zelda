import React from 'react';
import KeyPressListener from '../player_inputs/KeyPressListener';
import RevealingText from './RevealingText';
import './text-message.scss';

export default class TextMessage extends React.Component { 
    constructor({text, onComplete}) {
        super({text});
        
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
        
    };

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("text-message");

        this.element.innerHTML = (`
            <div class="text-message-border">
                <p class="text-message-p"></p>
                <button class="text-message-btn">⯆</button>
            </div>
        `);

        this.revealingText = new RevealingText({
			element: this.element.querySelector(".text-message-p"),
			text: this.text,
		});

        this.element.querySelector("button").addEventListener("click", () => {
            // close txt
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter", () => {
            this.done();
        })
        this.actionListener = new KeyPressListener("Space", () => {
            this.done();
        })
    };

    done() {
        if (this.revealingText.isDone) {
            this.element.remove();
            this.actionListener.unbind();

            this.onComplete();
        } else {
            this.revealingText.warpToDone();
        }
    }

    init(container) {
        this.createElement();
        this.revealingText.init();
        container.appendChild(this.element)
    }
};