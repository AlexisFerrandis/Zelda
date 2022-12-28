import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../Utils';

import lowerImg from "../../../../../assets/graphics/maps/south_hyrule/down.png";
import upperImg from "../../../../../assets/graphics/maps/south_hyrule/up.png";

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