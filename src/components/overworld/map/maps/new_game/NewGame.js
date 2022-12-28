import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../Utils';

import lowerImg from "../../../../../assets/graphics/maps/link_house/down.png";
import upperImg from "../../../../../assets/graphics/maps/link_house/up.png";

import musicBg from "../../../../../assets/audio/background_music/PalletTown.ogg"


export const NewGame = {
    id: "NewGame",
    lowerSrc: lowerImg,
    upperSrc: upperImg,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
            x: withGrid(16),
            y: withGrid(13),
            direction: "up"
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(16,18)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "SouthHyrule",
                        changeMusic: musicBg,
                        x: withGrid(41),
                        y: withGrid(36),
                        direction: 'down',
                    },
                ]
            }
        ],
        
    }
}