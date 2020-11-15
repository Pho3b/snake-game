import { SoundEffect } from "./EnumeratorsComponent.js";
export class SoundComponent {
    constructor() {
        this.soundEffects = new Array(5);
        this.soundEffectsVolume = 0.2;
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
    playSoundEffect(sound) {
        this.soundEffects[sound].currentTime = 0;
        let playPromise = this.soundEffects[sound].play();
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
        this.soundEffects[SoundEffect.EatingSound] = new Audio("sounds/eat.mp3");
        this.soundEffects[SoundEffect.DefeatSound] = new Audio("sounds/eat.mp3");
    }
    /**
     * Pre loads and set the volume of all of the sounds
     * found in the 'soundEffects' list.
     *
     * @returns void
     */
    preloadAudioAndSetVolume() {
        this.soundEffects.forEach((soundEffect) => {
            soundEffect.load();
            soundEffect.volume = this.soundEffectsVolume;
        });
    }
}
SoundComponent.instance = null;
