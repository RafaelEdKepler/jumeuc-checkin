export default function SetUserPositions(names: string[]) {
        return names.map((name) => ({
            name,
            initialX: Math.random() * 80,
            initialY: Math.random() * 80,
            pathX: [Math.random() * 80, Math.random() * 80],
            pathY: [Math.random() * 80, Math.random() * 80],
            duration: 8 + Math.random() * 5,
    }))
}