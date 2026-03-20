
import { BibleBook } from '@/types/types';
import rawBible from '../../lib/nvi.json'

export function getDailySeed() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function getBibleVerse() : string {        
  const bible = rawBible as BibleBook[];
    const seed = getDailySeed();

  const bookIndex = Math.floor(seededRandom(seed) * bible.length);
  const book = bible[bookIndex];

  const chapterIndex = Math.floor(
    seededRandom(seed + 1) * book.chapters.length
  );

  const chapter = book.chapters[chapterIndex];

  const verseIndex = Math.floor(
    seededRandom(seed + 2) * chapter.length
  );

  const verse = chapter[verseIndex];

  return `${book.abbrev.toUpperCase()} ${chapterIndex + 1}:${verseIndex + 1} - ${verse}`;

}