import Image from "next/image";

export default function WallQRCode() {
    return (
        <div className="rounded-2xl w-1/3 h-1/2 bg-card p-10 flex items-center justify-center z-10">
            <Image src="/qrcode.png" alt="QR Code image" width={400} height={400} />
        </div>
    )
}