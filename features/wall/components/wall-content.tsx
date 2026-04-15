import { TopAttendanceReturnProp } from "@/shared/types/types";
import WallList from "./wall-list";
import WallLogo from "./wall-logo";
import WallQRCode from "./wall-qrcode";
import { WallContentProps } from "../types";

export default function WallContent({isWhatVisible, isPending, mostAttendance} : WallContentProps) {
    return (
        <>
            {isWhatVisible === 1 && (
                <WallLogo />
            )}

            {isWhatVisible === 0 && (
                <WallQRCode />
            )}

            {isWhatVisible === 2 && (
                <WallList isPending={isPending} mostAttendance={mostAttendance} />
            )}
        </>
    )
}