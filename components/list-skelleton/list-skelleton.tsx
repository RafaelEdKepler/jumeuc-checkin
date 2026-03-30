import { motion } from "framer-motion";

export default function ListSkelletonComponent() {
    return (
        <>
            <div
                className="relative overflow-hidden bg-slate-200 rounded-xl h-8 mb-2"
                >
                <motion.div
                    className="absolute inset-0"
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
            <div
                className="relative overflow-hidden bg-slate-200 rounded-xl h-8 mb-2"
                >
                <motion.div
                    className="absolute inset-0"
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
            <div
                className="relative overflow-hidden bg-slate-200 rounded-xl h-8 mb-2"
                >
                <motion.div
                    className="absolute inset-0"
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
            <div
                className="relative overflow-hidden bg-slate-200 rounded-xl h-8 mb-2"
                >
                <motion.div
                    className="absolute inset-0"
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
            <div
                className="relative overflow-hidden bg-slate-200 rounded-xl h-8 mb-2"
                >
                <motion.div
                    className="absolute inset-0"
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
        </>
    )
}