import { motion } from "framer-motion";
import { UserPositionProp } from "../types";
import { generateAvatar } from "@/shared/utils/wall-utils";

export default function WallAttendee({ user } : UserPositionProp) {
    return (
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
    )
}