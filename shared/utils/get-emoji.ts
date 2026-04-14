const emojiRanges = [
  { min: 1, max: 1, emoji: "🎯" },
  { min: 2, max: 9, emoji: "🔥" },
  { min: 10, max: 14, emoji: "⚡" },
  { min: 15, max: 19, emoji: "⭐" },
  { min: 20, max: Infinity, emoji: "👑" }
];

export default function getEmoji(attendanceNumber: number) {
  return (
    emojiRanges.find(
      ({ min, max }) => attendanceNumber >= min && attendanceNumber <= max
    )?.emoji ?? "🎯"
  );
}