import opentype from 'opentype.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fontPath = path.join(__dirname, '../fonts/Electrolize-Regular.ttf');
const fontBuffer = fs.readFileSync(fontPath);
const font = opentype.parse(fontBuffer.buffer.slice(
  fontBuffer.byteOffset,
  fontBuffer.byteOffset + fontBuffer.byteLength
));

const text = 'JINUKA WADUGE';
const fontSize = 80;
const letterSpacing = 5; // extra px gap between glyphs, tune to taste

let x = 0;
const paths = [];
const chars = [];

for (const char of text) {
  const glyph = font.charToGlyph(char);
  const glyphPath = glyph.getPath(x, fontSize, fontSize);
  paths.push(glyphPath.toPathData(2));
  chars.push(char);
  x += glyph.advanceWidth * (fontSize / font.unitsPerEm) + letterSpacing;
}

// Compute a real viewBox from the font's own metrics instead of guessing
const scale = fontSize / font.unitsPerEm;
const ascent = font.ascender * scale;
const descent = font.descender * scale; // negative

const top = fontSize - ascent;
const bottom = fontSize - descent;
const svgHeight = bottom - top;

const outDir = path.join(__dirname, '../src/data');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'headline-paths.json'),
  JSON.stringify({
    paths,
    chars,
    width: x,
    viewBox: { x: 0, y: top, width: x, height: svgHeight },
  })
);

console.log(`Generated ${paths.length} glyph paths, total width ${x.toFixed(1)}`);