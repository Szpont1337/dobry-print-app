import sharp from "sharp";
import toIco from "to-ico";
import fs from "node:fs";

const svg = fs.readFileSync("src/app/icon.svg");
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((s) => sharp(svg).resize(s, s).png().toBuffer()),
);
const ico = await toIco(pngs);
fs.writeFileSync("src/app/favicon.ico", ico);
console.log("wrote src/app/favicon.ico", ico.length, "bytes");
