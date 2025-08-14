import { useState } from "react";
import type { AudioClip } from "../types/drumTypes";

interface DrumProps {
    audioClip: AudioClip;
}

export const Drum = ({ audioClip }: DrumProps) => {
    const [splash, setSplash] = useState(false);
    const playSound = (clip: AudioClip) => {
        (document.getElementById(clip.keyTrigger) as HTMLAudioElement)
            .play()
            .catch(console.error);

        document.getElementById("display")!.innerText = clip.description;
    };

    return (
        <button
            className="drum-pad relative aspect-square rounded-xl ] text-amber-50 bg-amber-300 text-2xl md:text-xl w-32 sm:w-24 h-32 sm:h-24 md:w-20 md:h-20
            transition-all duration-150 transform-gpu
            active:scale-90 
            backdrop-blur-sm bg-opacity-80 hover:bg-opacity-100"

            id={`drum-${audioClip.keyTrigger}`}
            onClick={() => {
                setSplash(true);
                setTimeout(() => setSplash(false), 1000);
                playSound(audioClip);
            }}
        >

            {splash && (
                <div className="absolute inset-0 pointer-events-none animate-pulse">
                    {/* Main ketchup splash */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-600 rounded-full  animate-ping" />
                    {/* Ketchup splatters */}
                    <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-bounce" />
                    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-600 rounded-full  animate-pulse" />
                    <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-red-500 rounded-full  animate-ping" />
                    <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-red-700 rounded-full animate-bounce" />
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-600 rounded-full  animate-pulse" />
                </div>
            )}

            <audio src={audioClip.url} id={audioClip.keyTrigger} className="clip" />
            {audioClip.keyTrigger}
        </button>
    );
};

