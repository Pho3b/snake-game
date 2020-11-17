import {SoundEffect} from "./EnumeratorsComponent.js";

export class SoundComponent {
    private static soundEffects: HTMLAudioElement[] = new Array(5);
    private readonly defaultSoundEffectsVolume = 0.2;
    private static instance = null;


    private constructor() {
        this.populateGameAudioList();
        this.preloadAudioAndSetVolume();
    }

    /**
     * Singleton related method to retrieve a single
     * instance of the HelperComponent.
     *
     * @returns UtilsComponent
     */
    public static getInstance(): SoundComponent {
        if (SoundComponent.instance === null) {
            return new SoundComponent();
        } else {
            return SoundComponent.instance;
        }
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
    private populateGameAudioList(): void {
        SoundComponent.soundEffects[SoundEffect.EatingSound] = new Audio("sounds/eat.mp3");
        SoundComponent.soundEffects[SoundEffect.GameOverSound] = new Audio("sounds/game-over.wav");
    }

    /**
     * Pre loads and set the volume of all of the
     * sounds stored in the 'soundEffects' list.
     *
     * @returns void
     */
    private preloadAudioAndSetVolume(): void {
        SoundComponent.soundEffects.forEach((soundEffect: HTMLAudioElement, soundKey: SoundEffect) => {
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
