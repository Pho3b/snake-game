import {SoundEffect} from "./EnumeratorsComponent.js";

export class SoundComponent {
    public soundEffects: HTMLAudioElement[] = new Array(5);
    readonly soundEffectsVolume = 0.2;
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
    public playSoundEffect(sound: SoundEffect): void {
        this.soundEffects[sound].currentTime = 0;
        let playPromise: Promise<void> = this.soundEffects[sound].play();

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
        this.soundEffects[SoundEffect.EatingSound] = new Audio("sounds/eat.mp3");
        this.soundEffects[SoundEffect.DefeatSound] = new Audio("sounds/eat.mp3");
    }

    /**
     * Pre loads and set the volume of all of the sounds
     * found in the 'soundEffects' list.
     *
     * @returns void
     */
    private preloadAudioAndSetVolume(): void {
        this.soundEffects.forEach((soundEffect) => {
            soundEffect.load();
            soundEffect.volume = this.soundEffectsVolume;
        });
    }
}
