import "./index.css";
import { Drum } from "./components/Drum";
import { audioClips } from "./data/audioClips";

function App() {

    const playAudio = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const clip = audioClips.find(
            (clip) => clip.keyTrigger === e.key.toUpperCase()
        );
        if (!clip) return;
        (document.getElementById(clip.keyTrigger) as HTMLAudioElement)
            .play()
            .catch(console.error);

        document.getElementById("drum-" + clip.keyTrigger)?.focus();
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center font-barriecito bg-amber-50 p-4 relative overflow-hidden" id="drum-machine" onKeyDown={playAudio}>
            <div id="display" className="text-9xl mb-16 text-center text-amber-900"></div>
            <div className="drum-pads grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-4">
                {audioClips.map((clip) => (
                    <Drum audioClip={clip} key={clip.keyTrigger} />
                ))}
            </div>
        </div>
    );
}

export default App;