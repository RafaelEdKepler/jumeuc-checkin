"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const mockNames = [
  "Rafael",
  "João",
  "Maria",
  "Ana",
  "Lucas",
  "Pedro",
  "Julia",
  "Mateus",
  "Larissa",
  "Gabriel",
];

const styles = [
  "adventurer",
  "fun-emoji",
  "bottts",
  "pixel-art",
  "thumbs",
];

function generateAvatar(name: string, index: number) {
  const style = styles[index % styles.length];
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${name}`;
}

export default function WallClient() {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index >= mockNames.length) return;

      setUsers((prev) => [...prev, mockNames[index]]);
      index++;
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-900 via-black to-green-950 overflow-hidden">
      <h1 className="absolute top-6 w-full text-center text-4xl font-bold text-white z-10">
        A galera tá chegando 🏃‍♂️
      </h1>

      {/* Área de "brincadeira" */}
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
                scale: 1,
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
