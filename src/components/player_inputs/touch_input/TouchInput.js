import React from 'react';
import "./touch-input.scss"

import icon from "../../../assets/graphics/controller/ico.png"

export default class TouchInput extends React.Component { 
    constructor(config) {
        super(config);
        this.isActive = false;
        this.heldDirections = [];
        this.map = {
            "ArrowUp" : "up",
            "ArrowDown" : "down",
            "ArrowLeft" : "left",
            "ArrowRight" : "right",

            "Space" : "Space",
            "button-b" : "button-b",
            "start" : "start",
        }
    };

    createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("touch-input");

        let controller = `
            <button class="open-controller" data="open">
                <img src=${icon} alt="controller class="icon" />
            </button>

            <div class="controller">
                <div class="princpipal-buttons">
                    <div class="joystick">
                        <button class="arrow up" data="ArrowUp">△</button> 
                        <div class="left-right">
                            <button class="arrow left"  data="ArrowLeft">◁</button>
                            <button class="arrow right"  data="ArrowRight">▷</button>
                        </div> 
                        <button class="arrow down"  data="ArrowDown">▽</button> 

                    </div>
                    <div class="buttons">
                        <button class="button button-b" data="button-b">B</button>
                        <button class="button button-a" data="Space">A</button>
                    </div>
                </div>
                <div class="secondary-buttons">
                    <button class="start" data="start">start</button>
                </div>
            </div>
        `
        this.element.innerHTML += controller;
    }

    get direction() {
        return this.heldDirections[0];
    }

    init(container) {
        this.createElement();
		container.appendChild(this.element);
        const controllerDisplay = document.querySelector(".open-controller")
        controllerDisplay.addEventListener("click", () => {
            const controller = document.querySelector(".controller");
            controller.classList.toggle("controller-display")
        })

        // touch listener 
        const buttons = document.querySelectorAll("button")
        for (let i = 0; i < buttons.length; i ++) {
            buttons[i].addEventListener("click", () => {
                const dir = this.map[buttons[i].getAttribute("data")];
                if (dir && this.heldDirections.indexOf(dir)) {
                    document.dispatchEvent(new KeyboardEvent('keydown', {'code': buttons[i].getAttribute("data")}));
                    setTimeout(() => {
                        document.dispatchEvent(new KeyboardEvent('keyup', {'code': buttons[i].getAttribute("data")}));
                    }, 500)
                }
            })
        }
	}
};