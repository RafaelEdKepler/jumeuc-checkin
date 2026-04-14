import Image from "next/image";

export default function PortalServer() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-lg p-6 animate-pulse">
                <Image src="/jumeuc_logo.png" alt="Logo da JUMEUC" className="rounded-lg" width={200} height={200} />
            </div>
        </div>
    )
}