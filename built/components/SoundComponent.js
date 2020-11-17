import { SoundEffect } from "./EnumeratorsComponent.js";
export class SoundComponent {
    constructor() {
        this.defaultSoundEffectsVolume = 0.2;
        this.populateGameAudioList();
        this.preloadAudioAndSetVolume();
    }
    /**
     * Singleton related method to retrieve a single
     * instance of the HelperComponent.
     *
     * @returns UtilsComponent
     */
    static getInstance() {
        if (SoundComponent.instance === null) {
            return new SoundComponent();
        }
        else {
            return SoundComponent.instance;
        }
    }
    /**
     * Plays the sound passed as parameter.
     *
     * @returns void
     */
    static playSoundEffect(sound) {
        SoundComponent.soundEffects[sound].currentTime = 0;
        let playPromise = SoundComponent.soundEffects[sound].play();
        if (playPromise !== undefined) {
            playPromise
                .then(function () {
            })
                .catch(function (error) {
                console.log('Error while playing sound : ' + error);
            });
        }
    }
    /**
     * Populate the instance sound effects list.
     *
     * @returns void
     */
    populateGameAudioList() {
        SoundComponent.soundEffects[SoundEffect.EatingSound] = new Audio("sounds/eat.mp3");
        SoundComponent.soundEffects[SoundEffect.GameOverSound] = new Audio("sounds/game-over.wav");
    }
    /**
     * Pre loads and set the volume of all of the
     * sounds stored in the 'soundEffects' list.
     *
     * @returns void
     */
    preloadAudioAndSetVolume() {
        SoundComponent.soundEffects.forEach((soundEffect, soundKey) => {
            soundEffect.load();
            switch (soundKey) {
                case SoundEffect.GameOverSound:
                    soundEffect.volume = 0.8;
                    break;
                default:
                    soundEffect.volume = this.defaultSoundEffectsVolume;
                    break;
            }
        });
    }
}
SoundComponent.soundEffects = new Array(5);
SoundComponent.instance = null;
