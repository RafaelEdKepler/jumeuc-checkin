import { getDailySeed } from "../../../shared/utils/get-verse";

const styles = [
    "adventurer",
    "fun-emoji",
    "bottts",
    "pixel-art",
    "thumbs",
    "lorelei",
    "adventurer-neutral",
    "big-ears",
    "bottts-neutral",
    "croodles",
    "notionists-neutral",
    "shapes",
    "rings",
    "pixel-art-neutral",
    "personas",
    "open-peeps",
    "notionists",
    "miniavs",
    "micah",
    "lorelei-neutral",
    "identicon",
    "dylan",
    "croodles-neutral",
    "big-smile",
    "big-ears-neutral",
    "avataaars-neutral",
    "toon-head"
];

export function generateAvatar(name: string) {
    const style = styles[getDailySeed() % styles.length];
    return `https://api.dicebear.com/9.x/${style}/svg?seed=${name}`;
}