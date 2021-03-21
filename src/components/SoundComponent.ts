import {SoundEffect} from "./EnumeratorsComponent.js";

export class SoundComponent {
    private static soundEffects: HTMLAudioElement[] = new Array(5);
    private static readonly defaultSoundEffectsVolume = 0.2;


    /**
     * Performs all of the tasks need to initialize and
     * make the SoundComponent usable.
     *
     * @returns void
     */
    public static init(): void {
        SoundComponent.populateGameAudioList();
        SoundComponent.preloadAudioAndSetVolume();
    }

    /**
     * Plays the sound passed as parameter.
     *
     * @returns void
     */
    public static playSoundEffect(sound: SoundEffect): void {
        SoundComponent.soundEffects[sound].currentTime = 0;
        let playPromise: Promise<void> = SoundComponent.soundEffects[sound].play();

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
    private static populateGameAudioList(): void {
        SoundComponent.soundEffects[SoundEffect.EatingSound] = new Audio("sounds/eat.mp3");
        SoundComponent.soundEffects[SoundEffect.GameOverSound] = new Audio("sounds/game-over.wav");
    }

    /**
     * Pre loads and set the volume of all of the
     * sounds stored in the 'soundEffects' list.
     *
     * @returns void
     */
    private static preloadAudioAndSetVolume(): void {
        SoundComponent.soundEffects.forEach((soundEffect: HTMLAudioElement, soundKey: SoundEffect) => {
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
