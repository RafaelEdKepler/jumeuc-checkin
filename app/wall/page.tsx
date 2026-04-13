import WallClient from "./wall-client";

export const metadata = {
    title: "Jumeuc - Mural",
    description: "Veja quem já chegou!"
}

export const dynamic = "force-dynamic"

export default function Wall() {
    return (
        <WallClient />
    )
}