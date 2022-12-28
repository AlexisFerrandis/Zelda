import React from 'react';

import shadowImg from "../../assets/graphics/characters/shadow.png";
import { withGrid } from '../../Utils';

export default class Sprite extends React.Component { 
    constructor(config) {
        super(config);

        // set up the img
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // shadow
        this.shadow = new Image();
        this.useShadow = true;
        if (this.useShadow) {
            this.shadow.src = shadowImg;
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        // configure animation
        this.animation = config.animation || {
            "idle-down": [[0,0]],
            "idle-up": [[4,0]],
            "idle-left": [[2,0]],
            "idle-right": [[6,0]],
            
            "walk-down": [[0,4],[2,4],[4,4],[6,4],[8,4],[10,4],[12,4],[14,4],[16,4],[18,4]],
            "walk-left": [[22,4],[24,4],[26,4],[28,4],[30,4],[32,4],[34,4],[36,4],[38,4],[40,4]],
            "walk-right": [[66,4],[68,4],[70,4],[72,4],[74,4],[76,4],[78,4],[80,4],[82,4],[84,4]],
            "walk-up": [[44,4],[46,4],[48,4],[50,4],[52,4],[54,4],[56,4],[58,4],[60,4],[62,4]],

            "sword-hit-down": [[0,6],[2,6],[4,6],[6,6],[8,6]],
            "sword-hit-left": [[12,6],[14,6],[16,6],[18,6],[20,6]],
            "sword-hit-right": [[22,6],[24,6],[26,6],[28,6],[30,6]],
            "sword-hit-up": [[32,6],[34,6],[36,6],[38,6],[40,6]],



            "octorok-idle-down": [[0,0]],
            "octorok-idle-up": [[0,6]],
            "octorok-idle-left": [[0,2]],
            "octorok-idle-right": [[0,4]],
        };
        
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;
        this.gameObject = config.gameObject;
        this.animationFrameLimit = config.animationFrameLimit || 4; // frame speed
        this.animationFrameProgress = this.animationFrameLimit;

        // ref game object
        this.gameObject = config.gameObject;
    };

    get frame() {
        return this.animation[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        // downtick time 
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }
        // reset counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x + withGrid(14) - cameraPerson.x - 8; 
        const y = this.gameObject.y + withGrid(8) - cameraPerson.y - 24;

        this.isShadowLoaded && ctx.drawImage(this.shadow,0,0,32,64,x+8,y-14,16,64);

        const [frameX, frameY] = this.frame;

        if (this.gameObject.isSwordHit) {
            this.isLoaded && ctx.drawImage(
                this.image,
                frameX * 16 + 16, 
                frameY * 16 ,
                32, 
                32,
                x-3,
                y+4,
                32,
                32
            )
            this.updateAnimationProgress();
        } else {
            this.isLoaded && ctx.drawImage(
                this.image,
                frameX * 16 + 16, 
                frameY * 16 ,
                32, 
                32,
                x,
                y,
                32,
                32
            )
            this.updateAnimationProgress();
        }
    };
};