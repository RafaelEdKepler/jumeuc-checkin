import { motion } from "framer-motion";
import ListConfirmProps from "./types";

export default function ListConfirmComponent({ attendees, onAttendeePress }: ListConfirmProps) {
    return (
        <div>
            <h2 className="text-lg font-medium mb-3">
              Presentes ({attendees.length})
            </h2>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {attendees.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nenhum check-in realizado ainda.
                </p>
              )}

              {attendees.map((person) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={ person.confirmed ? "bg-slate-100 rounded-xl px-4 py-2 text-sm shadow-sm cursor-pointer" : "bg-black rounded-xl px-4 py-2 text-sm shadow-sm text-white cursor-pointer line-through" }
                  onClick={() => onAttendeePress(person.id)}
                >
                  {person.name}
                </motion.div>
              ))}
            </div>
          </div>
    )
}