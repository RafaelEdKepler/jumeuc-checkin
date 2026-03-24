"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getAllAttendees } from "@/lib/db";
import { generateAvatar } from "@/utils/wall-utils";

export default function WallClient() {
    const [users, setUsers] = useState<string[]>([]);
    
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

        const interval = setInterval(fetchUsers, 2000)

        fetchUsers()

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-red-900 yellow to-green-900 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                    src="/logo_sem_fundo.png"
                    alt="Logo"
                    className="w-124 opacity-80"
                />
            </div>
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
