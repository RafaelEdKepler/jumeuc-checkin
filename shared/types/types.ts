export type BibleBook = {
  abbrev: string;
  name: string;
  chapters: string[][];
};

export type TopAttendanceReturnProp = {
    name: string,
    position: number,
    percentual: string,
    count: number
}