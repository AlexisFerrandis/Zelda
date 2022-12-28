import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../Utils';

import lowerImg from "../../../../../assets/graphics/maps/south_hyrule/down.png";
import upperImg from "../../../../../assets/graphics/maps/south_hyrule/up.png";

import enemyA from "../../../../../assets/graphics/enemies/octorok.png";

import musicBg from "../../../../../assets/audio/background_music/PalletTown.ogg"

export const SouthHyrule = {
    id: "SouthHyrule",
    lowerSrc: lowerImg,
    upperSrc: upperImg,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
            direction: "down"
        }),
        enemyA: ({
            type: "Enemy",
            x: withGrid(41),
            y: withGrid(43),
            src: enemyA,
            enemyType: "octorok",
            behaviorLoop: [
                { type: "stand", direction: "left", time: 1000},
                { type: "stand", direction: "right", time: 1000},
                { type: "stand", direction: "up", time: 1000},
                { type: "stand", direction: "down", time: 1000},
                { type: "stand", direction: "left", time: 1000},
            ],
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(41,34)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "NewGame",
                        changeMusic: musicBg,
                        x: withGrid(16),
                        y: withGrid(16),
                        direction: 'up',
                    },
                ]
            }
        ],
        
    }
}