import { motion } from "framer-motion";
import { FrequencyBadgeType } from "./types";

export default function FrequencyBadgeComponent({ emoji } : FrequencyBadgeType) {
    
    return (
        <div className="relative w-5 h-5">
            <motion.div
                className="w-5 h-5"
                animate={{ scale: [1, 1.15, 1] }}    
                transition={{repeat: Infinity, duration: 1.2}}
            >
                {emoji}
            </motion.div>
        </div>
    )
}