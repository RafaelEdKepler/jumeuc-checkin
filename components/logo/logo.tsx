import Image from "next/image";

export default function LogoComponent() {
    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="w-24 h-24 rounded-full bg-slate-300 flex items-center justify-center text-2xl font-bold text-slate-700">
                <Image alt="Logo da JUMEUC" src="/jumeuc_logo.png" width={96} height={96}/>
            </div>
            <h1 className="text-2xl font-semibold text-center">
                Check-in JUMEUC TCHÊ
            </h1>
            <p className="text-sm text-muted-foreground text-center">
                Registre sua presença no encontro de hoje ✨
            </p>
        </div>
    )
}