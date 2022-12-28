import React from 'react';
import { oppositeDirection } from '../../../Utils';

import TextMessage from '../../text/TextMessage';
import PauseMenu from '../pause_menu/PauseMenu';
import SceneTransition from './SceneTransition';
import ClientEvents from './client_events/ClientEvents';

import BackgroundMusic from '../../audio/background_music/BackgroundMusic';
import SoundEffect from '../../audio/sound_effect/SoundEffect';
import getItemSound from "../../../assets/audio//sound_effect/overworld/getkeyitem.ogg"

import ItemMenu from '../item_menu/ItemMenu';

export default class OverworldEvent extends React.Component { 
    constructor({map, event}) {
        super(map);

        this.map = map;
        this.event = event;
    };
  
    stand(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
          map: this.map
        }, {
          type: "stand",
          direction: this.event.direction,
          time: this.event.time
        })
        
        const completeHandler = e => {
          if (e.detail.whoId === this.event.who) {
            document.removeEventListener("PersonStandComplete", completeHandler);
            resolve();
          }
        }
        document.addEventListener("PersonStandComplete", completeHandler)
    }

    walk(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        // handler when walk complete
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    // swordHit(resolve) {
    //   console.log("sword");
    //   const who = this.map.gameObjects[ this.event.who ];
    //   who.startBehavior({
    //     map: this.map
    //   }, {
    //     type: "sword",
    //     direction: this.event.direction,
    //     time: this.event.time
    //   })
      
    //   const completeHandler = e => {
    //     if (e.detail.whoId === this.event.who) {
    //       document.removeEventListener("PersonSwordHitComplete", completeHandler);
    //       resolve();
    //     }
    //   }
    //   document.addEventListener("PersonSwordHitComplete", completeHandler)
    // }

    textMessage(resolve) {
        if (this.event.facePlayer) {
            const obj = this.map.gameObjects[this.event.facePlayer];
            obj.direction = oppositeDirection(this.map.gameObjects["player"].direction);
        }

        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve(),
        });
        message.init(document.querySelector(".game-container"));
    }

    // get essential item 
    getEssentialItem(resolve) {
      window.playerState.addEssentialItem(this.event.id);

      const music = getItemSound;
      const getItemSounddEffect = new BackgroundMusic({
              music, 
      });
      getItemSounddEffect.init(document.querySelector(".game-container"));
      setTimeout(() => {
                const music = window.playerState.currentBackgroundMusic.music;
                const backgroundMusic = new BackgroundMusic({
                music, 
                });
                backgroundMusic.init(document.querySelector(".game-container"));
      }, 1900)

      resolve();
    }


    changeMap(resolve) {

      // save current map
      window.playerState.position = this.event.map;

      // change music
      if (this.event.changeMusic) {

        const music = this.event.changeMusic;
        const backgroundMusic = new BackgroundMusic({
          music, 
        });
        backgroundMusic.init(document.querySelector(".game-container"));
      }

      // check for sound effect
      if (this.event.soundEffect) {

        const music = this.event.soundEffect;
        const soundEffect = new SoundEffect({
          music, 
        });
        soundEffect.init(document.querySelector(".game-container"));
      }

      window.playerState.backgroundFilter = this.event.setFilter;

  

      // desactivate old object
      Object.values(this.map.gameObjects).forEach(obj => {
        obj.isMaounted = false;
      })

      const sceneTransition = new SceneTransition();
      sceneTransition.init(document.querySelector(".game-container"), () => {
          this.map.overworld.startMap(window.OverworldMaps[this.event.map], {
              x: this.event.x,
              y: this.event.y,
              direction: this.event.direction,
          });
          resolve();

          sceneTransition.fadeOut();
      });
	  }

    pause(resolve) {
      this.map.isPaused = true;
      const menu = new PauseMenu({
        progress: this.map.overworld.progress,
        onComplete: () => {
          resolve();
          this.map.isPaused = false;
          this.map.overworld.startGameLoop();
        }
      });
      menu.init(document.querySelector('.game-container'))
    }

    shopMenu(resolve) {
      const itemMenu = new ItemMenu({
        itemsToBuy: this.event.itemsToBuy,
        onComplete: () => {
          resolve();
        }
      })
    itemMenu.init(document.querySelector(".game-container"))
    }

    addStoryFlag(resolve) {
    window.playerState.storyFlags[this.event.flag] = true;
      
      // if (this.event.flag === "PALLET_TOWN_BURNING") {
      //   const event = this.event.flag;
      //   const clientEvent = new ClientsEvents({event})
      //   clientEvent.init(document.querySelector(".game-container"));
      // }

      resolve();
    }

    cameraPosition(resolve) {
      const canvas = document.querySelector(".game-canvas");
      canvas.style.transform = `translateY(${this.event.y}px) translateX(${this.event.x}px)`;

      setTimeout(() => {
        resolve()
      }, 1000)
    }
    clientEvent(resolve) {
      if (this.event.what === "reset") {
        const events = document.querySelectorAll(".client-events");
        for (let i = 0; i < events.length; i ++) {
          events[i].remove();
        }
      } else {
        const clientEvent = new ClientEvents(this.event.what)
        clientEvent.init(document.querySelector(".game-container"))
      }
      resolve()
    }
    playSoundEffect(resolve) {
        const music = this.event.soundEffect;
        const soundEffect = new SoundEffect({
          music, 
        });
        soundEffect.init(document.querySelector(".game-container"));

      resolve()
    }

    init() {
        return new Promise(resolve => {
          this[this.event.type](resolve)      
        })
    }
};