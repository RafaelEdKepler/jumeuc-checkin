"use client";
import { AnimatePresence, motion } from "framer-motion";
import useWall from "../hooks/use-wall";
import WallContent from "./wall-content";
import WallAttendee from "./wall-attendee";

export default function WallClient() {
    
    const { isPending, isWhatVisible, mostAttendance, userPositions } = useWall();

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-red-900 yellow to-green-900 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={isWhatVisible}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 600, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <WallContent isPending={isPending} isWhatVisible={isWhatVisible} mostAttendance={mostAttendance} />
                </motion.div>
            </AnimatePresence>
            <h1 className="absolute top-6 w-full text-center text-4xl font-bold text-white z-10">
                A galera tá chegando 🏃
            </h1>

            <div className="w-full h-screen relative">
                {userPositions && userPositions.map((user) => (                    
                    <WallAttendee key={user.name} user={user} />
                ))}
            </div>
        </div>
    );
}
