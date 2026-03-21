"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDailySeed } from "../../utils/get-verse";
import { getAllAttendees } from "@/lib/db";

const styles = [
    "adventurer",
    "fun-emoji",
    "bottts",
    "pixel-art",
    "thumbs",
    "lorelei",
    "adventure-neutral",
    "big-ears",
    "bottts-neutral",
    "croodles",
    "notionists-neutral"
];

function generateAvatar(name: string, index: number) {
    const style = styles[getDailySeed() % styles.length];
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${name}`;
}

export default function WallClient() {
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersUpdated = await getAllAttendees()

            setUsers((prev) => {
                if (usersUpdated.length !== prev.length) {
                    console.log("entrou")
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
                {users.map((name, index) => {
                    const randomX = Math.random() * 80;
                    const randomY = Math.random() * 80;

                    return (
                        <motion.div
                            key={name}
                            className="absolute flex flex-col items-center"
                            initial={{ x: `${randomX}vw`, y: `${randomY}vh`, scale: 0 }}
                            animate={{
                                x: [
                                    `${randomX}vw`,
                                    `${Math.random() * 80}vw`,
                                    `${Math.random() * 80}vw`,
                                ],
                                y: [
                                    `${randomY}vh`,
                                    `${Math.random() * 80}vh`,
                                    `${Math.random() * 80}vh`,
                                ],
                                scale: 2,
                            }}
                            transition={{
                                duration: 8 + Math.random() * 5,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                            }}
                        >
                            <img
                                src={generateAvatar(name, index)}
                                alt={name}
                                className="w-16 h-16 drop-shadow-xl"
                            />
                            <span className="text-xs text-white mt-1">{name}</span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
