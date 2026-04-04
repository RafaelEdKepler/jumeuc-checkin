import { motion } from "framer-motion";

export default function ListSkelletonComponent() {
    return (
        <div className="flex justify-center flex-col w-full">
            {[...Array(5)].map((_, i) => (
                <div
                    className="relative overflow-hidden bg-slate-200 rounded-xl h-8 mb-2 w-full"
                    key={i}
                    >
                    <motion.div
                        className="absolute inset-0 z-10" 
                        animate={{
                            x: ["-100%", "100%"]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "linear"
                        }}
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
                        }}
                    />
                </div>
            ))}
        </div>
    )
}