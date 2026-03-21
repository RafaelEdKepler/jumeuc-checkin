import { InfocheckinProps } from "./types";

export default function InfoCheckinComponent({ verse, isThereProgramToday } : InfocheckinProps) {
    return (
        <>
        <h1 className="text-2xl font-semibold text-center">
                Check-in JUMEUC TCHÊ
            </h1>
            <h2 className="text-1xl font-bold text-center">{verse}</h2>
            {isThereProgramToday ? (
                <p className="text-sm text-muted-foreground text-center">
                    Registre sua presença no encontro de hoje ✨
                </p>
            ) : (
                <p className="text-sm text-muted-foreground text-center">
                    Hoje não teremos programação 🙁. Mas fique ligado nas redes sociais do <a className="font-bold underline" href="https://www.instagram.com/jumeuctche/">@jumeuctche</a> para não perder as próximas!
                </p>
            )}
        </>
    )
}