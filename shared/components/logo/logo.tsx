import Image from "next/image";
import LogoProps from "./types";
import InfoCheckinComponent from "../info-checkin/info-checkin";

export default function LogoComponent({ verse, isThereProgramToday, isCheckin } : LogoProps) {
    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="w-24 h-24 rounded-full bg-slate-300 flex items-center justify-center text-2xl font-bold text-slate-700">
                <Image alt="Logo da JUMEUC" src="/jumeuc_logo.png" width={96} height={96}/>
            </div>
            {isCheckin && (
                <InfoCheckinComponent verse={verse} isThereProgramToday={isThereProgramToday} />
            )}
        </div>
    )
}