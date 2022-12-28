import GameObject from './GameObject';
import { emitEvent, nextPosition } from '../../Utils';

export default class Enemy extends GameObject { 
    constructor(config) {
        super(config);

        this.movingProgressRemaining = 0;
        this.isStanding = false;
        this.intentPosition = null; 

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        };
        
        this.enemyType = config.enemyType || null;
    };

    update(state) {

        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {

            // case : keyboard ready & arrow pressed
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                });
            };
            this.updateSprite(state);
        };
    };

    startBehavior(state, behavior) {
        if (!this.isMaounted) {
            return
        }

        // set character direction
        this.direction = behavior.direction;

        // walk
        if (behavior.type === "walk") {
            // stop if no space
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                behavior.retry && setTimeout(() => {
                    this.startBehavior(state, behavior)
                }, 10)
                return;
            }
            this.movingProgressRemaining = 16;

            // preview next position
            const intentPosition = nextPosition(this.x, this.y, this.direction)
            this.intentPosition = [
                intentPosition.x,
                intentPosition.y
            ]

            this.updateSprite(state);
        };

        // stand
        if (behavior.type === "stand") {
            this.isStanding = true;
            setTimeout(() => {
                emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
                this.isStanding = false;
            }, behavior.time)
        }
    };

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if (this.movingProgressRemaining === 0) {
            this.intentPosition = null;
            emitEvent("PersonWalkingComplete", {
                whoId: this.id
            });
        };
    };

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation(this.enemyType + "-walk-" + this.direction);
            return;
        };
        this.sprite.setAnimation(this.enemyType + "-idle-" + this.direction);
    };
};