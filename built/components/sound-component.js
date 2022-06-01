import { SoundEffect } from "../helper/enum.js";
export class SoundComponent {
    /**
     * Performs all the tasks need to initialize and
     * make the SoundComponent usable.
     *
     * @returns void
     */
    static init() {
        SoundComponent.populateGameAudioList();
        SoundComponent.preloadAudioAndSetVolume();
    }
    /**
     * Plays the sound passed as parameter.
     *
     * @returns void
     */
    static playSoundEffect(sound) {
        SoundComponent.soundEffects[sound].currentTime = 0;
        SoundComponent.soundEffects[sound].play().then(() => {
        });
    }
    /**
     * Populate the instance sound effects list.
     *
     * @returns void
     */
    static populateGameAudioList() {
        SoundComponent.soundEffects[SoundEffect.EatingSound] = new Audio("sounds/eat.mp3");
        SoundComponent.soundEffects[SoundEffect.GameOverSound] = new Audio("sounds/game-over.wav");
    }
    /**
     * Pre loads and set the volume of all the
     * sounds stored in the 'soundEffects' list.
     *
     * @returns void
     */
    static preloadAudioAndSetVolume() {
        SoundComponent.soundEffects.forEach((soundEffect, soundKey) => {
            soundEffect.load();
            switch (soundKey) {
                case SoundEffect.GameOverSound:
                    soundEffect.volume = 0.8;
                    break;
                default:
                    soundEffect.volume = SoundComponent.defaultSoundEffectsVolume;
                    break;
            }
        });
    }
}
SoundComponent.soundEffects = new Array(5);
SoundComponent.defaultSoundEffectsVolume = 0.2;
