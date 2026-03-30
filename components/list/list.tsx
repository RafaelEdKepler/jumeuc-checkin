import { motion } from "framer-motion";

export default function ListComponent({ attendees, isLoading = true }: { attendees: string[], isLoading: boolean }) {
    return (
        <div>
            {isLoading ? (
              <div
                className="relative overflow-hidden bg-slate-200 rounded-xl h-10"
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
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
                  }}
                />
              </div>
            ) : (
              <>
                <h2 className="text-lg font-medium mb-3">
                  Presentes ({attendees.length})
                </h2>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {attendees.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Nenhum check-in realizado ainda.
                    </p>
                  )}
                  {attendees.map((person, index) => (
                    <motion.div
                      key={person}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-slate-100 rounded-xl px-4 py-2 text-sm shadow-sm"
                    >
                      {index + 1}. {person}
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
    )
}