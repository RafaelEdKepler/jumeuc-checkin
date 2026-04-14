"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getAllAttendees, getMoreAttendance } from "@/shared/lib/db";
import { TopAttendanceReturnProp } from "../attendance/types";
import ListSkelletonComponent from "@/shared/components/list-skelleton/list-skelleton";
import AttendanceTableComponent from "@/shared/components/attendance-table/attendance-table";
import Image from "next/image";
import { generateAvatar } from "@/shared/utils/wall-utils";

export default function WallClient() {
    const [users, setUsers] = useState<string[]>([]);
    const [isWhatVisible, setIsWhatVisible] = useState<number>(1);
    const [mostAttendance, setMostAttendance] = useState<TopAttendanceReturnProp[]>([]);
    const [ isPending, startTransition ] = useTransition();

    const handleKeyDown = (e: KeyboardEvent) => {
        const defineWhatWillBeVisible : Record<string, () => void> = {
            "PageUp": () => setIsWhatVisible(prev => prev < 2 ? prev + 1 : prev),
            "PageDown": () => setIsWhatVisible(prev => prev > 0 ? prev - 1 : prev)
        }
        defineWhatWillBeVisible[e.key]()
    }
    
    const userPositions = useMemo(() => {
        return users.map((name) => ({
            name,
            initialX: Math.random() * 80,
            initialY: Math.random() * 80,
            pathX: [Math.random() * 80, Math.random() * 80],
            pathY: [Math.random() * 80, Math.random() * 80],
            duration: 8 + Math.random() * 5,
    }));
}, [users]);

    useEffect(() => {        
        const fetchUsers = async () => {
            const usersUpdated = await getAllAttendees()
            setUsers((prev) => {
                if (usersUpdated.length !== prev.length) {
                    return usersUpdated
                }
                return prev
            })
        }
        const fetchAttendees = async () => {
            const attendance = await getMoreAttendance();
            setMostAttendance(attendance);
        }

        const interval = setInterval(fetchUsers, 2000)

        fetchUsers()
        startTransition(() => {
            fetchAttendees();
        })

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(interval)
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

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
                    {isWhatVisible === 1 && (
                    <img
                        src="/logo_sem_fundo.png"
                        alt="Logo"
                        className="w-124 opacity-80"
                    />
                    )}

                    {isWhatVisible === 0 && (
                    <div className="rounded-2xl w-1/3 h-1/2 bg-card p-10 flex items-center justify-center z-10">
                        <Image src="/qrcode.png" alt="QR Code image" width={400} height={400} />
                    </div>
                    )}

                    {isWhatVisible === 2 && (
                    <div className="rounded-2xl w-1/2 h-2/3 bg-card p-10 z-10 flex justify-center items-center">
                        {isPending ? (
                        <ListSkelletonComponent />
                        ) : (
                        <AttendanceTableComponent topAttendants={mostAttendance}/>
                        )}
                    </div>
                    )}
                </motion.div>
            </AnimatePresence>
            <h1 className="absolute top-6 w-full text-center text-4xl font-bold text-white z-10">
                A galera tá chegando 🏃
            </h1>

            <div className="w-full h-screen relative">
                {userPositions && userPositions.map((user) => (                    
                    <motion.div
                        key={user.name}
                        className="absolute flex flex-col items-center"
                        initial={{ x: `${user.initialX}vw`, y: `${user.initialY}vh`, scale: 0 }}
                        animate={{
                            x: [
                                `${user.initialX}vw`,
                                `${user.pathX[0]}vw`,
                                `${user.pathX[1]}vw`,
                            ],
                            y: [
                                `${user.initialY}vh`,
                                `${user.pathY[0]}vh`,
                                `${user.pathY[1]}vh`,
                            ],
                            scale: 2,
                        }}
                        transition={{
                            duration: user.duration,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }}
                    >
                        <img
                            src={generateAvatar(user.name)}
                            alt={user.name}
                            className="w-16 h-16 drop-shadow-xl"
                        />
                        <span className="text-xs text-white mt-1">{user.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
