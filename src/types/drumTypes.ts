export interface DrumPadData {
    id: string
    keyTrigger: string
    url: string
    name: string
    color: string
}

export interface AudioClip {
    // id: string
    keyTrigger: string
    url: string
    description: string
}

export interface Particle {
    id: string
    x: number
    y: number
    color: string
}
