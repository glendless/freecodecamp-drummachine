import { useState, useRef, useEffect } from "react"
import { drumPads } from "../data/drumPad"

interface UseDrumMachineProps {
    onParticleCreate: (color: string) => void
}

export function useDrumMachine({ onParticleCreate }: UseDrumMachineProps) {
    const [activePads, setActivePads] = useState<Set<string>>(new Set())
    const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

    useEffect(() => {
        // Initialize audio elements
        drumPads.forEach((pad) => {
            const audio = new Audio()
            audio.src = pad.url
            audio.preload = "auto"
            audioRefs.current[pad.id] = audio
        })

        // Keyboard event listeners
        const handleKeyDown = (event: KeyboardEvent) => {
            const pad = drumPads.find((p) => p.keyTrigger.toLowerCase() === event.key.toLowerCase())
            if (pad && !activePads.has(pad.id)) {
                playDrum(pad.id)
            }
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            const pad = drumPads.find((p) => p.keyTrigger.toLowerCase() === event.key.toLowerCase())
            if (pad) {
                setActivePads((prev) => {
                    const newSet = new Set(prev)
                    newSet.delete(pad.id)
                    return newSet
                })
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [activePads])

    const playDrum = (padId: string) => {
        const audio = audioRefs.current[padId]
        const pad = drumPads.find((p) => p.id === padId)

        if (audio && pad) {
            audio.currentTime = 0
            audio.play().catch(console.error)

            // Visual feedback
            setActivePads((prev) => new Set(prev).add(padId))
            setTimeout(() => {
                setActivePads((prev) => {
                    const newSet = new Set(prev)
                    newSet.delete(padId)
                    return newSet
                })
            }, 0)

            // Create particle effect
            onParticleCreate(pad.color)
        }
    }

    const resetMachine = () => {
        setActivePads(new Set())
        // Stop all currently playing audio
        Object.values(audioRefs.current).forEach((audio) => {
            audio.pause()
            audio.currentTime = 0
        })
    }

    return {
        activePads,
        playDrum,
        resetMachine,
    }
}
